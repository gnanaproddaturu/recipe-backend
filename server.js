
const express = require("express")
const dotEnv = require("dotenv")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const cors = require("cors");

const app = express()
const PORT =8000
dotEnv.config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongoos connect successfuly")
})
.catch((error)=>{
    console.log("somthing wrong" , error.message)
})

// app.use(cors({
//     origin: "https://recipe-list-chi.vercel.app",
//     credentials: true
// }));

const allowedOrigins = [
    "http://localhost:5173",
    "https://recipe-list-chi.vercel.app"
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(express.json())
app.use("/user" , userRoutes)


app.listen(PORT, ()=>{
    console.log(`server run in ${PORT}`)
})