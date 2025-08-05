const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('express-flash')
const FileStore = require('session-file-store')(session)
const path = require('path')
//module imports
const app = express()
//inicializando o express

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars') // definicao de uma template engine 

app.use(express.urlencoded({ extended: true})) //fazer decodificacao do http - receber dados do formulario
app.use(express.json()) //receber formato json

app.use(
    session({
        name:'session',
        secret: 'chave_secreta', //nome da sessao e chave
        resave: false, //so salva sessoes se houver modificacao 
        saveUninitialized: false, //nao salva sessoes novas e vazias
        store: new FileStore({
            logFn: function(){},
            path: path.join(require('os').tmpdir(), 'sessions'), //armazenamento local da sessao 
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000), // tempo de acesso
            httpOnly: true,
        }
    })
) // configuracao da sessao 
app.use(flash())
app.use(express.static('public'))

app.use((req, res, next) => {
    if(req.session.userid){  
        res.locals.session = req.session
    }
    next()
}) // compartilha a sessao com as views caso o usuario esteja autenticado, e passa a sessao para local.

app.get('/', (req, res) => {
    res.render('home')
})

const conn = require('./db/conn')
conn
    .sync()
    .then(() => {
        app.listen(3300, () => {
            console.log('Servidor rodando em localhost 3300')
        })
    })
    .catch((err) => {
        console.log(`Deu esse erro: ${err}`)
    })
            
