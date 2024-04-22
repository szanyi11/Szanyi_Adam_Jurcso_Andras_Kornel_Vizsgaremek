-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 22. 19:57
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `liget_pizzeria`
--
CREATE DATABASE IF NOT EXISTS `liget_pizzeria` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `liget_pizzeria`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `admin_ID` int(11) NOT NULL,
  `admin_felhasznalon` varchar(30) NOT NULL,
  `admin_jelszo` varchar(30) NOT NULL,
  `admin_email` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `admin`
--

INSERT INTO `admin` (`admin_ID`, `admin_felhasznalon`, `admin_jelszo`, `admin_email`) VALUES
(1, 'admin', '1234', 'szanyi@szanyi.com');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cim`
--

DROP TABLE IF EXISTS `cim`;
CREATE TABLE `cim` (
  `cim_ID` int(11) NOT NULL,
  `iranyito_sz` int(11) NOT NULL,
  `telepules_nev` varchar(60) NOT NULL,
  `telepules_utca` varchar(150) NOT NULL,
  `hazszam` varchar(10) NOT NULL,
  `emelet` int(11) NOT NULL,
  `ajto_szam` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `etlap`
--

DROP TABLE IF EXISTS `etlap`;
CREATE TABLE `etlap` (
  `etlap2_ID` int(11) NOT NULL,
  `etlap2_nev` varchar(60) NOT NULL,
  `etlap2_kep` varchar(255) DEFAULT NULL,
  `etlap2_ar` int(11) NOT NULL,
  `tipus` varchar(30) NOT NULL,
  `etlap2_leiras` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `etlap`
--

INSERT INTO `etlap` (`etlap2_ID`, `etlap2_nev`, `etlap2_kep`, `etlap2_ar`, `tipus`, `etlap2_leiras`) VALUES
(31, '22. Liget Speciál Pizza', '27508Liget Speciál.jpeg', 3300, 'Pizzák', 'paradicsomszósz,sajt,sonka,szalámi,friss tejföl sütés után'),
(32, '24. Csípős-Magyaros Pizza', '92091Csípős_magyaros.jpeg', 3150, 'Pizzák', 'paradicsomszósz,sajt,csipős szalámi, bacon, friss paradicsomkarikák sütés után'),
(33, '28.Frienze Pizza', '73037Frienze Pizza.jpg', 3250, 'Pizzák', 'fokhagymás-tejfölös alap, sajt , érelt sonka, szárított paradicsom, rukkola'),
(34, 'Cézár Saláta', '26388Cézár Saláta.jpg', 2750, 'Saláták', 'friss saláta, paradicsom, csirkemell csíkok, pirított zsemlekocka, parmezán'),
(35, 'Szezámmagos bundázott csirkecsíkok', '6478Szezámmagos bundázott csirkecsíkok.jpg', 3250, 'Tálak', 'Hasábburgonyával, és vegyes salátával, válaszható öntettel'),
(36, 'Coca Cola', '31555cocacola.png', 650, 'Italok', 'Coca Cola');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

DROP TABLE IF EXISTS `felhasznalok`;
CREATE TABLE `felhasznalok` (
  `felhasznalo_ID` int(11) NOT NULL,
  `felhasznalo_nev` varchar(60) NOT NULL,
  `felhasznalo_jelszo` varchar(30) NOT NULL,
  `felhasznalo_email` varchar(30) NOT NULL,
  `felhasznalo_telefonszam` varchar(20) NOT NULL,
  `cim_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `feltet`
--

