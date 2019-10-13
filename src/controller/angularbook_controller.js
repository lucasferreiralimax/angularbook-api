const express = require("express");
const user = require("./user");
const posts = require("./post");
const jwt = require("jsonwebtoken");
const status = require("http-status");

var router = express.Router();

//posts
router.post("/list/users/posts", verifyToken, (req, res, next) => {
    jwt.verify(req.token, process.env.KEY, (err, authData)=>{
        if(err){
            posts.listAllposts(req, res, next);
        }else{
            res.sendStatus(status.FORBIDDEN);
        }
    });
    
});
router.post("/insert/user/post",verifyToken, (req, res, next) => {
    jwt.verify(req.token, process.env.KEY, (err, authData)=>{
        if(!err){
            posts.insert(req, res, next);
        }else{
            res.sendStatus(status.FORBIDDEN);
        }
    });
    
});

router.post("/list/user/post", verifyToken,(req, res, next) => {
    jwt.verify(req.token, process.env.KEY, (err, authData)=>{
        if(!err){
            posts.listOne(req, res, next);
        }else{
            res.sendStatus(status.FORBIDDEN);
        }
    });
    
});

router.post("/profile",verifyToken, (req, res, next) => {
    jwt.verify(req.token, process.env.KEY, (err, authData)=>{
        if(!err){
            posts.profile(req, res, next); 
        }else{
            res.sendStatus(status.FORBIDDEN);
        }
    });
    
});

router.post("/delete/user/post", verifyToken,(req, res, next) => {
    jwt.verify(req.token, process.env.KEY, (err, authData)=>{
        if(!err){
            posts.deletepostuser(req, res, next);
        }else{
            res.sendStatus(status.FORBIDDEN);
        }
    });
    
});

router.post("/delete/post", verifyToken,(req, res, next) => {
    jwt.verify(req.token, process.env.KEY, (err, authData)=>{
        if(!err){
            posts.deletepost(req, res, next);
        }else{
            res.sendStatus(status.FORBIDDEN);
        }
    });
    
});

router.post("/update/user/post", verifyToken,(req, res, next) => {
    jwt.verify(req.token, process.env.KEY, (err, authData)=>{
        if(!err){
            posts.updatepostuser(req, res, next);
        }else{
            res.sendStatus(status.FORBIDDEN);
        }
    });
    
});

router.post("/update/post", verifyToken,(req, res, next) => {
    jwt.verify(req.token, process.env.KEY, (err, authData)=>{
        if(!err){
            posts.updatepost(req, res, next);
        }else{
            res.sendStatus(status.FORBIDDEN);
        }
    });
   
});

//users
router.post("/list/users",verifyToken, (req, res, next) => {
    jwt.verify(req.token, process.env.KEY, (err, authData)=>{
        if(!err){
            user.listAllusers(req, res, next);
        }else{
            res.sendStatus(status.FORBIDDEN);
        }
    });
    
});

router.post("/cadastro", (req, res, next) => {
    user.cadastro(req, res, next);
});

router.post("/login", (req, res, next) => {
    user.login(req, res, next);
});

router.post("/delete/user", verifyToken,(req, res, next) => {
    jwt.verify(req.token, process.env.KEY, (err, authData)=>{
        if(!err){
            user.deleteuser(req, res, next);
        }else{
            res.sendStatus(status.FORBIDDEN);
        }
    });
    
});

router.post("/update/user",verifyToken, (req, res, next) => {
    jwt.verify(req.token, process.env.KEY, (err, authData)=>{
        if(!err){
            user.updateuser(req, res, next);
        }else{
            res.sendStatus(status.FORBIDDEN);
        }
    });
    
});

function verifyToken(req, res, next){
    let bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        let bearer = bearerHeader.split(" ")[1];
        req.token = bearer;
        next();

    }else{
        res.sendStatus(status.FORBIDDEN);
    }
}
module.exports = router;