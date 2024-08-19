import { useState } from 'react'

let average = 0
let positivePercentage = 0

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value}) => {
  return (
    <p>{text}: {value}</p>
  )
}
const Statistics = ({ good, bad, neutral, all, average, positivePercentage }) => {
  if (all === 0)
    return <p>No feedback given</p>
  return (
    <>
      <h2>Statistics</h2>
      <StatisticLine text={"good"} value={good}></StatisticLine>
      <StatisticLine text={"neutral"} value={neutral}> </StatisticLine>
      <StatisticLine text={"bad"} value={bad}></StatisticLine>
      <StatisticLine text={"all"} value={all}></StatisticLine>
      <StatisticLine text={"average"} value={average}></StatisticLine>
      <StatisticLine text={"positive"} value={positivePercentage} ></StatisticLine>
    </>
  )
}
const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const onGood = () => {
    const newAll = all + 1
    const newGood = good + 1
    setGood(newGood)
    setAll(newAll)
    calcPercengage(newGood, newAll)
    calcAverage(newGood, neutral, bad, newAll)
  }
  const onNeutral = () => {
    const newAll = all + 1
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    setAll(newAll)
    calcPercengage(good, newAll)
    calcAverage(good, newNeutral, bad, newAll)
  }
  const onBad = () => {
    const newBad = bad + 1
    const newAll = all + 1
    setBad(newBad)
    setAll(newAll)
    calcPercengage(good, newAll)
    calcAverage(good, neutral, newBad, newAll)
  }
  const calcAverage = (good, neutral, bad, all) => {
    const totalScore = (good * 1) + (neutral * 0) + (bad * -1);
    average = totalScore === 0 ? 0 : totalScore / all
  }
  const calcPercengage = (good, all) => {
    positivePercentage = Math.round((good / all) * 100)
  }
  return (
    <>
      <h1>Give feedback</h1>
      <Button onClick={onGood} text={"good"}></Button>
      <Button onClick={onNeutral} text={"neutral"}></Button>
      <Button onClick={onBad} text={"bad"}></Button>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average} positivePercentage={positivePercentage} />
    </>
  )
}

export default App