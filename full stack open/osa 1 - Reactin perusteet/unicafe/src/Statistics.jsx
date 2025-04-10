import StatisticLine from "./StatisticLine";

function Statistics({ good, neutral, bad }) {
  const total = good + neutral + bad;

  function GetAverage() {
    return (good * 1 + neutral * 0 + bad * -1) / total;
  }

  function GetPositivePercent() {
    return (good / total) * 100;
  }

  return (
    <>
      {total !== 0 ? (
        <>
          <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="total" value={total} />
            <StatisticLine text="average" value={GetAverage()} />
            <StatisticLine text="positive" value={GetPositivePercent()} />
            </tbody>
          </table>
        </>
      ) : (
        <p>No feedback given yet</p>
      )}
    </>
  );
}

export default Statistics;
