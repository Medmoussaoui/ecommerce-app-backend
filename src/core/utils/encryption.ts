import bcrypt from 'bcrypt';

const bcryptSolt = 10;

async function bcryptHash(value: string) {
    return await bcrypt.hash(value, bcryptSolt);
}

async function bcryptCompere(data: string, encrypted: string) {
    return await bcrypt.compare(data, encrypted);
}

export {
    bcryptCompere,
    bcryptHash
}