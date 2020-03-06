//jshint esversion:6

//MODULES
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const assert = require('assert')
const _ = require('lodash')

//DATA
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = []
const users =[]

//EXPRESS SERVER CONFIG
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started");
})

//DB CONFIG

mongoose.connect('mongodb+srv://admin:test123@cluster0-hu9qh.mongodb.net/users?retryWrites=true&w=majority'
, {useNewUrlParser: true, useUnifiedTopology: true}  )
//mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true, useUnifiedTopology: true}  )


const userSchema = {
  firstName: {
    type: String},
  lastName: String
}

const User = mongoose.model("User", userSchema)

// User.once('index', err => {assert.ifError(err);

// User.create({
//   firstName: 'Kristen',
//   lastName: 'Breslin'
// }, (err) => console.log(err))
// });


//ROUTES
app.get('/', (req, res)=> {

  User.find({}, (err, foundUsers) => {
        if(users.length !== 0){
          users
        } else{
          foundUsers.forEach(user => {
            users.push(user.firstName)
        })
      }
    }) 
    
  res.render('home', {
    homeStartingContent,
    posts,
    users
  }) })
  

  app.get('/about', (req, res)=> {
    res.render('about', {aboutContent}) })
  
  
  app.get('/contact', (req, res)=> {
    res.render('contact', {contactContent}) })
  
  app.get('/compose', (req, res)=> {
    res.render('compose') })

  app.post('/compose', (req, res) =>{
    post = {
      title: req.body.title,
      post: req.body.post
    }
    posts.push(post)
    res.redirect('/')
  })

  app.get('/posts/:id', (req,res) => {
    const title = _.lowerCase(req.params.id)
    posts.forEach(post => {
      if (_.lowerCase(post.title) === title) {
        res.render('post', {
          title,
          post: post.post
        })
      } else {
      }
    })  
})

