import { useState } from 'react';

interface Patient {
  name: string;
  location: string;
  dob: string;
  patientPicture?: string;
  batchNumber?: string;
}

interface SideMenuProps {
  patient: Patient;
}

function SideMenu({ patient }: SideMenuProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Exclude info based on user access
  let patientInfo: Partial<Patient> = {};
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

  function onRowClick(patient: Patient) {
    // Update the state with the selected patient
    setSelectedPatient(patient);
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
