import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { z } from "zod";
dotenv.config();

const app = express();
app.use(helmet());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://riyadvi-software-revamp.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(cors({
  origin: allowedOrigins
}));app.use(express.json());

const Lead = mongoose.model("Lead", new mongoose.Schema({
  type:{type:String,required:true},
  name:String,email:String,phone:String,company:String,position:String,message:String,
  payload:Object,createdAt:{type:Date,default:Date.now}
}));

const base = z.object({name:z.string().min(2),email:z.string().email()}).passthrough();

app.get("/api/health",(req,res)=>res.json({ok:true,service:"riyadvi-api"}));

app.post("/api/contact", async (req,res)=>saveLead("contact",req,res));
app.post("/api/consultation", async (req,res)=>saveLead("consultation",req,res));
app.post("/api/health-checkup", async (req,res)=>saveLead("health-checkup",req,res));
app.post("/api/lead-magnet", async (req,res)=>saveLead("lead-magnet",req,res));
app.post("/api/applications", async (req,res)=>saveLead("application",req,res));

async function saveLead(type,req,res){
  const parsed=base.safeParse(req.body);
  if(!parsed.success) return res.status(400).json({ok:false,error:"Name and valid email are required."});
  try{
    const doc=await Lead.create({type,...req.body,payload:req.body});
    res.status(201).json({ok:true,id:doc._id,message:"Submission received."});
  }catch(err){res.status(500).json({ok:false,error:"Database unavailable. Check MONGODB_URI."});}
}

const port=process.env.PORT || 5000;
if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI).then(()=>app.listen(port,()=>console.log(`API running on http://localhost:${port}`))).catch(err=>{console.error("MongoDB connection failed:",err.message);app.listen(port,()=>console.log(`API running without DB on http://localhost:${port}`));});
}else{
  app.listen(port,()=>console.log(`API running on http://localhost:${port} (no database configured)`));
}