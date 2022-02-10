-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2022 at 08:44 PM
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
  `Type_ID` int(11) NOT NULL,
  `Type_Name` varchar(45) NOT NULL,
  `Product_ID` int(11) NOT NULL,
  `Product_Name` varchar(45) NOT NULL,
  `Price_per_Unit` float NOT NULL,
  `Unit_detail` varchar(45) NOT NULL,
  `Fee_ID` int(11) NOT NULL,
  `Fee` float NOT NULL,
  `Unit` float NOT NULL,
  `Total_Price` float NOT NULL,
  `Bank_Price` float NOT NULL,
  `Member_Price` float NOT NULL,
  `Create_Date` varchar(45) NOT NULL,
  `Update_Date` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `Place_Detail_ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
