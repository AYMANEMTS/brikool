const express = require('express');
const app = express();
const port = process.env.PORT || 8000; // Use || for correct port assignment
const clientsRoutes = require('./routes/client.route');
const authRoutes = require('./routes/auth.route');
const categoryRoutes = require('./routes/category.route');
const jobRoutes = require('./routes/job.route');
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');
const upload = require('./multerConfig'); // Import upload from multerConfig
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
}));
app.use(cookieParser());

// Static folder for uploads
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/clients", clientsRoutes); // Make sure clientsRoutes uses upload
app.use("/", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/jobs", jobRoutes);

app.use(errorHandler);

// Database connection
mongoose.connect(process.env.MONGOOSE_SECRET_KEY)
    .then(() => console.log("Connected to DB"))
    .catch(() => console.log("Connection Failed"));

// Start server
app.listen(port, () => {
    console.log("Server is running on port " + port);
});
