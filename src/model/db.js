const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Angularbook", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) { console.log("logado") }
    else { console.log("erro para logar" + err) }
});

require("./schema/angularbook_schema")

