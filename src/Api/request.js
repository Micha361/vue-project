const apiKey = 'pat0LKbYiZGd4vI39.002114373686da547d93cc2b79fc2334ab6cd9a668d0f8a4108d33a643669bbe';
const baseId = 'appCeyf9jQ3KiVOcA';
const baseUrl = `https://api.airtable.com/v0/${baseId}/`;

async function request(url, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    };

    if (apiKey) {
        headers['Authorization'] = 'Bearer ' + apiKey;
    }

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
    message;
    errors;

    constructor(message, errors) {
        this.message = message;
        this.errors = errors;
    }
}

export async function fetchUser() {
    const response = await request('users');
    console.log(response);
    return response;
}

export async function fetchMitglied(id) {
    const response = await request(`users/${id}`);
    console.log(response);
    return response;
}

export async function deleteUser(recordId) {
    const url = `users/${recordId}`;

    const response = await request(url, {
        method: 'DELETE',
    });

    if (!response) {
        throw new Error('Löschen fehlgeschlagen');
    }

    console.log('Datensatz mit ID ' + recordId + ' gelöscht.');
}

export async function addUser(newUser) {
    const adduserurl = 'users'; 

    const response = await request(addUserurl, {
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





export async function fetchTournaments() {
    const response = await request('Tournament');
    console.log(response);
    return response;
}