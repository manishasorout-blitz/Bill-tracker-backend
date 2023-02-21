const { Bills } =require( "../models/expenses.js");

//all queries  
const getAllBills=async({userId,Page,PageSize,search,startDate,endDate})=>{
    let limit=Number(PageSize);
    let skip=Number(PageSize)*Number((Page)-1);
    const filters={
        user_id:userId,
        is_active:true
    }

    if(search){
        filters["title"] =  { $regex: search }
    }

    if(startDate&&endDate){
        filters["expense_date"]={
            $gt:startDate,
            $lt:endDate
        }
    }

const [data,count]=await Promise.all([
   Bills.find(filters).skip(skip).limit(limit).lean(),
   Bills.count(filters)
])
return {data,count};
}

const createNewBill=async(data)=>{
    return await Bills.create(data);
} 
const deleteBill=async(id,body)=>{
    return await Bills.updateOne(
        { id },
        {
                $set: {
                is_active: false
            }
        }
    );
}
const updateBill=async(id,body)=>{
    return await Bills.findByIdAndUpdate({id:_id,body});
}
const getbyid=async(id)=>{
    return await Bills.findById(id);
}

module.exports={
getAllBills,
createNewBill,
deleteBill,
updateBill,
getbyid

}
