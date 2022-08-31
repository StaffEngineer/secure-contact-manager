import express from "express"
import { v4 } from 'uuid'
import * as fs from 'fs'

import { encrypt, decrypt } from './crypto'

const PORT = 3001
const VERSION = '/api/v1'
const pathToStore = process.env.STORE_PATH ?? './store'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

type Contact = { id: string, name: string, phone: string, email: string, address: string }

const save = (password: string, data: string): void => {
    fs.writeFileSync(pathToStore, JSON.stringify(encrypt(password, data)), 'utf-8')
}

const getContacts = (password: string): Contact[] => {
    if (!fs.existsSync(pathToStore)) return [];
    const encrypted = fs.readFileSync(pathToStore, 'utf-8');
    return JSON.parse(decrypt(password, JSON.parse(encrypted)));
}

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.post(`${VERSION}/contact`, function (req, res) {
    if (typeof req.query.password !== 'string') return res.sendStatus(400)
    let contacts = []
    try {
        contacts = getContacts(req.query.password as string)
    } catch (e) {
        return res.sendStatus(401)
    }
    const newContact = { ...req.body, id: v4() } as Contact
    save(req.query.password as string, JSON.stringify([...contacts, newContact]))
    res.sendStatus(200)
});

app.put(`${VERSION}/contact/:id`, function (req, res) {
    if (typeof req.query.password !== 'string') return res.sendStatus(400)
    let contacts = []
    try {
        contacts = getContacts(req.query.password as string)
    } catch (e) {
        return res.sendStatus(401)
    }
    const index = contacts.findIndex(contact => contact.id === req.params.id)
    if (index === -1) res.sendStatus(403)
    contacts[index] = { ...contacts[index], ...req.body }
    save(req.query.password as string, JSON.stringify(contacts))
    res.sendStatus(200)
});

app.get(`${VERSION}/contacts`, function (req, res) {
    if (typeof req.query.password !== 'string') return res.sendStatus(400)
    let contacts = []
    try {
        contacts = getContacts(req.query.password as string)
        res.send(contacts)
    } catch (e) {
        return res.sendStatus(401)
    }
});

app.post(`${VERSION}/store`, function (req, res) {
    if (typeof req.body.password !== 'string') return res.sendStatus(400)
    save(req.body.password as string, JSON.stringify([]))
    res.sendStatus(200)
});

app.head(`${VERSION}/store`, function (req, res) {
    if (fs.existsSync(pathToStore)) {
        return res.sendStatus(200)
    } else {
        return res.sendStatus(404)
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});
