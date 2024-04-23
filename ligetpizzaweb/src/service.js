// Szükséges modulok betöltése

const Database = require('.database')
const config = require("../felhasznalo.json")

//bejelentkezéshez funkciók

module.exports = class Service {

    /**
     * Authentikálja a megadott felhasználót a jelszava ellenében.
     * 
     * @param {String}  uid         felhasználói azonosító
     * @param {String}  password    felhasználó jelszava
     * @param {Promise} promise     promise objectum
     */

    static async login(uid, password) {

        console.log(`Felhasználó authentikációja: ${uid}`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Authentikáció

        const result = await db.run(`SELECT   felhasznalo_nev
                        FROM    felhasznalok
                        WHERE   felhasznalo_ID = "${uid}"
                                AND felhasznalo_jelszo = MD5("${password}")`)
        
        // Authentikáció sikerességének ellenőrzése

        if (result && result.length === 1 && result[0].felhasznalo_nev) {
            return result[0].felhasznalo_nev
        } else {
            return null
        }
    }

    /**
     * Betölti a felhasználók listáját.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadUsers() {

        console.log(`Felhasználók betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Felhasználók betöltése

        const result = await db.run(`
            SELECT   felhasznalo_ID, felhasznalo_nev, felhasznalo_jelszo
            FROM     felhasznalok
            ORDER BY felhasznalo_ID
        `)
        
        // Felhasználók visszaadása

        return result
    }

    /**
     * Menti a megadott felhasználót.
     * 
     * @param   {Object}    user    mentendő felhasználó
     * @returns {Promise}   promise Promise objektum
     */

    static async saveUser(user) {

        console.log(`Felhasználó mentése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Felhasználó mentése

        const result = await db.run(`
            SELECT   felhasznalo_ID
            FROM     felhasznalok
            WHERE    felhasznalo_ID = "${user.felhasznalo_ID}"
        `)

        if (result && result.length === 1) {
            await db.run(`
                UPDATE   felhasznalok
                    SET  felhasznalo_nev = "${user.felhasznalo_nev}",
                         felhasznalo_email = "${user.felhasznalo_email}",
                         felhasznalo_telefonszam = "${user.felhasznalo_telefonszam}"
                WHERE    felhasznalo_ID = "${user.felhasznalo_ID}"
            `)
        } else {
            await db.run(`
                INSERT INTO USERS(felhasznalo_ID, felhasznalo_nev, felhasznalo_jelszo, felhasznalo_email, felhasznalo_telefonszam) VALUES (
                    "${user.felhasznalo_ID}",
                    "${user.felhasznalo_nev}",
                    MD5("${user.felhasznalo_jelszo}"),
                    "${user.felhasznalo_email}",
                    "${user.felhasznalo_telefonszam}"
                )
        `)
        }
    }

    /**
     * Törli a megadott felhasználót.
     * 
     * @param   {Object}    user    törlendő felhasználó
     * @returns {Promise}   promise Promise objektum
     */

    static async deleteUser(user) {

        console.log(`Felhasználó törlése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        await db.run(`
                DELETE FROM felhasznalok
                WHERE    felhasznalo_ID = "${user.felhasznalo_ID}"
            `)
    }

    /**
     * Beállít egy új jelszót a megadott felhasználónak.
     * 
     * @param   {Object}    user        felhasználó
     * @param   {String}    password    felhasználó jelszava
     * @returns {Promise}   promise Promise objektum
     */

    static async newPassword(user, password) {

        console.log(`Felhasználó jelszavának beállítása`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        await db.run(`
                UPDATE   felhasznalok
                    SET  felhasznalo_jelszo = MD5("${password}")
                WHERE    felhasznalo_ID = "${user.felhasznalo_ID}"
            `)
    }

    /**
     * Betölti a pizzeria telefonszámát.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadPizzeriatelefon() {

        console.log(`pizzeria telefon betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // pizzeria telefon betöltése

        const telefon = await db.run(`
            SELECT   telefonszam
            FROM     pizzeria
            ORDER BY ASC
        `)

        return telefon
    }

        /**
     * Betölti a pizzeria email-ét.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadPizzeriaemail() {

        console.log(`pizzeria email betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // pizzeria email betöltése

        const email = await db.run(`
            SELECT   email
            FROM     pizzeria
            ORDER BY ASC
        `)

        return email
    }

        /**
     * Betölti a pizzeria informaciok.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadPizzeriainformaciok() {

        console.log(`pizzeria informaciok betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Pizzeria informaciok betöltése

        const informaciok = await db.run(`
            SELECT   informaciok
            FROM     pizzeria
            ORDER BY ASC
        `)

        return informaciok
    }

        /**
     * Betölti a pizzeria akciok.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadPizzeriaakciok() {

        console.log(`pizzeria akciok betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // pizzeria akciok betöltése

        const akciok = await db.run(`
            SELECT   akciok
            FROM     pizzeria
            ORDER BY ASC
        `)

        return akciok
    }

        /**
     * Betölti a pizzeria rolunk.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadPizzeriarolunk() {

        console.log(`pizzeria rolunk betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // pizzeria rolunk betöltése

        const rolunk = await db.run(`
            SELECT   rolunk
            FROM     pizzeria
            ORDER BY ASC
        `)

        return rolunk
    }

        /**
     * Betölti a pizzeria telephely.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadPizzeriatelephely() {

        console.log(`pizzeria telephely betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // pizzeria telephely betöltése

        const telephely = await db.run(`
            SELECT   telephely
            FROM     pizzeria
            ORDER BY ASC
        `)

        return telephely
    }

        /**
     * Betölti a pizzeria aszf.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadPizzeriaaszf() {

        console.log(`pizzeria aszf betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // pizzeria aszf betöltése

        const aszf = await db.run(`
            SELECT   aszf
            FROM     pizzeria
            ORDER BY ASC
        `)
        
        // pizzeria aszf visszaadása

        return aszf
    }
    // -------------------------------------------nyilvántartás-------------------------------------
    /**
     * Betölti a nyilvántartás hetfometora.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartashetfometora() {

        console.log(`nyilvántartás hetfometora betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas hetfometora betöltése

        const hetfometora = await db.run(`
            SELECT   mettol_ora
            WHERE    ID = 1
            FROM     nyilvantartas
        `)

        return hetfometora
    }

        /**
     * Betölti a nyilvántartás hetfometperc.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartashetfometperc() {

        console.log(`nyilvántartás hetfometperc betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas hetfometperc betöltése
        
        const hetfometperc = await db.run(`
            SELECT   mettol_perc
            WHERE    ID = 1
            FROM     nyilvantartas
        `)

        return hetfometperc
    }

        /**
     * Betölti a nyilvántartás hetfomedora.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartashetfomedora() {

        console.log(`nyilvántartás hetfomedora betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas hetfomedora betöltése

        const hetfomedora = await db.run(`
            SELECT   meddig_ora
            WHERE    ID = 1
            FROM     nyilvantartas
        `)
        return hetfomedora
    }

        /**
     * Betölti a nyilvántartás hetfomedperc.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartashetfomedperc() {

        console.log(`nyilvántartás hetfomedperc betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas hetfomedperc betöltése

        const hetfomedperc = await db.run(`
            SELECT   meddig_perc
            WHERE    ID = 1
            FROM     nyilvantartas
        `)

        return hetfomedperc
    }

        /**
     * Betölti a nyilvántartás hetfoes.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartashetfoes() {

        console.log(`nyilvántartás hetfoes betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas hetfoes betöltése

        const hetfoes = await db.run(`
            SELECT   esemeny
            WHERE    ID = 1
            FROM     nyilvantartas
        `)

        return hetfoes
    }

        /**
     * Betölti a nyilvántartás keddmetora.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartaskeddmetora() {

        console.log(`nyilvántartás keddmetora betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas keddmetora betöltése

        const keddmetora = await db.run(`
            SELECT   mettol_ora
            WHERE    ID = 2
            FROM     nyilvantartas
        `)

        return keddmetora
    }

        /**
     * Betölti a nyilvántartás keddmetperc.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartaskeddmetperc() {

        console.log(`nyilvántartás keddmetperc betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas keddmetperc betöltése

        const keddmetperc = await db.run(`
            SELECT   mettol_perc
            WHERE    ID = 2
            FROM     nyilvantartas
        `)

        return keddmetperc
    }

        /**
     * Betölti a nyilvántartás meddig_ora.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasmeddig_ora() {

        console.log(`nyilvántartás meddig_ora betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas meddig_ora betöltése

        const keddmedora = await db.run(`
            SELECT   meddig_ora
            WHERE    ID = 2
            FROM     nyilvantartas
        `)

        return meddig_ora
    }

        /**
     * Betölti a nyilvántartás keddmedperc.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartaskeddmedperc() {

        console.log(`nyilvántartás keddmedperc betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas adatainak betöltése

        const keddmedperc = await db.run(`
            SELECT   meddig_perc
            WHERE    ID = 2
            FROM     nyilvantartas
        `)

        return keddmedperc
    }

        /**
     * Betölti a nyilvántartás keddes.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartaskeddes() {

        console.log(`nyilvántartás keddes betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas keddes betöltése

        const keddes = await db.run(`
            SELECT   esemeny
            WHERE    ID = 2
            FROM     nyilvantartas
        `)

        return keddes
    }

        /**
     * Betölti a nyilvántartás szerdametora.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasszerdametora() {

        console.log(`nyilvántartás szerdametora betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas szerdametora betöltése

        const szerdametora = await db.run(`
            SELECT   mettol_ora
            WHERE    ID = 3
            FROM     nyilvantartas
        `)

        return szerdametora
    }

        /**
     * Betölti a nyilvántartás szerdametperc.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasszerdametperc() {

        console.log(`nyilvántartás szerdametperc betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas szerdametperc betöltése

        const szerdametperc = await db.run(`
            SELECT   mettol_perc
            WHERE    ID = 3
            FROM     nyilvantartas
        `)

        return szerdametperc
    }

        /**
     * Betölti a nyilvántartás szerdamedora.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasszerdamedora() {

        console.log(`nyilvántartás szerdamedora betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas szerdamedora betöltése

        const szerdamedora = await db.run(`
            SELECT   meddig_ora
            WHERE    ID = 3
            FROM     nyilvantartas
        `)

        return szerdamedora
    }

        /**
     * Betölti a nyilvántartás szerdamedperc.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasszerdamedperc() {

        console.log(`nyilvántartás szerdamedperc betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas adatainak betöltése

        const szerdamedperc = await db.run(`
            SELECT   meddig_perc
            WHERE    ID = 3
            FROM     nyilvantartas
        `)

        return szerdamedperc
    }

        /**
     * Betölti a nyilvántartás szerdaes.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasszerdaes() {

        console.log(`nyilvántartás szerdaes betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas szerdaes betöltése

        const szerdaes = await db.run(`
            SELECT   esemeny
            WHERE    ID = 3
            FROM     nyilvantartas
        `)

        return szerdaes
    }

        /**
     * Betölti a nyilvántartás csuturtokmetora.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartascsuturtokmetora() {

        console.log(`nyilvántartás csuturtokmetora betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas csuturtokmetora betöltése

        const csuturtokmetora = await db.run(`
            SELECT   mettol_ora
            WHERE    ID = 4
            FROM     nyilvantartas
        `)

        return csuturtokmetora
    }

        /**
     * Betölti a nyilvántartás csutortokmetperc.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartascsutortokmetperc() {

        console.log(`nyilvántartás csutortokmetperc betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas csutortokmetperc betöltése

        const csutortokmetperc = await db.run(`
            SELECT   mettol_perc
            WHERE    ID = 4
            FROM     nyilvantartas
        `)

        return csutortokmetperc
    }

        /**
     * Betölti a nyilvántartás csutortokmedora.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartascsutortokmedora() {

        console.log(`nyilvántartás csutortokmedora betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas csutortokmedora betöltése

        const csutortokmedora = await db.run(`
            SELECT   meddig_ora
            WHERE    ID = 4
            FROM     nyilvantartas
        `)

        return csutortokmedora
    }

        /**
     * Betölti a nyilvántartás csutortokmedperc.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartascsutortokmedperc() {

        console.log(`nyilvántartás csutortokmedperc betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas csutortokmedperc betöltése

        const csutortokmedperc = await db.run(`
            SELECT   meddig_perc
            WHERE    ID = 4
            FROM     nyilvantartas
        `)

        return csutortokmedperc
    }

        /**
     * Betölti a nyilvántartás csutortokes.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartascsutortokes() {

        console.log(`nyilvántartás csutortokes betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas csutortokes betöltése

        const csutortokes = await db.run(`
            SELECT   esemeny
            WHERE    ID = 4
            FROM     nyilvantartas
        `)

        return csutortokes
    }

        /**
     * Betölti a nyilvántartás pentekmetora.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartaspentekmetora() {

        console.log(`nyilvántartás pentekmetora betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas adatainak betöltése

        const pentekmetora = await db.run(`
            SELECT   mettol_ora
            WHERE    ID = 5
            FROM     nyilvantartas
        `)

        return pentekmetora
    }

        /**
     * Betölti a nyilvántartás pentekmetperc.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartaspentekmetperc() {

        console.log(`nyilvántartás pentekmetperc betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas adatainak betöltése

        const pentekmetperc = await db.run(`
            SELECT   mettol_perc
            WHERE    ID = 5
            FROM     nyilvantartas
        `)

        return pentekmetperc
    }

        /**
     * Betölti a nyilvántartás pentekmedora.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartaspentekmedora() {

        console.log(`nyilvántartás pentekmedora betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas adatainak betöltése

        const pentekmedora = await db.run(`
            SELECT   meddig_ora
            WHERE    ID = 5
            FROM     nyilvantartas
        `)

        return pentekmedora
    }

        /**
     * Betölti a nyilvántartás pentekmedperc.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartaspentekmedperc() {

        console.log(`nyilvántartás pentekmedperc betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas pentekmedperc betöltése

        const pentekmedperc = await db.run(`
            SELECT   meddig_perc
            WHERE    ID = 5
            FROM     nyilvantartas
        `)

        return pentekmedperc
    }

        /**
     * Betölti a nyilvántartás pentekes.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartaspentekes() {

        console.log(`nyilvántartás pentekes betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas pentekes betöltése

        const pentekes = await db.run(`
            SELECT   esemeny
            WHERE    ID = 5
            FROM     nyilvantartas
        `)

        return pentekes
    }

        /**
     * Betölti a nyilvántartás szombatmetora.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasszombatmetora() {

        console.log(`nyilvántartás szombatmetora betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas szombatmetora betöltése

        const szombatmetora = await db.run(`
            SELECT   mettol_ora
            WHERE    ID = 6
            FROM     nyilvantartas
        `)

        return szombatmetora
    }

        /**
     * Betölti a nyilvántartás szombatmetperc.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasszombatmetperc() {

        console.log(`nyilvántartás szombatmetperc betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas szombatmetperc betöltése

        const szombatmetperc = await db.run(`
            SELECT   mettol_perc
            WHERE    ID = 6
            FROM     nyilvantartas
        `)

        return szombatmetperc
    }

        /**
     * Betölti a nyilvántartás szombatmedora.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasszombatmedora() {

        console.log(`nyilvántartás szombatmedora betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas adatainak betöltése

        const szombatmedora = await db.run(`
            SELECT   meddig_ora
            WHERE    ID = 6
            FROM     nyilvantartas
        `)

        return szombatmedora
    }

        /**
     * Betölti a nyilvántartás szombatmedperc.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasszombatmedperc() {

        console.log(`nyilvántartás szombatmedperc betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas szombatmedperc betöltése

        const szombatmedperc = await db.run(`
            SELECT   meddig_perc
            WHERE    ID = 6
            FROM     nyilvantartas
        `)

        return szombatmedperc
    }

        /**
     * Betölti a nyilvántartás szombates.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasszombates() {

        console.log(`nyilvántartás szombates betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas szombates betöltése

        const szombates = await db.run(`
            SELECT   esemeny
            WHERE    ID = 6
            FROM     nyilvantartas
        `)

        return szombates
    }

        /**
     * Betölti a nyilvántartás vasarnapmetora.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasvasarnapmetora() {

        console.log(`nyilvántartás vasarnapmetora betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas vasarnapmetora betöltése

        const vasarnapmetora = await db.run(`
            SELECT   mettol_ora
            WHERE    ID = 7
            FROM     nyilvantartas
        `)

        return vasarnapmetora
    }

        /**
     * Betölti a nyilvántartás vasarnapmetperc.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasvasarnapmetperc() {

        console.log(`nyilvántartás vasarnapmetperc betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas vasarnapmetperc betöltése

        const vasarnapmetperc = await db.run(`
            SELECT   mettol_perc
            WHERE    ID = 7
            FROM     nyilvantartas
        `)

        return vasarnapmetperc
    }

        /**
     * Betölti a nyilvántartás vasarnapmedora.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasvasarnapmedora() {

        console.log(`nyilvántartás vasarnapmedora betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas vasarnapmedora betöltése

        const vasarnapmedora = await db.run(`
            SELECT   meddig_ora
            WHERE    ID = 7
            FROM     nyilvantartas
        `)

        return vasarnapmedora
    }

        /**
     * Betölti a nyilvántartás vasarnapmedperc.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasvasarnapmedperc() {

        console.log(`nyilvántartás vasarnapmedperc betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas vasarnapmedperc betöltése

        const vasarnapmedperc = await db.run(`
            SELECT   meddig_perc
            WHERE    ID = 7
            FROM     nyilvantartas
        `)

        return vasarnapmedperc
    }

        /**
     * Betölti a nyilvántartás vasarnapes.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadNyilvantartasvasarnapes() {

        console.log(`nyilvántartás vasarnapes betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Nyilvántartas vasarnapes betöltése

        const vasarnapes = await db.run(`
            SELECT   esemeny
            WHERE    ID = 7
            FROM     nyilvantartas
        `)

        return vasarnapes
    }
    // -------------------------------------------feltét-------------------------------------
    /**
     * Betölti a feltét listáját.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadFeltetnev() {

        console.log(`felétnév betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Feltét betöltése

        const feltetnev = await db.run(`
            SELECT   feltet_nev
            FROM     feltet
            ORDER BY ID
        `)

        // Feltétek nevét visszaadása

        return feltetnev
       
    }
    static async loadFeltetar() {

        console.log(`felétár betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Feltét betöltése
        const feltetar = await db.run(`
            SELECT   feltet_ar
            FROM     feltet
            ORDER BY ID
        `)
         // Feltétek árát visszaadása

         return feltetar
    }
    //----------------------------------------étlap----------------------------------------
    /**
     * Betölti a étlap listáját.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadEtlap1() {

        console.log(`étlap 1 betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // etlap1 betöltése

        const etlap1 = await db.run(`
            SELECT   etlap2_nev, etlap2_kep, etlap2_ar, etlap2_leiras
            FROM     etlap
            WHERE    tipus = 1;
            ORDER BY ID
        `)

        // Etlap1 visszaadása

        return etlap1
       
    }
    /**
     * Betölti a étlap2 listáját.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadEtlap2() {

        console.log(`étlap 2 betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // etlap2 betöltése

        const etlap2 = await db.run(`
            SELECT   etlap2_nev, etlap2_kep, etlap2_ar, etlap2_leiras
            FROM     etlap
            WHERE    tipus = 2;
            ORDER BY ID
        `)

        // Etlap2 visszaadása

        return etlap2
       
    }
    /**
     * Betölti a étlap3 listáját.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadEtlap3() {

        console.log(`étlap 3 betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // etlap3 betöltése

        const etlap3 = await db.run(`
            SELECT   etlap2_nev, etlap2_kep, etlap2_ar, etlap2_leiras
            FROM     etlap
            WHERE    tipus = 3;
            ORDER BY ID
        `)

        // Etlap3 visszaadása

        return etlap3
       
    }
    /**
     * Betölti a étlap4 listáját.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadEtlap4() {

        console.log(`étlap 4 betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // etlap4 betöltése

        const etlap4 = await db.run(`
            SELECT   etlap2_nev, etlap2_kep, etlap2_ar, etlap2_leiras
            FROM     etlap
            WHERE    tipus = 4;
            ORDER BY ID
        `)

        // Etlap4 visszaadása

        return etlap4
       
    }
    /**
     * Betölti a étlap5 listáját.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadEtlap5() {

        console.log(`étlap5 betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // etlap5 betöltése

        const etlap5 = await db.run(`
            SELECT   etlap2_nev, etlap2_kep, etlap2_ar, etlap2_leiras
            FROM     etlap
            WHERE    tipus = 5;
            ORDER BY ID
        `)

        // Etlap5 visszaadása

        return etlap5
       
    }
    /**
     * Betölti a étlap6 listáját.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadEtlap6() {

        console.log(`étlap6 betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // etlap6 betöltése

        const etlap6 = await db.run(`
            SELECT   etlap2_nev, etlap2_kep, etlap2_ar, etlap2_leiras
            FROM     etlap
            WHERE    tipus = 1;
            ORDER BY ID
        `)

        // Etlap6 visszaadása

        return etlap6
       
    }
    //----------------------------------------tétel----------------------------------------
    
    /**
     * Betölti a tétel listáját.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadTetelek() {

        console.log(`Tétel betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Tétel betöltése ------------------------------------------------------------------------------------------------kérdéses

        const tetel = await db.run(`
            SELECT   *
            FROM     etlap
            WHERE etlap2_ID = ?
            
        `, [etlap_ID])
        
        // tétel visszaadása

        return tetel
    }

    /**
     * Menti a megadott tételt.
     * 
     * @param   {Object}    tetel    mentendő tetel
     * @returns {Promise}   promise Promise objektum
     */

    static async saveTetel(tetel) {

        console.log(`tétel mentése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Tétel mentése

        const ment = await db.run(`
            SELECT   tetel_ID
            FROM     tetel
            WHERE    tetel_ID = "${tetel.tetel_ID}"
        `)

        if (ment && ment.length === 1) { //---------------------------------------------------------Ez sem néz ki valami jól
            await db.run(`
                UPDATE   tetel
                    SET  felhasznalo_ID = "${tetel.felhasznalo_ID}",
                         etlap2_ID = "${tetel.etlap2_ID}",
                         feltet = "${tetel.feltet_ID}",
                         db = "${tetel.db}"
                WHERE    tetel_ID = "${tetel.tetel_ID}"
            `)
        } else {
            await db.run(`
                INSERT INTO tetel(felhasznalo_ID, etlap2_ID, feltet, db) VALUES (
                    "${tetel.felhasznalo_ID}",
                    "${tetel.etlap2_ID}",
                    "${tetel.feltet_ID}",
                    "${tetel.db}"
                )
        `)
        }
    }

    /**
     * Törli a megadott Tételt.
     * 
     * @param   {Object}    tetel    törlendő felhasználó
     * @returns {Promise}   promise Promise objektum
     */

    static async deleteTetel(tetel) {

        console.log(`Tétel törlése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        await db.run(`
                DELETE FROM tetel
                WHERE    tetel_ID = "${tetel.tetel_ID}"
            `)
    }
    //----------------------------------------kosár----------------------------------------
    
    /**
     * Betölti a kosarat listáját.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadKosar() {

        console.log(`Kosár betöltése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Kosár betöltése ------------------------------------------------------------------------------------------------kérdéses

        const kosar = await db.run(`
            SELECT   *
            FROM     tetel
            WHERE tetel_ID = ?
            
        `, [tetel_ID])
        
        // Kosár visszaadása

        return kosar
    }

    /**
     * Menti a megadott Kosarat.
     * 
     * @param   {Object}    kosar    mentendő tetel
     * @returns {Promise}   promise Promise objektum
     */

    static async saveKosar(kosar) {

        console.log(`kosar mentése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Kosár mentése

        const mentk = await db.run(`
            SELECT   kosar_ID
            FROM     kosar
            WHERE    kosar_ID = "${kosar.kosar_ID}"
        `)

        if (menk && mentk.length === 1) { //---------------------------------------------------------Ez sem néz ki valami jól
            await db.run(`
                UPDATE   tetel
                    SET  felhasznalo_ID = "${kosar.felhasznalo_ID}",
                         tetel_ID = "${kosar.tetel_ID}",
                         idopont = "${kosar.idopont}",
                WHERE    kosar_ID = "${kosar.kosar_ID}"
            `)
        } else {
            await db.run(`
                INSERT INTO kosar(felhasznalo_ID, kosar_ID, idopont) VALUES (
                    "${kosar.felhasznalo_ID}",
                    "${kosar.tetel_ID}",
                    "${kosar.idopont}"
                )
        `)
        }
    }

    /**
     * Törli a megadott Kosarat.
     * 
     * @param   {Object}    kosar    törlendő felhasználó
     * @returns {Promise}   promise Promise objektum
     */

    static async deleteKosar(kosar) {

        console.log(`Kosar törlése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        await db.run(`
                DELETE FROM kosar
                WHERE    kosar_ID = "${kosar.kosar_ID}"
            `)
    }
    //------------------------------------cím------------------------------------
    /**
     * Betölti a cim listáját.
     * 
     * @returns {Promise}   promise promise objektum
     */

    static async loadCim() {

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // cim betöltése ------------------------------------------------------------------------------------------------kérdéses

        const cim = await db.run(`
        SELECT   cim_ID, iranyito_sz, telepules_nev, telepules_utca, hazszam, emelet, ajto_szam
        FROM     cim
        ORDER BY cim_ID`)
        
        // Cim visszaadása

        return cim
    }
    /**
     * Menti a megadott cimet.
     * 
     * @param   {Object}    cim mentendő tantárgy
     * @returns {Promise}   promise Promise objektum
     */

    static async saveCim(tetel) {

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        // Cim mentése

        const mentc = await db.run(`
            SELECT   cim_ID
            FROM     cim
            WHERE    cim_ID = "${cim.cim_ID}"
        `)

        if (mentc && mentc.length === 1) {
            await db.run(`
                UPDATE   cim
                    SET  iranyito_sz = "${cim.iranyito_sz}",
                         telepules_nev = "${cim.telepules_nev}",
                         telepules_utca = "${cim.telepules_utca}",
                         hazszam = "${cim.hazszam}",
                         emelet = "${cim.emelet}",
                         ajto_szam = "${cim.ajto_szam}"
                WHERE    ID = "${cim.cim_ID}"
            `)
        } else {
            await db.run(`
                INSERT INTO cim(iranyito_sz, telepules_nev, telepules_utca, hazszam, emelet, ajto_szam) VALUES (
                    "${cim.iranyito_sz}",
                    "${cim.telepules_nev}",
                    "${cim.telepules_utca}",
                    "${cim.hazszam}",
                    "${cim.emelet}",
                    "${cim.ajto_szam}"
                )
            `)
        }
    }

    /**
     * Törli a megadott tantárgyat.
     * 
     * @param   {Object}    cim    törlendő felhasználó
     * @returns {Promise}   promise Promise objektum
     */

    static async deleteCim(cim) {

        console.log(`cim törlése`)

        // Inicializálás

        const db = new Database(
            config.db.host,
            config.db.port,
            config.db.user,
            config.db.password,
            config.db.dbname
        )

        await db.run(`
                DELETE FROM cim
                WHERE    ID = "${cim.cim_ID}"
            `)
    }
}