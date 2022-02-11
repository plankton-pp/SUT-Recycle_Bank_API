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
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `Type_ID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Update_Date` varchar(45) NOT NULL,
  `Create_Date` varchar(45) NOT NULL,
  `Update_By` int(11) NOT NULL,
  `Create_By` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`Type_ID`, `Name`, `Update_Date`, `Create_Date`, `Update_By`, `Create_By`) VALUES
(1, 'กระดาษ', '', '1643273480', 0, 0),
(2, 'แก้ว', '', '1643273509', 0, 0),
(3, 'พลาสติก', '', '1643273527', 0, 0),
(4, 'โลหะ', '', '1643273546', 0, 0),
(5, 'เครื่องใช้ไฟฟ้า', '', '1643273558', 0, 0),
(6, 'อื่นๆ', '', '1643273697', 0, 0);

--
-- Triggers `type`
--
DELIMITER $$
CREATE TRIGGER `update_type` AFTER UPDATE ON `type` FOR EACH ROW BEGIN
    IF OLD.Update_Date != new.Update_Date THEN
        INSERT INTO type_log(Type_ID,Name,Update_Date,Update_By,Create_Date,Create_By)
        VALUES(old.Type_ID,old.Name,old.Update_Date,old.Update_By,old.Create_Date,old.Create_By);
    END IF;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`Type_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `Type_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
