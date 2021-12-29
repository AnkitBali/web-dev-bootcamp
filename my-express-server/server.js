const express = require("express");

const app = express();

app.get("/", function(req,res){
  res.send("hello world");
});

app.get("/contact", function(req,res){
  res.send("Contact me at : ankitbali2009@gmail.com");
});

app.get("/about", function(req,res){
  res.send("about me");
});

app.get("/hobbies", function(req,res){
  res.send("<ul><li>h1</li><li>h2</li></ul>");
});

app.listen(3000, function(){
  console.log("Server started on port 3000");

});
