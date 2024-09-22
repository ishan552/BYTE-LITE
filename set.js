 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0xzTGp1UktrU2lVNzczN2Q4WEVaMk1pT0dxTElCSS84RFNURG10M1hHRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTlJqRFdNc055ajlEV3NkZ1Jvb3I5bnd5OVVaY0tVNnowU3EvVzk5eEczbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNR2I0TEh0N1NWek85YWZLcCs4UlhjZ2IxVm13Wm1GVjBaT1pCMk93RzNvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJic0dUU1RHd2RaaE8yMXNlOXVnRGU3NmtRb3kwRDgxbFlXYXJvcW0ybGxjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVGZTlFTlNQYVBDUHRLQTZUOFA1VEFKNHlrMW9WRTRBQ0lSNm80NDE1bjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImIzTHE4eEE3QUFzdnkvOTd1Q2FXTzBjUytEZWRyNmllQXNiOWpLT0F2RFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0VDbFVtTWhsSURiV0M0OGFSRnFCdE1ZOUtJVUkyL004UHk2UFVqbDRXZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWV1bkRNNk1PWG45Sm9DaUpiZzVuRXZWTjhpTVk5bklYSGk4eWRlZWpqbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9oYSswcGZDT3c5ZythQTZYc2NBL3I4eWNlVlgxNTdRNkRnQXJ3VW9Qd1kxVzBRbks5WlVuMFBGT3hHMHBBR1R2WENySEVtNytiOTdxS1lqSkZrTUJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgwLCJhZHZTZWNyZXRLZXkiOiJPVlhHY2IxeWhYamFtbk1vUzJCOTVJSGVvbnArTjJXMWxTMFJhMTZ3MSt3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzE1OTIyMTkzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkJFQkRDMkJGQTZGRDJBQjhDNTZGNDNEQ0M0MDk5MDc1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjY5ODk1Nzl9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzE1OTIyMTkzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjBCRDMwMDBCMkYxQTk0RjY0MEVENDhEQTIzQkYyRTExIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjY5ODk1ODF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InJ4RW95Qjl6U3dPN1FkR1JnTjVGNWciLCJwaG9uZUlkIjoiMTMyN2NlODAtNjExZC00NDc0LThjNzktOWJjZWJhNTU1NWI5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlYb0NkbEZrckkxbDNkaUFjY2ZwWk5US1RERT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsOEV3eXdCSVh3THhRblcvYURzYVBJdmFHMUk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTjlHUFFZRkYiLCJtZSI6eyJpZCI6Ijk0NzE1OTIyMTkzOjQzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuqngcuH8J2ZvPCdmbDhtYjhtZjPic6x6qeC4peBIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKR0Fzc01DRVBpSnY3Y0dHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJVc0xNMHFNQTdsQ0R1V2lVVUIrL29yUy84YlhoUXBVbHJnd0huQzRNSVZBPSIsImFjY291bnRTaWduYXR1cmUiOiJRVVA1eFAxRzFydUlPVjMrbDcxMng3V1JCaUZEdkVQcXdRcDQyL0JEOFJ4SDkzcmZCQ0tqTWppRVBkY2ltVjZ1VG0vdWNpOU8yc3k2NURObnhybUlBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiOU9NZTNpMmNUY0hZdWNZS0JLc21Cd25ZM3lmYnhjQmRKb0h2Nm80RDVkZ2ZTM2M4Z3FxOHlpbzljeGx2VWhIdUg5ZkNwMTJYN0N6aSsrZ05oTmlJRHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDcxNTkyMjE5Mzo0M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWTEN6TktqQU81UWc3bG9sRkFmdjZLMHYvRzE0VUtWSmE0TUI1d3VEQ0ZRIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI2OTg5NTc0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlJYSJ9',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "TALKDROVE",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "94715922193",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
