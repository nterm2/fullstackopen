import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.clickHandler}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}
const Statistics = (props) => {
  if (props.total) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <tr>
              <td><StatisticLine text="good" value={props.good}/></td>
            </tr>
            <tr>
              <td><StatisticLine text="neutral" value={props.neutral}/></td>
            </tr>
            <tr>
              <td><StatisticLine text="bad" value={props.bad}/></td>
            </tr>
            <tr>
              <td><StatisticLine text="total" value={props.total}/></td>
            </tr>
            <tr>
              <td><StatisticLine text="average" value={props.average}/></td>
            </tr>
            <tr>
              <td><StatisticLine text="positive" value={props.positive}/></td>
            </tr>
          </tbody>
        </table>
      </>
      )
  }
  return (
    <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  )

}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    return setGood(good + 1);
  }
  const handleNeutralClick = () => {
    return setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
    return setBad(bad + 1);
  }
  let totalGood = good;
  let totalNeutral = neutral * 0;
  let totalBad = bad * -1;
  let total = good + bad + neutral;
  let average = (totalGood + totalBad + totalNeutral) / total;
  let positive = totalGood / total;

  return (
    <>
      <h1>give feedback</h1>
      <Button clickHandler={handleGoodClick} text="good"/>
      <Button clickHandler={handleNeutralClick} text="neutral"/>
      <Button clickHandler={handleBadClick} text="bad"/>

      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </>
  )
}

export default App