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



const useFDA = (): { entities: any[]; checkPatientEligibility: (patient: Patient) => Promise<boolean> } => {
  return { entities, checkPatientEligibility };
};

export default useFDA;