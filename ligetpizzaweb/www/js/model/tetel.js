/**
 * Tantárgy osztály.
 */

 class Tetel {

    // Tantárgy azonosító
    #id

    // Tantárgy neve
    #tetelname

    /**
     * Létrehoz egy új Tetel objektumot és beállítja az attribútumait.
     * 
     * @param {Number} id           tantárgy azonosító
     * @param {String} tetelname  tantárgy neve
     */

    constructor(id, tetelname) {
        this.#id = id
        this.#tetelname = tetelname
    }

    /**
     * Visszaadja a tantárgy azonosítóját.
     */

    get id() {
        return this.#id
    }

    /**
     * Beállítja a tantárgy azonosítóját.
     */

    set id(id) {
        this.#id = id
    }

    /**
     * Visszaadja a tantárgy nevét.
     */

    get tetelname() {
        return this.#tetelname
    }

    /**
     * Beállítja a tantárgy nevét.
     */

    set tetelname(tetelname) {
        this.#tetelname = tetelname
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

            // A két objektum azonos típusú és a tantárgy azonosítójuk
            // megegyezik?

            if (object && object instanceof tetel && object.id === this.#id) {

                // A két objektumot egyformának tekintjük

                return true
            }
        } catch(error) {
            // Nincs hibakezelés
        }

        return false
    }

    /**
     * Konvertálja a Tetel objektumot JSON objetummá.
     * 
     * @returns     {Object}    json    tetel JSON verziója
     */

    toJSON() {
        return { 
            ID:             this.#id,
            TETELNAME:    this.#tetelname
        }
    }

    /**
     * Konvertálja a Tetel objektumot string -é.
     * 
     * @returns     {String}    text    Tetel string verziója
     */

    toString() {
        return `ID: ${this.#id}, Név: ${this.#tetelname}`
    }
}
