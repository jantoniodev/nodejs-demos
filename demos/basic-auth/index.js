/**
 * Sistema de sesiónes básica con cookies.
 */
import crypto from 'crypto'
import cookieParser from 'cookie-parser'
import express from 'express'

const app = express()

/**
 * Base de datos de los usuarios y su contraseña
 */
const usersDatabase = {
    'jantoniodev': '42f749ade7f9e195bf475f37a44cafcb' // Password123
}

/**
 * Base de datos de las sesiones
 * 
 * La llave es el ID de sesión y el valor es un objeto con datos.
 */
const sessionsDatabase = {}

app.use(express.urlencoded())

app.use(cookieParser())

/**
 * En esta ruta hacemos el login del usuario.
 * 1. Se compara la contraseña hasheada con la contraseña guardad en base de datos.
 * 2. Se crea una sesión en la base de datos de sesiones.
 * 3. Se envia una cookie con le ID de la sesión.
 */
app.post('/api/login', (req, res) => {
    const { user, password } = req.body

    const md5Password = crypto.createHash('md5').update(password).digest('hex')
    const userPassword = usersDatabase[user]

    if(md5Password !== userPassword) {
        res.status(403).send()
        return
    }

    const sessionId = crypto.randomUUID()

    sessionsDatabase[sessionId] = {
        active: true,
        loginDate: new Date().toISOString(),
        logoutDate: null,
        user,
    }

    console.log(JSON.stringify(sessionsDatabase, null, 4))

    res.cookie('Session-ID', sessionId).send('Authenticated')
})

/**
 * En este enpoint eliminamos la sesion del usuario.
 * 1. Verificamos que existe el sessionId.
 * 2. Modificamos la propiedad active de la sesion a false.
 */
app.post('/api/logout', (req, res) => {
    const sessionId = req.cookies['Session-ID']

    if(!sessionsDatabase[sessionId]) {
        res.status(403).send()
        return
    }

    sessionsDatabase[sessionId].active = false
    sessionsDatabase[sessionId].logoutDate = new Date().toISOString()

    console.log(JSON.stringify(sessionsDatabase, null, 4))

    res.send()
})

/**
 * Con este router manejaremos todas las rutas que deben ser autenticadas.
 * Se usa un middleware para verificar que el usuario está autenticado.
 */
const privateRouter = express.Router()

const getSession = (req) => {
    const sessionId = req.cookies['Session-ID']
    const session = sessionsDatabase[sessionId]
    return session
}

/** 
 * Middleware que verifica que el usuario se encuentre autenticado.
 */
privateRouter.use((req, res, next) => {
    const session = getSession(req)

    const isSessionActive = session?.active

    if(isSessionActive) {
        next()
    } else {
        res.sendStatus(403)
    }
})

privateRouter.get('/private', (req, res) => {
    const name = getSession(req).user
    res.send(`Bienvenido de vuelta ${name}`)
})

app.use(privateRouter)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
