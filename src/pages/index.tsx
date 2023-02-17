import useJaneHopkins from '../hooks/useJaneHopkins';




export default function Home() {
   const {entities} = useJaneHopkins();
 //Allows me add patients to JaneHopkins system.
   const addPatient = async() =>{
     const addPatientResponse = await entities.patient.add({
       name: "Jesse",
       dob: "January 1, 2000",
       insuranceNumber: "114528972",
     });
     console.log(addPatientResponse);
   }
   return (
     <div className="App">
       <button
       onClick={() => { 
         addPatient();}}
     >Add Patient
       </button></div>
   );
}