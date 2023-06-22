import cors from 'cors';
import express from 'express';
import rootRouter from './router/rootRouter.js';

const app = express();

app.use(express.json()) // middleware giúp BE đọc được cấu trúc JSON

app.use(cors()); // middleware chấp nhận cho tất cả domain FE truy cập vào BE này

app.listen(8080); // tạo server BE với port = 8080

app.use("/api", rootRouter)
