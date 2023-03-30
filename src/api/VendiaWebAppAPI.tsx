import useJaneHopkins from "./useJaneHopkins";
import Users from "./Users";

export class VendiaWebAppAPI {
    static async getBatchNumbers(): Promise<string[]> {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { entities } = useJaneHopkins();
        let drugs = await entities.drug.list();

        // Fetch the 2 batch numbers. Should only be 2 in the table.
        let batchNumbers: string[] = [];
        drugs.items.forEach((drug: { batchNumber: string; }) => {
            if (batchNumbers.find((batchNumber) => batchNumber == drug.batchNumber) == undefined) {
                batchNumbers.push(drug.batchNumber);
            }
        });
        return batchNumbers;
    }

    // Randomly assigns batch number to all patients
    static async AssignBatchNumber() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { entities } = useJaneHopkins();

        let patients = await entities.patient.list();

        let batchNumbers = await this.getBatchNumbers();

        // Randomly select a batch number for each patient.
        patients.items.forEach((patient: { _id: string; }) => {
            let x = 0;
            if (Math.random() > .5) {
                x = 1
            }
            entities.patient.update({
                _id: patient._id,
                batchNumber: batchNumbers[x]
            })
        });
    }

    // Define function to check patient eligibility
    static isPatientEligible(patient: any): boolean {
        let healthCodes: string[] = patient.icdHealthCodes;
        const dob = new Date(patient.dob);

        // Exclude ICD-10 Pregnancy codes
        if (healthCodes.find((x) => { x.startsWith('O') }) != undefined) {
            return false
        }

        // Exclude DOB greater than 1/1/2005
        if (dob > new Date('2005-01-01')) {
            return false;
        }

        // Add more eligibility checks here as needed

        return true;
    };

    static async getStudyStatus(): Promise<number> {
        let dd: number = -1;
        await fetch("http://localhost:3000/api/items/studyStatus")
            .then((response) => response.json())
            .then((data) => { dd = data; console.log(data) });
        return dd;
    }

    // Returns what the study status was set to
    static async setStudyStatus(studyStatus: number): Promise<number> {
        let d: number = -1;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studyStatus: studyStatus })
        };
        await fetch(`http://localhost:3000/api/items/studyStatus/${studyStatus}`, requestOptions)
            .then(response => response.json())
            .then((data) => { d = data })
        return d;
    }
}