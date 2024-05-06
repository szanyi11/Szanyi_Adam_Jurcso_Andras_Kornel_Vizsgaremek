// Szükséges modulok betöltése

const express = require('express')
const Service = require('../src/service')
const { request } = require('http')
const path = require('path');

// Adatbázis összekapcsolása a weboldalal



// Indító modull futásának ellenörzése (nem szükséges)

console.log('Rendszer inditás')

// Express alkalmazás létrehozása

const app = express()

// Statikus fájlok szolgáltatása a www mappából
app.use(express.static(path.join(__dirname, '../www')));

// CSS fájlok MIME típusának beállítása
app.use((req, res, next) => {
    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    }
    next();
});




app.use(express.static('./kepek'))
app.use(express.static('./sql'))

app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
      res.setHeader('Content-Type', 'text/js');
    }
    next();
  });
// Frontend-Backend kommunikáció biztosítása JSON formában

app.use(express.json())

// Adatbázis lekérdezések

/*
const connection = mysql2.createConnection(felhasznalo.db);

  connection.connect((err) => {
    if (err) {
      console.error('500-as hiba kód: ', err);
      return;
    }
    console.log('MySQL adatbázishoz megtörtént a kapcsolat')
  });

  app.get('/rolunk', (req, res) => {
    connection.query('SELECT rolunk FROM pizzeria', (err, results) => {
        if (err) {
            console.error('Adatbázis lekérdezése közben hiba lépet fel ', err);
            res.status(500).json({ error: 'Error az 1. lekérdezés közben' });
            return;
        }
        res.json(results);
    });
})
app.get('/email', (req, res) => {
    connection.query('SELECT email FROM pizzeria', (err, results) => {
        if (err) {
            console.error('Adatbázis lekérdezése közben hiba lépet fel ', err);
            res.status(500).json({ error: 'Error az 2. lekérdezés közben' });
            return;
        }
        res.json(results);
    });
})
app.get('/telefon', (req, res) => {
    connection.query('SELECT telefon FROM pizzeria', (err, results) => {
        if (err) {
            console.error('Adatbázis lekérdezése közben hiba lépet fel ', err);
            res.status(500).json({ error: 'Error az 3. lekérdezés közben' });
            return;
        }
        res.json(results);
    });
})
app.get('/telephely', (req, res) => {
    connection.query('SELECT telephely FROM pizzeria', (err, results) => {
        if (err) {
            console.error('Adatbázis lekérdezése közben hiba lépet fel ', err);
            res.status(500).json({ error: 'Error az 4. lekérdezés közben' });
            return;
        }
        res.json(results);
    });
})

*/    







