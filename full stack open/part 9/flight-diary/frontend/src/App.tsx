export interface Diary {
  id: number;
  date: string;
  visibility: string;

  weather: string;
  comment: string;
}

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import showDiary from "./components/ShowDiary";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState({
    date: new Date().toISOString().split("T")[0],
    visibility: "great",
    weather: "sunny",
    comment: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const changeInput = (event: React.SyntheticEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setNewDiary((prevDiary) => ({
      ...prevDiary,
      [name]: value,
    }));
  };

  const diaryCreation = (event: SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd: Diary = {
      ...newDiary,
      id: Number(diaries.length + 1),
    };
    axios
      .post<Diary>("http://localhost:3000/api/diaries", { content: diaryToAdd })
      .then((response) => {
        setDiaries(diaries.concat(response.data));
        if (errorMessage) setErrorMessage("");
        setNewDiary({
          date: new Date().toISOString().split("T")[0],
          visibility: "great",
          weather: "sunny",
          comment: "",
        });
      })
      .catch((error) => {
        if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        if (error.response?.data.message)
          setErrorMessage(error.response.data.message)
        else
          setErrorMessage(error.message)
      } else {
        console.error(error)
      }
      });
  };

  useEffect(() => {
    axios.get<Diary[]>("http://localhost:3000/api/diaries").then((response) => {
      setDiaries(response.data);
    });
  }, []);

  return (
    <>
      <h1>Add new diary</h1>
      {errorMessage && <div style={{color: "red"}}><strong>{errorMessage}</strong></div>}
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input type="date" name="date" value={newDiary.date} onChange={changeInput} />
        </div>
        <div>
          visibility
          {/* <input
            name="visibility"
            value={newDiary.visibility}
            onChange={changeInput}
          /> */}
        <label> great</label><input type="radio" name="visibility" value="great" onChange={changeInput} checked={newDiary.visibility === "great"}/>
        <label> good</label><input type="radio" name="visibility" value="good" onChange={changeInput} checked={newDiary.visibility === "good"}/>
        <label> ok</label><input type="radio" name="visibility" value="ok" onChange={changeInput} checked={newDiary.visibility === "ok"}/>
        <label> poor</label><input type="radio" name="visibility" value="poor" onChange={changeInput} checked={newDiary.visibility === "poor"}/>
        </div>
        <div>
          weather
          {/* <input
            name="weather"
            value={newDiary.weather}
            onChange={changeInput}
          /> */}
        <label> sunny</label><input type="radio" name="weather" value="sunny" onChange={changeInput} checked={newDiary.weather === "sunny"}/>
        <label> rainy</label><input type="radio" name="weather" value="rainy" onChange={changeInput} checked={newDiary.weather === "rainy"}/>
        <label> cloudy</label><input type="radio" name="weather" value="cloudy" onChange={changeInput} checked={newDiary.weather === "cloudy"}/>
        <label> stormy</label><input type="radio" name="weather" value="stormy" onChange={changeInput} checked={newDiary.weather === "stormy"}/>
        <label> windy</label><input type="radio" name="weather" value="windy" onChange={changeInput} checked={newDiary.weather === "windy"}/>
        </div>
        <div>
          comment
          <input
            name="comment"
            value={newDiary.comment}
            onChange={changeInput}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h1>Diary entries</h1>
      {diaries && diaries.map((diary) => showDiary(diary))}
    </>
  );
}

export default App;
