import { createGlobalState } from 'react-hooks-global-state';

 async function getFinalDrugsConfirm(): Promise<number> {
        let dd: number = 0;
        await fetch("http://localhost:3000/api/items/lock")
            .then((response) => response.json())
            .then((data) => { dd = data });
        return dd;
    }

const initialState = { count: await getFinalDrugsConfirm() };
const { useGlobalState } = createGlobalState(initialState);

// Hook to indicate whether the drug list is finalized. Syncs with the backend persistant storage
export default function useFinalDrugsConfirm() {
  const [finalDrugsConfirm, setter] = useGlobalState('count');
  const setFinalDrugsConfirm = async (x: number) => {
    setter(x);
    let d: number = 0;
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({ lock: x })
    };
    await fetch(`http://localhost:3000/api/items/lock/${x}`, requestOptions)
      .then(response => response.json())
      .then((data) => { d = data })
  }

  return { finalDrugsConfirm: finalDrugsConfirm, setFinalDrugsConfirm: setFinalDrugsConfirm };
}
