const express=require("express");
const cors=require("cors")
const { connection } = require("mongoose");
const connect = require("./database/connect");
const Routes = require("./Routes");
const BillRoutes = require("./api/external/BillController");
const app=express();

app.use(express.json());
app.use(cors());
app.use(Routes);
app.use(BillRoutes);
app.get("/",(req,res)=>{
    res.send("hello");
})
connect().then(()=>{
    app.listen(8080,()=>{
        console.log(`port is listning on port 8080`);
    })
})
.catch((err)=>{
console.log(err)
console.log("error in connection");
})