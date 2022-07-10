const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/format', require('./routes/catalogs/format.routes'))
app.use('/api/unit', require('./routes/catalogs/unit.routes'))
app.use('/api/chromaticity', require('./routes/catalogs/chromaticity.routes'))
app.use('/api/calcs', require('./routes/calcs/amountOfPaper.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {

        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()