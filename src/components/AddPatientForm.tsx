import useJaneHopkins from "@/api/useJaneHopkins";
import { Checkbox, FormControlLabel, Box, Button, FormControl, FormHelperText, InputAdornment, Modal, OutlinedInput, TextField } from "@mui/material";
import { useReducer, useState } from "react";
import useRefreshKey from "@/api/useRefreshKey";

function AddPatientForm()
{
    const { entities } = useJaneHopkins();
    const [openViewModal, setOpenViewModal] = useState(false);//set to false so that it is closed
    const {count, setCount} : any = useRefreshKey();

    const handleCloseView = () => setOpenViewModal(false);
  //This creates the "name: formInput[0].name" to be set into the formInput that is above this.
  const handleInput = (evt: any) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
    
  };
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
      currentlyEmployed:"",
      currentlyInsured:"",
      icdHealthCodes:[],
      allergies:[],
      visits:[],

    }
  );
//Takes the information inputted into the formInput and stores it into the Vendia Database
  const handleAdd = async () => {
    const addPatientResponse = await entities.patient.add({
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
      currentlyEmployed:formInput.currentlyEmployed,
      currentlyInsured:formInput.currentlyInsured,
      icdHealthCodes:formInput.icdHealthCodes,
      allergies:formInput.allergies,
      visits:formInput.visits,
     
      },
      {
        aclInput:{
          acl:[
            {
              principal:{
                nodes:["Bavaria", "FDA"]
              },
              operations: ["READ"], //Write gives the option to update
              path:"weight",//What is allowed to go to Bavaria and FDA
            },
          ],
        },
      }
    );
    setCount(count+1)
      console.log("JA - "+count);
    setOpenViewModal(false); //Closes it
    
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
    formInput.currentlyEmployed = "";
    formInput.currentlyInsured = "";
    formInput.icdHealthCodes = [];
    formInput.allergies = [];
    formInput.visits = [];
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
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
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
          </Box>
          <Box sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            m:2,      
            }}
          >
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
              value="currentlyEmployed"
              control={<Checkbox 
              />}
              label="Currently Employed"
              labelPlacement="end"
        />
        <FormControlLabel
              value="currentlyInsured"
              control={<Checkbox />}
              label="Currently Insured"
              labelPlacement="end"
        />
            </Box>



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
          >Cancel
          </Button></Box>
        </Box>
        </form>
      </Modal>
      </>
    )
}

export default AddPatientForm;