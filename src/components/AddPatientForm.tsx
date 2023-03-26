import useJaneHopkins from "@/api/useJaneHopkins";
import {
  Box,
  Button,
  FormControl,
  Checkbox,
  FormHelperText,
  InputAdornment,
  Modal,
  OutlinedInput,
  TextField,
  Input,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { sizeHeight } from "@mui/system";
import { useReducer, useState } from "react";
import useRefreshKey from "@/api/useRefreshKey";

let visitsArray: any[] = [];
function AddPatientForm()
{
    const { entities } = useJaneHopkins();
    const [openViewModal, setOpenViewModal] = useState(false);//set to false so that it is closed
    const {count, setCount} : any = useRefreshKey();
   
    const handleCloseView = () => setOpenViewModal(false);
  
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
      dateTime:"",
      notes:"",
      hivViralLoad:""
  
    }
  );
    const visitAdd = async () => {
      visitsArray.push(visitsColumn);
      console.log(visitsArray);
      setFormInput({ ...formInput, ["visits"]:visitsArray});
      resetVisitInput();
    }; 
 
    //This creates the "name: formInput[0].name" to be set into the formInput that is above this.

  const handleInput = (evt: any) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ ...formInput, [name]: newValue });
  };
  const handleCheckbox = (evt: any) => {
    const { name, checked } = evt.target;
    const value = checked ? "yes" : "no";
    setFormInput({ ...formInput, [name]: checked });
  };
