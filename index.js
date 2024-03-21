const express = require('express');
const fs = require("fs");
const app = express();
const port = 3000;

app.get('/', function (req, res) {
    res.send(`
     
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
          }
  
          .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
            text-align: center;
            color: #333;
          }
  
          h4 {
            margin-bottom: 10px;
            color: #666;
          }
  
          p {
            color: #444;
          }
  
          a {
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
          }
  
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to the NodeJS File System Creator</h1>
          <p>This application allows you to create and manage files on the server.</p>
          <h4>To create a new file - click <a href="/createfile">here</a>.</h4>
          <h4>To view existing files - click <a href="/readfile">here</a>.</h4>
        </div>
      </body>
      
    `);
  });
  

app.listen(port, () => console.log("Server started")); 

app.get("/createfile",(req,res)=>{

    let currentTime = new Date();
    let year = currentTime.getFullYear();
    let month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
    let day = currentTime.getDate().toString().padStart(2, "0");
    let hours = currentTime.getHours();
    let period = hours >= 12 ? "PM" : "AM";
    hours = (hours % 12).toString().padStart(2, "0");
    let minutes = currentTime.getMinutes().toString().padStart(2, "0");
    let seconds = currentTime.getSeconds().toString().padStart(2, "0");
    let currentTimeStamp = `${hours}:${minutes}:${seconds} ${period}`;
    // Create the filename
    let fileName = `${day}-${month}-${year}-${hours}-${minutes}-${seconds}-${period}.txt`;
    const fileContent =  `current TimeStamp - ${currentTimeStamp.toString()}`
    
     fs.writeFile(`./filesCreated/${fileName}`, fileContent, (err) => {
        if (err) {
            console.log("Error Occurred", err);
            res.send(`Error occurred while writing ${fileName}`);
        } else {
            console.log(`${fileName} added`);
            res.send(`
            <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f0f0f0;
            }
            .container {
                max-width: 600px;
                margin: 50px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                text-align: center;
                color: #333;
            }
            p {
                color: #444;
                margin-left: 20px;
            }
        </style>
        <div class="container">
            <h1>File Created Successfully</h1>
            <p>The file <strong>${fileName}</strong> has been created.</p>
        </div>`); 

        }
    });
});

app.get("/readfile", (req, res) => {
    fs.readdir(`./filesCreated`, (err, files) => {
        if (err) {
            console.error("Error occurred while reading files:", err);
            res.status(500).send("Failed to read files. Please try again later❌.");
            return;
          }
          const fileslist =files.map((file)=>`<ul><li>📝${file}</ul></li>`).join("")
      res.send(` <style>
      body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f0f0f0;
      }
      .container {
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
     
      p {
          color: #444;
          margin-left: 20px;
      }
      h3 {
        margin-bottom: 10px;
        color: #666;
      }
  </style>
  <div class="container">
      <h3>created files:</h3>
      <p>List of files:<strong>${fileslist}</strong> </p>
  </div>`);
    });
});
app.get('/*', (req, res) => {
    res.status(404).send(`<h1 style=text-align:center> 404 Page not found </h1><img src="https://c.tenor.com/IHdlTRsmcS4AAAAC/tenor.gif"/>`);
  });