require('dotenv').config();


export const isProduction = false;
export const config = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    DATABASE_URL: isProduction?'':'mongodb://localhost:27017/',
    SERVER_URL: 'https://randomgabbot.herokuapp.com/',
};
