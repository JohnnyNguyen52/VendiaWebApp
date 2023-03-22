import React, { useEffect } from "react";
import Users from "@/api/Users";
import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Container } from '@mui/material';
const SubMenu = ({ setUserTYpe })=> {

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
    <>
      <h2>Side menu (Placeholder, will be used to show selected patient data)</h2>

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
    </>
  );
}

export default SubMenu;