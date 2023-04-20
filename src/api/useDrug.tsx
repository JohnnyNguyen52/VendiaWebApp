import { createGlobalState } from 'react-hooks-global-state';

const initialState = { drug: [] };
const { useGlobalState } = createGlobalState(initialState);

const useDrug = () => {
  const [drug, setDrug] = useGlobalState('drug');
  return {drug, setDrug};
};


export default useDrug;  