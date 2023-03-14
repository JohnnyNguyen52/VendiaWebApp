
// Define function to check patient eligibility
export default function isPatientEligible(patient: any): boolean {
  const { code: icd10Code } = patient.icd10;
  const dob = new Date(patient.dob);

  // Exclude ICD-10 Pregnancy codes
  if (icd10Code.startsWith('O09') || icd10Code.startsWith('O10')) {
    return false;
  }

  // Exclude DOB greater than 1/1/2005
  if (dob > new Date('2005-01-01')) {
    return false;
  }

  // Add more eligibility checks here as needed

  return true;
};