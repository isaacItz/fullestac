import { useState } from 'react'

let average = 0
let positivePercentage = 0
const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const onGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    calcPercengage()
  }
  const onNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    calcPercengage()
  }
  const onBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    calcPercengage()
  }
  const calcPercengage = () => {
    positivePercentage = Math.round((good / all) * 100)
    const totalScore = (good * 1) + (neutral * 0) + (bad * -1);
    average = totalScore === 0 ? 0 : totalScore / all
  }
  return (
    <>
      <h1>Give feedback</h1>
      <button onClick={onGood} > good</button>
      <button onClick={onNeutral} > neutral</button>
      <button onClick={onBad} > bad</button>
      <div>
        <h2>Reviews</h2>
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>all: {all}</p>
        <p>average: {average}</p>
        <p>positive: {positivePercentage} %</p>
      </div>
    </>
  )
}

export default App