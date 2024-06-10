const express= require("express")
const mongoose=require("mongoose")
const multer = require("multer")
const winston = require('winston');
const cron = require("node-cron")
const fs = require("fs")
const path = require("path")
const {userModel}=require("./model/userSchema")
const app = express()


const upload=multer({
    dest:'uploads/'
})


app.use(express.json())


const logDir="logs";

if(!fs.existsSync(logDir)){
    fs.mkdirSync(logDir);
}


//use the logger winston

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
    

      new winston.transports.File({ filename:path.join(logDir,'app.log') }),
    
    ],
  });


  //upload the file
  app.post('/upload', upload.single('file'), async (req, res)=>{


     try{
     
    const filepath = req.file.path;
    const fileContents=fs.readFileSync(filepath);
    const data = JSON.parse(fileContents)


    let newEntries=0;

    for(const item of data){
        
        const existuser = await userModel.findOne({id:item.id})

        if(!existuser){
            await userModel.create(item)
            newEntries+=1;
        }
    }

    logger.info(`uploaded ${req.file.filename} with ${newEntries} new entries`)

    res.json({
        filename:req.file.filename,
        new_entries:newEntries
    })
     

     }

     catch(error){

      logger.error(`Error uploading file ${error.message}`)
       
      res.status(500).json({error:"Internal Serve error"})

     }





  })


app.get("/logs",(req,res)=>{


const level = req.query.level||"info";

const logfilepath=path.join(logDir,'app.log')


fs.readFile(logfilepath,'utf-8',(err,data)=>{
    if(err){
        res.status(500).json({error:"you are not able read the file"})
    }


const loglines = data.split("\n").filter(line=>line.includes(`"level":${level}`))

res.json(loglines.map(line=>JSON.parse(line)))



})
})


//schedule the task

cron.schedule('0 0,12 * * *',async()=>{


    logger.info('scheduled task execute')

})




app.listen(3030,async()=>{
    try{
       await mongoose.connect("mongodb://localhost:27017/logger-dashboard")
        console.log("connected to db")
        console.log("sever is running port at 3030")
    }
    catch(err){
        console.log(err)
    }
})

