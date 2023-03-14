// Define function to check patient eligibility
export default function isPatientEligible(patient: any): boolean {
    let healthCodes: string[] = patient.icdHealthCodes;
    const dob = new Date(patient.dob);

    // Exclude ICD-10 Pregnancy codes
    if (healthCodes.find((x) => {x == '009' || x == '010'}) != undefined)
    {
        return false
    }

    // Exclude DOB greater than 1/1/2005
    if (dob > new Date('2005-01-01')) {
        return false;
    }

    // Add more eligibility checks here as needed

    return true;
};