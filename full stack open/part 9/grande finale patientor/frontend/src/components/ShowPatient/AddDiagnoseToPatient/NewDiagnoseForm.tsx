import { Button } from "@mui/material";
import Select, { MultiValue } from "react-select";
import { EntryType } from "../../../types";
import { Discharge, SickLeave } from ".";
import { SyntheticEvent } from "react";

interface Options {
  value: string;
  label: string;
}

interface props {
  description: string;
  setDescription: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  specialist: string;
  setSpecialist: (value: string) => void;
  options: Options[] | undefined;
  selectDiagnosis: (
    target: MultiValue<{ value: string; label: string }>
  ) => void;
  entryType: EntryType;
  setHealthCheckRating: (value: string) => void;
  employerName: string;
  setEmployerName: (value: string) => void;
  sickLeave: SickLeave;
  setSickLeave: (value: SickLeave) => void;
  discharge: Discharge;
  setDischarge: (value: Discharge) => void;
  submitFormHandler: (event: SyntheticEvent) => void;
  cancelForm: () => void;
}

const NewDiagnoseForm = ({
  description,
  setDescription,
  date,
  setDate,
  specialist,
  setSpecialist,
  options,
  selectDiagnosis,
  entryType,
  setHealthCheckRating,
  employerName,
  setEmployerName,
  sickLeave,
  setSickLeave,
  discharge,
  setDischarge,
  submitFormHandler,
  cancelForm,
}: props) => {
  return (
    <>
      <form>
        <div>Description:</div>
        <div>
          <textarea
            style={{
              width: "100%",
              resize: "both",
              boxSizing: "border-box",
              height: "80px",
            }}
            name="description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div>
          Date:
          <input
            name="date"
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          Specialist:
          <input
            name="specialist"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </div>
        <div>
          Diagnosis codes:
          {/* <input
  name="diagnosisCode"
  value={diagnosisCode}
  onChange={({ target }) => setDiagnosisCode(target.value)}
  style={{ marginLeft: "8px" }}
/>
<Button
  onClick={addDiagnosis}
  variant="contained"
  size="small"
  style={{ marginLeft: "8px" }}
>
  Add
</Button> */}
          <Select
            options={options}
            isMulti
            name="selectedDiagnosis"
            onChange={(target) => selectDiagnosis(target)}
          />
        </div>
        {entryType === "HealthCheck" && (
          <div
            style={{ display: "flex", flexWrap: "wrap", marginBottom: "5px" }}
          >
            <div>Health check rating:</div>
            {/* <input
      name="healthCheckRating"
      value={healthCheckRating}
      onChange={({ target }) =>
        setHealthCheckRating(target.value)
      }
    /> */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            >
              <div>
                <label style={{ color: "green" }}>
                  <input
                    type="radio"
                    name="healthCheckRating"
                    value="0"
                    onChange={({ target }) =>
                      setHealthCheckRating(target.value)
                    }
                  />
                  Healthy
                </label>
              </div>
              <div>
                <label style={{ color: "#8B8000" }}>
                  <input
                    type="radio"
                    name="healthCheckRating"
                    value="1"
                    onChange={({ target }) =>
                      setHealthCheckRating(target.value)
                    }
                  />
                  Low risk
                </label>
              </div>
              <div>
                <label style={{ color: "orange" }}>
                  <input
                    type="radio"
                    name="healthCheckRating"
                    value="2"
                    onChange={({ target }) =>
                      setHealthCheckRating(target.value)
                    }
                  />
                  High risk
                </label>
              </div>
              <div>
                <label style={{ color: "red" }}>
                  <input
                    type="radio"
                    name="healthCheckRating"
                    value="3"
                    onChange={({ target }) =>
                      setHealthCheckRating(target.value)
                    }
                  />
                  Critical risk
                </label>
              </div>
            </div>
          </div>
        )}
        {entryType === "OccupationalHealthcare" && (
          <>
            <div>
              Employer name:
              <input
                name="employerName"
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
            </div>
            <div>
              Sick leave: start date:
              <input
                name="sickLeaveStartDate"
                type="date"
                value={sickLeave.startDate}
                onChange={({ target }) =>
                  setSickLeave({
                    ...sickLeave,
                    startDate: target.value,
                  })
                }
              />{" "}
              end date:
              <input
                name="sickLeaveEndDate"
                type="date"
                value={sickLeave.endDate}
                onChange={({ target }) =>
                  setSickLeave({ ...sickLeave, endDate: target.value })
                }
              />
            </div>
          </>
        )}
        {entryType === "Hospital" && (
          <div>
            Discharge: date:
            <input
              name="dischargeDate"
              type="date"
              value={discharge.date}
              onChange={({ target }) =>
                setDischarge({ ...discharge, date: target.value })
              }
            />
            criteria:
            <input
              name="dischargeCriteria"
              value={discharge.criteria}
              onChange={({ target }) =>
                setDischarge({ ...discharge, criteria: target.value })
              }
            />
          </div>
        )}
        <Button variant="contained" color="success" onClick={submitFormHandler}>
          Add
        </Button>
        <Button
          variant="contained"
          color="error"
          style={{ marginLeft: "8px" }}
          onClick={cancelForm}
        >
          Cancel
        </Button>
      </form>
    </>
  );
};

export default NewDiagnoseForm;
