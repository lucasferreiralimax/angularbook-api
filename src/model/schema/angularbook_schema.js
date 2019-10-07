const mongoose = require("mongoose");

var AngularbookSchema = new mongoose.Schema({
    iduser: {
        type: String,
        unique: false,
        dropDups: false,
        index: true
    },
    name: String,
    email: {
        type: String,
        unique: false,
        dropDups: false,
        index: true
    },
    photo: String,
    data: Date.toString,
    like: [{ String: Boolean}],
    comment: String

});

var AngularbookUserSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    password: String,
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        index: true
    },
    birthday: String,
    gender: String,
    photo: String,
    background: String,
    bio: String,
    location: String,
    relationship: String,
    since: Date,
    site: String
});

AngularbookSchema.index();

mongoose.model("angularbooks", AngularbookSchema);
mongoose.model("angularbookusers", AngularbookUserSchema);