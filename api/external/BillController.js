const express = require("express");
const {
  createNewBill,
  deleteBill,
  updateBill,
  getbyid,
  getAllBills,
} = require("../../dao/bill.js");
const { authMiddleware } = require("./middleware");
const router = express.Router();
/**
 *
 * @param {*} req
 * @param {*} res
 */

//get all bills of users
const getAllBillsOfUsers = async (req, res) => {
  const { Page = 1, PageSize = 5, search = "", startDate, endDate } = req.query;
  try {
    let userId = req.userId;
    let { data, count } = await getAllBills({
      userId,
      Page,
      PageSize,
      search,
      startDate,
      endDate,
    });
    res.send({ data, total: count });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .send({ message: "there is some error in getting all the bills" });
  }
};

//create bills
const createNewBillOfUser = async (req, res) => {
  const { title, amount, expense_date } = req.body;
  const user_id = req.userId;
  try {
    const posts = await createNewBill({ title, amount, expense_date, user_id });
    res.send({ posts });
  } catch (error) {
    res.status(404).send({ message: "error in creating a bill" });
    throw new Error("something went wrong in creating a bill");
  }
};

//delete a single bill of user
const deleteBillOfUser = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    await deleteBill({ _id: id }, body);
    res.status(200).send({ message: "bill deleted succesfully" });
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong in deleting the bill");
  }
};

//edit user bill
const editUserBill = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updatedBill = await updateBill({ id , body});
    res.send(updatedBill);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "error in updating" });
  }
};

//get  a single bill
const getBillById = async (req, res) => {
  const id = req.params.id;
  try {
    const singlebill = await getbyid(id);
    res.send(singlebill);
  } catch (error) {
    res.send("error");
  }
};

//get all expenses
router.get("/allbills", authMiddleware, getAllBillsOfUsers);
//create expenses
router.post("/createbills", authMiddleware, createNewBillOfUser);
//delete expenses
router.delete("/deletebill/:id", deleteBillOfUser);
//edit expenses
router.put("/editbill/:id", editUserBill);
//getby id
router.get("/billbyid/:id", getBillById);

module.exports = router;
