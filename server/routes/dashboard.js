const router = require("express").Router();
const pool = require("../db");
const auhorization = require('../middleware/authorization');

router.get("/", auhorization, async(req,res)=>{
    try{    
  //req.user has the payload
  
       const user = await pool.query(" SELECT first_name FROM graduates    WHERE id = $1", [req.user]);
       res.json(user.rows[0]); 
    
    }catch(err){
        console.error(err.message);
        res.status(500).json("server errors");
    }


});

module.exports = router;