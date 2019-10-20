const mongoose = require("mongoose");
const Angularbook = mongoose.model("angularbooks");
const AngularbookUser = mongoose.model("angularbookusers");
const status = require("http-status");

exports.listAllposts = function (req, res, next) {
    Angularbook.find().sort({ data: -1 })
        .then((docs) => {
            console.log(docs);
            if (docs) { res.send(docs); }
            else { res.status(status.OK).send({"notification": {type:"error",title:"Erro",content:"Não foram encontrada postagens."}}); }
        })
        .catch(err => console.log(err));
};

exports.insert = function (req, res, next) {
    AngularbookUser.findOne({ id: req.body.iduser})
    .then((doc)=>{
        post = {}
        post.iduser = doc._id;
        post.name = doc.name;
        post.email = doc.email;
        post.photo = doc.photo;
        post.data = req.body.data;
        post.comment = req.body.comment;

        let angbook = new Angularbook(post);
    
        angbook.save()
            .then(() => {
                res.status(status.OK).send({ "notification": {type:"success",title:"Success",content:"Postagem salva!"} });
            })
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.listOne = function (req, res, next) {

    Angularbook.findOne({ _id: req.body._id, iduser: req.body.iduser })
        .then((doc) => {
            if (doc) { res.send(doc); }
            else { res.status(status.OK).send({"notification": {type:"error",title:"Erro",content:"Postagem não localizada."}}); }
        })
        .catch(err => console.log(err));
};

exports.profile = function (req, res, next) {
    Angularbook.find({ iduser: req.body.iduser })
        .then((docs) => {
            if (docs) { res.send(docs); }
            else { res.status(status.OK).send({"notification": {type:"error",title:"Erro",content:"Não foram encontrada postagens do usuário."}}); }
        })
        .catch(err => console.log(err));
};

exports.deletepostuser = function (req, res, next) {
    Angularbook.deleteOne({ _id: req.body._id, iduser: req.body.iduser })
        .then(() => {
            res.status(status.OK).send({"notification": {type:"success",title:"Sucesso",content:"Postagem deletada!"}});
        })
        .catch(err => console.log(err));
};

exports.updatepostuser = function (req, res, next) {
    Angularbook.findByIdAndUpdate({ _id: req.body._id, iduser: req.body.iduser }, req.body, { new: true })
        .then(() => {
            res.status(status.OK).send({"notification": {type:"success",title:"Sucesso",content:"Informações atualizadas."}});
        })
        .catch(err => console.log(err));
};

exports.updatepost = function (req, res, next) {
    Angularbook.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true })
        .then(() => {
            res.status(status.OK).send({"notification": {type:"success",title:"Sucesso",content:"Informações atualizadas."}});
        })
        .catch(err => console.log(err));
};

exports.deletepost = function (req, res, next) {
    Angularbook.deleteOne({ _id: req.body._id})
        .then(() => {
            res.status(status.OK).send({"notification": {type:"success",title:"Sucesso",content:"Postagem deletada!"}});
        })
        .catch(err => console.log(err));
};