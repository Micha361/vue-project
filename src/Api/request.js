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
// Login


export async function fetchUsers() {
    const response = await request('benutzer'); 
    if (!response) throw new Error('Benutzer konnten nicht geladen werden');
    return response.records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
  }
  
  // Sign up
  export async function addUser(user) {
    const response = await request('benutzer', {
      method: 'POST',
      body: JSON.stringify({
        fields: {
          Name: user.Name,
          Email: user.Email,
          Passwort: user.Passwort,
        },
      }),
    });
    if (!response) throw new Error('Benutzer konnte nicht hinzugefügt werden');
    return response;
  }


// Persons
export async function fetchPerson() {
    const response = await request('Person');
    console.log('Geladene Benutzer:', response);
    return response;
}

export async function deletePerson(recordId) {
    const url = `Person/${recordId}`;
    const response = await request(url, { method: 'DELETE' });
    if (!response) throw new Error('Löschen fehlgeschlagen');
    console.log(`Benutzer mit ID ${recordId} gelöscht.`);
}

export async function addPerson(newPerson) {
    const url = 'Person';
    console.log('Gesendete Daten:', JSON.stringify({ fields: newPerson }));
    const response = await request(url, {
        method: 'POST',
        body: JSON.stringify({
            fields: newPerson,
        }),
    });
    if (!response) throw new Error('Benutzer konnte nicht hinzugefügt werden');
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
    console.log('Geladene Turniere:', response);
    return response;
}

export async function addTournament(newTournament) {
    if (!newTournament || !newTournament.TournamentName || !newTournament.Date) {
        throw new Error('Ungültige Eingabedaten für Turnier');
    }

    const url = 'Tournament';
    console.log('Gesendete Daten:', JSON.stringify({ fields: newTournament }));

    const response = await request(url, {
        method: 'POST',
        body: JSON.stringify({
            fields: {
                TournamentName: newTournament.TournamentName || '',
                Date: newTournament.Date || '',
                Participants: newTournament.Participants || '',
                Place: newTournament.Place || '',
            },
        }),
    });

    if (!response) throw new Error('Turnier konnte nicht hinzugefügt werden');
    console.log('Neues Turnier hinzugefügt:', response);
    return response;
}

export async function deleteTournament(recordId) {
    const url = `Tournament/${recordId}`;
    const response = await request(url, { method: 'DELETE' });
    if (!response) throw new Error('Löschen fehlgeschlagen');
    console.log(`Turnier mit ID ${recordId} gelöscht.`);
}

// Bills
export async function fetchBills() {
    const response = await request('Bill');
    console.log('Geladene Rechnungen:', response);
    return response;
}

export async function addBill(newBill) {
    if (!newBill || !newBill.Name || !newBill.Amount || !newBill.DueDate) {
        throw new Error('Ungültige Eingabedaten für Rechnung');
    }

    newBill.DueDate = new Date(newBill.DueDate).toISOString().split('T')[0];

    const response = await request('Bill', {
        method: 'POST',
        body: JSON.stringify({
            fields: {
                Name: newBill.Name,
                Amount: parseFloat(newBill.Amount), 
                DueDate: newBill.DueDate,
                payed: Boolean(newBill.payed), 
            },
        }),
    });

    if (!response) throw new Error('Rechnung konnte nicht hinzugefügt werden');
    console.log('Neue Rechnung hinzugefügt:', response);
    return response;
}

export async function deleteBill(recordId) {
    const url = `Bill/${recordId}`;
    const response = await request(url, { method: 'DELETE' });
    if (!response) throw new Error('Löschen der Rechnung fehlgeschlagen');
    console.log(`Rechnung mit ID ${recordId} gelöscht.`);
}

export async function updateBill(recordId, updatedFields) {
    const url = `Bill/${recordId}`;
    const response = await request(url, {
        method: 'PATCH',
        body: JSON.stringify({
            fields: updatedFields
        }),
    });

    if (!response) throw new Error('Rechnung konnte nicht aktualisiert werden');
    return response;
}


//Plan

export async function fetchPlan() {
    return await request("Plan");
  }
  
  export async function updatePlan(recordId, updatedFields) {
    const url = `Plan/${recordId}`;
    return await request(url, {
      method: "PATCH",
      body: JSON.stringify({
        fields: updatedFields,
      }),
    });
  }
  
  export async function addPlan(newRecord) {
    const url = `Plan`;
    return await request(url, {
      method: "POST",
      body: JSON.stringify({
        fields: newRecord,
      }),
    });
  }