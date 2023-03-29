import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import Users from "@/api/Users";

const initialState = { currentUserGlobal: Users.BavariaAdmin };
const { useGlobalState } = createGlobalState(initialState);

const useCurrentUser = () => {
  const [currentUserGlobal, setCurrentUserGlobal] = useGlobalState('currentUserGlobal');
  return {currentUserGlobal, setCurrentUserGlobal};
};


export default useCurrentUser;  