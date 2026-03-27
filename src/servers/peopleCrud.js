import { API_URL } from "./configApi";

export async function getPeople() {

  try {
    const response = await fetch(`${API_URL}/people`, {
      headers: {
        'Bypass-Tunnel-Reminder': 'true',
        'ngrok-skip-browser-warning': 'true'
      }
    });

    if (!response.ok) {
      console.log('Erro na chamada da API', response.status);
      throw new Error("Erro na API");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log('Erro ao buscar dados:', error);
    throw error;
  }
}

export async function createPerson(person) {

  const response = await fetch(`${API_URL}/people`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(person)
  });

  return response.json();
}

export async function updatePerson(id, person) {

  const response = await fetch(`${API_URL}/people/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(person)
  });

  return response.json();
}

export async function deletePerson(id) {

  await fetch(`${API_URL}/people/${id}`, {
    method: "DELETE"
  });
}
