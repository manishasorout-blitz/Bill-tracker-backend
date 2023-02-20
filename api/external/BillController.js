const express=require("express");
const {allbills, createbills, deletebills, updatebills, getbyid, historyOfBill}=require("../../dao/bill.js");
const { Bills } = require("../../models/expenses.js");
const { UpdatedBill } = require("../../models/update.js");
const {authMiddleware} = require("./middleware");
const router=express.Router();
//functions 
const getAllBills=async(req,res)=>{   
 console.log(req.headers)
 const {page=1,pageSize=5}=req.query;
try {
    let userId = req.userId;  
    console.log("user id",userId);
    let {bills,total,bool}= await allbills({userId,page,pageSize});
     console.log(bills,userId);
    res.send({bills,"total":total,"totalpages":bool});
} catch (error) {
    console.log(error)
    res.status(404).send({message:"there is some error in getting all the bills"})
}
}
//create bills     

const createBills=async(req,res)=>{  
  const {title,amount,expense_date}=req.body;
  const user_id = req.userId;
   
    try {
        const posts=await createbills({title,amount,expense_date,user_id});
        res.send({posts});
    } catch (error) {
        res.status(404).send({message:"error in creating a bill"})
    }
}

const deletebill=async(req,res)=>{
    const id=req.params.id;
    const body=req.body;      
    try {
        const bill= await deletebills({_id:id},body);
        res.send("deleted");
    } catch (error) {
        console.log(error);
        res.status(404).send({message:"error in the deleting "})
    }   
}


const editbill=async(req,res)=>{
    console.log("inside the edit blog");
    const id=req.params.id;
    const body=req.body;
    try {
        const updatedBill =  await Bills.findByIdAndUpdate(id, body) ;      
           console.log(body,"HRY THRE")
     
        const history= new UpdatedBill({updated_title:body.title, updated_amount:body.amount, updated_expense_Date:body.expense_date});
       await history.save();
        console.log(updatedBill ,"line 51");
   await updatedBill.save();      
        res.send(updatedBill);   
          
    } catch (error) {
        console.log(error);
       res.status(404).send({message:"error in updating"})
    }
}
const getById=async(req,res)=>{
    const id=req.params.id;   
    try {
        const singlebill=await getbyid(id)
        res.send(singlebill);
    } catch (error) {
        res.send("error")
    }
}

const historybills=async(req,res)=>{
try {
    const history=await historyOfBill();
    console.log(history,"history of edidted bills");
    res.send({history});
} catch (error) {
    console.log(error,"error in getting edited history ")
    res.status(404).send({message:"erroe occured in getting the history of updated bills"})
}
}

//get all expenses
router.get("/allbills",authMiddleware,getAllBills);
//create expenses
router.post("/createbills",authMiddleware,createBills);
//delete expenses
router.delete("/deletebill/:id",deletebill);
//edit expenses
router.put("/editbill/:id",editbill);
//getby id
router.get("/billbyid/:id",getById);
//get history of edited bills;
router.get("/history",historybills);


module.exports=router;
