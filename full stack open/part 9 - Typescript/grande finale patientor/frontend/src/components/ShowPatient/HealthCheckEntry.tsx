import { Diagnosis, Entry } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

interface props {
  entry: Entry;
  diagnosis: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnosis }: props) => {
  return (
    <div
      style={{ border: "solid 1px black", borderRadius: "5px", padding: "5px" }}
    >
      <div style={{ display: "flex", alignItems: "center"}}>{entry.date} <MonitorHeartIcon style={{ marginLeft: "8px" }}/></div>
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
      {entry.type === "HealthCheck" && entry.healthCheckRating !== undefined && (
        <>
    {entry.healthCheckRating === 0 && <div style={{ display: "flex", alignItems: "center", color: "green" }}><FavoriteIcon style={{ marginRight: "8px" }}/>Healthy</div>}
    {entry.healthCheckRating === 1 && <div style={{ display: "flex", alignItems: "center", color: "#8B8000" }}><FavoriteIcon style={{ marginRight: "8px" }}/>Low risk</div>}
    {entry.healthCheckRating === 2 && <div style={{ display: "flex", alignItems: "center", color: "orange" }}><FavoriteIcon style={{ marginRight: "8px" }}/>High risk</div>}
    {entry.healthCheckRating === 3 && <div style={{ display: "flex", alignItems: "center", color: "red" }}><FavoriteIcon style={{ marginRight: "8px" }}/>Critical risk</div>}
      </>
      )}
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default HealthCheckEntry;
