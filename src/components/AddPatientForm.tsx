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
} from "@mui/material";
import { sizeHeight } from "@mui/system";
import { useReducer, useState } from "react";

function AddPatientForm() {
  const { entities } = useJaneHopkins();
  const [openViewModal, setOpenViewModal] = useState(false); //set to false so that it is closed

  const handleCloseView = () => setOpenViewModal(false);
  //This creates the "name: formInput[0].name" to be set into the formInput that is above this.
  const handleInput = (evt: any) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ ...formInput, [name]: newValue });
  };
  const handleCheckbox = (evt: any) => {
    const { name, checked } = evt.target;
    setFormInput({ ...formInput, [name]: checked });
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
      address: "",
      currentMedications: [], // as string array
      familyHistory: "",
      currentlyEmployed: false,
      currentlyInsured: false,
      icdHealthCodes: [], // as string array
      allergies: [], // as string array
    }
  );
  //Takes the information inputted into the formInput and stores it into the Vendia Database
  const handleAdd = async () => {
    try {
      const addPatientResponse = await entities.patient.add(
        {
          name: formInput.name,
          dob: formInput.dob,
          height: formInput.height,
          weight: formInput.weight,
          insuranceNumber: formInput.insuranceNumber,
          address: formInput.address,
          currentMedications: formInput.currentMedications,
          familyHistory: formInput.familyHistory,
          currentlyEmployed: formInput.currentlyEmployed,
          currentlyInsured: formInput.currentlyInsured,
          icdHealthCodes: formInput.icdHealthCodes,
          allergies: formInput.allergies,
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

      setOpenViewModal(false);
    } catch (error) {
      console.log("Error adding patient: ", error);
      // Add  error handling code here,
    }
  };

  //This will reset the appearance of the form. Making blank once you enter it again.
  //Probably a better way to do this.
  const resetFormInput = async () => {
    setFormInput({
      name: "",
      dob: "",
      height: "",
      weight: "",
      insuranceNumber: "",
      address: "",
      currentMedications: [],
      familyHistory: "",
      currentlyEmployed: false,
      currentlyInsured: false,
      icdHealthCodes: [],
      allergies: [],
    });
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
              maxWidth: 600,
              backgroundColor: "#fff",
              boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
              borderRadius: "8px",
              p: 4,
              columnCount: 2,
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
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                m: 2,
              }}
            >
              <TextField
                sx={{ m: 1, width: 200 }}
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
              <TextField
                sx={{ m: 1, width: 200 }}
                helperText="Family History"
                name="familyHistory"
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
            ></Box>

            <Box>
              <Button variant="contained" onClick={handleAdd}>
                Add Patient
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