//Note schema must be changed before currentlyEmployed or currentlyInsured 
//Can be set as boolean variables
//This stores the info that you inputted.
  const [formInput, setFormInput] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      uuid:"",
      name: "",
      dob: "",
      height: "",
      weight: "",
      insuranceNumber: "",
      address:"",
      bloodPressure:"",
      temperature:"",
      oxygenSaturation:"",
      currentMedications:[],
      familyHistory:"",
      currentlyEmployed: "",
      currentlyInsured: "",
      icdHealthCodes:[],
      allergies:[],
      visits:[],
      
    }
  );
  //Takes the information inputted into the formInput and stores it into the Vendia Database
  const handleAdd = async () => {

    try {
    const addPatientResponse = await entities.patient.add({
      uuid:formInput.uuid,
      name:formInput.name,
      dob:formInput.dob,
      height:formInput.height,
      weight:formInput.weight,
      insuranceNumber:formInput.insuranceNumber,
      address:formInput.address,
      bloodPressure:formInput.bloodPressure,
      temperature:formInput.temperature,
      oxygenSaturation:formInput.oxygenSaturation,
      currentMedications:formInput.currentMedications,
      familyHistory:formInput.familyHistory,
      currentlyEmployed:formInput.currentlyEmployed,
      currentlyInsured:formInput.currentlyInsured,
      icdHealthCodes:formInput.icdHealthCodes,
      allergies:formInput.allergies,
      visits:formInput.visits,
     
      },
      {
          aclInput: {
            acl: [
            {
                principal: {
                  nodes: ["Bavaria", "FDA"],
              },
              operations: ["READ"], //Write gives the option to update
                path: "weight", //What is allowed to go to Bavaria and FDA
            },
          ],
        },
      }
    );
    console.log(formInput);
    setCount(count+1)
    setOpenViewModal(false); //Closes it
    } catch (error) {
      console.log("Error adding patient: ", error);
      // Add  error handling code here,
    }
  };


  

  //This will reset the appearance of the form. Making blank once you enter it again.
  //Probably a better way to do this.
  const resetFormInput = async () =>{
    setFormInput({
    uuid:"",
    name:"",
    dob:"",
    height: "",
    weight: "",
    insuranceNumber: "",
    address: "",
    bloodPressure: "",
    temperature: "",
    oxygenSaturation: "",
    currentMedications: [],
    familyHistory: "",
    currentlyEmployed: "",
    currentlyInsured: "",
    icdHealthCodes: [],
    allergies: [],
    visits: [],
    })
  };
  //Resets the values but doesn't get rid of the appearance.
  const resetVisitInput = async () =>{
    setVisitsColumn({
      patient: "",
      dateTime:"",
      notes:"",
      hivViralLoad:""
    })
  };
  return (
        <>
      <Button 
          variant="contained"
          onClick={() => {
            resetFormInput();
            setOpenViewModal(true);
          }}
      >
        Add
      </Button>
      <Modal
        open={openViewModal}
        onClose={handleCloseView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 1059 }}
      >
        <form onSubmit={handleAdd}>
        <Box 
          sx={{
          position: "absolute",
          top: "50%",
          margin: "5%  0%",
          left: "50%",
          padding: "5% 0%",
          transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: 1000,
              backgroundColor: "#fff",
              boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
              borderRadius: "8px",
              p: 4,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px",
              zIndex: 1059,
          }}
        >
            <Box
              sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
                m: 2,
            }}
          >
              <TextField
                sx={{ m: 1, width: 200 }}
                helperText="Name"
                name="name"
                onChange={handleInput}
                defaultValue={formInput.name}
              />
              <TextField
                type="date"
                sx={{ m: 1, width: 350 }}
                helperText="Date of Birth"
                name="dob"
                onChange={handleInput}
                defaultValue={formInput.dob}
              />
          </Box>
            <Box
              sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              m: 2,
            }}
          >
              <TextField
                sx={{ m: 2, width: 200 }}
                helperText="Address"
                name="address"
                onChange={handleInput}
                defaultValue={formInput.address}
              />
          </Box>
            <Box
              sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
                m: 2,
            }}
          >
              <TextField
                sx={{ m: 1, width: 200 }}
                helperText="Insurance"
                name="insuranceNumber"
                onChange={handleInput}
                defaultValue={formInput.insuranceNumber}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                m: 2,
              }}
            >
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-height"
                aria-describedby="outlined-height-helper-text"
                inputProps={{
                    "aria-label": "height",
                }}
                name="height"
                onChange={handleInput}
                defaultValue={formInput.height}
              />
                <FormHelperText id="outlined-height-helper-text">
                  Height
                </FormHelperText>
            </FormControl>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">lbs</InputAdornment>
                  }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                    "aria-label": "weight",
                }}
                name="weight"
                onChange={handleInput}
                defaultValue={formInput.weight}
                
              />
                <FormHelperText id="outlined-weight-helper-text">
                  Weight
                </FormHelperText>
            </FormControl>
            
            </Box>

            <Box
              sx={{
                gridColumn: "2 / 3",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                m: 2,
              }}
            >
              {/* Second column content */}
              <label>Upload Image:</label>
              <Input 
                type="file"
                name="image"
                sx={{ m: 1 }}
                inputProps={{
                  accept: "image/*",
                  onChange: handlePictureUpload,
                  
                }}
              />
              <TextField
                sx={{ m: 1, width: 200 }}
                helperText="Current Medications"
                name="currentMedications"
                onChange={handleInput}
                defaultValue={formInput.currentMedications}
              />
            </Box>
            <Box
              sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
                m: 2,
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
                id="outlined-adornment-temperature"
                endAdornment={<InputAdornment position="end">°F</InputAdornment>}
                aria-describedby="outlined-temperature-helper-text"
                inputProps={{
                  'aria-label': 'temperature',
                }}
                name="temperature"
                onChange={handleInput}
                defaultValue={formInput.temperature}
                
              />
              <FormHelperText id="outlined-temperature-helper-text">Temperature</FormHelperText>
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
                id="outlined-adornment-oxygenSaturation"
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                aria-describedby="outlined-oxygenSaturation-helper-text"
                inputProps={{
                  'aria-label': 'oxygenSaturation',
                }}
                name="temperature"
                onChange={handleInput}
                defaultValue={formInput.oxygenSaturatione}
                
              />
              <FormHelperText id="outlined-oxygenSaturation-helper-text">Oxygen Saturation</FormHelperText>
            </FormControl>

          </Box>
          <Box sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            m:2,      
            }}
            >
              <TextField
              sx = {{m: 1,width: 200 }}
                helperText="Family History"
                name = "familyHistory"
                multiline
                maxRows={4}
                onChange={handleInput} 
                defaultValue={formInput.familyHistory}
              />
          </Box>
            <Box
              sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
                m: 2,
            }}
            >
              <FormControl>
                <Checkbox
                  checked={formInput.currentlyEmployed}
                  onChange={handleCheckbox}
                  name="currentlyEmployed"
              />
                Currently Employed
                <Checkbox
                  checked={formInput.currentlyInsured}
                  onChange={handleCheckbox}
                  name="currentlyInsured"
              />
                Currently Insured
              </FormControl>
          </Box>
            <Box
              sx={{
            display: "flex",
                justifyContent: "center",
            alignItems: "center",
                m: 2,
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
        <Box>
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
              >
                Cancel
              </Button>
            </Box>
        </Box>
        </form>
      </Modal>
      </>
  );
}

export default AddPatientForm;