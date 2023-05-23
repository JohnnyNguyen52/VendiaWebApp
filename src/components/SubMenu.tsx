import useJaneHopkins from "@/api/useJaneHopkins";
import React, { useEffect, useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import usePatient from "@/api/usePatient";

// Used to show currently selected patient properties from the data table
function SubMenu() {
    const { entities } = useJaneHopkins();

    // When patient is selected, useEffect will fetch the data from patient and add that data
    // to realPatient
    const [realPatient, setRealPatient] = useState<any>(undefined);

    // Patient data directly from the table
    const { patient, setPatient }: any = usePatient();
    const { user } = useUser();

    useEffect(() => {
        const s = async () => {
            if (patient[0] != undefined) {
                setRealPatient(await entities.patient.get(patient[0].id));
            }
        }
        s();
    }, [entities.patient, patient])

    if (realPatient == undefined) return (<h2>Patient not selected</h2>)
    else {
        return (
            <>
                <h2>Patient Information</h2>
                {((user?.name == 'doctor@janehopkins.com') || (user?.name == 'admin@janehopkins.com')) &&
                    <p>
                        <div> <b>Name: </b>{realPatient.name} </div>
                        <div> <b>Picture: </b>{patient.patientPicture} </div>
                        <div> <b>Insurance Number: </b>{realPatient.insuranceNumber} </div>
                        <div> <b>Date of Birth: </b>{realPatient.dob} </div>
                        <div> <b>Height: </b>{realPatient.height} </div>
                        <div> <b>Weight: </b>{realPatient.weight} </div>
                        {/* <div> <b>Allergies: </b>{selectedrealPatient.allergies && selectedPatient.allergies.map((x: any) => <li>{x}</li>)
                        && console.log(selectedrealPatient.allergies)
                    } </div> */}
                        <div> <b>Currently Insured: </b>{realPatient.currentlyInsured.toString()} </div>
                        <div> <b>Currently Employed: </b>{realPatient.currentlyEmployed.toString()} </div>
                        {/* <div> <b>ICD Health Codes: </b>{selectedrealPatient.icdHealthCodes && selectedPatient.icdHealthCodes.map(
                        (x: any) => <p>{x}</p>)
                    } </div>

                    <div> <b>Visits: </b>{selectedrealPatient.visits && selectedPatient.visits.map(
                        (x: any) => <p>{x}</p>)
                    } </div> */}


                        <div> <b>Blood Pressure: </b>{realPatient.bloodPressure} </div>
                        <div> <b>Temperature: </b>{realPatient.temperature} </div>

                        <div> <b>Oxygen Saturation: </b>{realPatient.oxygenSaturation} </div>

                        {/* <div> <b>Current Medications: </b>{selectedrealPatient.currentMedications && selectedPatient.currentMedications.map(
                        (x: any) => <p>{x}</p>)
                    } </div> */}
                        <div> <b>Current Dosage: </b>{realPatient.currentDosage} </div>

                        <h3>Drug Info</h3>
                        <div> <b>Dosage: </b>{realPatient.dosage} </div>
                        <div> <b>Placebo: </b>{realPatient.placebo} </div>
                    </p>
                }
                {((user?.name == 'admin@bavaria.com')) &&
                    <p>
                        <h3>realPatient Info</h3>
                        <div> <b>Insurance Number: </b>{realPatient.insuranceNumber} </div>
                        <div> <b>Date of Birth: </b>{realPatient.dob} </div>
                        <div> <b>Height: </b>{realPatient.height} </div>
                        <div> <b>Weight: </b>{realPatient.weight} </div>
                        {/* <div> <b>Allergies: </b>{selectedrealPatient.allergies && selectedPatient.allergies.map(
                        (x: any) => <p>{x}</p>)
                    } </div> */}
                        <div> <b>Currently Insured: </b>{realPatient.currentlyInsured.toString()} </div>
                        <div> <b>Currently Employed: </b>{realPatient.currentlyEmployed.toString()} </div>

                        {/* <div> <b>Visits: </b>{selectedrealPatient.visits && selectedPatient.visits.map(
                        (x: any) => <p>{x}</p>)
                    } </div> */}


                        <div> <b>Blood Pressure: </b>{realPatient.bloodPressure} </div>
                        <div> <b>Temperature: </b>{realPatient.temperature} </div>

                        <div> <b>Oxygen Saturation: </b>{realPatient.oxygenSaturation} </div>
                        <div> <b>UUID: </b>{realPatient.uuid} </div>

                        {/* <div> <b>Current Medications: </b>{selectedrealPatient.currentMedications && selectedPatient.currentMedications.map(
                        (x: any) => <p>{x}</p>)
                    } </div> */}
                        <div> <b>Current Dosage: </b>{realPatient.currentDosage} </div>

                        <h3>Drug Info</h3>
                        <div> <b>Dosage: </b>{realPatient.dosage} </div>
                        <div> <b>Placebo: </b>{realPatient.placebo} </div>
                    </p>
                }
                {((user?.name == 'admin@fda.com')) &&
                    <p>
                        <h3>realPatient Info</h3>
                        <div> <b>Insurance Number: </b>{realPatient.insuranceNumber} </div>
                        <div> <b>Date of Birth: </b>{realPatient.dob} </div>
                        <div> <b>Height: </b>{realPatient.height} </div>
                        <div> <b>Weight: </b>{realPatient.weight} </div>
                        {/* <div> <b>Allergies: </b>{selectedrealPatient.allergies && selectedPatient.allergies.map(
                        (x: any) => <p>{x}</p>)
                    } </div> */}
                        <div> <b>Currently Insured: </b>{realPatient.currentlyInsured.toString()} </div>
                        <div> <b>Currently Employed: </b>{realPatient.currentlyEmployed.toString()} </div>
                        {/* <div> <b>ICD Health Codes: </b>{selectedrealPatient.icdHealthCodes && selectedPatient.icdHealthCodes.map(
                        (x: any) => <p>{x}</p>)
                    } </div>

                    <div> <b>Visits: </b>{selectedrealPatient.visits && selectedPatient.visits.map(
                        (x: any) => <p>{x}</p>)
                    } </div> */}


                        <div> <b>Blood Pressure: </b>{realPatient.bloodPressure} </div>
                        <div> <b>Temperature: </b>{realPatient.temperature} </div>

                        <div> <b>Oxygen Saturation: </b>{realPatient.oxygenSaturation} </div>
                        <div> <b>UUID: </b>{realPatient.uuid} </div>

                        {/* <div> <b>Current Medications: </b>{selectedrealPatient.currentMedications && selectedPatient.currentMedications.map(
                        (x: any) => <p>{x}</p>)
                    } </div> */}
                        <div> <b>Current Dosage: </b>{realPatient.currentDosage} </div>

                        <h3>Drug Info</h3>
                        <div> <b>Dosage: </b>{realPatient.dosage} </div>
                        <div> <b>Placebo: </b>{realPatient.placebo} </div>
                        <div> <b>Batch Number: </b>{realPatient.batchNumber} </div>
                    </p>
                }
            </>
        )
    }
}
export default SubMenu;