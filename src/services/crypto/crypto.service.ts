import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
const algorithm = 'aes-256-cbc';
const key = Buffer.from(
  'C67EBE9CB3748A4AECCB508BC24D0BE7FDFD09F5639CC327A9D284AFB4D7622E',
  'hex',
);
const iv = Buffer.from('6043039F3D258DC8F652D6E26F6AFBBD', 'hex');

@Injectable()
export class CryptoService {
  constructor() { }

  encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
  }

  decrypt(encryptedData) {
    const encryptedText = Buffer.from(encryptedData, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  encryptTextWithLength(text, length) {
    return crypto.createHash('sha256').update(text).digest('hex').substring(0,length);
  }

  encryptNew(text){
    return crypto.createHash('sha512').update(text).digest('hex').toUpperCase();
  }

}
