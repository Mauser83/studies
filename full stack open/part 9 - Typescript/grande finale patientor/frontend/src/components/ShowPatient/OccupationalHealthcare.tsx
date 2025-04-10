import { Diagnosis, Entry } from "../../types";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

interface props {
  entry: Entry;
  diagnosis: Diagnosis[];
}

const OccupationalHealthcare = ({ entry, diagnosis }: props) => {
  return (
    <div
      style={{ border: "solid 1px black", borderRadius: "5px", padding: "5px" }}
    >
      <div style={{ display: "flex", alignItems: "center"}}>{entry.date} <HealthAndSafetyIcon style={{ marginLeft: "8px", marginRight: "8px"}}/> {entry.type === "OccupationalHealthcare" && entry.employerName && entry.employerName} </div>
      <div>
        <i>{entry.description}</i>
      </div>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul>
          {entry.diagnosisCodes &&
            entry.diagnosisCodes.map((icd) => (
              <li key={entry.id + icd}>
                {icd}{" "}
                {diagnosis ? diagnosis.find((d) => d.code === icd)?.name : null}
              </li>
            ))}
        </ul>
      )}
      {entry.type === "OccupationalHealthcare" && entry.sickLeave && <>sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</>}
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default OccupationalHealthcare;
