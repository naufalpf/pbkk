# Pemrograman Berbasis Kerangka Kerja
## Kelompok 5
## Tugas Sistem Kehadiran Online

     1. Naufal Pranasetyo F.   05111540000057
     2. Muhammad Akram A.      05111540000050
     3. Hilmi Raditya P.       05111640000164
    
---

## Teknologi yang digunakan: 
- Framework: [expressJS](https://expressjs.com/)
- Database: [MySQL](https://www.mysql.com/) 
- Front-end: [Template Engine Handlebars](https://www.npmjs.com/package/express-handlebars)
   
## Cara Menjalankan:
1. Clone repository ini, buka folder dan masuk terminal
2. Jalankan `npm install express --save`
3. Jalankan `npm install`
4. Nyalakan server MySQL, jalankan `node index.js`
5. Buka browser menuju ke halaman http://localhost:8000


## Endpoint List API

Test API dapat diakses di halaman http://192.168.88.58:8000/ atau http://d6a64457.ngrok.io 

API Cek Database
Terdapat 2 tabel yang dapat diakses, yaitu Tabel Mahasiswa dan Tabel matakuliah 
- `GET /mahasiswa` untuk melihat isi database tabel mahasiswa keseluruhan
- Contoh: http://d6a64457.ngrok.io/mahasiswa
- Hasilnya 

![1](img/mahasiswa.jpg)

- `GET /matakuliah` untuk melihat isi database tabel matakuliah keseluruhan
- Contoh: http://d6a64457.ngrok.io/matakuliah
- Hasilnya 

![1](img/matkul.jpg)

1. POST `/tambahmahasiswa` Untuk menambah data mahasiswa  
- *sent via body: nrp, nama, password*
- Hasilnya

![1](img/tambahmahasiswa.jpg)

2. POST `/tambahmatkul` Untuk menambah data mata kuliah  
- *sent via body: kode_matkul, nama, semester, kelas*
- Hasilnya

![2](img/tambahmatkul.jpg)

3. POST `/tambahpesertakelas/` Untuk menambah peserta ke mata kuliah dan kelas tertentu  
- *sent via body: nrp, kode_matkul*
- Hasilnya

![3](img/tambahpesertakelas.jpg)

4. POST `/tambahjadwal` Untuk menambah jadwal kelas  
- *sent via body: matakuliah_id, pertemuan, ruangan, jam_mulai, jam_selesai*
- Hasilnya

![4](img/tambahjadwal.jpg)

5. POST `/absen` Untuk melakukan absen  
- *sent via body: nrp, ruangan*
- Hasilnya

![5](img/absen.jpg)

6. GET `/rekap/:idmatkul` Untuk melihat rekap kuliah per semester
- Contoh: http://d6a64457.ngrok.io/rekap/IF1001/
- Hasilnya

![6](img/rekapmatkul.jpg)

7. GET `rekap/:idmatkul/:pertemuanke` untuk Melihat rekap kuliah per pertemuan
- Contoh: http://d6a64457.ngrok.io/rekap/IF1001/1
- Hasilnya 

![7](img/rekapmatkulpertemuan.jpg)

8. GET `/rekapmahasiswa/:nrp/:idmatkul` untuk Melihat rekap per mahasiswa per matkul
- Contoh: http://d6a64457.ngrok.io/rekapmahasiswa/05111540000057/IF1001
- Hasilnya 

![8](img/rekapmhsmatkul.jpg)

9. GET `/rekapmahasiswasemester/:nrp/:idsemester` untuk Melihat rekap per mahasiswa per semester 
- Contoh: http://d6a64457.ngrok.io/rekapmahasiswasemester/05111540000057/8
- Hasilnya 

![8](img/rekapmhssmt.jpg)


Desain Database

![db](Database.png)


