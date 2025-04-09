import { useState, useEffect } from "react";
import Search from "../components/Search";
import AddPerson from "../components/AddPerson";
import ShowPersons from "../components/ShowPersons";
import personService from "./services/persons";
import Notification from "../components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchByName, setSearchByName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([...persons]);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  useEffect(() => {
    filterByName(searchByName);
  }, [persons, searchByName]);

  function changeFilter(event) {
    const query = event.target.value;
    setSearchByName(query);
    filterByName(query);
  }

  function filterByName(query) {
    const searchResult = persons.filter((person) =>
      person.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPersons(searchResult);
  }

  function changeName(event) {
    setNewName(event.target.value);
  }

  function changeNumber(event) {
    setNewNumber(event.target.value);
  }

  function addPerson(event) {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const foundIndex = persons.findIndex((p) => p.name === newName);
        const updatedPerson = { ...persons[foundIndex], number: newNumber };
        personService
          .updatePerson(updatedPerson)
          .then((returnedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            );
            setPersons(updatedPersons);
            setNotificationMessage(`Updated phone number for ${newName}`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setNotificationMessage(
              `Information of ${id.name} has already been removed from server`
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setPersons(persons.filter((p) => p.name !== newName));
          });
      } else {
        setNotificationMessage(`${newName} is already added to phonebook`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      }
      setNewName("");
      setNewNumber("");
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: `${Math.max(...persons.map((person) => person.id)) + 1}`,
      };
      personService.addPerson(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setNotificationMessage(`${newName} was added to phonebook`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    }
  }

  function deletePerson(id) {
    if (window.confirm(`Do you really want to delete ${id.name}`)) {
      personService
        .deletePerson(id)
        .then((result) => {
          if (result) {
            setPersons(persons.filter((p) => p.id !== id.id));
            setNotificationMessage(`${id.name} was deleted from phonebook`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          }
        })
        .catch((error) => {
          setNotificationMessage(
            `Information of ${id.name} has already been removed from server`
          );
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          setPersons(persons.filter((p) => p.id !== id.id));
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Search handleChange={changeFilter} searchByName={searchByName} />
      <h3>Add a new</h3>
      <AddPerson
        handleSubmit={addPerson}
        newName={newName}
        handleChangeName={changeName}
        newNumber={newNumber}
        handleChangeNumber={changeNumber}
      />
      <h3>Numbers</h3>
      <ShowPersons persons={filteredPersons} handleDelete={deletePerson} />
    </div>
  );
}

export default App;
