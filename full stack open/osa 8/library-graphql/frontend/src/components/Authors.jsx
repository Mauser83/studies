import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_BORN, ALL_AUTHORS } from "./queries";
import Select from "react-select";

const Authors = ({ token, show, authors }) => {
  const [born, setBorn] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const [changeBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!show) {
    return null;
  }

  if (!authors) {
    return null;
  }

  const options = authors.map((author) => {
    return {
      label: author.name,
      value: author.id,
      key: author.id,
    };
  });

  const updateAuthor = async (event) => {
    event.preventDefault();
    if (selectedOption) {
    changeBorn({ variables: { id: selectedOption.value, setBornTo: parseInt(born) } });
    setSelectedOption(null)
    setBorn("");
  } else console.log("select author")
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <Select
          defaultValue={selectedOption}
          value={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          <label>born</label>
          <input
            type="text"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
      </>}
    </div>
  );
};

export default Authors;
