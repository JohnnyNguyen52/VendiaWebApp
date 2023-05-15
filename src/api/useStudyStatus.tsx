import { createGlobalState } from 'react-hooks-global-state';

 async function getStudyStatus(): Promise<number> {
        let dd: number = -1;
        await fetch("http://localhost:3000/api/items/studyStatus")
            .then((response) => response.json())
            .then((data) => { dd = data; console.log(data) });
        return dd;
    }

const initialState = { count: await getStudyStatus() };
const { useGlobalState } = createGlobalState(initialState);

// Used as a hook that syncs with the backend's studyStatus. Use this hook if you want to fetch
// the study status.
// 0 == Study is not started
// 1 == Study is started
// 2 == Study is finished
export default function useStudyStatus() {
  const [studyStatus, setter] = useGlobalState('count');

  const setStudyStatus = async (x: number) => {
    setter(x);
    let d: number = -1;
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({ studyStatus: x })
    };
    await fetch(`http://localhost:3000/api/items/studyStatus/${x}`, requestOptions)
      .then(response => response.json())
      .then((data) => { d = data })
  }

  return { studyStatus: studyStatus, setStudyStatus: setStudyStatus };
}
