const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const XLSX = require("xlsx");

const app = express();

app.use(cors());
app.use(express.json());

/* MongoDB Connection */

mongoose.connect("mongodb://127.0.0.1:27017/certificates")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));


/* Certificate Schema */

const certificateSchema = new mongoose.Schema({

certificateId:String,
studentName:String,
domain:String,
startDate:String,
endDate:String

});

const Certificate = mongoose.model("Certificate",certificateSchema);


/* GET all certificates */

app.get("/api/certificates", async(req,res)=>{

try{

const data = await Certificate.find();

res.json(data);

}catch(err){

res.status(500).json(err);

}

});


/* GET certificate by ID (Student search) */

app.get("/api/certificate/:id", async(req,res)=>{

try{

const cert = await Certificate.findOne({
certificateId:req.params.id
});

if(!cert){
return res.status(404).json({
message:"Certificate not found"
});
}

res.json(cert);

}catch(err){

res.status(500).json(err);

}

});


/* ADD certificate manually */

app.post("/api/certificate", async(req,res)=>{

try{

const cert = new Certificate(req.body);

await cert.save();

res.json(cert);

}catch(err){

res.status(500).json(err);

}

});


/* UPDATE certificate */

app.put("/api/certificate/:id", async(req,res)=>{

try{

await Certificate.updateOne(
{certificateId:req.params.id},
{$set:req.body}
);

res.json({message:"Certificate updated"});

}catch(err){

res.status(500).json(err);

}

});


/* DELETE certificate */

app.delete("/api/certificate/:id", async(req,res)=>{

try{

await Certificate.deleteOne({
certificateId:req.params.id
});

res.json({message:"Certificate deleted"});

}catch(err){

res.status(500).json(err);

}

});


/* Upload Excel */

const storage = multer.memoryStorage();

const upload = multer({storage:storage});

app.post("/api/upload", upload.single("file"), async(req,res)=>{

try{

const workbook = XLSX.read(req.file.buffer);

const sheet = workbook.Sheets[workbook.SheetNames[0]];

const data = XLSX.utils.sheet_to_json(sheet);

await Certificate.insertMany(data);

res.json({
message:"Certificates uploaded successfully"
});

}catch(err){

res.status(500).json(err);

}

});


/* Start Server */

app.listen(5000,()=>{

console.log("Server running on port 5000");

});