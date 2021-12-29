const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing"); // you need to add dependency first. See tips.

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

client.setConfig({
  apiKey: "9b5139464ce12042303130cd395ed8be-us5",
  server: "us5",
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName, lastName, email);
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }

  const run = async () => {
    try {
      const response = await client.lists.addListMember("248ca69372", {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });
      console.log(response);
      res.sendFile(__dirname + "/success.html");
    } catch (err) {
      console.log(err.status);
      res.sendFile(__dirname + "/failure.html");
    }
  };

  run();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.");
});












// const express = require("express");
// const bodyParser = require("body-parser");
// const request = require("request");
// const https = require("https");
// const mailchimp = require("@mailchimp/mailchimp_marketing");
//
//
// const app = express();
//
// app.use(express.static("public"));
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.urlencoded({extended: true}));
//
//
// const addMembers = async () => {
//   const response = await mailchimp.lists.addListMember("248ca69372", {
//     email_address: "",
//     status: "subscribed",
//   });
//   console.log(response);
// };
//
// // addMembers();
//
//
// app.get("/", async(req, res, next)=>{
//   res.sendFile(__dirname + "/signup.html");
//   const response = await mailchimp.lists.getListMembersInfo("248ca69372");
//   console.log(response);
//   res.status(200).json(response);
// });
//
// mailchimp.setConfig({
// apiKey: "9b5139464ce12042303130cd395ed8be-us5",
// server: "us5"
// });
//
// app.post("/", async(req, res, next)=>{
// const firstName = req.body.fName;
// const lastName = req.body.lName;
// const email = req.body.email;
// // const {email, status} = req.body
//
// const response = await mailchimp.lists.addListMember("248ca69372", {
//   email_address: email,
//   status: "subscribed",
//   merge_fields: {
//     FNAME: firstName,
//     LNAME: lastName,[]
//   }
// });
// res.status(200).json(response);
//
// });
//
// app.listen(3000, ()=> console.log("Server is running on port 3000"));


// API Key
// 9b5139464ce12042303130cd395ed8be-us5

// List Id
// 248ca69372
