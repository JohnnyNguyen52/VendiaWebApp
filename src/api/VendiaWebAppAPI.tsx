import useJaneHopkins from "./useJaneHopkins";

export class VendiaWebAppAPI {

    static async getBatchNumbers(): Promise<string[]> {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { entities } = useJaneHopkins();
        let drugs = await entities.drug.list();

        // Fetch the 2 batch numbers. Should only be 2 in the table.
        let batchNumbers: string[] = [];
        drugs.items.forEach((drug: { batchNumber: string; }) => {
            if (batchNumbers.find(x => x == drug.batchNumber) == undefined) {
                batchNumbers.push(drug.batchNumber);
            }
        });
        return batchNumbers;
    }

    // Randomly assigns batch number to all patients
    static async AssignBatchNumber(): Promise<boolean> {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { entities } = useJaneHopkins();
        let patients = await entities.patient.list();

        let batchNumbers = await this.getBatchNumbers();
        let x = 0;
        // Randomly select a batch number for each patient.
        patients.items.forEach((patient: { _id: any, dosesID: string, currentDosage: string }) => {
            if (Math.random() > .5) {
                x = 1;
            }
            entities.patient.update({
                _id: patient._id,
                dosesID: batchNumbers[x],
                currentDosage: "0",
            })
        });
        return true;
    }

    // checks patient eligibility
    static isPatientEligible(patient: any): boolean {
        let healthCodes: any[] = patient.icdHealthCodes;
        const dob = new Date(patient.dob);

        // Exclude ICD-10 Pregnancy codes
        if (healthCodes.find((x) => { x.code.startsWith('O') }) != undefined) {
            return false
        }

        // Exclude DOB greater than 1/1/2005
        if (dob > new Date('2005-01-01')) {
            return false;
        }

        // Add more eligibility checks here as needed

        return true;
    };
}