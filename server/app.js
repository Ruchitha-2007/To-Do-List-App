const connectDB=require('./config/db');
const express= require('express')
const app=express();
const cors=require('cors');
const postRoute=require('./routes/postRoute');
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/authRoute')

connectDB();
const allowedOrigins = [
    'http://localhost:3000', // local dev
    'https://to-do-list-app-git-main-ruchithas-projects-1b72de52.vercel.app' // your Vercel frontend
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));



app.use(express.json());
app.use(cookieParser());

app.use('/auth',authRoute)
app.use('/posts',postRoute)
app.use('/',(req,res)=>{
    res.json({mesage:'Home page'})
})
module.exports=app;