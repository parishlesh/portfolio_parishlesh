require("dotenv").config();

const express = require("express");
const app = express();
const authRoute= require("./router/auth-router")
const contactRoute = require("./router/contact-router")
const serviceRoute = require("./router/service-router")
const adminRoute = require("./router/admin-router")
const connectDb= require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:5173',
    method: "GET, PUT, POST, DELETE, PATCH, HEAD",
    Credential: true
  }

app.use(cors(corsOptions));
app.use(errorMiddleware)
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute)
app.use("/api/data", serviceRoute)

app.use("/api/admin", adminRoute)

const PORT= 5000;

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(` server is running at port : ${PORT}`);
    });
});

app.use(errorMiddleware)