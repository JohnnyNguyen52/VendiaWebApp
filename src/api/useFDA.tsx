import { createVendiaClient } from '@vendia/client'

//Connects it to the Vendia Client.

const client = createVendiaClient({
  apiUrl: `https://ek9iw7erja.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://nfpxxwjmhl.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: 'A6QmwQT59exFszmCktBnQqAE23Rh43zZRKXUh5eCfk47',
})

const { entities }: any = client;

const useFDA = () => {
  return { entities };
}

export default useFDA;