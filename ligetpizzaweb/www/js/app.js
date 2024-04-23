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
 
    if (user.name) {
        document.getElementsByClassName('login')[0].style.display = 'none'
        document.getElementById('username').innerText = user.name
        document.getElementsByClassName('menubar')[0].style.display = 'flex'
    } else {
        alert('Hibás felhasználói név vagy jelszó')
        document.getElementById('uid').value = ''
        document.getElementById('pwd').value = ''
        document.getElementById('uid').focus()

    }
}

/**
 * Megjeleníti a felhasználó karbantartó képernyőt.
 */

async function showUserMaintenance() {
    document.getElementsByClassName('usermaintenance')[0].style.display = 'flex'
    await refreshUsers()
}

async function refreshUsers() {
    if (mode === 'list') {
        document.getElementById('user_search').value = ''
        window.users = await Service.loadUsers()
        window.allusers = JSON.parse(JSON.stringify(window.users))
        currentuser = window.users[0]

        redrawUsers()
    }
}

async function redrawUsers() {
    const table = document.getElementById('usertable')

    while (true) {
        const trs = table.getElementsByTagName('tr')

        if (trs.length > 1) {
            trs[1].remove()
        } else {
            break
        }
    }

    for (const u of window.users) {
        const tr = document.createElement('tr')
        tr.addEventListener('click', () => {
            if (mode === 'list') {
                const rows = table.getElementsByTagName('tr')

                for (let i = 1; i < rows.length; i++) {
                    rows[i].style.backgroundColor = 'white'
                }

                tr.style.backgroundColor = 'lightgrey'
                currentuser = u
                refreshUserDeleteButton()
            }
        })

        if (u.UID === currentuser.UID) {
            tr.style.backgroundColor = 'lightgrey'
        }

        const td1 = document.createElement('td')
        td1.innerText = u.UID
        tr.appendChild(td1)

        const td2 = document.createElement('td')
        td2.innerText = u.USERNAME
        tr.appendChild(td2)

        const td3 = document.createElement('td')
        const checkcontainer = document.createElement('div')
        checkcontainer.classList.add('checksymbol')

        if (u.ACTIVE === 1) {
            checkcontainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="24"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>'
        }

        td3.appendChild(checkcontainer)
        tr.appendChild(td3)

        table.appendChild(tr)
    }

    if (window.users.length > 0) {
        document.getElementById('newpassword').removeAttribute('disabled')
        document.getElementById('modifyuser').removeAttribute('disabled')

        refreshUserDeleteButton()
    } else {
        document.getElementById('newpassword').setAttribute('disabled', 'disabled')
        document.getElementById('modifyuser').setAttribute('disabled', 'disabled')
        document.getElementById('deleteuser').setAttribute('disabled', 'disabled')
    }
}

function closeUserMaintenance() {
    document.getElementsByClassName('usermaintenance')[0].style.display = 'none'
}

function usersearch(event) {
    const f = event.target.value.toUpperCase()

    window.users = window.allusers.filter(
        item => item.UID.toUpperCase().includes(f) || item.USERNAME.toUpperCase().includes(f)
    )
    currentuser = window.users[0]
    redrawUsers()
}

function setNewPassword() {
    if (confirm(`Biztos, hogy új jelszót állítasz be a ${currentuser.UID} felhasználónak?`)) {
        const pwd = prompt('Jelszó:')

        if (pwd) {
            Service.newPassword(currentuser, pwd)
        }
    }
}

function refreshUserDeleteButton() {
    if (currentuser.UID === 'ADMIN') {
        document.getElementById('deleteuser').setAttribute('disabled', 'disabled')    
    } else {
        document.getElementById('deleteuser').removeAttribute('disabled')
    }
}

async function deleteUser() {
    if (confirm('Biztos, hogy törlöd a felhasználót?')) {
        Service.deleteUser(currentuser)
        await refreshUsers()
    }
}

function newUser() {
    mode = 'new'
    document.getElementById('newpassword').style.display = 'none'
    document.getElementById('newuser').style.display = 'none'
    document.getElementById('modifyuser').style.display = 'none'
    document.getElementById('deleteuser').style.display = 'none'
    document.getElementById('saveuser').style.display = 'block'
    document.getElementById('canceluser').style.display = 'block'
    document.getElementById('user_search').setAttribute('disabled', 'disabled')

    const table = document.getElementById('usertable')
    const tr = document.createElement('tr')

    const td1 = document.createElement('td')
    const input1 = document.createElement('input')
    input1.id = 'uid'
    td1.appendChild(input1)
    tr.appendChild(td1)

    const td2 = document.createElement('td')
    const input2 = document.createElement('input')
    input2.id = 'username'
    td2.appendChild(input2)
    tr.appendChild(td2)

    const td3 = document.createElement('td')
    const checkbox = document.createElement('input')
    checkbox.id = 'activeuser'
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('checked', 'checked')
    td3.appendChild(checkbox)
    tr.appendChild(td3)

    table.appendChild(tr)

    setTimeout(() => {
        input1.focus()
    }, 20)
}

function modifyuser() {
    mode = 'modify'
    document.getElementById('newpassword').style.display = 'none'
    document.getElementById('newuser').style.display = 'none'
    document.getElementById('modifyuser').style.display = 'none'
    document.getElementById('deleteuser').style.display = 'none'
    document.getElementById('saveuser').style.display = 'block'
    document.getElementById('canceluser').style.display = 'block'
    document.getElementById('user_search').setAttribute('disabled', 'disabled')

    const table = document.getElementById('usertable')
    const trs = table.getElementsByTagName('tr')

    for (let i = 1; i < trs.length; i++) {
        if (trs[i].children[0].innerText === currentuser.UID) {
            const input = document.createElement('input')
            input.setAttribute('value', currentuser.USERNAME)
            input.id = 'username'
            trs[i].children[1].innerHTML = ''
            trs[i].children[1].appendChild(input)

            const checkbox = document.createElement('input') 
            checkbox.id = 'activeuser'
            checkbox.setAttribute('type', 'checkbox')

            if (currentuser.ACTIVE === 1) {
                checkbox.setAttribute('checked', 'checked')
            }

            trs[i].children[2].innerHTML = ''
            trs[i].children[2].appendChild(checkbox)

            break
        }
    }
}

function saveUser() {
    let uid
    let pwd

    if (mode === 'new') {
        uid = document.getElementById('uid').value
        pwd = '123456'
    } else {
        uid = currentuser.UID
        pwd = currentuser.PWD
    }

    mode = 'list'
    document.getElementById('newpassword').style.display = 'block'
    document.getElementById('newuser').style.display = 'block'
    document.getElementById('modifyuser').style.display = 'block'
    document.getElementById('deleteuser').style.display = 'block'
    document.getElementById('saveuser').style.display = 'none'
    document.getElementById('canceluser').style.display = 'none'
    document.getElementById('user_search').removeAttribute('disabled')

    Service.saveUser({ 
        UID: uid, 
        USERNAME: document.getElementById('username').value,
        PWD: pwd,
        ACTIVE: document.getElementById('activeuser').checked ? 1 : 0
    })

    redrawUsers()
}

function cancelUser() {
    mode = 'list'
    document.getElementById('newpassword').style.display = 'block'
    document.getElementById('newuser').style.display = 'block'
    document.getElementById('modifyuser').style.display = 'block'
    document.getElementById('deleteuser').style.display = 'block'
    document.getElementById('saveuser').style.display = 'none'
    document.getElementById('canceluser').style.display = 'none'
    document.getElementById('user_search').removeAttribute('disabled')

    redrawUsers()
}