app.post('/api', async (request, response) => {
    if (request.body.action && request.body.action === 'login') {
        const name = await Service.login(request.body.uid, request.body.password)

        response.send(JSON.stringify({name: name}))
    } else if (request.body.action && request.body.action === 'loadusers') {
        const users = await Service.loadUsers()

        response.send(JSON.stringify(users))
    } else if (request.body.action && request.body.action === 'saveuser') {
        await Service.saveUser(request.body.user)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'deleteuser') {
        await Service.deleteUser(request.body.user)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'newpassword') {
        await Service.newPassword(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadpizzeriatelefon') {
        await Service.loadPizzeriatelefon(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadpizzeriaemail') {
        await Service.loadPizzeriaemail(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadpizzeriainformaciok') {
        await Service.loadPizzeriainformaciok(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadpizzeriaakciok') {
        await Service.loadPizzeriaakciok(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadpizzeriarolunk') {
        await Service.loadPizzeriarolunk(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadpizzeriatelephely') {
        await Service.loadPizzeriatelephely(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadpizzeriaaszf') {
        await Service.loadPizzeriaaszf(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartashetfometora') {
        await Service.loadNyilvantartashetfometora(request.body.user)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartashetfometperc') {
        await Service.loadNyilvantartashetfometperc(request.body.user, request.body.password)

        response.send(JSON.stringify(true)) 
    } else if (request.body.action && request.body.action === 'loadnyilvantartashetfomedora') {
        await Service.loadNyilvantartashetfomedora(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartashetfomedperc') {
        await Service.loadNyilvantartashetfomedperc(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartashetfoes') {
        await Service.loadNyilvantartashetfoes(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartaskeddmetora') {
        await Service.loadNyilvantartaskeddmetora(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartaskeddmetperc') {
        await Service.loadNyilvantartaskeddmetperc(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasmeddig_ora') {
        await Service.loadNyilvantartasmeddig_ora(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartaskeddmedperc') {
        await Service.loadNyilvantartaskeddmedperc(request.body.user, request.body.password)

        response.send(JSON.stringify(true))//----------------------------------------------------------------
    } else if (request.body.action && request.body.action === 'loadnyilvantartaskeddes') {
        await Service.loadNyilvantartaskeddes(request.body.user)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasszerdametora') {
        await Service.loadNyilvantartasszerdametora(request.body.user)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasszerdametperc') {
        await Service.loadNyilvantartasszerdametperc(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasszerdamedora') {
        await Service.loadNyilvantartasszerdamedora(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasszerdamedperc') {
        await Service.loadNyilvantartasszerdamedperc(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasszerdaes') {
        await Service.loadNyilvantartasszerdaes(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartascsuturtokmetora') {
        await Service.loadNyilvantartascsuturtokmetora(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartascsutortokmetperc') {
        await Service.loadNyilvantartascsutortokmetperc(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartascsutortokmedora') {
        await Service.loadNyilvantartascsutortokmedora(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartascsutortokmedperc') {
        await Service.loadNyilvantartascsutortokmedperc(request.body.user)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartascsutortokes') {
        await Service.loadNyilvantartascsutortokes(request.body.user)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartaspentekmetora') {
        await Service.loadNyilvantartaspentekmetora(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartaspentekmetperc') {
        await Service.loadNyilvantartaspentekmetperc(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartaspentekmedora') {
        await Service.loadNyilvantartaspentekmedora(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartaspentekmedperc') {
        await Service.loadNyilvantartaspentekmedperc(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartaspentekes') {
        await Service.loadNyilvantartaspentekes(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasszombatmetora') {
        await Service.loadNyilvantartasszombatmetora(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasszombatmetperc') {
        await Service.loadNyilvantartasszombatmetperc(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasszombatmedora') {
        await Service.loadNyilvantartasszombatmedora(request.body.user)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasszombatmedperc') {
        await Service.loadNyilvantartasszombatmedperc(request.body.user)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasszombates') {
        await Service.loadNyilvantartasszombates(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasvasarnapmetora') {
        await Service.loadNyilvantartasvasarnapmetora(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasvasarnapmetperc') {
        await Service.loadNyilvantartasvasarnapmetperc(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasvasarnapmedora') {
        await Service.loadNyilvantartasvasarnapmedora(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasvasarnapmedperc') {
        await Service.loadNyilvantartasvasarnapmedperc(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadnyilvantartasvasarnapes') {
        await Service.loadNyilvantartasvasarnapes(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadfeltetnev') {
        await Service.loadFeltetnev(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadfeltetar') {
        await Service.loadFeltetar(request.body.user)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadetlap1') {
        await Service.loadEtlap1(request.body.user)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadetlap2') {
        await Service.loadEtlap2(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadetlap3') {
        await Service.loadEtlap3(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadetlap4') {
        await Service.loadEtlap4(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadetlap5') {
        await Service.loadEtlap5(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadetlap6') {
        await Service.loadEtlap6(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadtetelek') {
        await Service.loadTetelek(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } 
    
    
    else if (request.body.action && request.body.action === 'savetetel') {
        await Service.saveTetel(request.body.user, request.body.password)

        response.send(JSON.stringify(tetel))
    } else if (request.body.action && request.body.action === 'deletetetel') {
        await Service.deleteTetel(request.body.user)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'loadkosar') {
        await Service.loadKosar(request.body.user)

        response.send(JSON.stringify(true))
    } else if (request.body.action && request.body.action === 'savekosar') {
        await Service.saveKosar(request.body.user, request.body.password)

        response.send(JSON.stringify(kosar))
    } else if (request.body.action && request.body.action === 'deletekosar') {
        await Service.deleteKosar(request.body.user, request.body.password)

        response.send(JSON.stringify(true))
    } 
})

// lezárom az adatbázishoz a hozzáférést

/* connection.end(); */

// Portvaló kapcsolódás kiválasztása

const PORT =  8000;

console.log(`WEB -es kiszolgáló indítása a ${PORT} -porton`);

app.listen(PORT);