import express from 'express'

const app = express()

/**
 * Middleware que loggea la hora y la ruta de la petición que se realizó
 * Los middlewares tambien se ejecutan si la ruta no existe, por ejemplo si hago una petición a /not-found
 * obtengo el siguiente log: 2024-06-20T16:34:51.338Z /not-found
 */
app.use((req, res, next) => {
    console.log(new Date().toISOString(), req.path)
    next()
})

app.get('/', (req, res) => {
    res.send('Log Time')
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
