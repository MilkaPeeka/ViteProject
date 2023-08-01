/*
props = {valid: number, invalid: number, height: number, width: number}
*/

import { useTheme } from "@mui/material/styles";
import { hexToRGB, drawTextInsideDoughnutPlugin } from "../../helpers/ChartHelpers";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, elements } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/material";
ChartJS.register(ArcElement, Tooltip, Legend);

const RekemDoughnut = (props) => {
    const theme = useTheme();
    const invalidColor = theme.palette.error.main; 
    const validColor = theme.palette.success.main;
    const textColor = theme.palette.text.primary;
    const textFamily = theme.typography.fontFamily;

    const labels = ["תקין", "לא תקין"];
    const values = [props.valid, props.invalid];

    const backgroundColor = [hexToRGB(validColor, 0.3), hexToRGB(invalidColor, 0.3)];
    const borderColor = [validColor, invalidColor];
    const data = {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: backgroundColor,
            borderColor: borderColor
          },

        ]
      };

    const options = {
      animations: false,
      events: [],
      maintainAspectRatio: false,
      cutout: 65,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },

      elements: {
        arc: {
          borderWidth:1 
        }
      }
    };

    return (
      <Box sx={{ height: props.height, width: props.width }}>
      <Doughnut
        redraw={true}
        data={data}
        plugins={[drawTextInsideDoughnutPlugin(props.valid, props.invalid, textFamily, textColor)]}
        options={options}
      />
      </Box>
  );
};

export default RekemDoughnut;