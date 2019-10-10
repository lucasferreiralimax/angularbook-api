const mongoose = require("mongoose");
const AngularbookUser = mongoose.model("angularbookusers");
const status = require("http-status");
const jwt = require("jsonwebtoken");

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
    user.photo = req.body.photo
    let angbook = new AngularbookUser(user);
    angbook.save()
        .then(() => {
            res.status(status.OK).send({"notification": {type:"success",title:"Sucesso",content:"Cadastrado com sucesso!"}});
        })
        .catch(err => res.json({"notification": {type:"error",title:"Erro",content:"Usuário já cadastrado."}}));
};

exports.login = function (req, res, next) {

    AngularbookUser.findOne({ email: req.body.email})
        .then((doc) => {
            if (doc) {
                if(doc.password == req.body.password.hashCode()){
                    jwt.sign({doc}, process.env.KEY, {expiresIn: '30m`'}, (err, token)=>{
                        if(!err){
                            res.json(token);
                        }else{
                            res.sendStatus(status.FORBIDDEN);
                        }
                    });
                    //res.send({"user":doc, "c":{"name": "03d50a36d545d3ded354a0adcd37dc8ad480734d50fb2ba7683bde35553391c6", "value":true}, "notification": {type:"success",title:"Sucesso",content:"Logado com sucesso!"}});
                } else {
                    res.sendStatus(status.FORBIDDEN);
                    //res.send({"user": {}, "c":{"name": "03d50a36d545d3ded354a0adcd37dc8ad480734d50fb2ba7683bde35553391c6", "value":false}, "notification": {type:"error",title:"Erro",content:"Senha invalida!"}})
                }
            }else{
                res.sendStatus(status.FORBIDDEN);
                //res.send({ "logado": false, "user": {}, "notification": {type:"error",title:"Erro",content:"Usuário não encontrado."} })
            } 
        })
        .catch(err => console.log(err));
};

exports.deleteuser = function (req, res, next) {
    AngularbookUser.deleteOne({ email: req.body.email })
        .then(() => {
            res.status(status.OK).send({"notification": {type:"success",title:"Sucesso",content:"Usuário deletado!"}});
        })
        .catch(err => console.log(err));
};

exports.updateuser = function (req, res, next) {
    AngularbookUser.findOneAndUpdate({ email: req.body.email }, req.body, { new: true })
        .then(() => {
            res.status(status.OK).send({"notification": {type:"success",title:"Sucesso",content:"Informações atualizadas!"}});
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