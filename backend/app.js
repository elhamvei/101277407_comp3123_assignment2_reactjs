const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./routes/UserRoutes")
const employeeRoutes = require("./routes/EmployeeRoutes")

const SERVER_PORT = 8081

const DB_URL = "mongodb+srv://elhamvei:elham142ev@cluster0.quqgho6.mongodb.net/Assignment-1?retryWrites=true&w=majority"
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json())
app.use(express.urlencoded())

app.use("/api/user/", userRoutes)
app.use("/api/emp/", employeeRoutes)

app.get('/', (req, res) => {
    res.send("<h1>Welcome - Assignment-I</h1>");
});


app.listen(SERVER_PORT, () => {
    console.log(`Server is listening at http://localhost:${SERVER_PORT}/`);
});
