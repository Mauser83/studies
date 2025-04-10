import { Diary } from "../App";

const showDiary = (diary: Diary) => {
    return <div key={diary.id}>
      <h2>{diary.date}</h2>
      <div>visibility: {diary.visibility}</div>
      <div>weather: {diary.weather}</div>
    </div>;
  }

  export default showDiary;