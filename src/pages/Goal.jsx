import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { FormEvent, useEffect, useState } from "react";
import { CustomChart } from "../components/CustomChart";
import { api } from "../services/api";

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  form: {
    marginBottom: "24px",
  },
  chart: {
    width: "100%",
  },
  item: {
    marginTop: "8px",
  },
});

export function Goal() {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  const [data, setData] = useState({
    name: "",
    dateInit: "",
    dateFinal: "",
    goal: 0,
    type: "curtidas",
  });

  function reduceDataAmount(data) {
    let itemAmount = data.goalData.reduce((acc, item) => acc + item, 0);

    return {
      name: data.name,
      goal: data.goal,
      amount: itemAmount,
    };
  }

  function extractImportantInfos(data) {
    let dataItem = data.map((data) => {
      return reduceDataAmount(data);
    });

    return dataItem;
  }

  function addInfoInTheSeries(info) {
    const infoAmountFormatted = (info.amount / info.goal) * 100;

    setSeries((oldSeries) => [...oldSeries, infoAmountFormatted]);
    setLabels((oldLabels) => [...oldLabels, info.name]);
  }

  function addNewPlatform(data) {
    const dataExtract = reduceDataAmount(data);

    addInfoInTheSeries(dataExtract);
  }

  const classes = useStyles();

  async function handleSubmit(event) {
    event.preventDefault();

    const dataFormatted = {
      name: data.name,
      dateInit: new Date(data.dateInit),
      dateFinal: new Date(data.dateFinal),
      goal: data.goal,
      type: data.type,
    };

    try {
      const { data } = await api.post("/goal/create", dataFormatted);

      console.log(data);

      addNewPlatform(data);
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    async function loadData() {
      const { data } = await api.get("/goal");

      const infos = extractImportantInfos(data);

      infos.forEach((info) => {
        addInfoInTheSeries(info);
      });
    }

    loadData();
  }, []);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Box className={classes.content}>
        <Box className={classes.form}>
          <TextField
            id="outlined-basic"
            label="Name"
            value={data.name}
            onChange={(e) =>
              setData((oldState) => ({ ...oldState, name: e.target.value }))
            }
            variant="outlined"
            fullWidth
          />
          <Grid container spacing={2} className={classes.item}>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="date"
                value={data.dateInit}
                onChange={(e) =>
                  setData((oldState) => ({
                    ...oldState,
                    dateInit: String(e.target.value),
                  }))
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="date"
                value={data.dateFinal}
                onChange={(e) =>
                  setData((oldState) => ({
                    ...oldState,
                    dateFinal: String(e.target.value),
                  }))
                }
              />
            </Grid>
          </Grid>
          <TextField
            id="outlined-basic"
            label="Goal"
            variant="outlined"
            value={data.goal}
            onChange={(e) =>
              setData((oldState) => ({
                ...oldState,
                goal: Number(e.target.value),
              }))
            }
            className={classes.item}
            fullWidth
          />
          <Button
            color="primary"
            className={classes.item}
            variant="contained"
            type="submit"
            fullWidth
            onClick={handleSubmit}
          >
            salvar
          </Button>
        </Box>

        <Box className={classes.chart}>
          <CustomChart series={series} labels={labels} />
        </Box>
      </Box>
    </Container>
  );
}
