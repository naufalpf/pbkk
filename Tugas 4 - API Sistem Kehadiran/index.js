var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var validator = require('validator');
var timestamp = require('time-stamp');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8000;

var mysql = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'tugas5pbkk'
});

app.get('/', function(req,res){
  console.log(timestamp('YYYY-MM-DD HH:mm:ss'));
  res.send(" API PBKK - Kelompok 5 - Naufal - Akram - Hilmi ");
});

app.post('/tambahmatkul', function (req, res) {
  if(req.body.nama == null || req.body.semester == null || req.body.kelas == null || req.body.kode_matkul == null){
    res.send({status : "gagal", pesan : "data ada yang tidak lengkap", isi_data : req.body });
  }
  else if(validator.isEmpty(req.body.nama) || 
    validator.isEmpty(req.body.semester) || 
    validator.isEmpty(req.body.kelas) ||
    validator.isEmpty(req.body.kode_matkul)){
      res.send({status : "gagal", pesan : "data ada yang tidak lengkap", isi_data : req.body });
  }
  else{
    con.connect(function(err) {
      con.query("SELECT * FROM matakuliah where kode_matkul = '"+req.body.kode_matkul+"'", function (err, result) {
        console.log("====");
        console.log(result);
        console.log("====");
        if(result.length > 0){
          res.send({status : "gagal", pesan : "kode matakuliah telah terdaftar", isi_data : req.body });      
        }
        else{
          var sql = "INSERT INTO matakuliah (nama, jumlah_pertemuan, semester, kelas, kode_matkul) VALUES ?";
          var values = [
            [req.body.nama, 16, req.body.semester, req.body.kelas, req.body.kode_matkul]
          ];
          con.query(sql, [values], function (err, result) {
            console.log("data mata kuliah berhasil masuk");
          });
          res.send({status : "sukses", pesan : "data mata kuliah berhasil masuk", isi_data : req.body });
        }
      });
    });
  }
});

app.post('/tambahjadwal', function (req, res) {
  if(req.body.pertemuan == null || req.body.jam_mulai == null || req.body.jam_selesai == null || req.body.ruangan == null || req.body.kode_matkul == null){
    res.send({status : "gagal", pesan : "data ada yang tidak lengkap", isi_data : req.body });
  }
  else if(validator.isEmpty(req.body.pertemuan) || 
    validator.isEmpty(req.body.jam_mulai) || 
    validator.isEmpty(req.body.jam_selesai) ||
    validator.isEmpty(req.body.ruangan) ||
    validator.isEmpty(req.body.kode_matkul)
  ){
    res.send({status : "gagal", pesan : "data ada yang tidak lengkap", isi_data : req.body });
  }
  else{
    con.connect(function(err) {
      console.log("Connected!");
      var sql = "INSERT INTO  pertemuan_matakuliah (pertemuan, jam_mulai, jam_selesai, ruangan, matakuliah_id) VALUES ("+req.body.pertemuan+",'"+req.body.jam_mulai+"','"+req.body.jam_selesai+"','"+req.body.ruangan+"',"+"(SELECT id FROM matakuliah where kode_matkul = '"+req.body.kode_matkul+"')"+");";
      // console.log(sql);
      con.query(sql, function (err, result) {
        console.log("data jadwal berhasil masuk");
      });
    });
    res.send({status : "sukses", pesan : "data jadwal berhasil masuk", isi_data : req.body });
  }
});


app.post('/tambahmahasiswa', function (req, res) {
  if(req.body.nama == null || req.body.nrp == null || req.body.password == null){
    res.send({status : "gagal", pesan : "data ada yang tidak lengkap ", isi_data : req.body });
  }
  else if(validator.isEmpty(req.body.nama) || validator.isEmpty(req.body.nrp) || validator.isEmpty(req.body.password)){
    res.send({status : "gagal", pesan : "data ada yang tidak lengkap ", isi_data : req.body });
  }
  else{
    con.connect(function(err){
      var sql_cek = "SELECT * FROM mahasiswa where nrp='"+req.body.nrp+"'";
      con.query(sql_cek, function (err, result) {
        console.log(result);
        if(result.length > 0){
          res.send({status : "gagal", pesan : "nrp telah terdaftar", isi_data : req.body });
        }
        else{
          var sql = "INSERT INTO mahasiswa (nrp, nama, password) VALUES ('"+req.body.nrp+"', '"+req.body.nama+"', '"+req.body.password+"');";
          con.query(sql, function (err, result) {
            console.log("data mahasiswa berhasil masuk");
            res.send({status : "sukses", pesan : "data mahasiswa berhasil masuk", isi_data : req.body });
          });
        }
      });    
    });
  }
});

