import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const initialState = { patient: [] };
const { useGlobalState } = createGlobalState(initialState);

// Hook to hold the currently selected patient from the data table
const usePatient = () => {
  const [patient, setPatient] = useGlobalState('patient');
  return {patient, setPatient};
};


export default usePatient;  