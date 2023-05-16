import useJaneHopkins from "@/api/useJaneHopkins";
import {  MenuItem, InputLabel, Dialog, DialogTitle, DialogContent, Typography, Divider, Checkbox, FormControlLabel, Box, Button, FormControl, FormHelperText, InputAdornment, Modal, OutlinedInput, TextField, DialogActions, DialogContentText } from "@mui/material";
import { useReducer, useState } from "react";
import useRefreshKey from "@/api/useRefreshKey";
import { Theme, useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { VendiaWebAppAPI } from "@/api/VendiaWebAppAPI";


let visitsArray: any[] = [];
let allergiesArray: any[] = [];
let currentMedsArray: any[] = [];
let icdHCArray: any[] = [];

let codes = [
  "A01.0",
  "A01.1",
  "A01.2",
  "A02.0",
  "A02.1",
  "O02.2",
];
function getStyles(code: any, codesChosen: any[], theme: Theme) {
  return {
    fontWeight:
      codesChosen.indexOf(code) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };}

function AddPatientForm()
{
  const theme = useTheme();

  const { entities } = useJaneHopkins();
  const [openViewModal, setOpenViewModal] = useState(false);//set to false so that it is closed
  const {count, setCount} : any = useRefreshKey();
  const [open, setOpen] = useState(false);
  const handleToClose = () => {setOpen(false);};

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
      address:"",
      bloodPressure:"",
      temperature:"",
      oxygenSaturation:"",
      uuid:"",
      currentMedications:[],
      familyHistory:"",
      icdHealthCodes:[],
      allergies:[],
      visits:[],

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
      name:formInput.name,
      dob:formInput.dob,
      height:formInput.height,
      weight:formInput.weight,
      insuranceNumber:formInput.insuranceNumber,
      address:formInput.address,
      bloodPressure:formInput.bloodPressure,
      temperature:formInput.temperature,
      oxygenSaturation:formInput.oxygenSaturation,
      uuid:formInput.uuid,
      currentMedications:formInput.currentMedications,
      familyHistory:formInput.familyHistory,
      currentlyEmployed:booleanInput.currentlyEmployed,
      currentlyInsured:booleanInput.currentlyInsured,
      icdHealthCodes:icdHCArray,
      allergies:formInput.allergies,
      visits:formInput.visits,
    };

    if(VendiaWebAppAPI.isPatientEligible(patient) == true)
    {
      const addPatientResponse = await entities.patient.add(patient);
      setCount(count+1)
      setOpenViewModal(false); //Closes it
    }
    else{
      setOpen(true);
    }
  };




  const handleBooleanInput = (evt: any) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    if(newValue == 'on'){
      setBooleanInput({ [name]: true });
    }
    else{
      setBooleanInput({ [name]: false });
    }
    
  };
  const [booleanInput, setBooleanInput] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      eligible:false,
      currentlyEmployed:false,
      currentlyInsured:false,


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
    console.log(visitsArray);
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
    console.log(allergiesArray);
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
    console.log(medColumn)
    currentMedsArray.push(medColumn);
    console.log(currentMedsArray)
    setFormInput({ ...formInput, ["currentMedications"]: currentMedsArray });
    console.log(formInput.currentMedications)
    resetMedInput();
  };

  const handleICDInput = async() => {
    for(let i = 0; i < icdColumn.code.length; i++){
      icdHCArray.push({code:icdColumn.code[i]});
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
    setCodesChosen( value);
    setIcdColumn({[name]: value})
  };

  //This will reset the appearance of the form. Making blank once you enter it again.
  //Probably a better way to do this.
  const resetFormInput = async () =>{

    formInput.name = "";
    formInput.dob = "";
    formInput.height = "";
    formInput.weight = "";
    formInput.insuranceNumber = "";
    formInput.address = "";
    formInput.bloodPressure= "";
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

    return(
        <>
      <Button 
          variant="contained"
          onClick={() => {
            resetFormInput();
            setOpenViewModal(true);
            
          }}
        >Add
      </Button>
      <div>
      <Dialog
        open={openViewModal}
        onClose={handleCloseView}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        scroll={'body'}

      >
        <DialogTitle id="scroll-dialog-title">Add Patient Form</DialogTitle>
        <Divider sx={{m:2,}}/>
          <DialogContent>
              <Box sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",  
                }}
              >
                <TextField sx = {{m: 1,width: 200 }} helperText="Name" name="name" onChange={handleInput} defaultValue={formInput.name} />
                <TextField type="date" sx = {{m: 1,width: 350 }} helperText="Date of Birth" name="dob" onChange={handleInput} defaultValue={formInput.dob} />
                <TextField sx = {{m: 1,width: 200 }} helperText="Address" name="address" onChange={handleInput}defaultValue={formInput.address} />
              </Box>
              <Box sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              m:2,      
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
              m:2,      
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
            m:2,      
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
              <Divider sx={{m:2,}}/>
          <div>
          <Typography>Visits</Typography>
            <Box sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              m:2,      
              }}
            >
            <TextField
                sx = {{m: 1,width: '25ch'}}
                helperText="Patient"
                name = "patient"
                onChange={handleVisitInput}
                defaultValue={visitsColumn.patient}
              />
            <TextField
              sx = {{m: 1,width: '25ch'}}
              helperText="Date and Time"
              name = "dateTime"
              onChange={handleVisitInput}
              defaultValue={visitsColumn.dateTime}
              />
            <TextField
                sx = {{m: 1,width: '25ch' }}
                helperText="Notes"
                name = "notes"
                  multiline
                  maxRows={4}
                  onChange={handleVisitInput}
                  defaultValue={visitsColumn.notes}
                />
            <TextField
              sx = {{m: 1,width: '25ch'}}
              helperText="HIV Viral Load"
              name = "hivViralLoad"
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
            <Divider sx={{m:2,}}/>
            <div>
          <Typography>Current Medications</Typography>
            <Box sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              m:2,      
              }}
            >
            <TextField
                sx = {{m: 1,width: '25ch'}}
                helperText="Medication"
                name = "medication"
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
            <Divider sx={{m:2,}}/>
            <div>
          <Typography>Allergies</Typography>
            <Box sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              m:2,      
              }}
            >
            <TextField
                sx = {{m: 1,width: '25ch'}}
                helperText="Allergy"
                name = "allergy"
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
            <Divider sx={{m:2,}}/>
          <Box
              sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              m:2,      
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

