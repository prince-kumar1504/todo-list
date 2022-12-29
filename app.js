const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js")


const app = express();

let items = ["Buy food", "cook","eat"];
let workitems =[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
    // res.send("hello");
    let day = date.getdate();
    res.render("list", {
        listTitle: day,
        newListItems: items
    });
});

app.post("/",(req,res)=>{
    let item=req.body.newItem; 
    
    if(req.body.list === "Work"){
       workitems.push(item);
       res.redirect("/work");
    }
    else
    {
    items.push(item);
    res.redirect("/"); 
    }
   
});

app.get("/work", (req,res)=>{
    res.render("list",{
        listTitle: "Work List",
        newListItems: workitems
    });
});


app.listen(3000, ()=>{
    console.log("server started on port 3000");
});