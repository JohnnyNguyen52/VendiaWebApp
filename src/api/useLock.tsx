import { createGlobalState } from 'react-hooks-global-state';

 async function getLock(): Promise<number> {
        let dd: number = 0;
        await fetch("http://localhost:3000/api/items/lock")
            .then((response) => response.json())
            .then((data) => { dd = data; console.log(data) });
        return dd;
    }

const initialState = { count: await getLock() };
const { useGlobalState } = createGlobalState(initialState);

// Used as a hook that syncs with the backend's studyStatus. Use this hook if you want to fetch
// the study status.
// 0 == Study is not started
// 1 == Study is started
// 2 == Study is finished
export default function useLock() {
  const [lock, setter] = useGlobalState('count');
  const setLock = async (x: number) => {
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

  return { lock: lock, setLock: setLock };
}
