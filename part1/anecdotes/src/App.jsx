import { useState } from 'react'

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
  const [storedVotes, setStoredVotes] = useState(Array(anecdotes.length).fill(0))

  const handleRandomQuote = () =>{
    let randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  } 
  const handleStoringVote = (index) => () => {
    let copy = [...storedVotes];
    copy[index] = copy[index] + 1
    setStoredVotes(copy)
  }
  const findLargestNumberIndex = (array) => {
    let largestNumIndex = 0;
    for (let i = 0; i <= (array.length - 1); i++) {
      if (array[i] > array[largestNumIndex]) {
        largestNumIndex = i
      }
    }
    return largestNumIndex
  }

  const findMostPopularAnecdote = () => {
    let index = findLargestNumberIndex(storedVotes);
    let mostPopularAnecdote = anecdotes[index]
    let votes = storedVotes[index];
    return {
      'anecdote': mostPopularAnecdote,
      'votes': votes
    }
  }
  let popularData = findMostPopularAnecdote()
  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
      <p>{anecdotes[selected]}</p>
      </div>
      <p>has {storedVotes[selected]} votes</p>
      <button onClick={handleRandomQuote}>next anecdote</button>
      <button onClick={handleStoringVote(selected)}>vote</button>

      <h1>Anecdotes with most votes</h1>
      <p>{popularData.anecdote}</p>
      <p>{popularData.votes}</p>
    </>

  )
}

export default App
