import useJaneHopkins from "@/api/useJaneHopkins";
import { Checkbox, FormControlLabel, Box, Button, FormControl, FormHelperText, InputAdornment, Modal, OutlinedInput, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemButton } from "@mui/material";
import { useReducer, useState } from "react";
import useRefreshKey from "@/api/useRefreshKey";
import useDrug from "@/api/useDrug";
import Users from "@/api/Users";
import useCurrentUserGlobal from "@/api/useCurrentUser";
import { useUser } from '@auth0/nextjs-auth0/client';
import React from "react";
import useLock from "@/api/useLock";
import useStudyStatus from "@/api/useStudyStatus";


function AddDrugForm()
{
    const { entities } = useJaneHopkins();
    const [openViewModal, setOpenViewModal] = useState(false);//set to false so that it is closed
    const {count, setCount} : any = useRefreshKey();
    const {currentUserGlobal, setCurrentUserGlobal} = useCurrentUserGlobal();
    const { user } = useUser();
    const [refreshKey, setRefreshKey] = React.useState(false);


    const [open, setOpen] = useState(false);

    const {lock, setLock} = useLock();
    const { studyStatus, setStudyStatus } = useStudyStatus();

    const handleCloseView = () => setOpenViewModal(false);

     //Selected Drug
     const {drug, setDrug} = useDrug();


     const handleCancel = () => {
      setOpen(false);
  };

  const handleConfirm = () => {
      setOpen(false);
      handleLock();
      setRefreshKey(!refreshKey);
  };

  const onConfirmClick = () => {
      setOpen(true);
  }

  //This creates the "name: formInput[0].name" to be set into the formInput that is above this.
  const handleInput = (evt: any) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
    
  };
  const handleCheckbox = (evt: any) => {
    const { name, checked } = evt.target;
    const value = checked ? true : false;
    setFormInput({ [name]: checked });
  };
//This stores the info that you inputted.
  const [formInput, setFormInput] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      // id: "",  
      placebo: false,
      dosage:"",
      batchNumber: "",
        

    }
  );
//Takes the information inputted into the formInput and stores it into the Vendia Database
  const handleAdd = async () => {
    const addDrugResponse = await entities.drug.add({
      // id:formInput._id,
      placebo:formInput.placebo,
      dosage:formInput.dosage,
      batchNumber:formInput.batchNumber,
      
      },
      {
        aclInput:{
          acl:[
            {
              principal:{
                nodes:["Bavaria", "FDA"]//what nodes are allowed to see it
              },
              operations: ["READ"], //Write gives the option to update
              path:"batchNumber", 
              
            },
            {
              principal:{
                nodes:["Bavaria","FDA"]
              },
              operations: ["READ"], 
              path:"dosage", 
              
            },
            {
              principal:{
                nodes:["Bavaria","FDA"]
              },
              operations: ["READ"], 
              path:"placebo", 
              
            },
            // {
            //   principal:{
            //     nodes:["Bavaria","FDA"]
            //   },
            //   operations: ["READ"], 
            //   path:"id", 
              
            // },
          ],
        },
      }
    );
    setCount(count+1)
    setOpenViewModal(false); //Closes it
    
  }; 



  const handleRemove = async (drug: any[]) => {
    const removeDrugResponse = await entities.drug.remove(drug[0].id)
    setCount(count+1)
  }

  const handleLock = async() => {
    setLock(1)
  }

  //This will reset the appearance of the form. Making blank once you enter it again.
  //Probably a better way to do this.
  const resetFormInput = async () =>{
   
    formInput.placebo = false;
    formInput.batchNumber = "";
    formInput.dosage = "";
    // formInput.id = "";
 
  };



    return(
        <>
        <Button
            name="addButton"
            variant="contained"
            disabled={(lock != 0)||(studyStatus == 1)||(user?.name != 'admin@bavaria.com')}
            onClick={() => {
              resetFormInput();
              setOpenViewModal(true);
            } }
          >Add
          </Button>
          <Button
            name="deleteButton"
            variant="contained"
            disabled={(lock != 0)||(studyStatus == 1)||(user?.name != 'admin@bavaria.com')}
            onClick={() => {
            handleRemove(drug);
            }}
        >Delete
      </Button>
      <Button
            name="confirmDrugsButton"
            variant="contained"
            disabled={(lock != 0)||(studyStatus == 1)||(user?.name != 'admin@bavaria.com')}
            onClick={onConfirmClick}
          >Use Final Drugs Confirm
            </Button>

            <Dialog
                open={open}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Lock Drug Table"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure? This will lock you from adding any more drugs.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleConfirm} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>


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
                      
                      control={<Checkbox
                        value={formInput.placebo}
                        name = "placebo"
                        onChange={handleCheckbox} />}
                      label="Placebo"
                      labelPlacement="end"
                     
                        
                    />
                    <TextField sx = {{m: 1,width: 200 }} helperText="Batch Number" name="batchNumber" onChange={handleInput}defaultValue={formInput.batchNumber} />
                    <TextField sx = {{m: 1,width: 200 }} helperText="Dosage" name="dosage" onChange={handleInput}defaultValue={formInput.dosage} />
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