const App2 = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    [ 'Maya',  10 ],
    "bob"
  ]

  return (
    <div>
      <p>{friends[1]}</p>
      <p>{friends[0].name} {friends[0].age}</p>
    </div>
  )
}

export default App2