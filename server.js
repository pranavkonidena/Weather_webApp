const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static("public"));
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.listen('5500' , () => {
    console.log("Listening on port 5500.");
})



app.use(express.urlencoded({
    extended:true
}));

app.use(bodyParser.urlencoded({
    extended: true
  }));


app.get('/' , (req,res) => {
    res.render('index' , {msg: ""});
})

app.post('/details' ,urlencodedParser, function(req,res){


    let x = req.body.city;
    getLoc();
        let latitude;
        let longitude;
        let json_res;
        async function getLoc(){

            try {
                let response = await fetch("http://api.openweathermap.org/geo/1.0/direct?q="+x+"&appid=18f9fe47c51e4e7643cf25b80daee710");
                const json = await response.json();
                latitude = json[0].lat;
                longitude = json[0].lon;

                
                
            } catch (error) {
                console.log("That was not a valid city name.");
                console.log(error);
                res.render('index' , {msg: "That wasn't a valid city name!"})
            }
            

            let resp = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&appid=18f9fe47c51e4e7643cf25b80daee710")
                json_res = await resp.json();
                console.log(json_res);

                res.render('weather' , {data: json_res});
            
        }   
        

    
    
})


app.post('/detailscl' , urlencodedParser, function (req,res) {
    console.log(req.body);
    details();
    async function details(){
        

        
        
    let resp = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+req.body.lat+"&lon="+req.body.lon+"&units=metric&appid=18f9fe47c51e4e7643cf25b80daee710")
                json_res = await resp.json();
                console.log(json_res);
                console.log((json_res.msg));
                
                    res.render('weather' , {data: json_res});
                
    }
            
   
} )

