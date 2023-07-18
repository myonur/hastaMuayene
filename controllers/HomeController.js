
const mysql = require('mysql2');
const querystring = require('querystring'); 
const dbcon = require('../db');

exports.getIndexPage = (req, res) => {
    res.status(200).render('index', { title: 'Uludağ Üniversitesi' });
};


exports.login = (req, res) => {
    const { userName, Password } = req.body;

    const query = querystring.stringify({
        "AramaKosulu": '1',
        "AranacakKelime": 'aaa'
    });

    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });
    if ((userName == 'onur' && Password == '2911')) {

        res.redirect('/hastaListesi');

    } else {

        console.log(req.body);
        res.write('Yanlış Kullanıcı Adı veya Şifre ');
        res.end();

    }

}

