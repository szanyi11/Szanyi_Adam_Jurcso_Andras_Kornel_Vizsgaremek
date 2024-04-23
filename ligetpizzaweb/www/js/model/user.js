/**
 * Felhasználó osztály.
 */

class User {

    // Felhasználói azonosító
    #uid

    // Felhasználó neve
    #username

    // Felhasználó jelszava
    #password

    // Aktív felhasználó?
    #active = true

    /**
     * Létrehoz egy új User objektumot és beállítja az attribútumait.
     * 
     * @param {String} uid          felhasználói azonosító
     * @param {String} username     felhasználó neve
     * @param {String} password     felhasználó jelszava
     * @param {Number} active       aktív felhasználó?
     */

    constructor(uid, username, password, active) {
        this.#uid = uid
        this.#username = username
        this.#password = password
        this.#active = active
    }

    /**
     * Visszaadja a felhasználói azonosítóját.
     */

    get uid() {
        return this.#uid
    }

    /**
     * Beállítja a felhasználói azonosítóját.
     */

    set uid(uid) {
        this.#uid = uid
    }

    /**
     * Visszaadja a felhasználó nevét.
     */

    get username() {
        return this.#username
    }

    /**
     * Beállítja a felhasználó nevét.
     */

    set username(username) {
        this.#username = username
    }

    /**
     * Visszaadja a felhasználó jelszavát.
     */

    get password() {
        return this.#password
    }

    /**
     * Beállítja a felhasználó jelszavát.
     */

    set password(password) {
        this.#password = password
    }

    /**
     * Visszaadja, hogy a felhasználó aktív-e.
     */

    get active() {
        return this.#active
    }

    /**
     * Beállítja, hogy a felhasználó aktív-e.
     */

    set active(active) {
        this.#password = active
    }

    /**
     * Összehasonlítja a jelenlegi objektumot a megadottal és igazat ad
     * vissza, ha a két objektum egyforma és hamisat ha nem.
     * 
     * @param   {Any}       object  objektum, amivel össze kell hasonlítani
     * @returns {Boolean}   result  a két objektum egyforma vagy sem
     */

    equals(object) {
        try {

            // A két objektum azonos típusú és a felhasználói azonosítójuk
            // megegyezik?

            if (object && object instanceof User && object.uid === this.#uid) {

                // A két objektumot egyformának tekintjük

                return true
            }
        } catch(error) {
            // Nincs hibakezelés
        }

        return false
    }

    /**
     * Konvertálja a User objektumot JSON objetummá.
     * 
     * @returns     {Object}    json    User JSON verziója
     */

    toJSON() {
        return { 
            UID:        this.#uid,
            USERNAME:   this.#username,
            PWD:        this.#password,
            ACTIVE:     this.#active
        }
    }

    /**
     * Konvertálja a User objektumot string -é.
     * 
     * @returns     {String}    text    User string verziója
     */

    toString() {
        return `UID: ${this.#uid}, Név: ${this.#username}`
    }
}
