function Anecdote({title, anecdote, points}) {
    return (
    <>
      <h1>{title}</h1>
      <p>{anecdote}</p>
      <p>has {points} votes</p>
    </>
  );
}

export default Anecdote;



