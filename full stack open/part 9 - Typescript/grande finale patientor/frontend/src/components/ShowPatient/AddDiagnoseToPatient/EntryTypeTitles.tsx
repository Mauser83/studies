import { EntryType } from "../../../types";

interface props {
  entryType: EntryType;
}

const EntryTypeTitles = ({ entryType }: props) => {
  switch (entryType) {
    case "Hospital":
      return <h4 style={{ margin: "0px", marginTop: "2px" }}>New Hospital entry</h4>;
    case "HealthCheck":
      return <h4 style={{ margin: "0px", marginTop: "2px" }}>New Health Check entry</h4>;
    case "OccupationalHealthcare":
        return <h4 style={{ margin: "0px", marginTop: "2px" }}>New Occupational Healthcare entry</h4>;
  }
  // return (
  //   <>
  //     {entryType === "Hospital" && (
  //       <h4 style={{ margin: "0px", marginTop: "2px" }}>New Hospital entry</h4>
  //     )}
  //     {entryType === "HealthCheck" && (
  //       <h4 style={{ margin: "0px", marginTop: "2px" }}>
  //         New Health Check entry
  //       </h4>
  //     )}
  //     {entryType === "OccupationalHealthcare" && (
  //       <h4 style={{ margin: "0px", marginTop: "2px" }}>
  //         New Occupational Healthcare entry
  //       </h4>
  //     )}
  //   </>
  // );
};

export default EntryTypeTitles;
