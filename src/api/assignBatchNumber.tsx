import useJaneHopkins from "@/api/useJaneHopkins";

// Randomly assigns batch number to all patients
export default async function AssignBatchNumber() {
    const { entities } = useJaneHopkins();

    let batchNumbers: string[] = [];
    let drugs = await entities.drug.list();
    let patients = await entities.patient.list();

    // Fetch the 2 batch numbers. Should only be 2 in the table.
    drugs.items.forEach(drug => {
        if (batchNumbers.find(drug.batchNumber) == undefined) {
            batchNumbers.push(drug.batchNumber);
        }
    });

    // Randomly select a batch number for each patient.
    patients.items.forEach(patient => {
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