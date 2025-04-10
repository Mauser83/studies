function ShowPerson({ person, handleDelete }) {
  function handleClick() {
    handleDelete(person)
}

  return (
    <div>
      {person.name} {person.number}
      <button onClick={handleClick}>delete</button>
    </div>
  );
}

export default ShowPerson;
