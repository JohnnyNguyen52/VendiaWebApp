function Datagrid() {
  const patients = [
    { name: 'John Doe', dob: '01/01/1980', location: 'Vendia', batchNumber: '1234', patientPicture: 'https://example.com/patient.jpg' },
    { name: 'Jane Hopkins', dob: '02/02/1990', location: 'Jane Hopkins', batchNumber: '5678', patientPicture: 'https://example.com/patient.jpg' },
    { name: 'Alice Smith', dob: '03/03/2000', location: 'Bavaria', batchNumber: '9012', patientPicture: 'https://example.com/patient.jpg' },
    { name: 'Bob Johnson', dob: '04/04/1985', location: 'FDA', batchNumber: '3456', patientPicture: 'https://example.com/patient.jpg' },
  ];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.name} onClick={() => onRowClick(patient)}>
              <td>{patient.name}</td>
              <td>{patient.dob}</td>
              <td>{patient.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
