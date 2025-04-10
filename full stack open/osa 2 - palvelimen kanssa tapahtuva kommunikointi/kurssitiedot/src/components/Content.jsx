import Part from "./Part";

function Content({parts}) {
  return (
    <>
    {parts.map((part, id) => 
      <Part key={id} part={part}/>
    )}
    </>
  );
}

export default Content;
