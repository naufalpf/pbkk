-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2019 at 07:02 PM
-- Server version: 10.1.40-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tugas5pbkk`
--

-- --------------------------------------------------------

--
-- Table structure for table `absensi`
--

CREATE TABLE `absensi` (
  `id` int(11) NOT NULL,
  `tanggal_waktu` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mahasiswa_id` int(11) NOT NULL,
  `pertemuan_matakuliah_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `absensi`
--

INSERT INTO `absensi` (`id`, `tanggal_waktu`, `mahasiswa_id`, `pertemuan_matakuliah_id`) VALUES
(14, '2019-05-23 04:37:11', 7, 2),
(15, '2019-05-25 16:56:30', 19, 3);

-- --------------------------------------------------------

--
-- Table structure for table `ambil_matakuliah`
--

CREATE TABLE `ambil_matakuliah` (
  `id` int(11) UNSIGNED NOT NULL,
  `mahasiswa_id` int(11) DEFAULT NULL,
  `matakuliah_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ambil_matakuliah`
--

INSERT INTO `ambil_matakuliah` (`id`, `mahasiswa_id`, `matakuliah_id`) VALUES
(2, 7, 11),
(12, 19, 15);

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id` int(11) NOT NULL,
  `nrp` varchar(30) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`id`, `nrp`, `nama`, `password`) VALUES
(7, '164', 'hilmi', 'hilmi'),
(8, '057', 'naufalpf', 'naufalpf'),
(19, '05111540000057', 'Naufal Pranasetyo', 'naufal');

-- --------------------------------------------------------

--
-- Table structure for table `matakuliah`
--

CREATE TABLE `matakuliah` (
  `id` int(11) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `jumlah_pertemuan` int(11) NOT NULL,
  `semester` varchar(30) NOT NULL,
  `kelas` varchar(30) NOT NULL,
  `kode_matkul` varchar(11) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `matakuliah`
--

INSERT INTO `matakuliah` (`id`, `nama`, `jumlah_pertemuan`, `semester`, `kelas`, `kode_matkul`) VALUES
(11, 'PBKK', 16, '6', 'G', 'IF999'),
(12, 'PBKK', 16, '6', 'H', 'IF777'),
(15, 'Tugas Akhir', 16, '8', 'A', 'IF1');

-- --------------------------------------------------------

--
-- Table structure for table `pertemuan_matakuliah`
--

CREATE TABLE `pertemuan_matakuliah` (
  `id` int(11) NOT NULL,
  `pertemuan` int(11) NOT NULL,
  `jam_mulai` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `jam_selesai` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ruangan` varchar(30) NOT NULL,
  `matakuliah_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pertemuan_matakuliah`
--

INSERT INTO `pertemuan_matakuliah` (`id`, `pertemuan`, `jam_mulai`, `jam_selesai`, `ruangan`, `matakuliah_id`) VALUES
(2, 1, '2019-05-21 17:00:00', '2019-05-23 17:00:00', '105a', 11),
(3, 2, '2019-05-21 17:00:00', '2019-05-29 17:00:00', 'IF108', 15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absensi`
--
ALTER TABLE `absensi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mahasiswa_id` (`mahasiswa_id`),
  ADD KEY `pertemuan_matakuliah_id` (`pertemuan_matakuliah_id`);

--
-- Indexes for table `ambil_matakuliah`
--
ALTER TABLE `ambil_matakuliah`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mahasiswa_id` (`mahasiswa_id`),
  ADD KEY `matakuliah_id` (`matakuliah_id`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `matakuliah`
--
ALTER TABLE `matakuliah`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pertemuan_matakuliah`
--
ALTER TABLE `pertemuan_matakuliah`
  ADD PRIMARY KEY (`id`),
  ADD KEY `matakuliah_id` (`matakuliah_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absensi`
--
ALTER TABLE `absensi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `ambil_matakuliah`
--
ALTER TABLE `ambil_matakuliah`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `matakuliah`
--
ALTER TABLE `matakuliah`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `pertemuan_matakuliah`
--
ALTER TABLE `pertemuan_matakuliah`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `absensi`
--
ALTER TABLE `absensi`
  ADD CONSTRAINT `absensi_ibfk_2` FOREIGN KEY (`pertemuan_matakuliah_id`) REFERENCES `pertemuan_matakuliah` (`id`),
  ADD CONSTRAINT `absensi_ibfk_3` FOREIGN KEY (`mahasiswa_id`) REFERENCES `mahasiswa` (`id`);

--
-- Constraints for table `ambil_matakuliah`
--
ALTER TABLE `ambil_matakuliah`
  ADD CONSTRAINT `ambil_matakuliah_ibfk_1` FOREIGN KEY (`mahasiswa_id`) REFERENCES `mahasiswa` (`id`),
  ADD CONSTRAINT `ambil_matakuliah_ibfk_2` FOREIGN KEY (`matakuliah_id`) REFERENCES `matakuliah` (`id`);

--
-- Constraints for table `pertemuan_matakuliah`
--
ALTER TABLE `pertemuan_matakuliah`
  ADD CONSTRAINT `pertemuan_matakuliah_ibfk_1` FOREIGN KEY (`matakuliah_id`) REFERENCES `matakuliah` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
