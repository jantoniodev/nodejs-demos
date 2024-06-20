import express from 'express'

const app = express()

app.use(express.static('public'))

app.use('/static', express.static('public'))

app.get('/api/hello-world', (req, res) => {
    res.send('Hello World API route!')
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
