const express = require('express');
const fs = require("fs");
const app = express();
const port = 3000;

app.get('/', function (req, res) {
  res.send('<div style=textalign:center><h1>Welcome to NodeJs file System Creator</h1><h1>For creating file add "/createfile"</h1><h1>For reading file add "/readfile"</h1></div>');
});

app.listen(port, () => console.log("Server started")); 

app.get("/createfile",(req,res)=>{
    const currentDatetime = new Date();

    // Format the date and time in UTC
    const year = currentDatetime.getUTCFullYear();
    const month = (currentDatetime.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = currentDatetime.getUTCDate().toString().padStart(2, '0');
    let hours = currentDatetime.getUTCHours();
    const amPm = (hours >= 12 ? 'PM' : 'AM');
    hours = (hours % 12 || 12).toString().padStart(2, '0'); // Convert hours to 12-hour format
    const minutes = currentDatetime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = currentDatetime.getUTCSeconds().toString().padStart(2, '0');
    
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
      res.send(`<div style=txt-align:left><h1 style=txt-align:left;margin-left:20px>File names are:</h1> <h2>${files}</h2></div>`);
    });
});
app.get('/*', (req, res) => {
    res.status(404).send(`<h1 style=text-align:center> 404 Page not found </h1><img src="https://c.tenor.com/IHdlTRsmcS4AAAAC/tenor.gif"/>`);
  });