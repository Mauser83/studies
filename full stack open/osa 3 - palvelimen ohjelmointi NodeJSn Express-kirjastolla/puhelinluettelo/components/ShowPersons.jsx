import ShowPerson from "./ShowPerson";

function ShowPersons({ persons, handleDelete }) {
  return (
    <>
      {persons.map((person, index) => (
          <ShowPerson key={index} person={person} handleDelete={handleDelete} />
      ))}
    </>
  );
}

export default ShowPersons;
