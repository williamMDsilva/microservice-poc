import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { updateDocumentStatus } from '../../database/database';

dotenv.config()

const DATABASE_URL = `${process.env.DATABASE_URL}`

const app = express()
const port = 4001

const corsOptions = {
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}

app.use(cors(corsOptions))


app.get('/api/download/:uuid', (req, res) => {
    const id = req.params.uuid
    // 1 - check document ready
    // 2 - if true, send stream of file
    // 2 - if false, send a message "the document is not ready yet"

    res.send('Hello World!')
})

app.patch('/api/document/status/:id', (req, res) => {
    const id = req.params.id
    try {
        updateDocumentStatus(String(DATABASE_URL), id)
        res.status(200).send()
    } catch {
        res.status(500).send()

    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})