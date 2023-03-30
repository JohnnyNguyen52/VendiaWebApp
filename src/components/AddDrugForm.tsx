import useJaneHopkins from "@/api/useJaneHopkins";
import { Checkbox, FormControlLabel, Box, Button, FormControl, FormHelperText, InputAdornment, Modal, OutlinedInput, TextField } from "@mui/material";
import { useReducer, useState } from "react";
import useRefreshKey from "@/api/useRefreshKey";
import useDrug from "@/api/useDrug";
import Users from "@/api/Users";
import useCurrentUserGlobal from "@/api/useCurrentUser";


function AddDrugForm({ currentUser }: { currentUser: Users })
{
    const { entities } = useJaneHopkins();
    const [openViewModal, setOpenViewModal] = useState(false);//set to false so that it is closed
    const {count, setCount} : any = useRefreshKey();
    const {currentUserGlobal, setCurrentUserGlobal} = useCurrentUserGlobal();

    const handleCloseView = () => setOpenViewModal(false);

     //Selected Drug
     const {drug, setDrug} = useDrug();


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
        placebo: false,
        batchNumber: "",
        id: "",

    }
  );
//Takes the information inputted into the formInput and stores it into the Vendia Database
  const handleAdd = async () => {
    const addDrugResponse = await entities.drug.add({
      placebo:formInput.placebo,
      batchNumber:formInput.batchNumber,
      id:formInput.id,
      },
      {
        aclInput:{
          acl:[
            {
              principal:{
                nodes:["Bavaria","FDA", "JaneHopkins"]//what nodes are allowed to see it
              },
              operations: ["READ"], //Write gives the option to update
              path:"batchNumber", 
              
            },
            {
              principal:{
                nodes:["Bavaria","FDA", "JaneHopkins"]
              },
              operations: ["READ"], 
              path:"id", 
              
            },
            {
              principal:{
                nodes:["Bavaria"]
              },
              operations: ["READ"], 
              path:"placebo", 
              
            },
          ],
        },
      }
    );
    setCount(count+1)
      console.log("DrugForm - "+count);
    setOpenViewModal(false); //Closes it
    
  };

  const handleRemove = async (drug: any[]) => {
    const removeDrugResponse = await entities.drug.remove(drug[0].id)
    setCount(count+1)
  }

  //This will reset the appearance of the form. Making blank once you enter it again.
  //Probably a better way to do this.
  const resetFormInput = async () =>{
   
    formInput.placebo = false;
    formInput.batchNumber = "";
    formInput.id = "";
 
  };



    return(
        <>
      <Button 
            name = "addButton"
            variant="contained"
            onClick={() => {
            resetFormInput();
            setOpenViewModal(true);
          }}
            disabled = {currentUserGlobal != Users.BavariaAdmin}
        >Add
      </Button>
      <Button 
            name = "deleteButton"
            variant="outlined"
            onClick={() => {
            handleRemove(drug);
            }}
            disabled = {currentUserGlobal != Users.BavariaAdmin}
        >Delete
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
                    <FormControlLabel
                        value="placebo"
                        control={<Checkbox />}
                        label="Placebo"
                        labelPlacement="end"
                        onChange={handleInput}
                        defaultValue={formInput.placebo}
                    />
                    <TextField sx = {{m: 1,width: 200 }} helperText="Batch Number" name="batchNumber" onChange={handleInput}defaultValue={formInput.batchNumber} />
                </Box>
                <Box>
                    <Button 
                        variant="contained"
                        onClick={handleAdd}
                        >Add Drug
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
      </Modal>
      </>
    )
}

export default AddDrugForm;