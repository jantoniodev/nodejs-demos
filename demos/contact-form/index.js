import express from 'express'

const app = express()

/**
 * Obtiene información en el body en formato urlEncoded
 */
app.use(express.urlencoded())

app.use(express.static('public'))

app.post('/api/contact', (req, res) => {
    console.log(req.body)
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
