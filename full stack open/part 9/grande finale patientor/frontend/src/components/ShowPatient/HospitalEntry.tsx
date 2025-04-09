import { Diagnosis, Entry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface props {
  entry: Entry;
  diagnosis: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnosis }: props) => {
  return (
    <div
      style={{ border: "solid 1px black", borderRadius: "5px", padding: "5px" }}
    >
      <div style={{ display: "flex", alignItems: "center"}}>{entry.date} <LocalHospitalIcon style={{ marginLeft: "8px" }}/></div>
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
            {entry.type === "Hospital" && entry.discharge && <div>discharged {entry.discharge.date}: {entry.discharge.criteria}</div>}
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default HospitalEntry;
