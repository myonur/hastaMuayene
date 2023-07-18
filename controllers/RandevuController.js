const path = require('path');
const dbcon = require('../db');
const crypt = require('../crypto');
const helpers = require('../helpers');
const fileUpload = require('express-fileupload');

exports.hastaninAldigiRandevular_get = (req, res) => {
  mesajCount = mesajCount + 1;
  if (mesajCount >= 2) {
    mesaj = '';
    mesajCount = 0;
  }

  let _hastaID = crypt.decrypt(req.params.ID, req.params.iv);
  let _HastaBilgileri = [];
  let hastaDosyalari = [];
  let RandevuSaatleri_ = [];

  dbcon.query('call hastaGetir(?)', [_hastaID], function (err, results) {
    if (err) throw err;
    _HastaBilgileri = results[0];
  });

  dbcon.query('call hastaninDosyalari(?)', [_hastaID], function (err, results) {
    if (err) throw err;
    hastaDosyalari = results[0];
  });

  dbcon.query(
    'call HastaninAldigiRandevular(?)',
    [_hastaID],
    function (err, results) {
      //console.log(_HastaBilgileri);
      if (err) throw err;
      results[0].forEach((items) => {
        items.ID = crypt.encrypt('' + items.ID + '').encryptedData;
        items.iv = crypt.encrypt('' + items.ID + '').iv;
      });

      res.status(200).render('hastaninRandevulari', {
        RandevuSaatleri_,
        hastaDosyalari,
        _HastaBilgileri,
        results,
        title: 'Randevu Listesi',
        _id: req.params.ID,
        _iv: req.params.iv,
      });
    }
  );
};

exports.randevuGuncelle_get = (req, res) => {
  mesaj = '';
  let _ID = crypt.decrypt(req.params.ID, req.params.iv);

  let RandevuSaatleri_ = [];
  let RandevuTurleri_ = [
    { id: 1, RandevuTuru: 'Muayene (Eski)' },
    { id: 2, RandevuTuru: 'Muayene (Yeni)' },
    { id: 3, RandevuTuru: 'Kontrol Randevusu' },
  ];
  let Onay_ = [
    { id: 1, Onay: 'Onaylandı' },
    { id: 2, Onay: 'İptal' },
  ];
  let Tetkik_ = [
    { id: 1, Tetkik: 'İstenmedi' },
    { id: 2, Tetkik: 'İstendi' },
  ];

  dbcon.query('call RandevuSaatleri()', function (err, results) {
    if (err) throw err;

    RandevuSaatleri_ = results[0];
  });

  dbcon.query('call TetkikAdlari()', function (err, results) {
    if (err) throw err;
    TetkikAdlari_ = results[0];
  });

  dbcon.query('call RandevuGetir(?)', [_ID], function (err, results) {
    if (err) throw err;
    res.status(200).render('randevuGetir', {
      Tetkik_,
      Onay_,
      RandevuTurleri_,
      RandevuSaatleri_,
      results,
      _id: req.params.ID,
      _iv: req.params.iv,
    });
  });
};

exports.randevuGuncelle_post = (req, res) => {
  mesaj = 'Randevu Güncellendi';
  mesajCount = mesajCount - 1;

  const {
    ID,
    RandevuTarihi_,
    RandevuSaati_,
    RandevuTuru_,
    Onay_,
    Tetkik_,
    Aciklama_,
  } = req.body;

  let _ID = crypt.decrypt(req.body._id, req.body._iv);

  console.log(helpers.convertDate(RandevuTarihi_));

  var sql = dbcon.query(
    'call RandevuGuncelle2(?, ?, ?, ?, ?, ?, ?)',
    [
      _ID,
      helpers.convertDate(RandevuTarihi_),
      RandevuSaati_,
      RandevuTuru_,
      Onay_,
      Tetkik_,
      Aciklama_,
    ],
    function (err, result) {
      if (err) throw err;
    }
  );

  // res.sendFile(path.join(__dirname, '../views/hasta/kaydedildi.html'));
  //mesaj = 'Randevu Güncellendi';

  return res.redirect(req.get('referer'));
};

exports.randevuEkle_get = (req, res) => {
  mesaj = '';
  let hastaID_ = crypt.decrypt(req.params.ID, req.params.iv);

  let gununTarihi = helpers.gununTarihi();

  let RandevuSaatleri_ = [];
  let RandevuTurleri_ = [
    { id: 1, RandevuTuru: 'Muayene (Eski)' },
    { id: 2, RandevuTuru: 'Muayene (Yeni)' },
    { id: 3, RandevuTuru: 'Kontrol Randevusu' },
  ];
  let Onay_ = [
    { id: 1, Onay: 'Onaylandı' },
    { id: 2, Onay: 'İptal' },
  ];
  let Tetkik_ = [
    { id: 1, Tetkik: 'İstenmedi' },
    { id: 2, Tetkik: 'İstendi' },
  ];

  dbcon.query('call RandevuSaatleri()', function (err, results) {
    if (err) throw err;
    RandevuSaatleri_ = results[0];
    res.status(200).render('randevuEkle', {
      gununTarihi,
      Tetkik_,
      RandevuSaatleri_,
      RandevuTurleri_,
      Onay_,
      title: 'Yeni Randevu',
      _id: req.params.ID,
      _iv: req.params.iv,
    });
  });
};

exports.randevuEkle_post = (req, res) => {
  mesaj = 'Yeni Randevu Eklendi';

  const {
    ID,
    RandevuTarihi_,
    RandevuSaati_,
    RandevuTuru_,
    Onay_,
    Tetkik_,
    Aciklama_,
  } = req.body;
  let _ID = crypt.decrypt(req.body._id, req.body._iv);

  var sql = dbcon.query(
    'call RandevuEkle2(?, ?, ?, ?, ?, ?, ?)',
    [
      _ID,
      helpers.convertDate(RandevuTarihi_),
      RandevuSaati_,
      RandevuTuru_,
      Onay_,
      Tetkik_,
      Aciklama_,
    ],
    function (err, result) {
      if (err) throw err;
      console.log('Randevu Kaydı eklendi');
    }
  );

  mesaj = 'Yeni Randevu Eklendi';
  res.redirect(req.get('referer'));
};

exports.randevuListesi_get = (req, res) => {
  mesaj = '';
  dbcon.query('call RandevuListesi()', function (err, results) {
    if (err) throw err;
    results[0].forEach((items) => {
      items.Id = crypt.encrypt('' + items.Id + '').encryptedData;
      items.iv = crypt.encrypt('' + items.Id + '').iv;
    });

    res
      .status(200)
      .render('randevuListesi', { results, title: 'Randevu Listesi' });
  });
};

exports.dosyaEkle_get = (req, res) => {
  mesaj = '';
  let hastaID_ = crypt.decrypt(req.params.ID, req.params.iv);

  let gununTarihi = helpers.gununTarihi();

  dbcon.query('call TetkikAdlari()', function (err, results) {
    if (err) throw err;
    TetkikTuru_ = results[0];
    //res.status(200).render(  'randevuEkle', {gununTarihi, Tetkik_, RandevuSaatleri_ , RandevuTurleri_, Onay_ , title : "Yeni Randevu", _id : req.params.ID, _iv : req.params.iv});

    res.status(200).render('dosyaEkle', {
      gununTarihi,
      TetkikTuru_,
      title: 'Randevu Listesi',
      _id: req.params.ID,
      _iv: req.params.iv,
    });
  });
};

exports.geriDon_get = (req, res) => {
  mesaj = '';
  res.redirect('/hastaListesi');
};
