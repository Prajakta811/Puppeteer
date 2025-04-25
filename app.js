import express from "express";
import dotenv from "dotenv";
import {puppeteerScrapper} from "./utility/puppeteer.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5011;

app.get('/github-user/:username',async(req,res)=>{
    const{username}=req.params;
    try {
        const data=await puppeteerScrapper(username)
        res.json(data)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.listen(port, () => {
  console.log(`Server is running on port 
http://localhost:5011/github-user/gaearon`);
})