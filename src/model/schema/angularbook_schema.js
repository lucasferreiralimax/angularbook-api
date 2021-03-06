const mongoose = require('mongoose');

const AngularbookSchema = new mongoose.Schema({
  iduser: {
    type: String,
    unique: true,
    required: true,
    dropDups: false,
    index: true,
  },
  name: String,
  email: {
    type: String,
    unique: false,
    dropDups: false,
    index: true,
  },
  photo: String,
  data: Date,
  like: [{user: String, likes: Boolean}],
  comment: String,
});

const AngularbookUserSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  username: {
    type: String,
    unique: true,
    dropDups: false,
    index: true,
  },
  password: String,
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    index: true,
  },
  birthday: String,
  gender: String,
  photo: String,
  background: String,
  bio: String,
  location: String,
  relationship: String,
  since: Date,
  site: String,
});

AngularbookSchema.index();

mongoose.model('angularbooks', AngularbookSchema);
mongoose.model('angularbookusers', AngularbookUserSchema);
