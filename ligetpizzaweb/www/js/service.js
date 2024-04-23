/**
 * Üzleti funkciók osztálya.
 */

class Service {

    /**
     * Bejelentkezteti a megadott felhasználói azonosítóval és jelszóval
     * a felhasználót és sikeresen authentikáció esetén visszaadja a
     * felhasználó nevét. Sikertelen bejelentkezéskor null értékkel tér
     * vissza.
     * 
     * @param   {String}    uid     felhasználói azonosító
     * @param   {String}    pwd     felhasználó jelszava
     * @returns {Promise}   promise Promise objektum
     */

    static login(uid, pwd) {

        // Promise objektum visszaadása

        return new Promise((resolve, reject) => {
            
            // Adatok előkészítése

            const data = JSON.stringify({ 
                action:         'login', 
                uid:            uid,
                password:       pwd
            })
        
            // POST kérés elküldése

            fetch('/api', { 
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json; charset=utf-8',
                    'Content-Length': data.length
                },
                body: data
            }).then(response => response.json()).then((data) => {

                // Eredmény visszaadása

                resolve(new User(uid, data.name, pwd, true))
            }).catch((error) => {

                // Hiba történt

                reject(error)
            })
        })
    }

    /**
     * Betölti a felhasználók listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

    static loadUsers() {

        // Promise objektum visszaadása

        return new Promise((resolve, reject) => {
            
            // Adatok előkészítése

            const data = JSON.stringify({ 
                action:         'loadusers'
            })
        
            // POST kérés elküldése

            fetch('/api', { 
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json; charset=utf-8',
                    'Content-Length': data.length
                },
                body: data
            }).then(response => response.json()).then((data) => {
                const users = []

                for (const d of data) {
                    users.push(new User(d.UID, d.USERNAME, d.PWD, d.ACTIVE))
                }

                
                // Eredmény visszaadása

                resolve(users)
            }).catch((error) => {

                // Hiba történt

                reject(error)
            })
        })
    }

    /**
     * Menti a megadott felhasználót.
     * 
     * @param   {User}      user    mentendő felhasználó
     * @returns {Promise}   promise Promise objektum
     */

    static saveUser(user) {

        // Promise objektum visszaadása

        return new Promise((resolve, reject) => {
            
            // Adatok előkészítése

            const data = JSON.stringify({ 
                action:         'saveuser', 
                user:           user.toJSON()
            })
        
            // POST kérés elküldése

            fetch('/api', { 
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json; charset=utf-8',
                    'Content-Length': data.length
                },
                body: data
            }).then(response => response.json()).then((data) => {

                // Eredmény visszaadása

                resolve(true)
            }).catch((error) => {

                // Hiba történt

                reject(error)
            })
        })
    }    

    /**
     * Törli a megadott felhasználót.
     * 
     * @param   {User}      user    törlendő felhasználó
     * @returns {Promise}   promise Promise objektum
     */

    static deleteUser(user) {

        // Promise objektum visszaadása

        return new Promise((resolve, reject) => {
            
            // Adatok előkészítése

            const data = JSON.stringify({ 
                action:         'deleteuser', 
                user:           user.toJSON()
            })
        
            // POST kérés elküldése

            fetch('/api', { 
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json; charset=utf-8',
                    'Content-Length': data.length
                },
                body: data
            }).then(response => response.json()).then((data) => {

                // Eredmény visszaadása

                resolve(true)
            }).catch((error) => {

                // Hiba történt

                reject(error)
            })
        })
    }

    /**
     * Beállít egy új jelszót a megadott felhasználónak.
     * 
     * @param   {User}      user        felhasználó
     * @param   {String}    password    felhasználó jelszava
     * @returns {Promise}   promise Promise objektum
     */

    static newPassword(user, password) {

        // Promise objektum visszaadása

        return new Promise((resolve, reject) => {
            
            // Adatok előkészítése

            const data = JSON.stringify({ 
                action:         'newpassword', 
                user:           user.toJSON(),
                password:       password
            })
        
            // POST kérés elküldése

            fetch('/api', { 
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json; charset=utf-8',
                    'Content-Length': data.length
                },
                body: data
            }).then(response => response.json()).then((data) => {

                // Eredmény visszaadása

                resolve(true)
            }).catch((error) => {

                // Hiba történt

                reject(error)
            })
        })
    }


    /**
     * Betölti a telefonszam listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadPizzeriatelefon() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadpizzeriatelefon'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const telefon = []

            for (const d of data) {
                telefon.push(new Subject(d.telefonszam))
            }
            
            // Eredmény visszaadása

            resolve(telefon)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a email listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadPizzeriaemail() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadpizzeriaemail'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const emails = []

            for (const d of data) {
                emails.push(new Subject(d.email))
            }
            
            // Eredmény visszaadása

            resolve(emails)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a információk listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadPizzeriainformaciok() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadpizzeriainformaciok'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const info = []

            for (const d of data) {
                info.push(new Subject(d.informaciok))
            }
            
            // Eredmény visszaadása

            resolve(info)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a akciok listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadPizzeriaakciok() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadpizzeriaakciok'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const akc = []

            for (const d of data) {
                akc.push(new Subject(d.akciok))
            }
            
            // Eredmény visszaadása

            resolve(akc)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a rólunk listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadPizzeriarolunk() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadpizzeriarolunk'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const rol = []

            for (const d of data) {
                rol.push(new Subject(d.rolunk))
            }
            
            // Eredmény visszaadása

            resolve(rol)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a telephely listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadPizzeriatelephely() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadpizzeriatelephely'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const telep = []

            for (const d of data) {
                telep.push(new Subject(d.telephely))
            }
            
            // Eredmény visszaadása

            resolve(telep)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a aszf listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadPizzeriaaszf() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadpizzeriaaszf'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const alt = []

            for (const d of data) {
                alt.push(new Subject(d.aszf))
            }
            
            // Eredmény visszaadása

            resolve(alt)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
//-----------------------------------------nyitvatartás-----------------------------------------
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartashetfometora() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartashetfometora'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ora = []

            for (const d of data) {
                ora.push(new Subject(d.mettol_ora))
            }
            
            // Eredmény visszaadása

            resolve(ora)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartashetfometperc() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartashetfometperc'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const perc = []

            for (const d of data) {
                perc.push(new Subject(d.mettol_perc))
            }
            
            // Eredmény visszaadása

            resolve(perc)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartashetfomedora() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartashetfomedora'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ora = []

            for (const d of data) {
                ora.push(new Subject(d.meddig_ora))
            }
            
            // Eredmény visszaadása

            resolve(ora)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartashetfomedperc() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartashetfomedperc'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const perc = []

            for (const d of data) {
                perc.push(new Subject(d.meddig_perc))
            }
            
            // Eredmény visszaadása

            resolve(perc)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartashetfoes() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartashetfoes'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ese = []

            for (const d of data) {
                ese.push(new Subject(d.esemeny))
            }
            
            // Eredmény visszaadása

            resolve(ese)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartaskeddmetora() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartaskeddmetora'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ora = []

            for (const d of data) {
                ora.push(new Subject(d.mettol_ora))
            }
            
            // Eredmény visszaadása

            resolve(ora)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartaskeddmetperc() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartaskeddmetperc'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const perc = []

            for (const d of data) {
                perc.push(new Subject(d.mettol_perc))
            }
            
            // Eredmény visszaadása

            resolve(perc)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasmeddig_ora() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasmeddig_ora'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ora = []

            for (const d of data) {
                ora.push(new Subject(d.meddig_ora))
            }
            
            // Eredmény visszaadása

            resolve(ora)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartaskeddmedperc() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartaskeddmedperc'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const perc = []

            for (const d of data) {
                perc.push(new Subject(d.meddig_perc))
            }
            
            // Eredmény visszaadása

            resolve(perc)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartaskeddes() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartaskeddes'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ese = []

            for (const d of data) {
                ese.push(new Subject(d.esemeny))
            }
            
            // Eredmény visszaadása

            resolve(ese)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasszerdametora() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasszerdametora'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ora = []

            for (const d of data) {
                ora.push(new Subject(d.mettol_ora))
            }
            
            // Eredmény visszaadása

            resolve(ora)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasszerdametperc() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasszerdametperc'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const perc = []

            for (const d of data) {
                perc.push(new Subject(d.mettol_perc))
            }
            
            // Eredmény visszaadása

            resolve(perc)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasszerdamedora() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasszerdamedora'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ora = []

            for (const d of data) {
                ora.push(new Subject(d.meddig_ora))
            }
            
            // Eredmény visszaadása

            resolve(ora)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasszerdamedperc() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasszerdamedperc'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const perc = []

            for (const d of data) {
                perc.push(new Subject(d.meddigperc))
            }
            
            // Eredmény visszaadása

            resolve(perc)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasszerdaes() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasszerdaes'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ese = []

            for (const d of data) {
                ese.push(new Subject(d.esemeny))
            }
            
            // Eredmény visszaadása

            resolve(ese)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartascsuturtokmetora() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartascsuturtokmetora'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ora = []

            for (const d of data) {
                ora.push(new Subject(d.mettol_ora))
            }
            
            // Eredmény visszaadása

            resolve(ora)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartascsutortokmetperc() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartascsutortokmetperc'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const perc = []

            for (const d of data) {
                perc.push(new Subject(d.mettol_perc))
            }
            
            // Eredmény visszaadása

            resolve(perc)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartascsutortokmedora() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartascsutortokmedora'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ora = []

            for (const d of data) {
                ora.push(new Subject(d.meddig_ora))
            }
            
            // Eredmény visszaadása

            resolve(ora)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartascsutortokmedperc() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartascsutortokmedperc'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const perc = []

            for (const d of data) {
                perc.push(new Subject(d.meddig_perc))
            }
            
            // Eredmény visszaadása

            resolve(perc)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartascsutortokes() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartascsutortokes'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ese = []

            for (const d of data) {
                ese.push(new Subject(d.esemeny))
            }
            
            // Eredmény visszaadása

            resolve(ese)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadnyilvantartaspentekmetora() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadNyilvantartaspentekmetora'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ora = []

            for (const d of data) {
                ora.push(new Subject(d.mettol_ora))
            }
            
            // Eredmény visszaadása

            resolve(ora)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartaspentekmetperc() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartaspentekmetperc'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const perc = []

            for (const d of data) {
                perc.push(new Subject(d.mettol_perc))
            }
            
            // Eredmény visszaadása

            resolve(perc)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartaspentekmedora() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartaspentekmedora'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ora = []

            for (const d of data) {
                ora.push(new Subject(d.meddig_ora))
            }
            
            // Eredmény visszaadása

            resolve(ora)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartaspentekmedperc() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartaspentekmedperc'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const perc = []

            for (const d of data) {
                perc.push(new Subject(d.meddig_perc))
            }
            
            // Eredmény visszaadása

            resolve(perc)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartaspentekes() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartaspentekes'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const esemeny = []

            for (const d of data) {
                esemeny.push(new Subject(d.esemeny))
            }
            
            // Eredmény visszaadása

            resolve(esemeny)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasszombatmetora() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasszombatmetora'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ora = []

            for (const d of data) {
                ora.push(new Subject(d.mettol_ora))
            }
            
            // Eredmény visszaadása

            resolve(ora)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasszombatmetperc() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasszombatmetperc'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const perc = []

            for (const d of data) {
                perc.push(new Subject(d.mettol_perc))
            }
            
            // Eredmény visszaadása

            resolve(perc)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasszombatmedora() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasszombatmedora'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ora = []

            for (const d of data) {
                ora.push(new Subject(d.meddig_ora))
            }
            
            // Eredmény visszaadása

            resolve(ora)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasszombatmedperc() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasszombatmedperc'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const perc = []

            for (const d of data) {
                perc.push(new Subject(d.meddig_perc))
            }
            
            // Eredmény visszaadása

            resolve(perc)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasszombates() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasszombates'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ese = []

            for (const d of data) {
                ese.push(new Subject(d.esemeny))
            }
            
            // Eredmény visszaadása

            resolve(ese)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasvasarnapmetora() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasvasarnapmetora'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ora = []

            for (const d of data) {
                ora.push(new Subject(d.mettol_ora))
            }
            
            // Eredmény visszaadása

            resolve(ora)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasvasarnapmetperc() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasvasarnapmetperc'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const perc = []

            for (const d of data) {
                perc.push(new Subject(d.mettol_perc))
            }
            
            // Eredmény visszaadása

            resolve(perc)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasvasarnapmedora() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasvasarnapmedora'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ora = []

            for (const d of data) {
                ora.push(new Subject(d.meddig_ora))
            }
            
            // Eredmény visszaadása

            resolve(ora)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasvasarnapmedperc() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasvasarnapmedperc'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const perc = []

            for (const d of data) {
                perc.push(new Subject(d.meddig_perc))
            }
            
            // Eredmény visszaadása

            resolve(perc)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a nyitvatartás részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadNyilvantartasvasarnapes() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadnyilvantartasvasarnapes'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ese = []

            for (const d of data) {
                ese.push(new Subject(d.esemeny))
            }
            
            // Eredmény visszaadása

            resolve(ese)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
//----------------------------------------feltét----------------------------------------
/**
     * Betölti a feltét listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadFeltetnev() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadfeltetnev'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const nev = []

            for (const d of data) {
                nev.push(new Subject(d.feltet_nev))
            }
            
            // Eredmény visszaadása

            resolve(nev)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a feltét listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadFeltetar() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadfeltetar'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ar = []

            for (const d of data) {
                ar.push(new Subject(d.feltet_ar))
            }
            
            // Eredmény visszaadása

            resolve(ar)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
//----------------------------------------Étlap----------------------------------------
/**
     * Betölti a étlap részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadEtlap1() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadetlap1'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const etlap = []

            for (const d of data) {
                etlap.push(new Subject(d.etlap2_nev, d.etlap2_nev, d.etlap2_kep, d.etlap2_ar, d.etlap2_leiras)) // ID és tipus hiányzik, mert azokat nem kérdezem le
            }
            
            // Eredmény visszaadása

            resolve(etlap)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a étlap részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadEtlap2() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadetlap2'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ar = []

            for (const d of data) {
                ar.push(new Subject(d.etlap2_nev, d.etlap2_nev, d.etlap2_kep, d.etlap2_ar, d.etlap2_leiras))
            }
            
            // Eredmény visszaadása

            resolve(ar)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a étlap részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadEtlap3() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadetlap3'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ar = []

            for (const d of data) {
                ar.push(new Subject(d.etlap2_nev, d.etlap2_nev, d.etlap2_kep, d.etlap2_ar, d.etlap2_leiras))
            }
            
            // Eredmény visszaadása

            resolve(ar)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a étlap részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadEtlap4() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadetlap4'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ar = []

            for (const d of data) {
                ar.push(new Subject(d.etlap2_nev, d.etlap2_nev, d.etlap2_kep, d.etlap2_ar, d.etlap2_leiras))
            }
            
            // Eredmény visszaadása

            resolve(ar)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
/**
     * Betölti a étlap részének listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadEtlap5() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadetlap5'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ar = []

            for (const d of data) {
                ar.push(new Subject(d.etlap2_nev, d.etlap2_nev, d.etlap2_kep, d.etlap2_ar, d.etlap2_leiras))
            }
            
            // Eredmény visszaadása

            resolve(ar)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
static loadEtlap6() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadetlap6'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const ar = []

            for (const d of data) {
                ar.push(new Subject(d.etlap2_nev, d.etlap2_nev, d.etlap2_kep, d.etlap2_ar, d.etlap2_leiras))
            }
            
            // Eredmény visszaadása

            resolve(ar)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}
//----------------------------------------Tétel----------------------------------------
    /**
     * Betölti a tétel listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

     static loadTetelek() {

        // Promise objektum visszaadása

        return new Promise((resolve, reject) => {
            
            // Adatok előkészítése

            const data = JSON.stringify({ 
                action:         'loadtetelek'
            })
        
            // POST kérés elküldése

            fetch('/api', { 
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json; charset=utf-8',
                    'Content-Length': data.length
                },
                body: data
            }).then(response => response.json()).then((data) => {
                const tetelek = []

                for (const d of data) {
                    tetelek.push(new Subject(d.tetel_ID, d.felhasznalo_ID, d.etlap2_ID, d.feltet_ID, d.dab))
                }
                
                // Eredmény visszaadása

                resolve(tetelek)
            }).catch((error) => {

                // Hiba történt

                reject(error)
            })
        })
    }

    /**
     * Menti a megadott tételt.
     * 
     * @param   {Tetel}   tetel     mentendő tantárgy
     * @returns {Promise}   promise     Promise objektum
     */

     static saveTetel(tetel) {

        // Promise objektum visszaadása

        return new Promise((resolve, reject) => {
            
            // Adatok előkészítése

            const data = JSON.stringify({ 
                action:         'savetetel', 
                tetel:        tetel.toJSON()
            })
        
            // POST kérés elküldése

            fetch('/api', { 
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json; charset=utf-8',
                    'Content-Length': data.length
                },
                body: data
            }).then(response => response.json()).then((data) => {

                // Eredmény visszaadása

                resolve(true)
            }).catch((error) => {

                // Hiba történt

                reject(error)
            })
        })
    }

    /**
     * Törli a megadott tételt.
     * 
     * @param   {Tetel}   tetel     törlendő tétel
     * @returns {Promise}   promise     Promise objektum
     */

     static deleteTetel(tetel) {

        // Promise objektum visszaadása

        return new Promise((resolve, reject) => {
            
            // Adatok előkészítése

            const data = JSON.stringify({ 
                action:         'deletetetel', 
                tetel:        tetel.toJSON()
            })
        
            // POST kérés elküldése

            fetch('/api', { 
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json; charset=utf-8',
                    'Content-Length': data.length
                },
                body: data
            }).then(response => response.json()).then((data) => {

                // Eredmény visszaadása

                resolve(true)
            }).catch((error) => {

                // Hiba történt

                reject(error)
            })
        })
    }
    //----------------------------------------Kosár----------------------------------------
    /**
     * Betölti a kosár listáját.
     * 
     * @returns {Promise}   promise Promise objektum
     */

