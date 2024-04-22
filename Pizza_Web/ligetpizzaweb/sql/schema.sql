DELIMITER ;;

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
  `etlap2_kep` varchar(60) DEFAULT NULL,
  `etlap2_ar` int(11) NOT NULL,
  `tipus` varchar(30) NOT NULL,
  `etlap2_leiras` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

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
(6, 'Szombat', '11', '00', '02', '00', ''),
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
('+3630789299', 'label@gmail.com', '[value-3]', 'dsasdasdfca', 'edsgfvdygdsgds', '9700.Szombathely', '');

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
('Pizza');

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
  MODIFY `etlap2_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `felhasznalo_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `feltet`
--
ALTER TABLE `feltet`
  MODIFY `feltet_ID` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `tetel_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `etlap`
--
ALTER TABLE `etlap`
  ADD CONSTRAINT `tipus` FOREIGN KEY (`tipus`) REFERENCES `tipus` (`tipus_nev`);

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
;;