//jshint esversion : 6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = " et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
const contactContent = "khfedbwx jkcbe dvh rfrw edcbrlhw rfc fkvwc e ch clwef fcwff hw cwel clweq dchjded ";


const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/posts/:topic", function(req, res) {
  let titleName = _.lowerCase(req.params.topic);
  posts.forEach(function(post) {
    let titlename = _.lowerCase(post.title);
    if(titleName == titlename){
      // console.log("Match found!!");
      res.render("post", {Content:post.content, Title: post.title});
    }
  });
});

app.get("/", function(req, res) {
  res.render("home", {
    Content: homeStartingContent,
    Posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    Content: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    Content: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/", function(req, res) {

  let post = {
    title: req.body.postTitle,
    content: req.body.postText
  };

  posts.push(post);
  res.redirect("/");
});







app.listen("3000", function() {
  console.log("Server started");
});
