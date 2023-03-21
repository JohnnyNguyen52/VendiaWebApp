import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const initialState = { count: 0 };
const { useGlobalState } = createGlobalState(initialState);

const useRefreshKey = () => {
  const [count, setCount] = useGlobalState('count');
  return {count, setCount};
};


export default useRefreshKey;  
//Connected to data-table and patientform
//creates a global varible that increments every time Add Patient is use
//Then the useEffect is activated in data-table