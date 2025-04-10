import Part from "./Part";

function Content(props) {
  return (
    <>
    {props.parts.map((part, index) => 
      <Part key={index} part={part}/>
    )}
    </>
  );
}

export default Content;
