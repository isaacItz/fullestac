import { useState } from 'react'

let average = 0
let positivePercentage = 0

const Statistics = ({ good, bad, neutral, all, average, positivePercentage }) => {

  return (
    <>
      <h2>Reviews</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {all}</p>
      <p>average: {average}</p>
      <p>positive: {positivePercentage} %</p>
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
      <button onClick={onGood} > good</button>
      <button onClick={onNeutral} > neutral</button>
      <button onClick={onBad} > bad</button>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average} positivePercentage={positivePercentage} />
      <div>
      </div>
    </>
  )
}

export default App