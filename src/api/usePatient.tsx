import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const initialState = { patient: [] };
const { useGlobalState } = createGlobalState(initialState);

const useDrug = () => {
  const [patient, setPatient] = useGlobalState('patient');
  return {patient, setPatient};
};


export default useDrug;  