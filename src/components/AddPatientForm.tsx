

import useJaneHopkins from "@/api/useJaneHopkins";
import { Box, Button, FormControl, FormHelperText, InputAdornment, Modal, OutlinedInput, TextField } from "@mui/material";
import { useReducer, useState } from "react";

import { Patient } from "..";
import isPatientEligible from "../api/checkPatientEligibility"
interface Props {
  onAddPatient: (patient: Patient) => void;
  
}

const AddPatientForm: React.FC<Props> = ({ onAddPatient }) => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [address, setAddress] = useState("");
  const [currentMedications, setCurrentMedications] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");
  const [currentlyEmployed, setCurrentlyEmployed] = useState(false);
  const [currentlyInsured, setCurrentlyInsured] = useState(false);
  const [icdHealthCodes, setIcdHealthCodes] = useState("");
  const [allergies, setAllergies] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate patient eligibility
    const eligible = isPatientEligible(dob);

    // Create new patient object
    const newPatient: Patient = {
      name,
      dob,
      insuranceNumber,
      height,
      weight,
      address,
      currentMedications: currentMedications.split(","),
      familyHistory,
      currentlyEmployed,
      currentlyInsured,
      icdHealthCodes: icdHealthCodes.split(","),
      allergies: allergies.split(","),
      eligible,
      drugBatchNumber: "",
      doses: [],
    };

    // Call onAddPatient callback with new patient object
    onAddPatient(newPatient);

    // Clear form input fields
    setName("");
    setDob("");
    setInsuranceNumber("");
    setHeight("");
    setWeight("");
    setAddress("");
    setCurrentMedications("");
    setFamilyHistory("");
    setCurrentlyEmployed(false);
    setCurrentlyInsured(false);
    setIcdHealthCodes("");
    setAllergies("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Date of Birth:
        <input
          type="date"
          value={dob}
          onChange={(event) => setDob(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Insurance Number:
        <input
          type="text"
          value={insuranceNumber}
          onChange={(event) => setInsuranceNumber(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Height (in inches):
        <input
          type="number"
          value={height}
          onChange={(event) => setHeight(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Weight (in pounds):
        <input
          type="number"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Address:
        <textarea
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          required
        ></textarea>
      </label>
      <br />
      <label>
        <input
type="text"
value={currentMedications}
onChange={(event) => setCurrentMedications(event.target.value)}
/>
</label>
<br />
<label>
Family History:
<textarea
value={familyHistory}
onChange={(event) => setFamilyHistory(event.target.value)}
></textarea>
</label>
<br />
<label>
Currently Employed:
<input
type="checkbox"
checked={currentlyEmployed}
onChange={(event) => setCurrentlyEmployed(event.target.checked)}
/>
</label>
<br />
<label>
Currently Insured:
<input
type="checkbox"
checked={currentlyInsured}
onChange={(event) => setCurrentlyInsured(event.target.checked)}
/>
</label>
<br />
<label>
ICD Health Codes (separated by commas):
<input
type="text"
value={icdHealthCodes}
onChange={(event) => setIcdHealthCodes(event.target.value)}
/>
</label>
<br />
<label>
Allergies (separated by commas):
<input
type="text"
value={allergies}
onChange={(event) => setAllergies(event.target.value)}
/>
</label>
<br />
<button type="submit">Add Patient</button>
</form>
);
};

export default AddPatientForm;
       
