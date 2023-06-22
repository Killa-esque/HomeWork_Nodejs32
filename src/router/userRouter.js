import express from 'express';
import { getLikeListByResId, getLikeListByUserId, getOrderListByUserId, getRateByResId, getRateByUserId, handleLike, handleOrder, handleRate, handleUnlike } from '../controller/userController.js';

const userRouter = express.Router();


// Like
userRouter.post("/like", handleLike)
userRouter.post("/unlike", handleUnlike)
userRouter.get("/likes/res/:res_id", getLikeListByResId)
userRouter.get("/likes/user/:user_id", getLikeListByUserId)

// Rate
userRouter.post("/rate", handleRate)
userRouter.get("/ratings/restaurant/:res_id", getRateByResId)
userRouter.get("/ratings/user/:user_id", getRateByUserId)

// Order
userRouter.post("/order", handleOrder)
userRouter.get("/orders/user/:user_id", getOrderListByUserId)


export default userRouter;
