/**
 * Felhasználó authentikációja megadott felhasználói név és jelszó ellenében.
 */

 SELECT felhasznalo_nev
 FROM   felhasznalok
 WHERE  felhasznalo_ID = "###UID###"
        AND felhasznalo_jelszo = MD5("###PWD###");

        