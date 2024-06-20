import { randomUUID } from 'crypto'
import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/error', (req, res) => {
    throw new Error('This is an error')
})

/**
 * Este middleware se encarga de errores no controlados, en este caso se logea el stack 
 * de el error completo pero se responde con un json sin mayor información.
 * Ademas se agrega un UUID para poder hacer seguimiento de el error real.
 */
app.use((err, req, res, next) => {
    const uuid = randomUUID()
    console.error(uuid, err.stack)
    res.status(500).json({
        error: true,
        message: 'Unknown error',
        uuid,
    })
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
