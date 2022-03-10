import { Box, makeStyles } from "@material-ui/core";
import Chart from "react-apexcharts";

interface AppChartProps {
  data: number[];
}

const useStyles = makeStyles({
  container: {
    marginTop: "24px",
  },
});

export function AppChart({ data }: AppChartProps) {
  const classes = useStyles();
  const options = {
    zoom: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: data,
    },
  };

  const series = [
    {
      name: "select_data",
      data,
    },
  ];
  return (
    <Box className={classes.container}>
      <Chart options={options} series={series} type="bar" height={160} />
    </Box>
  );
}
