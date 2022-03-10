import { Box, Button, Grid, makeStyles, TextField } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
  button: {
    height: "100%",
    width: "100%",
  },
});

interface AddUserProps {
  addNewUser: (username: string) => void;
}

export function AddUser({ addNewUser }: AddUserProps) {
  const classes = useStyles();

  const [name, setName] = useState("");

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={9}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={() => addNewUser(name)}
        >
          Salvar
        </Button>
      </Grid>
    </Grid>
  );
}
