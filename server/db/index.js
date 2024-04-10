const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
    .connect(
        "mongodb+srv://tetyanago2018:vAes22L2zHL8fKUT@cluster0.2r83cvc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Connected mongo db"))
    .catch((e) => console.log(e));