app.post('/tambahpesertakelas', function(req,res){
  if(req.body.nrp == null || req.body.kode_matkul == null){
    res.send({status : "gagal", pesan : "data ada yang tidak lengkap", isi_data : req.body });
  }
  else if(validator.isEmpty(req.body.nrp) || validator.isEmpty(req.body.kode_matkul)){
    res.send({status : "gagal", pesan : "data ada yang tidak lengkap", isi_data : req.body });
  }
  else{
    con.connect(function(err) {
      console.log("Connected!");
      con.query("SELECT * FROM matakuliah where kode_matkul ='"+req.body.kode_matkul+"'", function (error, results, fields) {
        if(results.length == 0){
          res.send({status : "gagal", pesan : "matkul tidak terdaftar", isi_data : req.body });
        }
        else{
          con.query("SELECT * FROM mahasiswa WHERE nrp ="+req.body.nrp, function(error, results, fields){
            if(results.length == 0){
              res.send({status : "gagal", pesan : "nrp tidak terdaftar", isi_data : req.body });
            }
            else{
              var cek_sql = "SELECT * FROM ambil_matakuliah WHERE matakuliah_id = (SELECT id FROM matakuliah where kode_matkul = '"+req.body.kode_matkul+"') AND mahasiswa_id = (SELECT id FROM mahasiswa WHERE nrp = "+req.body.nrp+");";
              con.query(cek_sql, function (error, results, fields) {
                if (error) throw error;
                console.log(results)
                if(results.length > 0){
                  res.send({status : "gagal", pesan: "mahasiswa telah mendaftar matakuliah ini", isi_data : req.body});
                }
                else{
                  var sql = "INSERT INTO ambil_matakuliah(matakuliah_id,mahasiswa_id) VALUES ((SELECT id FROM matakuliah WHERE kode_matkul = '"+req.body.kode_matkul+"'),(SELECT id FROM mahasiswa WHERE nrp = "+req.body.nrp+"))";
                  console.log(sql);
                  con.query(sql, function (error, results, fields) {
                    if (error) throw error;
                    console.log("data berhasil masuk");
                    res.send({status : "sukses", pesan : "berhasil registrasi mahasiswa ke kelas", isi_data : req.body });  
                  });
                }
              });
            }
          });
        }
      });
    });
  }
});

app.post('/absen', function (req, res) {
  if(req.body.nrp == null || req.body.ruangan == null){
    res.send({status : "gagal", pesan : "data ada yang tidak lengkap", isi_data : req.body });
  }
  else if(validator.isEmpty(req.body.nrp) || validator.isEmpty(req.body.ruangan)){
    res.send({status : "gagal", pesan : "data ada yang tidak lengkap", isi_data : req.body });
  }
  else{
    con.connect(function(err) {
      console.log("Connected!");
      con.query("SELECT * FROM mahasiswa where NRP ="+req.body.nrp, function(error, results, fields){
        if(results.length == 0){
          res.send({status : "gagal", pesan : "nrp tidak terdaftar", isi_data : req.body });
        }
        else{
          var query_check = "SELECT matakuliah_id FROM pertemuan_matakuliah WHERE ruangan = '"+req.body.ruangan+"' AND jam_mulai <= '"+timestamp('YYYY-MM-DD HH:mm:ss')+"' AND jam_selesai >= '"+timestamp('YYYY-MM-DD HH:mm:ss')+"';";
          con.query(query_check, function(error, results_matakuliahid, fields){
            if(results_matakuliahid.length == 0){
              res.send({status : "gagal", pesan : "tidak ada matakuliah yang terdaftar", isi_data : req.body });
            }
            else{
              var query_cek_absen = "SELECT * FROM absensi WHERE mahasiswa_id=(SELECT id FROM mahasiswa where NRP='"+req.body.nrp+"') AND pertemuan_matakuliah_id=(SELECT id FROM pertemuan_matakuliah WHERE ruangan = '"+req.body.ruangan+"' AND jam_mulai <= '"+timestamp('YYYY-MM-DD HH:mm:ss')+"' AND jam_selesai >= '"+timestamp('YYYY-MM-DD HH:mm:ss')+"');";
              con.query(query_cek_absen, function(error, results, fields){
                if(results.length > 0){
                  res.send({status : "gagal", pesan : "peserta telah absen", isi_data : req.body });
                }
                else{
                  var query = "INSERT INTO absensi(mahasiswa_id, tanggal_waktu, pertemuan_matakuliah_id) VALUES((SELECT id FROM mahasiswa where NRP='"+req.body.nrp+"'),'"+timestamp('YYYY-MM-DD HH:mm:ss')+"',(SELECT id FROM pertemuan_matakuliah WHERE ruangan = '"+req.body.ruangan+"' AND jam_mulai <= '"+timestamp('YYYY-MM-DD HH:mm:ss')+"' AND jam_selesai >= '"+timestamp('YYYY-MM-DD HH:mm:ss')+"'));";
                  con.query(query, function(error, results, fields){
                    if(error) console.log(error);
                    res.send({status : "berhasil", pesan : "absen berhasil", isi_data : req.body });
                  });
                }
              });
            }
          });
        }
      });
    });
  }
});


