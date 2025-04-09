import { useEffect, useState, useRef } from "react";
import { Diagnosis, Entry, NewEntry, Patient } from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetails from "./EntryDetails";
import AddDiagnoseToPatient from "./AddDiagnoseToPatient";
import axios from "axios";

interface props {
  diagnosis: Diagnosis[]
}

const ShowPatient = ({ diagnosis }: props) => {
    const id: string | undefined = useParams().id;
    const [patient, setPatient] = useState<Patient>();
    const [expanded, setExpanded] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const addDiagnoseRef = useRef<{cancelForm: () => void }>(null);
    
    useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatient(id);
      if (patient) {
        setPatient(patient);
      } else {
        return null;
      }
    };
    fetchPatient();
    }, [id]);

    const submitNewDiagnose = async (values: NewEntry) => {
      if (id) {
      try {
        const newEntry: Entry = await patientService.createDiagnose(id, values);
        if (patient) {
          setPatient((prevPatient) => prevPatient ? {
            ...prevPatient,
            entries: prevPatient?.entries ? [...prevPatient.entries, newEntry] : [newEntry],
          } : undefined);
        }
        setExpanded(false);
        if (addDiagnoseRef.current) {
          addDiagnoseRef.current.cancelForm();
        }
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data.message && typeof e?.response?.data.message === "string") {
            const message = e.response.data.message;
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
        return null;
      }
      } else {
        console.log("Patient ID is required");
      }
    };

    return (
        <>
        <div>{!patient && "Error finding patient"}</div>
        {patient && 
            <>
            <div style={{display: "flex", alignItems: "center"}}><h2 style={{marginRight: "10px"}}>{patient.name}</h2>{patient.gender === "female" && <FemaleIcon/>}{patient.gender === "male" && <MaleIcon/>}</div>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <AddDiagnoseToPatient expanded={expanded} setExpanded={setExpanded} submitForm={submitNewDiagnose} error={error} setError={setError} diagnosis={diagnosis} ref={addDiagnoseRef}/>
            <h3>entries</h3>
            {patient.entries && patient.entries.length > 0 &&
            <>
            {patient.entries.map((entry) => <div key={entry.id}>
              <EntryDetails key={entry.id} entry={entry} diagnosis={diagnosis}/>
            {/* {entry.date} <i>{entry.description}</i>
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && 
            <ul>
              {entry.diagnosisCodes && entry.diagnosisCodes.map((icd) => 
              <li key={entry.id+icd}>{icd} {diagnosis ? diagnosis.find(d => d.code === icd)?.name : null}</li>)}
            </ul>
            } */}
            </div>)}
            </>}
            </>}
        </>
    );
};

export default ShowPatient;