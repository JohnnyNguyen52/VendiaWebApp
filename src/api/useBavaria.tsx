import { createVendiaClient } from '@vendia/client'

//Connects it to the Vendia Client.

const client = createVendiaClient({
  apiUrl: `https://szuza5gmx8.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://n0p6n2zxli.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: '6WwMp33Yr94RWf2yu6RMzq3d86kWVUR6EfY5k4GihVig',
})

const { entities }: any = client;
const useBavaria = () => {
  return { entities };
}

export default useBavaria;