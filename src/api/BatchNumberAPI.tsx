import useJaneHopkins from "./useJaneHopkins";

export class BatchNumberAPI {
    static async getBatchNumbers() : Promise<string[]> {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { entities } = useJaneHopkins();
        let drugs = await entities.drug.list();

        // Fetch the 2 batch numbers. Should only be 2 in the table.
        let batchNumbers: string[] = [];
        drugs.items.forEach((drug: any) => {
            if (batchNumbers.find(drug.batchNumber) == undefined) {
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
        patients.items.forEach((patient: any) => {
            let x = 0;
            if (Math.random() > .5) {
                x = 1
            }
            entities.patient.update({
                _id: patient._id,
                dosesID: batchNumbers[x]
            })
        });
    }
}