import { createVendiaClient } from '@vendia/client'

//Connects it to the Vendia Client.

const client = createVendiaClient({
  apiUrl: `https://8qw9j76uyd.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://ennvneiawd.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: '2awTDZRJdk9nXtzGNNC9DCiBU3CFVPdpGy8eiiNWcWAz',
})

const { entities }: any = client;

type Patient = {
  icd10: { code: string };
  dob: string;
};


// Define function to check patient eligibility
const checkPatientEligibility = async (patient: Patient): Promise<boolean> => {
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

const useFDA = (): { entities: any[]; checkPatientEligibility: (patient: Patient) => Promise<boolean> } => {
  return { entities, checkPatientEligibility };
};

export default useFDA;