const mongoose=require("mongoose")
const updated_schemas=mongoose.Schema({
    updated_title:{type:String,require:true},
   updated_amount:Number,
    updated_expense_Date:Date,    
})
const UpdatedBill=mongoose.model("updated",updated_schemas);
module.exports={
    UpdatedBill
}