import { useState } from 'react';

function onRowClick(patient) {
  // Update the state with the selected patient
  setSelectedPatient(patient);
}

function SideMenu({ patient }) {
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Exclude info based on user access
  let patientInfo = {};
  if (patient.location === 'Jane Hopkins') {
    patientInfo = { dob: patient.dob };
  } else if (patient.location === 'Bavaria') {
    patientInfo = { ...patient };
    delete patientInfo.name;
    delete patientInfo.patientPicture;
    delete patientInfo.batchNumber;
  } else if (patient.location === 'FDA') {
    patientInfo = { ...patient };
    delete patientInfo.name;
    delete patientInfo.patientPicture;
  } else {
    patientInfo = { ...patient };
  }

  return (
    <div>
      {selectedPatient && (
        <div>
          <h3>Selected Patient Info:</h3>
          <p>Date of Birth: {patientInfo.dob}</p>
          <p>Location: {patientInfo.location}</p>
          {patientInfo.patientPicture && (
            <img src={patientInfo.patientPicture} alt="Patient" />
          )}
          {patientInfo.batchNumber && (
            <p>Batch Number: {patientInfo.batchNumber}</p>
          )}
        </div>
      )}
    </div>
  );
}
