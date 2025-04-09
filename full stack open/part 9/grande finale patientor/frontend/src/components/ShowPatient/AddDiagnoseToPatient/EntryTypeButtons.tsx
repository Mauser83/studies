import { Button } from "@mui/material";
import { EntryType } from "../../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

interface props {
    entryType: EntryType
    setEntryType: (value: EntryType) => void
}

const EntryTypeButtons = ({ entryType, setEntryType }: props) => {
  return (
    <>
      <Button
        variant="contained"
        color={entryType === "Hospital" ? "success" : "primary"}
        onClick={() => setEntryType("Hospital")}
      >
        Hospital
        <LocalHospitalIcon style={{ marginLeft: "8px" }} />
      </Button>
      <Button
        variant="contained"
        color={entryType === "HealthCheck" ? "success" : "primary"}
        onClick={() => setEntryType("HealthCheck")}
      >
        Health check
        <MonitorHeartIcon style={{ marginLeft: "8px" }} />
      </Button>
      <Button
        variant="contained"
        color={entryType === "OccupationalHealthcare" ? "success" : "primary"}
        onClick={() => setEntryType("OccupationalHealthcare")}
      >
        Occupational healthcare
        <HealthAndSafetyIcon style={{ marginLeft: "8px" }} />
      </Button>
    </>
  );
};

export default EntryTypeButtons;
