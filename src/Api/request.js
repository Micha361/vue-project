const apiKey = 'pat0LKbYiZGd4vI39.002114373686da547d93cc2b79fc2334ab6cd9a668d0f8a4108d33a643669bbe';
const baseId = 'appCeyf9jQ3KiVOcA';
const baseUrl = `https://api.airtable.com/v0/${baseId}/`;


async function request(url, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
    };

    const response = await fetch(baseUrl + url, { headers, ...options });

    if (response.ok) {
        return response.json();
    } else if (response.status === 422) {
        const data = await response.json();
        throw new ValidationError('Validation failed', data.errors);
    } else {
        throw new Error(`Server error: ${await response.text()}`);
    }
}

class ValidationError {
    constructor(message, errors) {
        this.message = message;
        this.errors = errors;
    }
}

export async function fetchUser() {
    const response = await request('users');
    console.log('Geladene Benutzer:', response);
    return response;
}

export async function deleteUser(recordId) {
    const url = `users/${recordId}`;
    const response = await request(url, { method: 'DELETE' });

    if (!response) {
        throw new Error('Löschen fehlgeschlagen');
    }

    console.log(`Benutzer mit ID ${recordId} gelöscht.`);
}

export async function addUser(newUser) {
    const url = 'users';
    console.log('Gesendete Daten:', JSON.stringify({ fields: newUser })); 
    const response = await request(url, {
        method: 'POST',
        body: JSON.stringify({
            fields: newUser,
        }),
    });

    if (!response) {
        throw new Error('Benutzer konnte nicht hinzugefügt werden');
    }

    console.log('Neuer Benutzer hinzugefügt:', response);
    return response;
}

export async function fetchRoles() {
    const response = await request('Role'); 
    console.log('Geladene Rollen:', response);
    return response;
}


// Tournaments



export async function fetchTournaments() {
    const response = await request('Tournament');
    console.log(response);
    return response;
}


export async function deleteTournament(recordId) {
    const url = `Tournament/${recordId}`;

    const response = await request(url, {
        method: 'DELETE',
    });

    if (!response) {
        throw new Error('Löschen fehlgeschlagen');
    }

    console.log('Turnier mit ID ' + recordId + ' gelöscht.');
}




//Bills

export async function fetchBills() {
    const response = await request('Bill');
    console.log('Geladene Rechnungen:', response);
    return response;
}

export async function addBill(newBill) {
    const response = await request('Bill', {
        method: 'POST',
        body: JSON.stringify({
            fields: newBill
        })
    });
    if (!response) throw new Error('Rechnung konnte nicht hinzugefügt werden');
    return response;
}


export async function deleteBill(recordId) {
    const url = `Bill/${recordId}`;
    const response = await request(url, { method: 'DELETE' });
    if (!response) throw new Error('Löschen der Rechnung fehlgeschlagen');
    return response;
}
