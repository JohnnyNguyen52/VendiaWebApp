import { createGlobalState } from 'react-hooks-global-state';

const initialState = { count: 0 };
const { useGlobalState } = createGlobalState(initialState);

// This hook is specifically used to notify data table to sync with the vendia database. 
// E.g. use: After adding a patient with the AddPatientForm, count is incremented to notify data
// table to update.
const useRefreshKey = () => {
  const [count, setCount] = useGlobalState('count');
  return {count, setCount};
};

export default useRefreshKey;  