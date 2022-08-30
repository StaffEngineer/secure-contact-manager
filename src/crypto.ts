import * as crypto from 'crypto';

const algorithm = 'aes-128-cbc';
const keySize = 16;
const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(16);

type Encrypted = { iv: string, salt: string, encrypted: string }

export const encrypt = (password: string, text: string): Encrypted => {
    const key = crypto.scryptSync(password, salt, keySize);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    return {
        iv: iv.toString('hex'),
        salt: salt.toString('hex'),
        encrypted: Buffer.concat([cipher.update(text), cipher.final()]).toString('hex')
    };
}

export const decrypt = (password: string, text: Encrypted): string => {
    const iv = Buffer.from(text.iv, 'hex');
    const salt = Buffer.from(text.salt, 'hex');
    const key = crypto.scryptSync(password, salt, keySize);
    const encryptedText = Buffer.from(text.encrypted, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    return Buffer.concat([decipher.update(encryptedText), decipher.final()]).toString();
}
