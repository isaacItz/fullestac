import { useState } from 'react'

const MostVoted = ({ anecdotes, votes }) => {
  console.log('votes', votes)
  const calcMostVoted = () => {
    let max = 0
    Object.values(votes).forEach(vote => { if (vote > max) max = vote })


    let mostVoted = []
    Object.keys(votes).forEach(i => votes[i] === max && mostVoted.push(i))

    return mostVoted
  }

  const mostVoted = calcMostVoted()
  console.log('most voted', mostVoted)

  return (
    <>
      <h2>Most voted anecdote{mostVoted.length > 1 && 's'}</h2>
      {Object.values(mostVoted).map(vote => <p key={vote}>{anecdotes[vote]}</p>)}
    </>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const handleRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const handleVote = () => {
    const newVotes = { ...votes }
    newVotes[selected] = (newVotes[selected] || 0) + 1
    setVotes(newVotes)
    console.log(typeof votes)
  }
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}
      <br />
      <p>votes: {votes[selected]}</p>
      <button onClick={handleVote} >vote</button>
      <button onClick={handleRandomAnecdote} >random anecdote</button>
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App