import express from "express";
import sequelize from "./config/database.js";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import notfoundMiddleware from "./middleware/notfoundMiddleware.js";
import errorHandlerMiddleware from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import setAssociations from "./models/associations.js";

//Facilitate
const app = express();

// Middleware
app.use(cors()); // เปิดใช้งาน CORS
app.use(express.json());
app.use(helmet()); //เพิ่มความปลอดภัย โดยตั้งค่า Header ที่รับให้เหมาะสม เช่นบังคับให้ HTTPS
app.use(express.urlencoded({ extended: true })); //แปลงข้อมูลที่ซับซ้อนกว่าได้ เช่น array object ที่ซ็อนกัน
app.use(morgan("dev"));
app.set("trust proxy", 1); //ใช้เหมือน helmet และช่วยให้ Express สามารถใช้ข้อมูลที่มาจากพร็อกซีเพื่อการจัดการคำขออย่างถูกต้อง เช่น การบันทึก IP address ของผู้ใช้จริง
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Sync database and create tables if they don't exist **ทีเด็ดเลยใช้คล้ายๆ compassMongoDB
sequelize.sync({ force: false }).then(() => {
	console.log("Connected PostgreSQL ✅");
});

// ตั้งค่าความสัมพันธ์ระหว่างโมเดล
setAssociations();

// > Static Files
app.use(express.static("public"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

//Handle404
app.use(notfoundMiddleware);
//Handle Error
app.use(errorHandlerMiddleware);

export default app;
