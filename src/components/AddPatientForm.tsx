import useJaneHopkins from "@/api/useJaneHopkins";
import { MenuItem, InputLabel, Dialog, DialogTitle, DialogContent, Typography, Divider, Checkbox, FormControlLabel, Box, Button, FormControl, FormHelperText, InputAdornment, Modal, OutlinedInput, TextField, DialogActions, DialogContentText } from "@mui/material";
import { useReducer, useState } from "react";
import useRefreshKey from "@/api/useRefreshKey";
import { Theme, useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { VendiaWebAppAPI } from "@/api/VendiaWebAppAPI";
import useStudyStatus from "@/api/useStudyStatus";
import { useUser } from '@auth0/nextjs-auth0/client';
import useFinalPatientsConfirm from "@/api/useFinalPatientsConfirm";

let visitsArray: any[] = [];
let allergiesArray: any[] = [];
let currentMedsArray: any[] = [];
let icdHCArray: any[] = [];

let codes = [
  // A00–B99 Certain infectious and parasitic diseases
  "A00",
  "A01",
  "A02",
  "A03",
  "A04",
  "A05",
  "A06",
  "A07",
  "A08",
  "A09",
  "B00",
  "B01",
  "B02",
  "B03",
  "B04",
  "B05",
  "B06",
  "B07",
  "B08",
  "B09",

  // C00–D48 Neoplasms
  "C00",
  "C01",
  "C02",
  "C03",
  "C04",
  "C05",
  "C06",
  "C07",
  "C08",
  "C09",
  "D00",
  "D01",
  "D02",
  "D03",
  "D04",
  "D05",
  "D06",
  "D07",
  "D08",
  "D09",

  //D50–D89	Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism
  "D50",
  "D51",
  "D52",
  "D53",
  "D54",
  "D55",
  "D56",
  "D57",
  "D58",
  "D59",

  // E00–E90	Endocrine, nutritional and metabolic diseases
  "E00",
  "E01",
  "E02",
  "E03",
  "E04",
  "E05",
  "E06",
  "E07",
  "E08",
  "E09",

  // F00–F99	Mental and behavioural disorders
  "F00",
  "F01",
  "F02",
  "F03",
  "F04",
  "F05",
  "F06",
  "F07",
  "F08",
  "F09",

  // G00–G99	Diseases of the nervous system
  "G00",
  "G01",
  "G02",
  "G03",
  "G04",
  "G05",
  "G06",
  "G07",
  "G08",
  "G09",

  // H00–H59	Diseases of the eye and adnexa
  "H00",
  "H01",
  "H02",
  "H03",
  "H04",
  "H05",
  "H06",
  "H07",
  "H08",
  "H09",

  // H60–H95	Diseases of the ear and mastoid process
  "H60",
  "H61",
  "H62",
  "H63",
  "H64",
  "H65",
  "H66",
  "H67",
  "H68",
  "H69",

  // I00–I99	Diseases of the circulatory system
  "I00",
  "I01",
  "I02",
  "I03",
  "I04",
  "I05",
  "I06",
  "I07",
  "I08",
  "I09",

  // J00–J99	Diseases of the respiratory system
  "J00",
  "J01",
  "J02",
  "J03",
  "J04",
  "J05",
  "J06",
  "J07",
  "J08",
  "J09",

  // K00–K93	Diseases of the digestive system
  "K00",
  "K01",
  "K02",
  "K03",
  "K04",
  "K05",
  "K06",
  "K07",
  "K08",
  "K09",

  // L00–L99	Diseases of the skin and subcutaneous tissue
  "L00",
  "L01",
  "L02",
  "L03",
  "L04",
  "L05",
  "L06",
  "L07",
  "L08",
  "L09",

  // M00–M99	Diseases of the musculoskeletal system and connective tissue
  "M00",
  "M01",
  "M02",
  "M03",
  "M04",
  "M05",
  "M06",
  "M07",
  "M08",
  "M09",

  // N00–N99	Diseases of the genitourinary system
  "N00",
  "N01",
  "N02",
  "N03",
  "N04",
  "N05",
  "N06",
  "N07",
  "N08",
  "N09",

  // O00–O99	Pregnancy, childbirth and the puerperium
  "O00",
  "O01",
  "O02",
  "O03",
  "O04",
  "O05",
  "O06",
  "O07",
  "O08",
  "O09",

  // P00–P96	Certain conditions originating in the perinatal period
  "P00",
  "P01",
  "P02",
  "P03",
  "P04",
  "P05",
  "P06",
  "P07",
  "P08",
  "P09",

  // Q00–Q99	Congenital malformations, deformations and chromosomal abnormalities
  "Q00",
  "Q01",
  "Q02",
  "Q03",
  "Q04",
  "Q05",
  "Q06",
  "Q07",
  "Q08",
  "Q09",

  // R00–R99	Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified
  "R00",
  "R01",
  "R02",
  "R03",
  "R04",
  "R05",
  "R06",
  "R07",
  "R08",
  "R09",

  // S00–T98	Injury, poisoning and certain other consequences of external causes
  "S00",
  "S01",
  "S02",
  "S03",
  "S04",
  "S05",
  "S06",
  "S07",
  "S08",
  "S09",
  "T00",
  "T01",
  "T02",
  "T03",
  "T04",
  "T05",
  "T06",
  "T07",
  "T08",
  "T09",

  // V01–Y98	External causes of morbidity and mortality
  "V00",
  "V01",
  "V02",
  "V03",
  "V04",
  "V05",
  "V06",
  "V07",
  "V08",
  "V09",

  // Z00–Z99	Factors influencing health status and contact with health services
  "Z00",
  "Z01",
  "Z02",
  "Z03",
  "Z04",
  "Z05",
  "Z06",
  "Z07",
  "Z08",
  "Z09",

  // U00–U99	Codes for special purposes
  "U00",
  "U01",
  "U02",
  "U03",
  "U04",
  "U05",
  "U06",
  "U07",
  "U08",
  "U09",
];

function getStyles(code: any, codesChosen: any[], theme: Theme) {
  return {
    fontWeight:
      codesChosen.indexOf(code) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

function AddPatientForm() {
  const theme = useTheme();

  const { entities } = useJaneHopkins();
  const [openViewModal, setOpenViewModal] = useState(false);//set to false so that it is closed
  const { count, setCount }: any = useRefreshKey();
  const [open, setOpen] = useState(false);
  const handleToClose = () => { setOpen(false); };
  const { user } = useUser();
  const { studyStatus, setStudyStatus } = useStudyStatus();
  const { finalPatientsConfirm, setFinalPatientsConfirm } = useFinalPatientsConfirm();
  const handleCloseView = () => setOpenViewModal(false);
  let [codesChosen, setCodesChosen] = useState([]);

  //This stores the info that you inputted.
  const [formInput, setFormInput] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      name: "",
      dob: "",
      height: "",
      weight: "",
      insuranceNumber: "",
      address: "",
      bloodPressure: "",
      temperature: "",
      oxygenSaturation: "",
      uuid: "",
      currentMedications: [],
      familyHistory: "",
      icdHealthCodes: [],
      allergies: [],
      visits: [],

    }
  );
  //This creates the "name: formInput[0].name" to be set into the formInput that is above this.
  const handleInput = (evt: any) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });

  };
  //Takes the information inputted into the formInput and stores it into the Vendia Database
  const handleAdd = async () => {
    const patient = {
      eligible: booleanInput.eligible,
      dosesID: "",
      currentDosage: "0",
      name: formInput.name,
      dob: formInput.dob,
      height: formInput.height,
      weight: formInput.weight,
      insuranceNumber: formInput.insuranceNumber,
      address: formInput.address,
      bloodPressure: formInput.bloodPressure,
      temperature: formInput.temperature,
      oxygenSaturation: formInput.oxygenSaturation,
      uuid: formInput.uuid,
      currentMedications: formInput.currentMedications,
      familyHistory: formInput.familyHistory,
      currentlyEmployed: booleanInput.currentlyEmployed,
      currentlyInsured: booleanInput.currentlyInsured,
      icdHealthCodes: icdHCArray,
      allergies: formInput.allergies,
      visits: formInput.visits,
    };

    if (VendiaWebAppAPI.isPatientEligible(patient) == true) {
      const addPatientResponse = await entities.patient.add(patient);
      setCount(count + 1)
      setOpenViewModal(false); //Closes it
    }
    else {
      setOpen(true);
    }
  };




  const handleBooleanInput = (evt: any) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    if (newValue == 'on') {
      setBooleanInput({ [name]: true });
    }
    else {
      setBooleanInput({ [name]: false });
    }

  };
  const [booleanInput, setBooleanInput] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      eligible: false,
      currentlyEmployed: false,
      currentlyInsured: false,


    }
  );

  const handleVisitInput = (evt: any) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setVisitsColumn({ [name]: newValue });
  };
  //the array. We are pushing visitsColumn into it
  //format of every object
  const [visitsColumn, setVisitsColumn] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      patient: "",
      dateTime: "",
      notes: "",
      hivViralLoad: "",
    }
  );

  const visitAdd = async () => {
    visitsArray.push(visitsColumn);
    setFormInput({ ...formInput, ["visits"]: visitsArray });
    resetVisitInput();
  };

  const handleAllergyInput = (evt: any) => {
    const name = evt.target.name;
    const newValue = evt.target.value;

    setAllergyColumn({ [name]: newValue });
  };

  const [allergyColumn, setAllergyColumn] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      allergy: "",
    }
  );

  const allergyAdd = async () => {
    allergiesArray.push(allergyColumn);
    setFormInput({ ...formInput, ["allergies"]: allergiesArray });
    resetAllergyInput();
  };

  const handleMedInput = (evt: any) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setMedColumn({ [name]: newValue });
  };

  const [medColumn, setMedColumn] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      medication: "",
    }
  );

  const medicationAdd = async () => {
    currentMedsArray.push(medColumn);
    setFormInput({ ...formInput, ["currentMedications"]: currentMedsArray });
    resetMedInput();
  };

  const handleICDInput = async () => {
    for (let i = 0; i < icdColumn.code.length; i++) {
      icdHCArray.push({ code: icdColumn.code[i] });
    }
  };

  const [icdColumn, setIcdColumn] = useReducer(

    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      code: "",
    }

  );

  const handleChange = (evt: any) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setCodesChosen(value);
    setIcdColumn({ [name]: value })
  };

  //This will reset the appearance of the form. Making blank once you enter it again.
  //Probably a better way to do this.
  const resetFormInput = async () => {

    formInput.name = "";
    formInput.dob = "";
    formInput.height = "";
    formInput.weight = "";
    formInput.insuranceNumber = "";
    formInput.address = "";
    formInput.bloodPressure = "";
    formInput.temperature = "";
    formInput.oxygenSaturation = "";
    formInput.uuid = "";
    formInput.currentMedications = [];
    formInput.familyHistory = "";
    booleanInput.currentlyEmployed = false;
    booleanInput.currentlyInsured = false;
    formInput.icdHealthCodes = [];
    formInput.allergies = [];
    formInput.visits = [];
  };

  //Resets the values but doesn't get rid of the appearance.
  const resetVisitInput = async () => {
    setVisitsColumn({
      patient: "",
      dateTime: "",
      notes: "",
      hivViralLoad: "",
    });
  };
  //Resets the values but doesn't get rid of the appearance.
  const resetAllergyInput = async () => {
    setAllergyColumn({
      allergy: "",
    });
  };
  //Resets the values but doesn't get rid of the appearance.
  const resetMedInput = async () => {
    setMedColumn({
      medication: "",
    });
  };
  const resetICDInput = async () => {
    setIcdColumn({
      code: "",
    });
  };

  return (
    <>
      {(user?.name == 'doctor@janehopkins.com' || user?.name == 'admin@janehopkins.com') &&
        <Button
          disabled={studyStatus != 0 || finalPatientsConfirm != 0}
          variant="contained"
          onClick={() => {
            resetFormInput();
            setOpenViewModal(true);
          }}
        >Add
        </Button>}
      <div>
        <Dialog
          open={openViewModal}
          onClose={handleCloseView}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          scroll={'body'}

        >
          <DialogTitle id="scroll-dialog-title">Add Patient Form</DialogTitle>
          <Divider sx={{ m: 2, }} />
          <DialogContent>
            <Box sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
            >
              <TextField sx={{ m: 1, width: 200 }} helperText="Name" name="name" onChange={handleInput} defaultValue={formInput.name} />
              <TextField type="date" sx={{ m: 1, width: 350 }} helperText="Date of Birth" name="dob" onChange={handleInput} defaultValue={formInput.dob} />
              <TextField sx={{ m: 1, width: 200 }} helperText="Address" name="address" onChange={handleInput} defaultValue={formInput.address} />
            </Box>
            <Box sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              m: 2,
            }}
            >
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <OutlinedInput
                  inputProps={{
                    'aria-label': 'height',
                  }}
                  name="height"
                  onChange={handleInput}
                  defaultValue={formInput.height}
                />
                <FormHelperText >Height</FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <OutlinedInput
                  endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  name="weight"
                  onChange={handleInput}
                  defaultValue={formInput.weight}

                />
                <FormHelperText >Weight</FormHelperText>
              </FormControl>

            </Box>

            <Box sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              m: 2,
            }}
            >
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <OutlinedInput
                  endAdornment={<InputAdornment position="end">mm Hg</InputAdornment>}
                  inputProps={{
                    'aria-label': 'bloodPressure',
                  }}
                  name="bloodPressure"
                  onChange={handleInput}
                  defaultValue={formInput.bloodPressure}
                />
                <FormHelperText >Blood Pressure</FormHelperText>
              </FormControl>

              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <OutlinedInput
                  endAdornment={<InputAdornment position="end">°F</InputAdornment>}
                  inputProps={{
                    'aria-label': 'temperature',
                  }}
                  name="temperature"
                  onChange={handleInput}
                  defaultValue={formInput.temperature}

                />
                <FormHelperText >Temperature</FormHelperText>
              </FormControl>

            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                m: 2
              }}
            >
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <Select
                  multiple
                  name="code"
                  value={codesChosen}
                  onChange={handleChange}
                >
                  {codes.map((code) => (
                    <MenuItem
                      key={code}
                      value={code}
                      style={getStyles(code, codesChosen, theme)}
                    >
                      {code}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>ICD Health Codes</FormHelperText>
              </FormControl>
            </Box>
            <Box sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              m: 2,
            }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="currentlyEmployed"
                    onChange={handleBooleanInput}
                    defaultValue={booleanInput.currentlyEmployed}
                  />}
                label="Currently Employed"
                labelPlacement="end"
              />
              <FormControlLabel
                control={<Checkbox
                  name="currentlyInsured"
                  onChange={handleBooleanInput}
                  defaultValue={booleanInput.currentlyInsured}
                />}
                label="Currently Insured"
                labelPlacement="end"
              />
            </Box>
            <Divider sx={{ m: 2, }} />
            <div>
              <Typography>Visits</Typography>
              <Box sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                m: 2,
              }}
              >
                <TextField
                  sx={{ m: 1, width: '25ch' }}
                  helperText="Patient"
                  name="patient"
                  onChange={handleVisitInput}
                  defaultValue={visitsColumn.patient}
                />
                <TextField
                  sx={{ m: 1, width: '25ch' }}
                  helperText="Date and Time"
                  name="dateTime"
                  onChange={handleVisitInput}
                  defaultValue={visitsColumn.dateTime}
                />
                <TextField
                  sx={{ m: 1, width: '25ch' }}
                  helperText="Notes"
                  name="notes"
                  multiline
                  maxRows={4}
                  onChange={handleVisitInput}
                  defaultValue={visitsColumn.notes}
                />
                <TextField
                  sx={{ m: 1, width: '25ch' }}
                  helperText="HIV Viral Load"
                  name="hivViralLoad"
                  onChange={handleVisitInput}
                  defaultValue={visitsColumn.hivViralLoad}
                />
              </Box>
              <Button
                variant="contained"
                onClick={visitAdd}
              >Add Visit
              </Button>
            </div>
            <Divider sx={{ m: 2, }} />
            <div>
              <Typography>Current Medications</Typography>
              <Box sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                m: 2,
              }}
              >
                <TextField
                  sx={{ m: 1, width: '25ch' }}
                  helperText="Medication"
                  name="medication"
                  onChange={handleMedInput}
                  defaultValue={medColumn.medication}
                />
              </Box>

              <Button
                variant="contained"
                onClick={medicationAdd}
              >Add Medication
              </Button>
            </div>
            <Divider sx={{ m: 2, }} />
            <div>
              <Typography>Allergies</Typography>
              <Box sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                m: 2,
              }}
              >
                <TextField
                  sx={{ m: 1, width: '25ch' }}
                  helperText="Allergy"
                  name="allergy"
                  onChange={handleAllergyInput}
                  defaultValue={allergyColumn.allergy}
                />
              </Box>
              <Button
                variant="contained"
                onClick={allergyAdd}
              >Add Allergy
              </Button>
            </div>
            <Divider sx={{ m: 2, }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                m: 2,
              }}>
              <Button
                variant="contained"
                onClick={() => {
                  handleICDInput()
                  handleAdd()
                }}
              >Add Patient
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenViewModal(false);
                  setOpen(true);
                }}
              >Cancel
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
        {open && <Dialog open={open} onClose={handleToClose}>
          <DialogTitle>{"Patient is ineligible"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please recheck patient inputs.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToClose}
              color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>}
      </div>
    </>
  )
}

export default AddPatientForm;