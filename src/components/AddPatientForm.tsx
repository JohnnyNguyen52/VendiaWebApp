import schema from '../../.vendia/schema.json';
import { useState } from 'react';

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    insuranceNumber: '',
    height: '',
    weight: '',
    bloodPressure: '',
    temperature: '',
    oxygenSaturation: '',
    address: '',
    familyHistory: '',
    currentlyEmployed: '',
    currentlyInsured: '',
    currentMedications: [],
    icdHealthCodes: [],
    allergies: [],
    visits: [],
    patientPicture: null
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, files } = event.target;
  if (files && files.length > 0) {
    setFormData({
      ...formData,
      [name]: files[0]
    });
  }
};


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // validate the form data against the schema
    // send the data to the server
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </label>
      <label>
        Date of Birth:
        <input type="text" name="dob" value={formData.dob} onChange={handleInputChange} />
      </label>
      <label>
        Insurance Number:
        <input type="text" name="insuranceNumber" value={formData.insuranceNumber} onChange={handleInputChange} />
      </label>
      <label>
        Patient Picture:
        <input type="file" name="patientPicture" onChange={handleFileChange} />
      </label>
      {/* Add more input fields for other properties */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPatientForm;
