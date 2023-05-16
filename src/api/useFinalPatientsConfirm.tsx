import { createGlobalState } from "react-hooks-global-state";

async function getFinalPatientsConfirm(): Promise<number> {
  let dd: number = -1;
  await fetch("http://localhost:3000/api/items/finalPatientsConfirm/")
    .then((response) => response.json())
    .then((data) => { dd = data; console.log(data) });
  return dd;
}

const initialState = { count: await getFinalPatientsConfirm() };
const { useGlobalState } = createGlobalState(initialState);

export default function useFinalPatientsConfirm() {
  const [finalPatientsConfirm, setter] = useGlobalState('count');

  const setFinalPatientsConfirm = async (x: number) => {
    setter(x);
    let d: number = -1;
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({ studyStatus: x })
    };

    await fetch(`http://localhost:3000/api/items/finalPatientsConfirm/${x}`, requestOptions)
      .then(response => response.json())
      .then((data) => { d = data })
  }

  return { finalPatientsConfirm: finalPatientsConfirm, setFinalPatientsConfirm: setFinalPatientsConfirm };
}