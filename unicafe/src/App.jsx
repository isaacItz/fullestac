import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const onGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }
  const onNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const onBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
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
      </div>
    </>
  )
}

export default App