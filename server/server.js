import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app=express();
const PORT=process.env.PORT || 5000;
const SECRET=process.env.JWT_SECRET || 'change-this-secret-before-deployment';
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const DB=path.join(__dirname,'data.json');
app.use(cors({origin:true}));
app.use(express.json());

function load(){try{return JSON.parse(fs.readFileSync(DB,'utf8'));}catch{return {users:[],orders:[]};}}
function save(data){fs.writeFileSync(DB,JSON.stringify(data,null,2));}
function tokenFor(user){return jwt.sign({id:user.id,email:user.email},SECRET,{expiresIn:'7d'});}
function auth(req,res,next){
 const header=req.headers.authorization||'';
 try{req.identity=jwt.verify(header.replace(/^Bearer\s+/i,''),SECRET);next();}
 catch{return res.status(401).json({message:'Please sign in to continue.'});}
}

app.get('/api/health',(req,res)=>res.json({status:'ok',message:'ELORA backend is running'}));
app.post('/api/auth/register',async(req,res)=>{
 const {name,email,password}=req.body||{};
 if(!name?.trim()||!email||!password||password.length<6)return res.status(400).json({message:'Enter your name, valid email and a password of at least 6 characters.'});
 const db=load(), normalized=email.trim().toLowerCase();
 if(db.users.some(u=>u.email===normalized))return res.status(409).json({message:'This email is already registered. Please sign in.'});
 const user={id:Date.now().toString(),name:name.trim(),email:normalized,passwordHash:await bcrypt.hash(password,10)};
 db.users.push(user);save(db);
 res.status(201).json({message:'Account created successfully! Please sign in.'});
});
app.post('/api/auth/login',async(req,res)=>{
 const {email,password}=req.body||{}, normalized=(email||'').trim().toLowerCase();
 const user=load().users.find(u=>u.email===normalized);
 if(!user||!await bcrypt.compare(password||'',user.passwordHash))return res.status(401).json({message:'Email or password is incorrect.'});
 res.json({message:'Login successful',token:tokenFor(user),user:{id:user.id,name:user.name,email:user.email}});
});
app.post('/api/auth/forgot-password',(req,res)=>{
 // A real reset flow requires an email provider and a one-time reset link.
 res.json({message:'If this email is registered, password reset instructions will be sent. Configure an email provider for real reset links.'});
});
app.get('/api/auth/me',auth,(req,res)=>{
 const user=load().users.find(u=>u.id===req.identity.id);
 if(!user)return res.status(404).json({message:'Account not found.'});
 res.json({user:{id:user.id,name:user.name,email:user.email}});
});
app.post('/api/orders',auth,(req,res)=>{
 const {items}=req.body||{};
 if(!Array.isArray(items)||!items.length)return res.status(400).json({message:'Your bag is empty.'});
 const db=load(), order={id:Date.now().toString(),userId:req.identity.id,items,createdAt:new Date().toISOString(),status:'pending'};
 db.orders.push(order);save(db);res.status(201).json({message:'Order saved. Payment is not connected in this demo.',orderId:order.id});
});
app.listen(PORT,()=>console.log(`ELORA backend running at http://localhost:${PORT}`));
