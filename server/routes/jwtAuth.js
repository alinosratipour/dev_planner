const router = require('express').Router();

const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator  = require('../utils/jwtGenerator');
const Validinfo = require('../middleware/Validinfo');
const auhorization = require('../middleware/authorization');



// registeringValidinfo,

router.post("/register",  async(req,res) =>{

    try {

     // 1.destaructure req.body
      const {firstName, lastName , email, password } = req.body;
      const graduateClass = req.body.classCode;
      let graduateClassId;
     // 2. check if user exist then throw error
      const user = await pool.query("SELECT * FROM graduates WHERE email = $1" , [    
      email
     ]);

      if(user.rows.length !== 0){
          res.status(401).json("user Already Exist");
      }


       const userClass = await pool.query("SELECT id FROM classes WHERE class_code = $1",[graduateClass]);
    
       graduateClassId = userClass.rows[0].id;

     // 3. bcrypt user password
       const saltRound = 10;
       const salt =  await bcrypt.genSalt(saltRound);
       const bcryptPassword =  await bcrypt.hash(password,salt)
     

     // 4. enter new user inside the database
        const newUser = await pool.query("INSERT INTO graduates (first_name,last_name,email,password,class_id) values($1,$2,$3,$4,$5) RETURNING *",[firstName,lastName,email,bcryptPassword, graduateClassId ]);
        //res.json(newUser.rows[0]);
        // 5. generating jwttoken
           
            const token = jwtGenerator(newUser.rows[0].id);

            res.json({ token });

    }catch(err) {
     console.error(err.message);
     res.status(500).send("server error");

    }
});

//login route

router.post("/login",  Validinfo,  async (req,res) =>{
  try{
// destructure req.body
const {email,password} = req.body;

// check if user exist if not trw err
const user = await pool.query("SELECT *  FROM graduates  where email = $1 ",[email]);

if (user.rows.length === 0){
    return res.status(401).json("user does not exist")
}

//check if password entered is same as database password

const validPassword =    await bcrypt.compare(password, user.rows[0].password);
// if everything ok then give them jw token
if(!validPassword){
    return res.status(401).json("password or email is incorrect")
}

const token = jwtGenerator(user.rows[0].id)

res.json({token})
//res.send()
  }catch(err){
    console.error(err.message);
    res.status(500).send("server error");
  }
});



router.get("/is-verify", auhorization,
  async (req,res)=>{
   try{
      res.json(true);
   }catch(err){
    console.error(err.message);
    res.status(500).send("server error");
   }
});




module.exports = router;