DROP TABLE IF EXISTS `feltet`;
CREATE TABLE `feltet` (
  `feltet_ID` int(11) NOT NULL,
  `feltet_nev` varchar(30) NOT NULL,
  `feltet_ar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `feltet`
--

INSERT INTO `feltet` (`feltet_ID`, `feltet_nev`, `feltet_ar`) VALUES
(13, 'Fokhagyma', 250),
(14, 'Hagyma', 250),
(15, 'Póréhagyma', 250),
(16, 'Gomba', 250),
(17, 'Kukorica', 250),
(18, 'Ananász', 250),
(19, 'Trapista sajt', 450),
(20, 'Tonhal', 550),
(21, 'Érelt sonka', 600),
(22, 'Hasábburgonya', 500);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kosar`
--

DROP TABLE IF EXISTS `kosar`;
CREATE TABLE `kosar` (
  `kosar_ID` int(11) NOT NULL,
  `felhasznalo_ID` int(11) NOT NULL,
  `tetel_ID` int(11) NOT NULL,
  `idopont` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `nyilvantartas`
--

DROP TABLE IF EXISTS `nyilvantartas`;
CREATE TABLE `nyilvantartas` (
  `ID` int(11) NOT NULL,
  `napok` varchar(30) DEFAULT NULL,
  `mettol_ora` varchar(2) DEFAULT NULL,
  `mettol_perc` varchar(2) DEFAULT NULL,
  `meddig_ora` varchar(2) DEFAULT NULL,
  `meddig_perc` varchar(2) DEFAULT NULL,
  `esemeny` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `nyilvantartas`
--

INSERT INTO `nyilvantartas` (`ID`, `napok`, `mettol_ora`, `mettol_perc`, `meddig_ora`, `meddig_perc`, `esemeny`) VALUES
(1, 'Hétfő', '9', '00', '11', '00', ''),
(2, 'Kedd', '11', '00', '00', '00', ''),
(3, 'Szerda', '11', '00', '00', '00', ''),
(4, 'Csütörtök', '11', '00', '00', '00', ''),
(5, 'Péntek', '11', '00', '02', '00', ''),
(6, 'Szombat', '11', '00', '11', '00', ''),
(7, 'Vasárnap', '11', '00', '00', '00', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pizzeria`
--

DROP TABLE IF EXISTS `pizzeria`;
CREATE TABLE `pizzeria` (
  `telefonszam` varchar(12) NOT NULL,
  `email` varchar(30) NOT NULL,
  `informaciok` text NOT NULL,
  `akciok` text NOT NULL,
  `rolunk` text NOT NULL,
  `telephely` varchar(100) NOT NULL,
  `aszf` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `pizzeria`
--

INSERT INTO `pizzeria` (`telefonszam`, `email`, `informaciok`, `akciok`, `rolunk`, `telephely`, `aszf`) VALUES
('+36307177060', 'liget@liget.com', 'Nincs új információ', 'Nincs jelenlegi akció', 'Kedves Vendégeink ! Örömmel értesítünk titeket, hogy pizzériánkat e hónap elejétől megnyitottuk a Liget Bowling Clubban. Hamarosan kiszállításra is tudtok tőlünk rendelni, addig is várunk sok szeretettel mindenkit a kiszolgáló ablaknál, vagy helyben Liget Bowling Clubban  Cím : 9700 Szombathely Liget utca 1, Liget Bowling Club További infókért kövessétek Facebook oldalunkat. ', '9700.Szombathely Liget utca.1', 'Feltöltés Alatt!');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tetel`
--

DROP TABLE IF EXISTS `tetel`;
CREATE TABLE `tetel` (
  `tetel_ID` int(11) NOT NULL,
  `felhasznalo_ID` int(11) NOT NULL,
  `etlap2_ID` int(11) NOT NULL,
  `feltet_ID` int(11) NOT NULL,
  `db` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tipus`
--

DROP TABLE IF EXISTS `tipus`;
CREATE TABLE `tipus` (
  `tipus_nev` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `tipus`
--

INSERT INTO `tipus` (`tipus_nev`) VALUES
('Italok'),
('Pizzák'),
('Saláták'),
('Tálak');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_ID`);

--
-- A tábla indexei `cim`
--
ALTER TABLE `cim`
  ADD PRIMARY KEY (`cim_ID`);

--
-- A tábla indexei `etlap`
--
ALTER TABLE `etlap`
  ADD PRIMARY KEY (`etlap2_ID`),
  ADD KEY `tipus` (`tipus`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`felhasznalo_ID`),
  ADD KEY `cim` (`cim_ID`);

--
-- A tábla indexei `feltet`
--
ALTER TABLE `feltet`
  ADD PRIMARY KEY (`feltet_ID`);

--
-- A tábla indexei `kosar`
--
ALTER TABLE `kosar`
  ADD PRIMARY KEY (`kosar_ID`),
  ADD KEY `tetel2` (`tetel_ID`),
  ADD KEY `felhaszn` (`felhasznalo_ID`);

--
-- A tábla indexei `nyilvantartas`
--
ALTER TABLE `nyilvantartas`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `tetel`
--
ALTER TABLE `tetel`
  ADD PRIMARY KEY (`tetel_ID`),
  ADD KEY `feltet` (`feltet_ID`),
  ADD KEY `etlap2` (`etlap2_ID`),
  ADD KEY `felhaszn2` (`felhasznalo_ID`);

--
-- A tábla indexei `tipus`
--
ALTER TABLE `tipus`
  ADD PRIMARY KEY (`tipus_nev`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `cim`
--
ALTER TABLE `cim`
  MODIFY `cim_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `etlap`
--
ALTER TABLE `etlap`
  MODIFY `etlap2_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `felhasznalo_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `feltet`
--
ALTER TABLE `feltet`
  MODIFY `feltet_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT a táblához `kosar`
--
ALTER TABLE `kosar`
  MODIFY `kosar_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `nyilvantartas`
--
ALTER TABLE `nyilvantartas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `tetel`
--
ALTER TABLE `tetel`
  MODIFY `tetel_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `etlap`
--
ALTER TABLE `etlap`
  ADD CONSTRAINT `tipus` FOREIGN KEY (`tipus`) REFERENCES `tipus` (`tipus_nev`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD CONSTRAINT `cim` FOREIGN KEY (`cim_ID`) REFERENCES `cim` (`cim_ID`);

--
-- Megkötések a táblához `kosar`
--
ALTER TABLE `kosar`
  ADD CONSTRAINT `felhaszn` FOREIGN KEY (`felhasznalo_ID`) REFERENCES `felhasznalok` (`felhasznalo_ID`),
  ADD CONSTRAINT `tetel2` FOREIGN KEY (`tetel_ID`) REFERENCES `tetel` (`tetel_ID`);

--
-- Megkötések a táblához `tetel`
--
ALTER TABLE `tetel`
  ADD CONSTRAINT `etlap2` FOREIGN KEY (`etlap2_ID`) REFERENCES `etlap` (`etlap2_ID`),
  ADD CONSTRAINT `felhaszn2` FOREIGN KEY (`felhasznalo_ID`) REFERENCES `felhasznalok` (`felhasznalo_ID`),
  ADD CONSTRAINT `feltet` FOREIGN KEY (`feltet_ID`) REFERENCES `feltet` (`feltet_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
