const express = require('express');
const fs = require("fs");
const app = express();
const port =3000;


app.get('/', function (req, res) {
  res.send('nodeJs file System')
})

app.listen(port,()=>console.log("server started")) 
const currentDatetime = new Date();




const year = currentDatetime.getFullYear();
const month = (currentDatetime.getMonth() + 1).toString();
const day = (currentDatetime.getDate()).padStart(2, '0').toString();
let hours = currentDatetime.getHours();
const amPm =(hours >= 12 ? 'PM' : 'AM').padStart(2, '0');
hours = (hours % 12 || 12).toString().padStart(2, '0');; // Convert hours to 12-hour format
const minutes = (currentDatetime.getMinutes()).toString().padStart(2, '0');
const seconds = String(currentDatetime.getSeconds());
// Create the filename
const filename = `${year}-${month}-${day}-${hours}-${minutes}-${amPm}.txt`;

// Create the Timestamp 
const data=`Curent Timestamp - ${hours}-${minutes}-${seconds}-${amPm}`
console.log(data);

app.get("/write",(req,res)=>{
    
    fs.writeFile(`./filesCreated/${filename}`,data,(err)=>{
        if (err) {
            console.log("Error Occurred", err);
          } else {
            console.log(`${filename}Added`);
          }
          res.send(`${filename}.txt file added successfully`);
    })



})
app.get("/read", (req, res) => {
    fs.readdir(`./filesCreated`, (err, files) => {
      res.send(`All file names are ${files}`);
    });
  });

