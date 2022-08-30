import express from "express";
import { encrypt, decrypt } from './crypto';
import * as fs from 'fs';

const app = express();

type Contact = {
    name: string
    phone: number
    email: string
    address: string
}
const pathToStore = './store'
const myContact: Contact = { name: 'Dima', phone: 999, email: 'a@a.com', address: 'London' }

app.get("/encrypt/:password", function (req, res) {
    const encrypted = encrypt(req.params.password, JSON.stringify(myContact))
    fs.writeFileSync(pathToStore, JSON.stringify(encrypted), 'utf-8')
    res.send("Encrypted");
});

app.get("/decrypt/:password", function (req, res) {
    const encrypted = fs.readFileSync(pathToStore, 'utf-8')
    try {
        const decrypted = decrypt(req.params.password, JSON.parse(encrypted))
        res.send("Decrypted: " + decrypted);
    } catch (e) {
        res.send("Wrong password")
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000")
});
