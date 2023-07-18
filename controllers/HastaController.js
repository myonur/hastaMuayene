
const path = require('path');
const dbcon = require('../db');
const crypt = require('../crypto');
const helpers = require('../helpers');




exports.hastaArama_get = (req, res) => {
    
    mesajCount = mesajCount + 1;
    if (mesajCount > 2) {
      mesaj = '';
      mesajCount =0;
    }
   
    
    
   
    dbcon.query('call hastaListesi(?, ?)', [req.query.kosul, req.query.aranan],  function (err, results) {
    
    if (err) throw err;

     results[0].forEach(items =>{       
      items.ID = crypt.encrypt(''+ items.ID + '').encryptedData; 
      items.iv = crypt.encrypt(''+ items.ID + '').iv;
    });
  res.status(200).render('hastalar', {results,  title : "Hasta Listesi"}); 
  
  });       
  
}




exports.hastaGuncelle_get = (req, res) => {
    mesaj='';
    let _ID = crypt.decrypt(req.params.ID, req.params.iv);
    
    //let sqlSorgusu = `select ID, AdSoyad, TcNo, Telefon, ProtokolNo, DATE_FORMAT(DogumTarihi, "%d/%m/%Y") as DogumTarihi , DogumYeri, email, Meslek, Cinsiyet  from hastalar where ID = ?`;
     
    dbcon.query('call hastaGetir(?)', [(_ID)], function (err, results) {
        if (err) throw err;        
        res.status(200).render('hastaGetir', {results, _id : req.params.ID, _iv : req.params.iv});            
    });        

}

exports.hastaGuncelle_post = (req,res) => {  
  
 mesajCount = mesajCount - 1;
  
  mesaj= 'Hasta Kaydı Güncellendi'; 
  
  

  const {ID,  AdSoyad_, Telefon_ , ProtokolNo_ , TcNo_ , Meslek_, Uyruk_ , DogumTarihi_, DogumYeri_, email_, Adres_, Cinsiyet_} = req.body;  
  let hastaID_ = crypt.decrypt(req.body._id, req.body._iv);

  
 
  var sql = dbcon.query('call HastaGuncelle(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)', [hastaID_,  AdSoyad_, Telefon_,  ProtokolNo_, TcNo_, Meslek_, Uyruk_,  helpers.convertDate(DogumTarihi_),  DogumYeri_, email_, Adres_, Cinsiyet_], function(err, result) { 
      if (err) throw err; 
      console.log(AdSoyad_ + ' isimli kayıt güncellendi' ); 
     
});


 // res.sendFile(path.join(__dirname, '../views/hasta/kaydedildi.html'));            
 return res.redirect(req.get('referer'));
 //return res.redirect('/hastaListesi');

}

exports.hastaEkle_get = (req,res) => {
    mesaj = '';
    res.status(200).render('hastaEkle', { title : "Hasta Bilgileri"});   
}

exports.hastaEkle_post = (req,res) => { 
        mesaj = 'Yeni Hasta Eklendi'; 

 
        const { AdSoyad_, Telefon_ , ProtokolNo_ , TcNo_ , Meslek_, Uyrugu_ , DogumTarihi_, DogumYeri_, email_, Adres_, Cinsiyet_} = req.body;
        

        var sql = dbcon.query('call HastaEkle(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [AdSoyad_, Telefon_,  ProtokolNo_, TcNo_, Meslek_, Uyrugu_,  helpers.convertDate(DogumTarihi_), DogumYeri_, email_, Adres_, Cinsiyet_], function(err, result) { 
            if (err) throw err; 
            console.log(AdSoyad_ + ' isimli yeni bir kayıt eklendi' ); 
      });

        res.sendFile(path.join(__dirname, '../views/hasta/kaydedildi.html'));            
}








