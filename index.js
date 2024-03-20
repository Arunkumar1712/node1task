const express = require('express');
const fs = require("fs");
const app = express();
const port =3000;


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port,()=>console.log("server started")) 
const currentDatetime = new Date();

// Format t

// Create the filename
// Format the date and time
const year = currentDatetime.getFullYear();
const month = String(currentDatetime.getMonth() + 1);
const day = String(currentDatetime.getDate()).padStart(2, '0');
let hours = currentDatetime.getHours();
const amPm =(hours >= 12 ? 'PM' : 'AM').padStart(2, '0');
hours = (hours % 12 || 12).toString().padStart(2, '0');; // Convert hours to 12-hour format
const minutes = String(currentDatetime.getMinutes()).padStart(2, '0');
const seconds = String(currentDatetime.getSeconds());
// Create the filename
const filename = `${year}-${month}-${day}-${hours}-${minutes}-${amPm}.txt`;
const data=`Curent Timestamp - ${hours}-${minutes}-${seconds}-${amPm}`
console.log(data);

app.get("/write",(req,res)=>{
    
    fs.writeFile(`./filesCreated/${filename}`,data,(err)=>{
        if (err) {
            console.log("Error Occurred", err);
          } else {
            console.log(`${filename}.txt Added`);
          }
          res.send(`${filename}.txt file added successfully`);
    })



})
app.get("/read", (req, res) => {
    fs.readdir(`./filesCreated`, (err, files) => {
      res.send(`All file names are ${files}`);
    });
  });

//   const filePath = `./filesCreated/2024-3-20-8-35-PM.txt`; // Replace this with the path to your file

// fs.unlink(filePath, (err) => {
//   if (err) {
//     console.error('Error deleting file:', err);
//     return;
//   }
//   console.log('File deleted successfully');
// });