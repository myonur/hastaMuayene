const express = require('express');

const HomeController = require('./controllers/HomeController');
const HastaController = require('./controllers/HastaController');
const RandevuController = require('./controllers/RandevuController');
const router = express.Router();


router.get('/', HomeController.getIndexPage);
router.get('/index', HomeController.getIndexPage);

router.post('/login', HomeController.login  );

router.get('/hastaListesi/', HastaController.hastaArama_get);


router.get('/hastaBilgileri/:ID&:iv', HastaController.hastaGuncelle_get);
router.post('/hastabilgileriKaydet/',  HastaController.hastaGuncelle_post);

router.get('/yeniHasta', HastaController.hastaEkle_get);
router.post('/yenihastaKaydet', HastaController.hastaEkle_post);

router.get('/hastaRandevulari/:ID&:iv', RandevuController.hastaninAldigiRandevular_get);

router.get('/hastaRandevusu/:ID&:iv', RandevuController.randevuGuncelle_get);
router.post('/randevuGuncelle/', RandevuController.randevuGuncelle_post);

router.get('/randevuEkle/:ID&:iv', RandevuController.randevuEkle_get);
router.post('/randevuKaydet', RandevuController.randevuEkle_post);


router.get('/randevular/', RandevuController.randevuListesi_get);
router.get('/dosyaEkle/:ID&:iv', RandevuController.dosyaEkle_get)

router.get('/geri/', RandevuController.geriDon_get);


module.exports = router;


