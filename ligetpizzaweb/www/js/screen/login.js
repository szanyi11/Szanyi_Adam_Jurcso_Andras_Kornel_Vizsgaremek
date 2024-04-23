var currentuser = null
var mode = 'list'

/**
 * Belépő fő függvény.
 */

function start() {
    document.getElementById('uid').focus()
}

/**
 * Ellenőri, hogy a leütött billentyű az ENTER -e és ha igen,
 * akkor a következő mezőre navigál.
 * 
 * @param {Event}   event   esemény objektum
 */

function onENTER(event, field) {

    // ENTER billentyűt nyomtunk?

    if (event.keyCode === 13) {

        // Ugrás a megadott mezőre

        if (field) {
            document.getElementById(field).focus()
        } else {

            // Bejelentkezés

            login()
        }
    }
}

/**
 * Esemény, ami akkor fut le, ha a bejelentkező képernyőn a BELÉP gombot
 * megnyomták.
 */

async function login() {

    // Felhasználó authentikációja

    const user = await Service.login(
        document.getElementById('uid').value,
        document.getElementById('pwd').value
    )

    // Authentikáció sikerességének ellenőrzése
 
    if (user.felhasznalo_nev) {
        document.getElementsByClassName('login')[0].style.display = 'none'
        document.getElementById('felhasznalo_nev').innerText = user.felhasznalo_nev
        document.getElementsByClassName('menubar')[0].style.display = 'flex'
    } else {
        alert('Hibás felhasználói név vagy jelszó')
        document.getElementById('uid').value = ''
        document.getElementById('pwd').value = ''
        document.getElementById('uid').focus()

    }
}

function logout() {
    if (confirm('Biztos, hogy kijelentkezik?')) {
        document.getElementsByClassName('login')[0].style.display = 'flex'
        document.getElementsByClassName('menubar')[0].style.display = 'none'
        document.getElementById('felhasznalo_nev').innerText = ''

        document.getElementsByClassName('usermaintenance')[0].style.display = 'none'
        document.getElementsByClassName('tetelmaintenance')[0].style.display = 'none'

        document.getElementById('uid').value = ''
        document.getElementById('pwd').value = ''
        document.getElementById('uid').focus()
    }
}