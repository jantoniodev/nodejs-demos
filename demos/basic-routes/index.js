import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

/**
 * Ruta basica de express, en este caso es una ruta fija que se accede mediante el método GET
 */
app.get('/about', (req, res) => {
    res.send('About us page')
})

/**
 * Ruta dinamica de express, en este caso se accede mediante el método GET y se espera un parametro en la URL
 */
app.get('/users/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`)
})

/**
 * Ruta con query params, en este caso se accede mediante el método GET y se espera un parametro en la URL
 * Ej: http://localhost:3000/users?pageIndex=20&size=10
 */
app.get('/users', (req, res) => {
    res.send(req.query)
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
