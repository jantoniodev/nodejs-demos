import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import express from 'express'

const app = express()

app.use(express.json())

/**
 * En este caso se crea de forma aleatoria cada vez que se inicia el servidor.
 * Se debería obtener desde un lugar seguro para poder verificar los tokens.
 */
const JWT_SECRET = crypto.generateKeySync('hmac', { length: 256 })

/**
 * Base de datos de los usuarios y su perfil
 */
const usersDatabase = {
    'jantoniodev': {
        password: '42f749ade7f9e195bf475f37a44cafcb', // Password123
        profile: {
            username: 'jantoniodev',
            email: 'jose@lopezhernandez.dev',
            role: 'admin',
        },
    }
}

/**
 * Verificamos que el usuario y contraseña sean correctos.
 * Luego generamos un token con el perfil público del usuario y lo enviamos en el payload del JWT
 */
app.post('/login', (req, res) => {
    const { username, password } = req.body

    const md5Password = crypto.createHash('md5').update(password).digest('hex')

    const { password: userPassword, profile } = usersDatabase[username]

    if(md5Password !== userPassword) {
        res.status(403).send()
        return
    }

    /**
     * No se debe enviar información sensible en el JWT ya que esta se encuentra codificada en base64 y firmada, 
     * pero no encriptada, por lo tanto el payload es accesible a cualquiera que tenga el token.
     */
    const token = jwt.sign({ user: profile }, JWT_SECRET, { expiresIn: '24h' })

    res.json({
        token
    })
})

/**
 * Router que maneja todas las rutas privadas a las que no se puede acceder si no se encuentra autenticado.
 * Se agrega un middleware que validará el token.
 */
const privateRouter = express.Router()

privateRouter.use((req, res, next) => {
    /**
     * El token viene en el formato Bearer, por lo tanto tenemos que obtener solo el JWT.
     */
    const token = req.headers.authorization.split('Bearer ')[1]

    if(!token) {
        res.sendStatus(403)
        return
    }

    try {
        const { payload } = jwt.verify(token, JWT_SECRET, { complete: true })

        /**
         * Se envía la información del usuario en el request al siguiente middleware
         * CONSIDERACIÓN: Lo que viene en el payload debería ser validado como cualquier input de usuario. 
         * Lo ideal en este caso sería comprobar que venga con los datos esperados.
         */
        req.user = payload.user

        next()
    } catch {
        res.sendStatus(403)
    }
})

privateRouter.get('/private', (req, res) => {
    const { username } = req.user
    res.send(`Welcome back ${username}`)
})

app.use(privateRouter)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
