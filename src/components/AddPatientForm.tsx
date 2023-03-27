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


function AddPatientForm() {
  const { entities } = useJaneHopkins();
  const [openViewModal, setOpenViewModal] = useState(false); //set to false so that it is closed
  const { count, setCount }: any = useRefreshKey();

  const handleCloseView = () => setOpenViewModal(false);



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
  const handlePictureUpload = (evt: any) => {
    const file = evt.target.files && evt.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      setFormInput({
        ...formInput,
        patientPicture: e.target.result,
      });
    };

    reader.readAsDataURL(file);
  };

  //Note schema must be changed before currentlyEmployed or currentlyInsured
  //Can be set as boolean variables
  //This stores the info that you inputted.
  const [formInput, setFormInput] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      uuid: "",
      name: "",
      dob: "",
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
    }
  );
  //Takes the information inputted into the formInput and stores it into the Vendia Database
  const handleAdd = async () => {
    try {
      const addPatientResponse = await entities.patient.add(
        {
          uuid: formInput.uuid,
          name: formInput.name,
          dob: formInput.dob,
          height: formInput.height,
          weight: formInput.weight,
          insuranceNumber: formInput.insuranceNumber,
          address: formInput.address,
          bloodPressure: formInput.bloodPressure,
          temperature: formInput.temperature,
          oxygenSaturation: formInput.oxygenSaturation,
          currentMedications: formInput.currentMedications,
          familyHistory: formInput.familyHistory,
          currentlyEmployed: formInput.currentlyEmployed,
          currentlyInsured: formInput.currentlyInsured,
          icdHealthCodes: formInput.icdHealthCodes,
          allergies: formInput.allergies,
          visits: formInput.visits,
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
      setCount(count + 1);
      setOpenViewModal(false); //Closes it
    } catch (error) {
      console.log("Error adding patient: ", error);
      // Add  error handling code here,
    }
  };

  //This will reset the appearance of the form. Making blank once you enter it again.
  //Probably a better way to do this.
  const resetFormInput = async () => {
    setFormInput({
      uuid: "",
      name: "",
      dob: "",
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
              left: "50%",
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
            <label style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Patient Information
            </label>

            <Box
              sx={{
                gridColumn: "1 / 2",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                m: 2,
              }}
            >
              {/* First column content */}
              <TextField
                sx={{ m: 1, width: 200 }}
                helperText="Name"
                name="name"
                onChange={handleInput}
                defaultValue={formInput.name}
              />
              <TextField
                type="date"
                sx={{ m: 1, width: 200 }}
                helperText="Date of Birth"
                name="dob"
                onChange={handleInput}
                defaultValue={formInput.dob}
              />{" "}
              <TextField
                sx={{ m: 2, width: 200 }}
                helperText="Address"
                name="address"
                onChange={handleInput}
                defaultValue={formInput.address}
              />
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
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-bloodPressure"
                  endAdornment={
                    <InputAdornment position="end">mm Hg</InputAdornment>
                  }
                  aria-describedby="outlined-bloodPressure-helper-text"
                  inputProps={{
                    "aria-label": "bloodPressure",
                  }}
                  name="bloodPressure"
                  onChange={handleInput}
                  defaultValue={formInput.bloodPressure}
                />
                <FormHelperText id="outlined-height-helper-text">
                  Blood Pressure
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
                sx={{ m: 1, width: 200, marginBottom: 2 }}
                name="image"
                inputProps={{
                  accept: "image/*",
                  onChange: handlePictureUpload,
                }}
              />

              <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
                <InputLabel id="icd-health-codes-label">
                  ICD Health Codes
                </InputLabel>
                <Select
                  labelId="icd-health-codes-label"
                  id="icd-health-codes"
                  multiple
                  value={formInput.icdHealthCodes}
                  onChange={handleInput}
                  defaultValue={formInput.icdHealthCodes}
                  inputProps={{
                    name: "icdHealthCodes",
                    id: "icd-health-codes",
                  }}
                >
                  <MenuItem value="A01.0">A01.0</MenuItem>
                  <MenuItem value="A01.1">A01.1</MenuItem>
                  <MenuItem value="A01.2">A01.2</MenuItem>
                  <MenuItem value="A02.0">A02.0</MenuItem>
                  <MenuItem value="A02.1">A02.1</MenuItem>
                  <MenuItem value="A02.2">A02.2</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
                <InputLabel id="allergies-label">Allergies</InputLabel>
                <Select
                  labelId="allergies-label"
                  id="allergies"
                  multiple
                  value={formInput.allergies}
                  onChange={handleInput}
                  defaultValue={formInput.allergies}
                  inputProps={{ name: "allergies", id: "allergies" }}
                >
                  <MenuItem value="Peanuts">Peanuts</MenuItem>
                  <MenuItem value="Shellfish">Shellfish</MenuItem>
                  <MenuItem value="Dairy">Dairy</MenuItem>
                  <MenuItem value="Eggs">Eggs</MenuItem>
                  <MenuItem value="Soy">Soy</MenuItem>
                  <MenuItem value="Wheat">Wheat</MenuItem>
                </Select>
              </FormControl>
              <TextField
                sx={{ m: 1, width: 200 }}
                helperText="Insurance"
                name="insuranceNumber"
                onChange={handleInput}
                defaultValue={formInput.insuranceNumber}
              />
              <TextField
                sx={{ m: 1, width: 200 }}
                helperText="Current Medications"
                name="currentMedications"
                onChange={handleInput}
                defaultValue={formInput.currentMedications}
              />
              <TextField
                sx={{ m: 1, width: 200 }}
                helperText="Family History"
                name="familyHistory"
                onChange={handleInput}
                defaultValue={formInput.familyHistory}
              />
              <Box
                sx={{
                  gridColumn: "3 / 4",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  m: 2,
                }}
              >
                <FormControl sx={{ display: "flex", flexDirection: "row" }}>
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
            </Box>

            <Box
              sx={{
                gridColumn: "3 / 4",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                m: 2,
              }}
            >
              {/* Third column content */}

              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-temperature"
                  endAdornment={
                    <InputAdornment position="end">°F</InputAdornment>
                  }
                  aria-describedby="outlined-temperature-helper-text"
                  inputProps={{
                    "aria-label": "temperature",
                  }}
                  name="temperature"
                  onChange={handleInput}
                  defaultValue={formInput.temperature}
                />
                <FormHelperText id="outlined-temperature-helper-text">
                  Temperature
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-oxygenSaturation"
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                  aria-describedby="outlined-oxygenSaturation-helper-text"
                  inputProps={{
                    "aria-label": "oxygenSaturation",
                  }}
                  name="temperature"
                  onChange={handleInput}
                  defaultValue={formInput.oxygenSaturatione}
                />
                <FormHelperText id="outlined-oxygenSaturation-helper-text">
                  Oxygen Saturation
                </FormHelperText>
              </FormControl>

              
              <FormControl></FormControl>

              {/*                */}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "10px", // or any other value that suits your layout needs
                flexWrap: "nowrap",
              }}
            >
              
              <Button
                sx={{ width: "fit-content" }}
                variant="contained"
                onClick={handleAdd}
              >
                Add Patient
              </Button>
              <Button
                sx={{
                  width: "fit-content",
                  flex: 1,
                  bgcolor: "white",
                  color: "primary.main",
                  border: "1px solid",
                  borderColor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.light",
                    color: "white",
                    borderColor: "primary.dark",
                  },
                }}
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
