import { Diagnosis, Entry } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcare from "./OccupationalHealthcare";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

interface props {
    entry: Entry
    diagnosis: Diagnosis[]
}

const EntryDetails = ({ entry, diagnosis }: props ) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry diagnosis={diagnosis} entry={entry}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare diagnosis={diagnosis} entry={entry}/>;
        case "HealthCheck":
            return <HealthCheckEntry diagnosis={diagnosis} entry={entry}/>;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;