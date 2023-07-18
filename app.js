/*
* Hasta Takip pprogramı
* 24.05.2023
*
*
*/

const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');

const fs = require('fs'); 


const crypt = require('./crypto.js');
const dbcon = require('./db.js');

const pageRoute = require('./routes.js');
const bodyParser = require('body-parser');


const app = express();
app.set('view engine', 'ejs');

app.set('views',  [path.join(__dirname, 'views'),path.join(__dirname, 'views/hasta')]);
//app.set('views',  [path.join(__dirname, 'views'),path.join(__dirname, 'views/layouts')]);
app.use(express.static('.'))
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

  
  
  app.use('/', pageRoute);
  app.use(fileUpload());

global.mesaj = '';
global.mesajCount = 0;





app.post("/upload", (req, res) => {
  mesaj ='Dosya Eklendi';
          const _ID = crypt.decrypt(req.body._id, req.body._iv);

          const { TetkikTuru_ } = req.body;  

          if (!req.files || Object.keys(req.files).length === 0) {
                      
            console.log('dosya Seçilmedi')  ;
          }
          
          const imageFile = req.files.file;
          const uploadPath = __dirname + "/dosyalar/" + imageFile.name;
          console.log(imageFile.name);
          

          imageFile.mv(uploadPath, function (err) {
            // Herhangi bir hata varsa hata mesajını yazdır.
            if (err) return res.status(500).send(err );
      
            var sql = dbcon.query('call DosyaEkle(?, ?, ?)', [imageFile.name, _ID,  TetkikTuru_ ], function(err, result) { 
              if (err) throw err; 
              console.log('Yeni Tetkik eklendi' );      
            });
            // Dosya başarı ile yüklendi
            res.redirect(req.get('referer'))
          });
});


app.get('/oku', function (req, res) {
  var filePath = "/dosyalar/mutalaa.pdf";

  fs.readFile(__dirname + filePath , function (err,data){
      res.contentType("application/pdf");
      res.send(data);
  });
});




const port = 8080;
app.listen(port, () =>

    console.log(` ${port} numaralı port üzerinden uygulama başlatıldı `))