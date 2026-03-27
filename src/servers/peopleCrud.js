import { API_URL } from "./configApi";

/*
Função para buscar todas as pessoas
*/
export async function getPeople() {

  try {
    // realiza requisição GET
    const response = await fetch(`${API_URL}/people`, {
      headers: {
        'Bypass-Tunnel-Reminder': 'true',
        'ngrok-skip-browser-warning': 'true'
      }
    });

    if (!response.ok) {
      console.log('Erro na chamada da API', response.status);
      return [];
    }

    // converte resposta para JSON
    const data = await response.json();

    // retorna lista
    return data;
  } catch (error) {
    console.log('Erro ao buscar dados:', error);
    return [];
  }
}

/*
Função para criar nova pessoa
*/
export async function createPerson(person) {

  const response = await fetch(`${API_URL}/people`, {
    method: "POST", // método HTTP
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(person) // transforma objeto em JSON
  });

  return response.json();
}

/*
Função para atualizar pessoa
*/
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

/*
Função para deletar pessoa
*/
export async function deletePerson(id) {

  await fetch(`${API_URL}/people/${id}`, {
    method: "DELETE"
  });
}
