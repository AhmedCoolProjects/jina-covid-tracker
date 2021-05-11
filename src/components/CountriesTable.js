import React from "react";
import numeral from "numeral";
import { withStyles } from "@material-ui/core/styles";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Paper,
} from "@material-ui/core";
import "../styles/countriestable.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function CountriesTable({ countries }) {
  return (
    <TableContainer
      elevation={4}
      className="countries_table_paper"
      component={Paper}>
      <Table style={{ width: "100%" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Countries</StyledTableCell>
            <StyledTableCell align="right">Live Cases</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countries.map((country) => (
            <StyledTableRow key={country.country}>
              <StyledTableCell component="th" scope="row">
                {country.country}
              </StyledTableCell>
              <StyledTableCell align="right">
                {numeral(country.cases).format("0,0")}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
