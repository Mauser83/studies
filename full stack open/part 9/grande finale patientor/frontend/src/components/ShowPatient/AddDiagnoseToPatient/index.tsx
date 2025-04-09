import {
  SyntheticEvent,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Button } from "@mui/material";
import {
  Diagnosis,
  EntryType,
  HealthCheckRating,
  NewEntry,
} from "../../../types";
import { Alert } from "@mui/material";
import { MultiValue } from "react-select";
import EntryTypeButtons from "./EntryTypeButtons";
import EntryTypeTitles from "./EntryTypeTitles";
import NewDiagnoseForm from "./NewDiagnoseForm";

interface props {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  submitForm: (value: NewEntry) => void;
  error?: string;
  setError: (value: string) => void;
  diagnosis: Diagnosis[];
  // cancelForm: () => void;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

const AddDiagnoseToPatient = forwardRef(
  (
    { expanded, setExpanded, submitForm, error, setError, diagnosis }: props,
    ref
  ) => {
    const [entryType, setEntryType] = useState<EntryType>("Hospital");
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    // const [diagnosisCode, setDiagnosisCode] = useState<Diagnosis["code"]>("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
    const [healthCheckRating, setHealthCheckRating] = useState<string>("");
    const [employerName, setEmployerName] = useState<string>("");
    const [sickLeave, setSickLeave] = useState<SickLeave>({
      startDate: "",
      endDate: "",
    });
    const [discharge, setDischarge] = useState<Discharge>({
      date: "",
      criteria: "",
    });

    const options = diagnosis
      ? diagnosis.map((diagnosi) => ({
          value: diagnosi.code,
          label: diagnosi.code + " " + diagnosi.name,
        }))
      : undefined;

    // const addDiagnosis = (): void => {
    //   setDiagnosisCodes(diagnosisCodes.concat(diagnosisCode));
    //   setDiagnosisCode("");
    // };
    const selectDiagnosis = (
      target: MultiValue<{ value: string; label: string }>
    ): void => {
      setDiagnosisCodes(target.map((select) => select.value));
    };

    const resetForm = (): void => {
      setDescription("");
      setDate("");
      setSpecialist("");
      // setDiagnosisCode("");
      setDiagnosisCodes([]);
      setHealthCheckRating("");
      setEmployerName("");
      setSickLeave({
        startDate: "",
        endDate: "",
      });
      setDischarge({
        date: "",
        criteria: "",
      });
    };

    const cancelForm = (): void => {
      setExpanded(false);
      setError("");
      resetForm();
    };

    useImperativeHandle(ref, () => ({
      cancelForm,
    }));

    const expandForm = (): void => setExpanded(true);

    const submitFormHandler = (event: SyntheticEvent) => {
      event.preventDefault();
      switch (entryType) {
        case "Hospital":
          const newHospitalDiagnose: NewEntry = {
            description,
            date,
            specialist,
            diagnosisCodes,
            type: entryType,
            discharge,
          };
          submitForm(newHospitalDiagnose);
          break;
        case "HealthCheck":
          const newHealthCheckDiagnose: NewEntry = {
            description,
            date,
            specialist,
            diagnosisCodes,
            type: entryType,
            healthCheckRating: parseInt(healthCheckRating) as HealthCheckRating,
          };
          submitForm(newHealthCheckDiagnose);
          break;
        case "OccupationalHealthcare":
          const newOccupationalHealthCareDiagnose: NewEntry = {
            description,
            date,
            specialist,
            diagnosisCodes,
            type: entryType,
            employerName,
            sickLeave,
          };
          submitForm(newOccupationalHealthCareDiagnose);
          break;
      }
    };

    return (
      <>
        <br />
        <br />
        {!expanded && (
          <Button variant="contained" color="primary" onClick={expandForm}>
            Add new entry
          </Button>
        )}
        <>
          {error && <Alert severity="error">{error}</Alert>}
          {expanded && (
            <div style={{ border: "1px dotted black", padding: "5px" }}>
              <EntryTypeButtons
                entryType={entryType}
                setEntryType={setEntryType}
              />
              <EntryTypeTitles entryType={entryType} />
              <NewDiagnoseForm
                description={description}
                setDescription={setDescription}
                date={date}
                setDate={setDate}
                specialist={specialist}
                setSpecialist={setSpecialist}
                options={options}
                selectDiagnosis={selectDiagnosis}
                entryType={entryType}
                setHealthCheckRating={setHealthCheckRating}
                employerName={employerName}
                setEmployerName={setEmployerName}
                sickLeave={sickLeave}
                setSickLeave={setSickLeave}
                discharge={discharge}
                setDischarge={setDischarge}
                submitFormHandler={submitFormHandler}
                cancelForm={cancelForm}
              />
            </div>
          )}
        </>
      </>
    );
  }
);

export default AddDiagnoseToPatient;
