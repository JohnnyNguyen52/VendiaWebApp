import { createVendiaClient } from '@vendia/client'

//Connects it to the Vendia Client.

const client = createVendiaClient({
  apiUrl: `https://yas6wdf349.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://32wq55mmz4.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: 'HznjMFJFoukiyJheu7qhbbXdHmnhKqwe4Q39zcq47Q7J',
})

const { entities }: any = client;
const useBavaria = () => {
  return { entities };
}

export default useBavaria;