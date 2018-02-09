-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Set 06, 2015 alle 01:07
-- Versione del server: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tripletriadworld`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `carta`
--

CREATE TABLE IF NOT EXISTS `carta` (
`IDCarta` int(11) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Top` int(11) NOT NULL,
  `Destra` int(11) NOT NULL,
  `Bot` int(11) NOT NULL,
  `Sinistra` int(11) NOT NULL,
  `Livello` int(11) NOT NULL,
  `Elemento` varchar(255) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=111 ;

--
-- Dump dei dati per la tabella `carta`
--

INSERT INTO `carta` (`IDCarta`, `Nome`, `Top`, `Destra`, `Bot`, `Sinistra`, `Livello`, `Elemento`) VALUES
(1, 'Geezard', 1, 4, 1, 5, 1, NULL),
(2, 'Fungongo', 5, 1, 1, 3, 1, NULL),
(3, 'Lesmathor', 1, 3, 3, 5, 1, NULL),
(4, 'RedBat', 6, 1, 1, 2, 1, NULL),
(5, 'Blobra', 2, 3, 1, 5, 1, NULL),
(6, 'Gyala', 2, 1, 4, 4, 1, NULL),
(7, 'Gesper', 1, 5, 4, 1, 1, NULL),
(8, 'Fastitocalon-F', 3, 5, 2, 1, 1, NULL),
(9, 'BloodSoul', 2, 1, 6, 1, 1, NULL),
(10, 'Caterchipillar', 4, 2, 4, 3, 1, NULL),
(11, 'Cockatrice', 2, 1, 2, 6, 1, NULL),
(12, 'Grat', 7, 1, 3, 1, 2, NULL),
(13, 'Buel', 6, 2, 2, 3, 2, NULL),
(14, 'Mezmerize', 5, 3, 3, 4, 2, NULL),
(15, 'GlacialEye', 6, 1, 4, 3, 2, NULL),
(16, 'Belhelmel', 3, 4, 5, 3, 2, NULL),
(17, 'Thrustaevis', 5, 3, 2, 5, 2, NULL),
(18, 'Anacondaur', 5, 1, 3, 5, 2, 'poison'),
(19, 'Creeps', 5, 2, 5, 2, 2, NULL),
(20, 'Grendel', 4, 4, 5, 2, 2, NULL),
(21, 'Forbidden', 6, 6, 3, 2, 3, NULL),
(22, 'Armadodo', 6, 3, 1, 6, 3, 'earth'),
(23, 'Tri-Face', 3, 5, 5, 5, 3, 'poison'),
(24, 'Fastitocalon', 7, 5, 3, 1, 3, 'earth'),
(25, 'SnowLion', 7, 1, 5, 3, 3, 'ice'),
(26, 'Ochu', 5, 6, 3, 3, 3, NULL),
(27, 'SAM08G', 5, 6, 2, 4, 3, 'fire'),
(28, 'DeathClaw', 4, 4, 7, 2, 3, 'fire'),
(29, 'Cactuar', 6, 2, 6, 3, 3, NULL),
(30, 'Tonberry', 3, 6, 4, 4, 3, NULL),
(31, 'AbyssWorm', 7, 2, 3, 5, 3, 'earth'),
(32, 'Turtapod', 2, 3, 6, 7, 4, NULL),
(33, 'Vysage', 6, 5, 4, 5, 4, NULL),
(34, 'Archeosaurus', 4, 6, 2, 7, 4, NULL),
(35, 'Piros', 2, 7, 6, 3, 4, 'fire'),
(36, 'Blitz', 1, 6, 4, 7, 4, 'thunder'),
(37, 'Wendigo', 7, 3, 1, 6, 4, NULL),
(38, 'Torama', 7, 4, 4, 4, 4, NULL),
(39, 'Imp', 3, 7, 3, 6, 4, NULL),
(40, 'BlueDragon', 6, 2, 7, 3, 4, 'poison'),
(41, 'Adamantoise', 4, 5, 5, 6, 4, 'earth'),
(42, 'Hexadragon', 7, 5, 4, 3, 4, 'fire'),
(43, 'Thytan', 6, 5, 6, 5, 5, NULL),
(44, 'Behemot', 3, 6, 5, 7, 5, NULL),
(45, 'Chimera', 7, 6, 5, 3, 5, 'water'),
(46, 'PuPu', 3, 10, 2, 1, 5, NULL),
(47, 'Invinta', 6, 2, 6, 7, 5, NULL),
(48, 'GIM47N', 5, 5, 7, 4, 5, NULL),
(49, 'Marlboro', 7, 7, 4, 2, 5, 'poison'),
(50, 'RubrumDragon', 7, 2, 7, 4, 5, 'fire'),
(51, 'Elnoyle', 5, 3, 7, 6, 5, NULL),
(52, 'TonberryKing', 4, 6, 7, 4, 5, NULL),
(53, 'Biggs,Wedge', 6, 6, 2, 7, 5, NULL),
(54, 'Fujin,Raijin', 2, 8, 8, 4, 6, NULL),
(55, 'Herbia', 7, 8, 3, 4, 6, 'wind'),
(56, 'X-ATMO92', 4, 8, 7, 3, 6, NULL),
(57, 'Granaldo', 7, 2, 8, 5, 6, NULL),
(58, 'Gerogero', 1, 8, 8, 3, 6, 'poison'),
(59, 'Iguion', 8, 2, 8, 2, 6, NULL),
(60, 'Abadon', 6, 8, 4, 5, 6, NULL),
(61, 'Trauma', 4, 8, 5, 6, 6, NULL),
(62, 'Olimassa', 1, 8, 4, 8, 6, NULL),
(63, 'Shumi', 6, 5, 8, 4, 6, NULL),
(64, 'Krysta', 7, 5, 8, 1, 6, NULL),
(65, 'Propagator', 8, 4, 4, 8, 7, NULL),
(66, 'JumboCactuar', 8, 8, 4, 4, 7, NULL),
(67, 'Tri-Point', 8, 5, 2, 8, 7, NULL),
(68, 'Gargantua', 5, 6, 6, 8, 7, NULL),
(69, 'MobileType8', 8, 6, 7, 3, 7, NULL),
(70, 'Sphinxara', 8, 3, 5, 8, 7, NULL),
(71, 'Tiamath', 8, 8, 5, 4, 7, NULL),
(72, 'BGH251F2', 5, 7, 8, 5, 7, NULL),
(73, 'RedThytan', 6, 8, 4, 7, 7, NULL),
(74, 'Catoblepas', 1, 8, 7, 7, 7, NULL),
(75, 'UltimaWeapon', 7, 7, 2, 8, 7, NULL),
(76, 'ChubbyChocobo', 4, 4, 8, 9, 8, NULL),
(77, 'Angelo', 9, 6, 7, 3, 8, NULL),
(78, 'Gilgamesh', 3, 7, 9, 6, 8, NULL),
(79, 'Komoguri', 9, 3, 9, 2, 8, NULL),
(80, 'Chocobo', 9, 4, 8, 4, 8, NULL),
(81, 'Quetzacolt', 2, 9, 9, 4, 8, 'thunder'),
(82, 'Shiva', 6, 7, 4, 9, 8, 'ice'),
(83, 'Ifrit', 9, 6, 2, 8, 8, 'fire'),
(84, 'Siren', 8, 9, 6, 2, 8, NULL),
(85, 'Sacred', 5, 1, 9, 9, 8, 'earth'),
(86, 'Minotaur', 9, 5, 2, 9, 8, 'earth'),
(87, 'Carbuncle', 8, 4, 10, 4, 9, NULL),
(88, 'Diablos', 5, 10, 8, 3, 9, NULL),
(89, 'Leviathan', 7, 10, 1, 7, 9, 'water'),
(90, 'Odin', 8, 10, 3, 5, 9, NULL),
(91, 'Pandemon', 10, 1, 7, 7, 9, 'wind'),
(92, 'Cerberus', 7, 4, 6, 10, 9, NULL),
(93, 'Alexander', 9, 10, 4, 2, 9, 'light'),
(94, 'Bahamut', 10, 8, 2, 6, 9, NULL),
(95, 'Doomtrain', 3, 1, 10, 10, 9, 'poison'),
(96, 'Eden', 4, 4, 9, 10, 9, NULL),
(97, 'Ward', 10, 7, 2, 8, 10, NULL),
(98, 'Kiros', 6, 7, 6, 10, 10, NULL),
(99, 'Laguna', 5, 10, 3, 9, 10, NULL),
(100, 'Selphie', 10, 8, 3, 9, 10, NULL),
(101, 'Quistis', 9, 6, 10, 2, 10, NULL),
(102, 'Irvine', 2, 6, 9, 10, 10, NULL),
(103, 'Zell', 8, 5, 10, 6, 10, NULL),
(104, 'Rinoa', 4, 10, 2, 10, 10, NULL),
(105, 'Seifer', 6, 9, 10, 4, 10, NULL),
(106, 'Squall', 10, 4, 6, 9, 10, NULL),
(107, 'Jelleye', 3, 2, 1, 7, 2, NULL),
(108, 'GrandMantis', 5, 2, 5, 3, 2, NULL),
(109, 'Phoenix', 7, 2, 7, 10, 9, 'fire'),
(110, 'Edea', 10, 10, 3, 3, 10, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `deck`
--

CREATE TABLE IF NOT EXISTS `deck` (
  `IDUtente` int(11) NOT NULL,
  `IDCarta` int(11) NOT NULL,
  `Quantita` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `deck`
--

INSERT INTO `deck` (`IDUtente`, `IDCarta`, `Quantita`) VALUES
(1, 1, 7),
(1, 2, 10),
(1, 3, 11),
(1, 4, 7),
(1, 5, 12),
(1, 6, 11),
(1, 7, 4),
(1, 8, 11),
(1, 9, 10),
(1, 10, 6),
(1, 11, 8),
(1, 12, 10),
(1, 13, 2),
(1, 14, 4),
(1, 15, 9),
(1, 16, 8),
(1, 17, 6),
(1, 18, 11),
(1, 19, 4),
(1, 20, 4),
(1, 21, 7),
(1, 22, 5),
(1, 23, 6),
(1, 24, 7),
(1, 25, 4),
(1, 26, 4),
(1, 27, 4),
(1, 28, 6),
(1, 29, 4),
(1, 30, 7),
(1, 31, 8),
(1, 32, 1),
(1, 33, 5),
(1, 34, 4),
(1, 35, 2),
(1, 36, 3),
(1, 37, 5),
(1, 38, 5),
(1, 39, 4),
(1, 40, 2),
(1, 41, 3),
(1, 42, 2),
(1, 43, 5),
(1, 44, 3),
(1, 45, 4),
(1, 46, 4),
(1, 47, 6),
(1, 48, 6),
(1, 49, 4),
(1, 50, 2),
(1, 51, 6),
(1, 52, 5),
(1, 53, 4),
(1, 54, 5),
(1, 55, 8),
(1, 56, 7),
(1, 57, 6),
(1, 58, 2),
(1, 59, 4),
(1, 60, 2),
(1, 61, 4),
(1, 62, 4),
(1, 63, 4),
(1, 64, 3),
(1, 65, 4),
(1, 66, 9),
(1, 67, 4),
(1, 68, 3),
(1, 69, 4),
(1, 70, 2),
(1, 71, 6),
(1, 72, 4),
(1, 73, 5),
(1, 74, 4),
(1, 75, 3),
(1, 76, 2),
(1, 77, 4),
(1, 78, 1),
(1, 79, 8),
(1, 80, 3),
(1, 81, 3),
(1, 82, 4),
(1, 83, 1),
(1, 84, 5),
(1, 85, 2),
(1, 86, 1),
(1, 87, 2),
(1, 88, 3),
(1, 89, 8),
(1, 90, 1),
(1, 91, 6),
(1, 92, 2),
(1, 93, 3),
(1, 94, 5),
(1, 95, 2),
(1, 96, 2),
(1, 97, 5),
(1, 98, 7),
(1, 99, 5),
(1, 100, 7),
(1, 101, 5),
(1, 102, 4),
(1, 103, 7),
(1, 104, 4),
(1, 105, 1),
(1, 106, 6),
(1, 107, 4),
(1, 108, 6),
(1, 109, 5),
(1, 110, 11),
(2, 1, 4),
(2, 3, 1),
(2, 5, 1),
(2, 8, 2),
(2, 11, 2),
(2, 27, 1),
(2, 32, 1),
(3, 12, 1),
(3, 19, 1),
(3, 25, 1),
(3, 32, 1),
(3, 105, 1),
(4, 5, 1),
(4, 8, 1),
(4, 11, 1),
(4, 32, 1),
(4, 36, 1),
(4, 39, 1),
(4, 40, 2),
(4, 50, 1),
(4, 54, 1),
(4, 56, 1),
(4, 75, 1),
(4, 97, 1),
(4, 104, 1),
(4, 106, 1),
(5, 11, 1),
(5, 18, 1),
(5, 21, 1),
(5, 25, 1),
(5, 27, 1),
(5, 53, 1),
(7, 3, 1),
(7, 19, 1),
(7, 25, 1),
(7, 26, 1),
(7, 28, 1),
(7, 29, 1),
(7, 30, 2),
(7, 31, 1),
(8, 1, 1),
(8, 2, 3),
(8, 3, 1),
(8, 4, 1),
(8, 5, 1),
(8, 7, 1),
(8, 8, 1),
(8, 10, 1),
(8, 11, 2),
(9, 1, 1),
(9, 2, 1),
(9, 5, 1),
(9, 6, 1),
(9, 8, 1),
(9, 81, 1),
(9, 99, 1),
(10, 2, 1),
(10, 3, 1),
(10, 4, 1),
(10, 69, 1),
(10, 92, 1),
(10, 110, 1),
(12, 4, 1),
(12, 47, 1),
(12, 50, 1),
(12, 62, 1),
(12, 67, 1),
(12, 90, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE IF NOT EXISTS `utente` (
`IDUtente` int(11) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Email` varchar(250) NOT NULL,
  `Denaro` int(11) NOT NULL DEFAULT '50',
  `Vinte` int(11) NOT NULL DEFAULT '0',
  `Giocate` int(11) NOT NULL DEFAULT '0',
  `UltimoClickAd` date NOT NULL DEFAULT '1000-01-01'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`IDUtente`, `Username`, `Password`, `Email`, `Denaro`, `Vinte`, `Giocate`, `UltimoClickAd`) VALUES
(1, 'lkmnoppo', 'prova', 'lkmnoppo@hotmail.it', 98, 13, 25, '2015-09-03'),
(2, 'franca', 'prova', 'franca@tiscali.it', 7, 0, 1, '1000-01-01'),
(3, 'abc', 'cba', 'abc@tin.it', 11, 0, 1, '2015-08-29'),
(4, 'prova', 'prova', 'prova@lol.it', 4, 4, 4, '2015-09-04'),
(5, 'giovanna', 'lorenzo', 'giovannaniolu@hotmail.it', 26, 0, 1, '2015-08-29'),
(6, 'afnuenu', 'asd', 'af@guen.it', 50, 0, 0, '1000-01-01'),
(7, 'lorenzo', 'lollo', 'loreniolu@hotmail.com', 0, 0, 3, '2015-08-29'),
(8, 'teresa', 'prova', 'prova@hotmail.it', 36, 0, 1, '2015-08-29'),
(9, 'cosa', 'cosa', 'cosa@co.sa', 0, 0, 0, '2015-08-29'),
(10, 'tonteddu', 'frillo', 'pippo@tiscali.it', 17, 1, 1, '2015-08-30'),
(11, 'saufd', 'cosa', 'asd@lol.it', 50, 0, 0, '1000-01-01'),
(12, 'NU', 'pappa', 'ciambella@hotmail.com', 13, 1, 2, '2015-09-05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carta`
--
ALTER TABLE `carta`
 ADD PRIMARY KEY (`IDCarta`), ADD UNIQUE KEY `Nome` (`Nome`);

--
-- Indexes for table `deck`
--
ALTER TABLE `deck`
 ADD PRIMARY KEY (`IDUtente`,`IDCarta`);

--
-- Indexes for table `utente`
--
ALTER TABLE `utente`
 ADD PRIMARY KEY (`IDUtente`), ADD UNIQUE KEY `Username` (`Username`), ADD UNIQUE KEY `Username_2` (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carta`
--
ALTER TABLE `carta`
MODIFY `IDCarta` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=111;
--
-- AUTO_INCREMENT for table `utente`
--
ALTER TABLE `utente`
MODIFY `IDUtente` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
