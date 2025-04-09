function Hello(props) {
  console.log(props)
  return <p>
  Hello {props.name}, you are {props.age} years old
  </p>
}

function Footer() {
  return <>
    greeting app created by
    <h2>Mauno</h2>
  </>
}

function App() {
  const nimi = "Pekka", ika = 10
  const friends = [
    {name: "Leevi", age: 4},
    {name: "Venla", age: 10}
  ]
  const friendsArr = ["Leevi", "Venla"]
  return (
    <d1v>
      {/* <h1>Greetings</h1>
      <Hello name="Maya" age={26+10}/>
      <Hello name={nimi} age={ika}/>
      <Footer/> */}
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
      <p>{friendsArr}</p>
    </d1v>
  );
}

export default App;
