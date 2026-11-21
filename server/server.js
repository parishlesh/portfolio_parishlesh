require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();

// Frontend URLs allowed to call this API: localhost plus CLIENT_URL
// (comma-separated, e.g. https://parishlesh.vercel.app).
const allowedOrigins = [
    "http://localhost:5173",
    ...(process.env.CLIENT_URL || "").split(",").map((s) => s.trim()).filter(Boolean),
];

app.use(cors({
    origin: allowedOrigins,
    methods: "GET, PUT, POST, DELETE, PATCH, HEAD",
    credentials: true,
}));
app.use(express.json());

// Make sure the database is connected before any route runs.
app.use(async (req, res, next) => {
    try {
        await connectDb();
        next();
    } catch (error) {
        next({ status: 503, message: "Database unavailable", extraDetails: error.message });
    }
});

app.get("/", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

// Run a normal server locally; on Vercel the exported app is used instead.
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    connectDb()
        .then(() => app.listen(PORT, () => console.log(` server is running at port : ${PORT}`)))
        .catch((error) => {
            console.error("connection failed:", error.message);
            process.exit(1);
        });
}

module.exports = app;
