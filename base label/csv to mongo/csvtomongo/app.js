var express     = require('express');
var mongoose    = require('mongoose');
var multer      = require('multer');
var path        = require('path');
var csvModel    = require('./models/label');
var csv         = require('csvtojson');
// var bodyParser  = require('body-parser');
// var port=4000
// app.use(express.json());
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

var uploads = multer({storage:storage});

//connect to db
mongoose.connect('mongodb://localhost:27017/company')
.then(()=>console.log('connected to db'))
.catch((err)=>console.log(err))

//init app
var app = express();
app.use(express.json());
//set the template engine
app.set('view engine','ejs');

//fetch data from the request
// app.use(bodyParser.urlencoded({extended:false}));

//static folder
app.use(express.static(path.resolve(__dirname,'public')));
// const dirpath =path.join(__dirname,'/csvtomongo/public/uploads')
//default pageload
app.get('/',(req,res)=>{
    csvModel.find((err,data)=>{
         if(err){
            console.log(err);
         }else{
             
            res.render('demo');
              
         }
    });
});

var temp ;

app.post('/',uploads.single('csv'),(req,res)=>{
 //convert csvfile to jsonArray   
csv()
.fromFile(req.file.path)
.then((jsonObj)=>{
     csvModel.insertMany(jsonObj,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('http://localhost:4000');
            }
     });
   });
});

//assign port
var port = process.env.PORT || 8000;
app.listen(port,()=>console.log('server run at port '+port));