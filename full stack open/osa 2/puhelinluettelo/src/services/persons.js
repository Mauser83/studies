import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

function getAll() {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}

function addPerson(newPerson) {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
}

function deletePerson(person) {
  const request = axios.delete(`${baseUrl}/${person.id}`);
  return request;
}

function updatePerson(person) {
  console.log(person);
  const request = axios.put(`${baseUrl}/${person.id}`, person);
  console.log(request)
  return request.then((response) => response.data);
}

export default { getAll, addPerson, deletePerson, updatePerson };
