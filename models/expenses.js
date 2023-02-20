const mongoose=require("mongoose");
const { User } = require("./usermodel");
// const formatDate = function(datePropery) {
//     const newDate = new Date(datePropery);
//     let formattedDate = `${ newDate.getFullYear() }-`;
//         formattedDate += `${ `0${ newDate.getMonth() + 1 }`.slice(-2) }-`;  // for double digit month
//         formattedDate += `${ `0${ newDate.getDate() }`.slice(-2) }`;        // for double digit day
//     return formattedDate;
// }
const userId=new User();

const expenses_Schema=mongoose.Schema({
    title:{type:String,require:true},
    amount:{type:Number,require:true},
    expense_date:Date,
    user_id:{ type: String},
    is_active: { type: Boolean, default: true },
    audits: { type: Array }
    }, { timestamp: true })
const Bills=mongoose.model("expenses",expenses_Schema);
module.exports={
    Bills
}