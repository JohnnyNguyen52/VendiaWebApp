import React, { useEffect } from "react";
import Users from "@/api/Users";
import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Container } from '@mui/material';


const SubMenu = ({setUserTYpe}:{setUserTYpe: any})=> {

  const [currentUser, setCurrentuser] = React.useState<Users>(Users.JHDoctor);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    console.log("passed value ->", value);
    switch (value) {
      case "Users.JHDoctor":
        setCurrentuser(Users.JHDoctor);
        break;
      case "Users.JHAdmin":
        setCurrentuser(Users.JHAdmin);
        break;
      case "Users.FDAAdmin":
        setCurrentuser(Users.FDAAdmin);
        break;
      case "Users.BavariaAdmin":
        setCurrentuser(Users.BavariaAdmin);
        break;
    }
  };

  useEffect(() => {
    setUserTYpe(currentUser)
  }, [currentUser])

  return (
    <div style={{marginLeft: "40px"}}>
      <h2>Side menu </h2>

      <FormControl>
        <FormLabel id="form-user">User</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Users.JHDoctor"
          name="radio-buttons-group"
          onChange={onChange}
        >
          <FormControlLabel value="Users.JHDoctor" control={<Radio />} label="JHDoctor" />
          <FormControlLabel value="Users.JHAdmin" control={<Radio />} label="JHAdmin" />
          <FormControlLabel value="Users.FDAAdmin" control={<Radio />} label="FDAAdmin" />
          <FormControlLabel value="Users.BavariaAdmin" control={<Radio />} label="BavariaAdmin" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default SubMenu;