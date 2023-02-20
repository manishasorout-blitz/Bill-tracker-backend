const mongoose=require("mongoose");
// const connection=mongoose.connect("mongodb://127.0.0.1:27017/billtracker")

// module.exports={
//     connection
// }

mongoose.set('strictQuery', true);




async function connect(){
    return new Promise((resolve,reject)=>[
        mongoose.connect('mongodb://127.0.0.1:27017/billtracker',(err)=>{
            if(err){
                console.log("error in connecting to db in connect js");
                return reject(err);
            }
            resolve();
        })
    ])
}
module.exports=connect;