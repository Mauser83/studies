import { CoursePart } from "./Content";

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
        case "basic":
            return <><div><strong>{part.name} {part.exerciseCount}</strong></div>
            <div><i>{part.description}</i></div></>
        case "group":
            return <><div><strong>{part.name} {part.exerciseCount}</strong></div>
            <div>project exercises {part.groupProjectCount}</div></>
        case "background":
            return <><div><strong>{part.name} {part.exerciseCount}</strong></div>
            <div><i>{part.description}</i></div>
            <div>submit to {part.backgroundMaterial}</div></>
        case "special":
            return <><div><strong>{part.name} {part.exerciseCount}</strong></div>
            <div><i>{part.description}</i></div>
            <div>required skills: {part.requirements.join(", ")}</div></>
}
};

export default Part