static loadKosar() {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'loadkosar'
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {
            const kosar = []

            for (const d of data) {
                kosar.push(new Subject(d.kosar_ID, d.felhasznalo_ID, d.tetel_ID, idopont))
            }
            
            // Eredmény visszaadása

            resolve(kosar)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}

/**
 * Menti a megadott kosarat.
 * 
 * @param   {Subject}   kosar     mentendő tantárgy
 * @returns {Promise}   promise     Promise objektum
 */

 static saveKosar(kosar) {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'savekosar', 
            kosar:        kosar.toJSON()
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {

            // Eredmény visszaadása

            resolve(true)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}

/**
 * Törli a megadott kosarat.
 * 
 * @param   {Subject}   kosar     törlendő tantárgy
 * @returns {Promise}   promise     Promise objektum
 */

 static deleteKosar(kosar) {

    // Promise objektum visszaadása

    return new Promise((resolve, reject) => {
        
        // Adatok előkészítése

        const data = JSON.stringify({ 
            action:         'deletekosar', 
            kosar:        kosar.toJSON()
        })
    
        // POST kérés elküldése

        fetch('/api', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': data.length
            },
            body: data
        }).then(response => response.json()).then((data) => {

            // Eredmény visszaadása

            resolve(true)
        }).catch((error) => {

            // Hiba történt

            reject(error)
        })
    })
}


}