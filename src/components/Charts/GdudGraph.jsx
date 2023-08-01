/*
props = {
    sx: JSON (optional),
    itemList: [{label: string, value: string}, ...],
}
*/
import { Box } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  import {matchColorToPrecentage} from '../../helpers/ChartHelpers'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const GdudGraph = (props) => {
    const labels = [];
    const values = [];
    const backgroundColor = [];
    const borderColor = [];
    
    props.itemList.forEach((item) => {
        labels.push(item.label);
        values.push(+item.value);
        backgroundColor.push((+item.value, 0.5))
        borderColor.push(matchColorToPrecentage(+item.value, 1))
    });
                
    const data = {
        labels,
        datasets: [
        {
          data: values,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 2
        },
        ],
    };

    const options = {animations: false, plugins: {legend: {display: false}}};
    return (
        <Box
        sx={props.sx}>
          <Bar redraw={true} data={data} options={options}/>
        </Box>
      );

};

export default GdudGraph;