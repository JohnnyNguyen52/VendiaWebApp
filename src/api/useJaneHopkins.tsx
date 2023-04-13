import { createVendiaClient } from '@vendia/client'
import {useState} from "react";

//Connects it to the Vendia Client.
//Also has to be done for the other two.
const client = createVendiaClient({
  apiUrl: `https://150qs2byv3.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://cg24hicyq9.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: '7uYdpmEm764SnyoTDvaNEzLAFM3qEEB1D8CBHyqTUJQe', // <---- API key
})

const { entities }: any = client;
const useJaneHopkins = () => {
  return { entities };
}

export default useJaneHopkins;