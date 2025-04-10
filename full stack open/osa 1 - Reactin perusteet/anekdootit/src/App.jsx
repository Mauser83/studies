import { useState, useEffect } from "react";
import Button from "./Button";
import Anecdote from "./Anecdote";

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [points, setPoints] = useState(() => Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);
  const highestPoints = points.indexOf(Math.max(...points));

  function randomAnecdote() {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  function voteAnecdote() {
    setPoints((points) =>
      points.map((point, index) => (index === selected ? point + 1 : point))
    );
  }

  return (
    <div>
      <Anecdote
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        points={points[selected]}
      />
      <Anecdote
        title="Anecdote with highest votes"
        anecdote={anecdotes[highestPoints]}
        points={points[highestPoints]}
      />      <Button text="next anecdote" handleClick={randomAnecdote} />
      <Button text="vote" handleClick={voteAnecdote} />
    </div>
  );
}

export default App;
