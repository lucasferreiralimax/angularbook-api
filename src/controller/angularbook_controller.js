const express = require("express");
const user = require("./user");
const posts = require("./post");

var router = express.Router();

//posts
router.post("/list/users/posts", (req, res, next) => {
    posts.listAllposts(req, res, next);
});

router.post("/insert/user/post", (req, res, next) => {
    posts.insert(req, res, next);
});

router.post("/list/user/post", (req, res, next) => {
    posts.listOne(req, res, next);
});

router.post("/profile", (req, res, next) => {
    posts.profile(req, res, next);
});

router.post("/delete/user/post", (req, res, next) => {
    posts.deletepost(req, res, next);
});

router.post("/update/user/post", (req, res, next) => {
    posts.updatepostuser(req, res, next);
});

router.post("/update/post", (req, res, next) => {
    posts.updatepost(req, res, next);
});

//users
router.post("/list/users", (req, res, next) => {
    user.listAllusers(req, res, next);
});

router.post("/cadastro", (req, res, next) => {
    user.cadastro(req, res, next);
});

router.post("/login", (req, res, next) => {
    user.login(req, res, next);
});

router.post("/delete/user", (req, res, next) => {
    user.deleteuser(req, res, next);
});



router.post("/update/user", (req, res, next) => {
    user.updateuser(req, res, next);
});






module.exports = router;