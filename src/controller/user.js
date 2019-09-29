const mongoose = require("mongoose");
const AngularbookUser = mongoose.model("angularbookusers");
const status = require("http-status");

exports.listAllusers = function (req, res, next) {
    AngularbookUser.find()
        .then((docs) => {
            if (docs) { res.send(docs); }
            else { res.status(status.BAD_REQUEST).send(); }
        })
        .catch(err => console.log(err));
};

exports.cadastro = function (req, res, next) {
     
    let user = {} 
    user.name = req.body.name
    user.lastname = req.body.lastname
    user.email = req.body.email_register
    user.password = req.body.password_register.hashCode()
    user.birthday = req.body.birthday
    user.gender = req.body.gender
    user.background = req.body.background
    user.since = req.body.since
    let angbook = new AngularbookUser(user);
    angbook.save()
        .then(() => {
            res.status(status.OK).send({"answer":"cadastrado!"});
        })
        .catch(err => res.json({ "answer": "Valor duplicado" }));
};

exports.login = function (req, res, next) {

    AngularbookUser.findOne({ email: req.body.email, password: req.body.password.hashCode() })
        .then((doc) => {
            if (doc) {
                res.send({"logado": true, "user":doc});
            } else {
                res.send({ "locado": false, "user": {} })
            }
        })
        .catch(err => console.log(err));
};

exports.deleteuser = function (req, res, next) {
    AngularbookUser.deleteOne({ email: req.body.email })
        .then(() => {
            res.status(status.OK).send();
        })
        .catch(err => console.log(err));
};

exports.updateuser = function (req, res, next) {
    AngularbookUser.findOneAndUpdate({ email: req.body.email }, req.body, { new: true })
        .then(() => {
            res.status(status.OK).send();
        })
        .catch(err => console.log(err));
};

String.prototype.hashCode = function () {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash << 16) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}