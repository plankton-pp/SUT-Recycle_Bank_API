-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2022 at 07:15 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `placedetail`
--

CREATE TABLE `placedetail` (
  `Place_Detail_ID` int(11) NOT NULL,
  `Place_ID` int(11) NOT NULL,
  `Product_ID` int(11) NOT NULL,
  `Unit` float NOT NULL,
  `Total_Price` float NOT NULL,
  `Create_Date` varchar(45) NOT NULL,
  `Update_Date` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `placedetail`
--

INSERT INTO `placedetail` (`Place_Detail_ID`, `Place_ID`, `Product_ID`, `Unit`, `Total_Price`, `Create_Date`, `Update_Date`) VALUES
(5, 2, 2, 2, 2, '1643568682', '1643568692');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `placedetail`
--
ALTER TABLE `placedetail`
  ADD PRIMARY KEY (`Place_Detail_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `placedetail`
--
ALTER TABLE `placedetail`
  MODIFY `Place_Detail_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
