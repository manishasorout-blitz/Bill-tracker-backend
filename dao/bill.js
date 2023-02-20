const { Bills } =require( "../models/expenses.js");
const { UpdatedBill } = require("../models/update.js");

//all queries
const allbills=async({userId,page,pageSize,search})=>{
     let limit=Number(pageSize);
     let skip=Number(limit)*Number((page)-1);
    
 const total=await Bills.find({
    title:search
 }).count();
 console.log("serachhhhhhhhhhhhhhhhhhhh",search)
 const bool=Math.ceil(total/limit);
//  console.log("boool>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",bool);

console.log(">>>>>>>>>>>>>>> user Id: ", limit);
const bills= await Bills.find({user_id: userId, is_active: true,title:search}).skip(skip).limit(limit);
console.log(search);
console.log(bills,"billssssssssssssssssssssssssssssssssssssssssssssss");
 return {bills,total,bool};
}    
const createbills=async(data)=>{
    return await Bills.create(data);
}
const deletebills=async(id,body)=>{
    return await Bills.updateOne(
        { id },
        {
                $set: {
                is_active: false
            }
        }
    );
}
const updatebills=async(id,body)=>{
    return await Bills.findByIdAndUpdate(id,body);
}
const getbyid=async(id)=>{
    return await Bills.findById(id);
}
const updatedbilldata=async(body)=>{
    return await UpdatedBill.create(body);
}
const historyOfBill=async()=>{
    return await UpdatedBill.find();
}
module.exports={
allbills,
createbills,
deletebills,
updatebills,
getbyid,
updatedbilldata,
historyOfBill
}
