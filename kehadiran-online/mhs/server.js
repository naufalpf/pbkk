
var ejs    = require("ejs"),
    express = require("express"),
    bodyParser = require("body-parser"),
    mongoose    = require("mongoose"),
    mongoXlsx    = require('mongo-xlsx'),
    MongoClient   = require('mongodb').MongoClient;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/absensi");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));


var userSchema = new mongoose.Schema ({
	name:String,
	nrp:String,
	inTime:String,
	outTime:String,
	kelas: String
});
var users = mongoose.model("kehadiran" , userSchema);

app.get("/spreadsheet" , (req,res) => {   
    MongoClient.connect("mongodb://localhost/absensi", (err, db)=>{
        db.collection('users', function (err, collection) {
            collection.find().toArray(function(err, items) {
                if(err) throw err;            
                var model = mongoXlsx.buildDynamicModel(items);
                mongoXlsx.mongoData2Xlsx(items, model, function(err, data) {
                  console.log('File saved at:', data.fullPath); 
                  res.render("new",{error:"Excel generated sucessfully in the name : " + data.fullPath})
                });
            })
        })
    })
});

app.get("/",(req,res)=>{
    res.render("new");
})
app.post("/" , (req , res) =>{
	 var Users = new users({
		 name : req.body.name,
	 	    nrp : req.body.nrp,
			kelas : req.body.kelas,
	 		inTime : req.body.inTime,
	 		outTime : req.body.outTime
	 		
	 })
	 Users.save().then((doc)=>{
		 console.log(doc)
		 res.render("new",{error:"Attendance marked sucessfully"});
	 },(err)=>{
		 console.log("Error: ",err);
	 })
})



app.listen(3000 , () =>{
	console.log("started");
console.log("3000");
})
