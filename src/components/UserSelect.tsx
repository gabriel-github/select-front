import {
  Box,
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

import { useState } from "react";
import { api } from "../services/api";

interface User {
  id: string;
  name: string;
  information: number[];
  created_at: Date;
}

interface UserProps {
  user: User;
}

const useStyles = makeStyles({
  container: {
    marginTop: "30px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "12px",
  },
  containerInput: {
    display: "flex",
    marginTop: "24px",
  },
  select: {
    marginTop: "24px",
  },
  button: {
    marginLeft: "8px",
  },
});

export function UserSelect({ user }: UserProps) {
  const [value, setValue] = useState("");
  const [userState, setUserState] = useState<User>(user);

  const classes = useStyles();

  async function addNewValueOfSelect() {
    try {
      await api.post(`/update/${user.id}`, { newNumberSelect: value });

      setUserState((oldState) => ({
        ...oldState,
        information: [...oldState.information, Number(value)],
      }));

      setValue("");
    } catch (error) {
      alert("Error add new value select");
    }
  }

  return (
    <Box className={classes.container}>
      <Box>
        <Typography>{user.name}</Typography>
      </Box>

      <Box className={classes.containerInput}>
        <TextField
          id="outlined-basic"
          label="novo valor"
          variant="outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="number"
        />
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={addNewValueOfSelect}
        >
          Enviar
        </Button>
      </Box>
      <FormControl fullWidth className={classes.select}>
        <InputLabel id="demo-simple-select-label">valores</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
        >
          {userState.information.map((info) => (
            <MenuItem value={info}>{info}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