app.get('/rekap/:kode_matkul', function (req, res) {
  con.connect(function(err) {
  	console.log("rekap peserta mata kuliah");
    con.query("SELECT * FROM MAHASISWA WHERE id in (SELECT mahasiswa_id FROM ambil_matakuliah WHERE matakuliah_id = (SELECT id FROM matakuliah where kode_matkul = '"+req.params.kode_matkul+"'));", function (err, result) {
      res.send({status : "sukses", pesan : "rekap peserta mata kuliah :", isi_data : result });
    });
  });
});

app.get('/rekap/:kode_matkul/:pertemuan', function (req, res) {
  con.connect(function(err) {
  	console.log("rekap mata kuliah per pertemuan");
    con.query("SELECT * FROM absensi WHERE mahasiswa_id IN (SELECT mahasiswa_id FROM pertemuan_matakuliah WHERE matakuliah_id = (SELECT id FROM matakuliah WHERE kode_matkul = '"+req.params.kode_matkul+"') AND pertemuan_matakuliah_id IN (SELECT id FROM pertemuan_matakuliah where pertemuan = '"+req.params.pertemuan+"'));" , function (err, result) {
      res.send({status : "sukses", pesan : "rekap mata kuliah per pertemuan:", isi_data : result });
    });
  });
});

app.get('/rekapmahasiswa/:nrp/:kode_matkul', function (req, res) {
  con.connect(function(err) {
  	console.log("rekap mahasiswa per mata kuliah");
    con.query("SELECT * FROM absensi WHERE mahasiswa_id IN (SELECT id FROM mahasiswa WHERE nrp = '"+req.params.nrp+"') AND pertemuan_matakuliah_id IN (SELECT id FROM pertemuan_matakuliah where matakuliah_id=(SELECT id FROM matakuliah WHERE kode_matkul = '"+req.params.kode_matkul+"'));" , function (err, result) {
      res.send({status : "sukses", pesan : "rekap mahasiswa per mata kuliah :", isi_data : result });
    });
  });
});

app.get('/rekapmahasiswasemester/:nrp/:semester', function (req, res) {
  con.connect(function(err) {
    console.log("rekap mahasiswa per semester");
    var sql = "SELECT * FROM absensi WHERE mahasiswa_id in (SELECT mahasiswa_id FROM pertemuan_matakuliah WHERE mahasiswa_id = (SELECT id FROM mahasiswa where NRP="+req.params.nrp+") AND matakuliah_id in (SELECT id FROM matakuliah where semester = '"+req.params.semester+"'));";
    con.query(sql , function (err, result) {
      res.send({status : "sukses", pesan : "rekap mahasiswa per semester :", isi_data : result });
    });
  });
});

app.get('/mahasiswa', function(req,res){
  con.connect(function(err) {
    con.query("SELECT id, nrp, nama FROM mahasiswa;" , function (err, result) {
      res.send({status : "sukses", pesan : "rekap mahasiswa :", isi_data : result });
    });
  });
});

app.get('/matakuliah', function(req,res){
  con.connect(function(err) {
    con.query("SELECT id, kode_matkul, nama, semester, kelas FROM matakuliah;" , function (err, result) {
      res.send({status : "sukses", pesan : "rekap matakuliah :", isi_data : result });
    });
  });
});

app.listen(port, () => console.log(`app listening on port ${port}!`));