import { useState } from "react";
import Header from "./Header";
import Button from "./Button";
import Statistics from "./Statistics";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function handleGoodClick() {
    setGood(good + 1);
  }
  
  function handleNeutralClick() {
    setNeutral(neutral + 1);
  }
  
  function handleBadClick() {
    setBad(bad + 1);
  }  

  return (
    <>
      <Header title="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
