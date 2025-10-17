const express = require('express');
const app = express();
const path = require('path');
const fs=require('fs')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));// all the static files will be in the public file 
app.set('view engine', 'ejs');


app.get("/",function(req,res){
    fs.readdir(`./files`,function(err,files){  // read the files 
    
        res.render("index",{files:files});
    })
    

});


app.get("/file/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render('show',{filename:req.params.filename,filedata:filedata});
    })
    

});


app.get("/edit/:filename",function(req,res){  //This GET route is used to show the edit page for a specific file. It loads the page and gives it the filename from the URL so the user can edit it.
   res.render('edit',{filename:req.params.filename});//"Render" means generating a response (HTML, JSON, etc.) on the server side and sending it back to the client.

});


app.post('/edit',function(req,res){  //A POST /edit/:filename route is used to receive updated data (like edited file content) and process or save it on the server.
  fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
    res.redirect("/");
  })

});



app.post("/create",function(req,res){
   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details, function(err){  //write in the files
res.redirect("/")
   });

});


app.get("/profile/:username",function(req,res){ 
    // dynamic routing - we have placed a ':' after profile so after profile we can name anything .this part has become dynamic(variable)

    res.send(`welcome,${req.params.username}`); //when we type harsh in the frontend browser --> go to backend username--> then this backend send output to frontend as welcome harsh

});



app.get("/author/:username/:age",function(req,res){ 
    

    res.send(`welcome,${req.params.username} of age ${req.params.age})`);   

});


app.get("/delete/:filename", function (req, res) {
  fs.unlink(`./files/${req.params.filename}`, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting file");
    }
    res.redirect("/");
  });
});


app.listen(3000);