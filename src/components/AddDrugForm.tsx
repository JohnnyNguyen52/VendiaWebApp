import useJaneHopkins from "@/api/useJaneHopkins";
import { Checkbox, FormControlLabel, Box, Button, FormControl, FormHelperText, InputAdornment, Modal, OutlinedInput, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemButton } from "@mui/material";
import { useReducer, useState } from "react";
import useRefreshKey from "@/api/useRefreshKey";
import useDrug from "@/api/useDrug";
import { useUser } from '@auth0/nextjs-auth0/client';
import React from "react";
import useFinalDrugsConfirm from "@/api/useFinalDrugsConfirm";
import useStudyStatus from "@/api/useStudyStatus";


function AddDrugForm() {
  const { entities } = useJaneHopkins();
  const [openViewModal, setOpenViewModal] = useState(false);//set to false so that it is closed
  const { count, setCount }: any = useRefreshKey();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const { finalDrugsConfirm, setFinalDrugsConfirm } = useFinalDrugsConfirm();
  const { studyStatus, setStudyStatus } = useStudyStatus();

  const dialogTitleConfirm = "Send Drugs"
  const dialogMsgConfirm = "Are you sure that you want to send the drugs?";

  const dialogTitleUndo = "Undo Drugs"
  const dialogMsgUndo = "Are you sure that you want to undo the drug sending?";

  let dialogTitle = "";
  let dialogMsg = "";

  const handleCloseView = () => setOpenViewModal(false);

  //Selected Drug
  const { drug, setDrug } = useDrug();

  if (finalDrugsConfirm == 0) {
    dialogTitle = dialogTitleConfirm;
    dialogMsg = dialogMsgConfirm;
  }
  else {

    dialogTitle = dialogTitleUndo;
    dialogMsg = dialogMsgUndo;
  }

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    if (finalDrugsConfirm == 0) {
      setFinalDrugsConfirm(1);
      dialogTitle = dialogTitleUndo;
      dialogMsg = dialogMsgUndo;
    }
    else {
      setFinalDrugsConfirm(0);
      dialogTitle = dialogTitleConfirm;
      dialogMsg = dialogMsgConfirm;
    }

    setCount(count + 1); // Refresh drug table
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
      dosage: "",
      batchNumber: "",


    }
  );
  //Takes the information inputted into the formInput and stores it into the Vendia Database
  const handleAdd = async () => {
    const addDrugResponse = await entities.drug.add({
      // id:formInput._id,
      placebo: formInput.placebo,
      dosage: formInput.dosage,
      batchNumber: formInput.batchNumber,

    },
      {
        aclInput: {
          acl: [
            {
              principal: {
                nodes: ["Bavaria", "FDA"]//what nodes are allowed to see it
              },
              operations: ["READ"], //Write gives the option to update
              path: "batchNumber",

            },
            {
              principal: {
                nodes: ["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "dosage",

            },
            {
              principal: {
                nodes: ["Bavaria", "FDA"]
              },
              operations: ["READ"],
              path: "placebo",

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
    setCount(count + 1)
    setOpenViewModal(false); //Closes it

  };



  const handleRemove = async (drug: any[]) => {
    const removeDrugResponse = await entities.drug.remove(drug[0].id)
    setCount(count + 1)
  }


  //This will reset the appearance of the form. Making blank once you enter it again.
  //Probably a better way to do this.
  const resetFormInput = async () => {

    formInput.placebo = false;
    formInput.batchNumber = "";
    formInput.dosage = "";
    // formInput.id = "";

  };

  return (
    <>
      {(user?.name == "admin@bavaria.com" &&
        <>
          <Button
            name="addButton"
            variant="contained"
            disabled={finalDrugsConfirm != 0 || studyStatus != 0}
            onClick={() => {
              resetFormInput();
              setOpenViewModal(true);
            }}
          >Add
          </Button>
          <Button
            name="deleteButton"
            variant="contained"
            disabled={finalDrugsConfirm != 0 || studyStatus != 0}
            onClick={() => {
              handleRemove(drug);
            }}
          >Delete
          </Button>
          {(finalDrugsConfirm == 0 &&
            <Button
              name="confirmDrugsButton"
              variant="contained"
              onClick={onConfirmClick}
            >Send Drugs
            </Button>
          )}
          {(finalDrugsConfirm != 0 &&
            <Button
              name="confirmDrugsButton"
              variant="contained"
              onClick={onConfirmClick}
            >Undo Drug Sending
            </Button>

          )}
        </>
      )}

      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMsg}
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
              m: 2,
            }}
            >
              <FormControlLabel

                control={<Checkbox
                  value={formInput.placebo}
                  name="placebo"
                  onChange={handleCheckbox} />}
                label="Placebo"
                labelPlacement="end"
              />
              <TextField sx={{ m: 1, width: 200 }} helperText="Batch Number" name="batchNumber" onChange={handleInput} defaultValue={formInput.batchNumber} />
              <TextField sx={{ m: 1, width: 200 }} helperText="Dosage" name="dosage" onChange={handleInput} defaultValue={formInput.dosage} />
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