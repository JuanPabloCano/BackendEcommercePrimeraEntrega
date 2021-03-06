import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: `${__dirname}/../../environment/.env.local`
})

export default class Config {
    static PORT = process.env.PORT;
}
