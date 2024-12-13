


const apiKey = 'pat0LKbYiZGd4vI39.002114373686da547d93cc2b79fc2334ab6cd9a668d0f8a4108d33a643669bbe';
const baseId = 'appCeyf9jQ3KiVOcA'; // Nur die Base-ID
const baseUrl = `https://api.airtable.com/v0/${baseId}/`; 



// Generische Request-Funktion.
async function request (url, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }

    if (apiKey) {
        headers['Authorization'] = 'Bearer ' + apiKey
    }

    const response = await fetch(baseUrl + url, { headers, ...options });


    if (response.ok) {
        return response.json()
    } else if (response.status === 422) {
        const data = await response.json()

        throw new ValidationError('validation failed', data.errors)
    } else {
        throw new Error(`Server error: ${await response.text()}`)
    }
}


class ValidationError {
    message
    errors

    constructor (message, errors) {
        this.message = message
        this.errors = errors
    }
}


export async function fetchUser () {
    const response = await request('users')
    console.log(response);
    return response
}

export async function fetchMitglied (id) {
    const response = await request('users/' + id)
    console.log(response);
    return response
}