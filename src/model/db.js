const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://adminBook:HB62iOtJWpmEXLZY@angularbook-zyduz.gcp.mongodb.net/Angularbook?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) { console.log("logado") }
    else { console.log("erro para logar" + err) }
});

require("./schema/angularbook_schema")

