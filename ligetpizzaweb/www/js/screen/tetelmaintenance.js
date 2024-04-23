/**
 * Megjeleníti a tantárgy karbantartó képernyőt.
 */

async function showTetelMaintenance() {
    document.getElementsByClassName('tetelmaintenance')[0].style.display = 'flex'
    await refreshTetel()
}

async function refreshTetel() {
    if (mode === 'list') {
        document.getElementById('tetel_search').value = ''
        window.tetel = await Service.loadTetel()
        window.alltetel = []
        for (const s of window.tetel) {
            window.alltetel.push(new Tetel(s.id, s.tetelname))
        }
        
        currenttetel = window.tetel[0]

        redrawTetel()
    }
}

async function redrawTetel() {
    const table = document.getElementById('teteltable')

    while (true) {
        const trs = table.getElementsByTagName('tr')

        if (trs.length > 1) {
            trs[1].remove()
        } else {
            break
        }
    }

    for (const s of window.tetel) {
        const tr = document.createElement('tr')
        tr.addEventListener('click', () => {
            if (mode === 'list') {
                const rows = table.getElementsByTagName('tr')

                for (let i = 1; i < rows.length; i++) {
                    rows[i].style.backgroundColor = 'white'
                }

                tr.style.backgroundColor = 'lightgrey'
                currenttetel = s
                refreshTetelDeleteButton()
            }
        })

        if (s.id === currenttetel.id) {
            tr.style.backgroundColor = 'lightgrey'
        }

        const td1 = document.createElement('td')
        td1.innerText = s.id
        tr.appendChild(td1)

        const td2 = document.createElement('td')
        td2.innerText = s.tetelname
        tr.appendChild(td2)

        table.appendChild(tr)
    }

    if (window.tetel.length > 0) {
        document.getElementById('modifytetel').removeAttribute('disabled')

        refreshTetelDeleteButton()
    } else {
        document.getElementById('modifytetel').setAttribute('disabled', 'disabled')
        document.getElementById('deletetetel').setAttribute('disabled', 'disabled')
    }
}

function closeTetelMaintenance() {
    document.getElementsByClassName('tetelmaintenance')[0].style.display = 'none'
}

function tetelsearch(event) {
    const f = event.target.value.toUpperCase()

    window.tetel = window.alltetel.filter(
        item => item.tetelname.toUpperCase().includes(f)
    )
    currenttetel = window.tetel[0]
    redrawTetel()
}

function refreshTetelDeleteButton() {
    document.getElementById('deletetetel').removeAttribute('disabled')
}

async function deleteTetel() {
    if (confirm('Biztos, hogy törlöd a tételt?')) {
        await Service.deleteTetel(currenttetel)
        await refreshTetel()
    }
}

function newTetel() {
    mode = 'new'
    document.getElementById('newtetel').style.display = 'none'
    document.getElementById('modifytetel').style.display = 'none'
    document.getElementById('deletetetel').style.display = 'none'
    document.getElementById('savetetel').style.display = 'block'
    document.getElementById('canceltetel').style.display = 'block'
    document.getElementById('tetel_search').setAttribute('disabled', 'disabled')

    const table = document.getElementById('teteltable')
    const tr = document.createElement('tr')

    const td1 = document.createElement('td')
    tr.appendChild(td1)

    const td2 = document.createElement('td')
    const input2 = document.createElement('input')
    input2.id = 'tetelname'
    td2.appendChild(input2)
    tr.appendChild(td2)

    table.appendChild(tr)

    setTimeout(() => {
        input1.focus()
    }, 20)
}

function modifyTetel() {
    mode = 'modify'
    document.getElementById('newtetel').style.display = 'none'
    document.getElementById('modifytetel').style.display = 'none'
    document.getElementById('deletetetel').style.display = 'none'
    document.getElementById('savetetel').style.display = 'block'
    document.getElementById('canceltetel').style.display = 'block'
    document.getElementById('tetel_search').setAttribute('disabled', 'disabled')

    const table = document.getElementById('teteltable')
    const trs = table.getElementsByTagName('tr')

    for (let i = 1; i < trs.length; i++) {
        if (trs[i].children[0].innerText == currenttetel.id) {
            const input = document.createElement('input')
            input.setAttribute('value', currenttetel.tetelname)
            input.id = 'tetelname'
            trs[i].children[1].innerHTML = ''
            trs[i].children[1].appendChild(input)

            break
        }
    }
}

async function saveTetel() {
    let sid = null

    if (mode!== 'new') {
        sid = currenttetel.id
    }

    mode = 'list'
    document.getElementById('newtetel').style.display = 'block'
    document.getElementById('modifytetel').style.display = 'block'
    document.getElementById('deletetetel').style.display = 'block'
    document.getElementById('savetetel').style.display = 'none'
    document.getElementById('canceltetel').style.display = 'none'
    document.getElementById('tetel_search').removeAttribute('disabled')

    await Service.saveTetel(new Tetel(
        sid,
        document.getElementById('tetelname').value
    ))

    await refreshTetel()
}

function cancelTetel() {
    mode = 'list'
    document.getElementById('newtetel').style.display = 'block'
    document.getElementById('modifytetel').style.display = 'block'
    document.getElementById('deletetetel').style.display = 'block'
    document.getElementById('savetetel').style.display = 'none'
    document.getElementById('canceltetel').style.display = 'none'
    document.getElementById('tetel_search').removeAttribute('disabled')

    redrawTetel()
}