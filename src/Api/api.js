const Airtable = require('airtable');


const apiKey = 'pat0LKbYiZGd4vI39.002114373686da547d93cc2b79fc2334ab6cd9a668d0f8a4108d33a643669bbe'; // Ersetze durch deinen API-Schlüssel
const baseId = 'appCeyf9jQ3KiVOcA/tblyc8nGO24811QpJ'; 

const base = new Airtable({ apiKey }).base(baseId);


base('Tournament').select({
    maxRecords: 1,
    view: 'Grid view'
}).firstPage((err, records) => {
    if (err) {
        console.error('Fehler bei der Verbindung:', err);
        return;
    }
    console.log('Verbindung erfolgreich! Erste Zeile:', records[0].fields);
});
