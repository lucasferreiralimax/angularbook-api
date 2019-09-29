const mongoose = require("mongoose");
const Angularbook = mongoose.model("angularbooks");
const status = require("http-status");

exports.listAllposts = function (req, res, next) {
    Angularbook.find().sort({ data: -1 })
        .then((docs) => {
            console.log(docs);
            if (docs) { res.send(docs); }
            else { res.status(status.BAD_REQUEST).send(); }
        })
        .catch(err => console.log(err));
};

exports.insert = function (req, res, next) {
    let angbook = new Angularbook(req.body);
    angbook.save()
        .then(() => {
            res.status(status.OK).send({ "answer": "Postagem salva!" });
        })
        .catch(err => console.log(err));
};

exports.listOne = function (req, res, next) {

    Angularbook.findOne({ _id: req.body._id, iduser: req.body.iduser })
        .then((doc) => {
            if (doc) { res.send(doc); }
            else { res.status(status.BAD_REQUEST).send(); }
        })
        .catch(err => console.log(err));
};

exports.profile = function (req, res, next) {
    Angularbook.find({ iduser: req.body.iduser })
        .then((docs) => {
            if (docs) { res.send(docs); }
            else { res.status(status.BAD_REQUEST).send(); }
        })
        .catch(err => console.log(err));
};

exports.deletepost = function (req, res, next) {
    Angularbook.deleteOne({ _id: req.body._id, iduser: req.body.iduser })
        .then(() => {
            res.status(status.OK).send();
        })
        .catch(err => console.log(err));
};

exports.updatepost = function (req, res, next) {
    Angularbook.findByIdAndUpdate({ _id: req.body._id, iduser: req.body.iduser }, req.body, { new: true })
        .then(() => {
            res.status(status.OK).send();
        })
        .catch(err => console.log(err));
};
