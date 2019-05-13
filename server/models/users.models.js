const pool = require('../connection').pool;
const bcrypt = require('bcrypt');
const saltRounds = 5;

function signup(req, res){
    pool.query("SELECT * FROM users WHERE email = ?",
    [req.body.email], (err, queryReturn)=>{
        if(queryReturn[0]){
            return res.send({error:'EMAIL ALREADY EXISTS'});
        }
        let password = bcrypt.hashSync(req.body.password, saltRounds);
        let email = req.body.email;
        let firstname = req.body.firstName;
        let lastname = req.body.lastName;
         

        pool.query("INSERT INTO users (`firstName`, `lastName`, `email`, `password`) VALUES(?,?,?,?)", 
        [firstname, lastname, email, password], (err, result)=>{
            if(!err){
                return res.send({message:'Signed Up!'});
            }
            console.log(err);
            return res.send({error:'Something Broke!'});
        })
    })
}

function login(req, res){
    pool.query("SELECT * FROM users WHERE email = ?", [req.body.email], (err, result)=>{
        if(result[0]){
            if(bcrypt.compareSync(req.body.password, result[0].password)){
            return res.send({message: "WELCOME BACK!"});
        }
        else{
            return res.send({error: "Invalid Username or Password!"});
        }
    }
        return res.send({error: "Something Went Wrong!"});
    })
}

function getAll(req, res){
    pool.query("SELECT id, email, firstName, lastName FROM users", (err, result)=>{
        res.send({
            error: err,
            users: result
        })
    })
}

function deleteUser(req, res){
    pool.query("DELETE FROM users WHERE id = ?", [req.body.id], (err, result) =>{
        if(!err){
            console.log("deleted user")
        }
        else{
            console.log("something went wrong")
        }
    })
}

module.exports.signup = signup;
module.exports.login = login;
module.exports.getAll = getAll;
module.exports.deleteUser = deleteUser;