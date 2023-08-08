/*
props: {
    rekemList,
    gdud
    sx
}
*/
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
  

const RekemTable = (props) => {
    const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(10);
  
    const handleChangePage = (event, newpage) => {
        setpg(newpage);
    };
  
    const handleChangeRowsPerPage = (event) => {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    };

    const TableHeaderText = (props) => {
        const {value} = props;
        return <TableCell><Typography fontWeight="bold">{value}</Typography></TableCell>;
    };

    const boxSX = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflowY: 'hidden',
        ...props.sx
    };

    const TableBodyData = (
        <TableBody>
        {props.rekemList.slice(pg * rpg, pg * rpg + rpg).map((item) => (
          <TableRow
            key={item.carNumber}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell>{props.gdud}</TableCell>
            <TableCell>{item.makat}</TableCell>
            <TableCell>{item.carNumber}</TableCell>
            <TableCell>{item.kshirot ? 'תקין' : 'תקול'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );

    const TableHeadBody = (
        <TableHead>
        <TableRow>
          <TableHeaderText value="גדוד"/>
          <TableHeaderText value="מקט"/>
          <TableHeaderText value="מספר סידורי"/>
          <TableHeaderText value="כשירות"/>
        </TableRow>
      </TableHead>
    );

    const TablePaginationData = (
        <TablePagination
        style={{maxHeight: '11%'}}
        rowsPerPageOptions={[10, 15, 25]}
        component="div"
        count={props.rekemList.length}
        rowsPerPage={rpg}
        page={pg}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage= "שורות לעמוד:"
        labelDisplayedRows={({ from, to, count }) =>
        `${from}-${to} מתוך ${count !== -1 ? count : `${to}`}`
      }
      />
    );

    return (
        <Box sx={boxSX}>
          <TableContainer style={{maxHeight: '89%'}}>
            <Table aria-label="general rekems for all of zahal" stickyHeader>
                {TableHeadBody}
                {TableBodyData}
            </Table>
          </TableContainer>
          {TablePaginationData}
        </Box>
      );
    };

export default RekemTable;