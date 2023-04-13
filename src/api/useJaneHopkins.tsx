import { createVendiaClient } from '@vendia/client'
import {useState} from "react";

//Connects it to the Vendia Client.
//Also has to be done for the other two.
const client = createVendiaClient({
  apiUrl: `https://00p2cukqq3.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://3xia2y12zd.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: 'ACLw6gPffjmhEfXRMyaZV9cdy8jLr8wcTk34kR4UaBK2', // <---- API key
})

const { entities }: any = client;
const useJaneHopkins = () => {
  return { entities };
}

export default useJaneHopkins;