/*
 <form onSubmit={handleAdd}>
        <Box 
        
          sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          height: 900,
          backgroundColor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
          }}
        >
          
          <Box sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            m:2,      
            }}
          >
            <TextField sx = {{m: 1,width: 200 }} helperText="Name" name="name" onChange={handleInput} defaultValue={formInput.name} />
            <TextField type="date" sx = {{m: 1,width: 350 }} helperText="Date of Birth" name="dob" onChange={handleInput} defaultValue={formInput.dob} />
            <TextField sx = {{m: 1,width: 200 }} helperText="Address" name="address" onChange={handleInput}defaultValue={formInput.address} />
          </Box>
         
          <Box sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            m:2,      
            }}
          >
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-height"
              aria-describedby="outlined-height-helper-text"
              inputProps={{
                'aria-label': 'height',
              }}
              name="height"
              onChange={handleInput}
              defaultValue={formInput.height}
            />
            <FormHelperText id="outlined-height-helper-text">Height</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              name="weight"
              onChange={handleInput}
              defaultValue={formInput.weight}
              
            />
            <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
            </FormControl>
            
            </Box>
            <Box sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            m:2,      
            }}
          >
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-bloodPressure"
              endAdornment={<InputAdornment position="end">mm Hg</InputAdornment>}
              aria-describedby="outlined-bloodPressure-helper-text"
              inputProps={{
                'aria-label': 'bloodPressure',
              }}
              name="bloodPressure"
              onChange={handleInput}
              defaultValue={formInput.bloodPressure}
            />
            <FormHelperText id="outlined-height-helper-text">Blood Pressure</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment position="end">°F</InputAdornment>}
              aria-describedby="outlined-temperature-helper-text"
              inputProps={{
                'aria-label': 'temperature',
              }}
              name="temperature"
              onChange={handleInput}
              defaultValue={formInput.temperature}
              
            />
            <FormHelperText id="outlined-weight-helper-text">Temperature</FormHelperText>
            </FormControl>
            
            </Box>
            <Box sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            m:2,      
            }}
          >
            <FormControlLabel
              //value="currentlyEmployed"
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
        <Divider sx={{m:2,}}/>
        <div>
        <Typography>Visits</Typography>
          <Box sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            m:2,      
            }}
          >
          <TextField
              sx = {{m: 1,width: '25ch'}}
              helperText="Patient"
              name = "patient"
              onChange={handleVisitInput}
              defaultValue={visitsColumn.patient}
            />
          <TextField
            sx = {{m: 1,width: '25ch'}}
            helperText="Date and Time"
            name = "dateTime"
            onChange={handleVisitInput}
            defaultValue={visitsColumn.dateTime}
            />
          <TextField
              sx = {{m: 1,width: '25ch' }}
              helperText="Notes"
              name = "notes"
                multiline
                maxRows={4}
                onChange={handleVisitInput}
                defaultValue={visitsColumn.notes}
              />
          <TextField
            sx = {{m: 1,width: '25ch'}}
            helperText="HIV Viral Load"
            name = "hivViralLoad"
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
          <Divider sx={{m:2,}}/>
          <div>
        <Typography>Current Medications</Typography>
          <Box sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            m:2,      
            }}
          >
          <TextField
              sx = {{m: 1,width: '25ch'}}
              helperText="Medication"
              name = "medication"
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
          <Divider sx={{m:2,}}/>
          <div>
        <Typography>Allergies</Typography>
          <Box sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            m:2,      
            }}
          >
          <TextField
              sx = {{m: 1,width: '25ch'}}
              helperText="Allergy"
              name = "allergy"
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
        <Divider sx={{m:2,}}/>
        <Box
            sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            m:2,      
            }}>
          <Button 
            variant="contained"
              onClick={handleAdd}
            >Add Patient
          </Button>
            <Button 
            variant="outlined"
            onClick={() => {
              setOpenViewModal(false);

            }}
          >Cancel
          </Button>
          </Box>
        </Box>
        </form>
*/ 