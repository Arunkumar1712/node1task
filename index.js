const express = require('express');
const fs = require("fs");
const app = express();
const port = 3000;

app.get('/', function (req, res) {
  res.send('nodeJs file System');
});

app.listen(port, () => console.log("Server started")); 

app.get("/createfile",(req,res)=>{
    const currentDatetime = new Date();

    // Format the date and time
    const year = currentDatetime.getFullYear();
    const month = (currentDatetime.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDatetime.getDate().toString().padStart(2, '0');
    let hours = currentDatetime.getHours();
    const amPm = (hours >= 12 ? 'PM' : 'AM');
    hours = (hours % 12 || 12).toString().padStart(2, '0'); // Convert hours to 12-hour format
    const minutes = currentDatetime.getMinutes().toString().padStart(2, '0');
    const seconds = currentDatetime.getSeconds().toString().padStart(2, '0');
    
    // Create the filename
    const filename = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}-${amPm}.txt`;

    // Create the Timestamp 
    const data = `Current Timestamp - ${hours}:${minutes}:${seconds} ${amPm}`;
    console.log(data);

    fs.writeFile(`./filesCreated/${filename}`, data, (err) => {
        if (err) {
            console.log("Error Occurred", err);
            res.send(`Error occurred while writing ${filename}`);
        } else {
            console.log(`${filename} added`);
            res.send(`${filename} file added successfully`); // Changed this line
        }
    });
});

app.get("/readfile", (req, res) => {
    fs.readdir(`./filesCreated`, (err, files) => {
      res.send(`All file names are ${files}`);
    });
});
