import express from 'express';
import { sql } from '../config/db.js';
import { createTransaction,deleteTransaction,getTransactionsByUserId, getTransactionSummary } from '../controllers/transactionController.js';

const router = express.Router();

router.get("/:userId",getTransactionsByUserId);
router.post("/",createTransaction);
router.delete("/:id",deleteTransaction);
router.get("/summary/:userId",getTransactionSummary);

export default router;