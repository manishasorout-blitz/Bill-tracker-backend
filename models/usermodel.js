const mongoose=require("mongoose");






const user_schema=mongoose.Schema({
    first_name:{type:String,required:true},
    Last_name:{type:String},
    email:{type:String,required:true},
    contact_number:{type:String,required:true},
    password:{type:String,required:true},
   
})
 const User=mongoose.model("users",user_schema);
module.exports={
    User

}
