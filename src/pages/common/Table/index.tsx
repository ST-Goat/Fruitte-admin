import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme, ...props }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#003057",
    color: theme.palette.grey[100],
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  ...props,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

type StyledHead = {
  [key: string]: any;
};

type StyledBodyCol = {
  [key: string]: any;
};

export type HeaderItem = {
  id: string | number;
  label?: string;
  keyLabel?: string;
  keyData: string;
  styledHead?: StyledHead;
  styledBodyCol?: StyledBodyCol;
};

export type DataItem = {
  id: string | number;
} & { [key: string]: string | number | React.ReactElement };

export type TableCustomizerProps = {
  headers: Array<HeaderItem>;
  data: Array<DataItem>;
};

export default function TableCustomizer({
  headers,
  data,
}: TableCustomizerProps) {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headers.map((item) => (
              <StyledTableCell
                align="center"
                {...item.styledHead}
                key={item.id}
              >
                {Boolean(item.label) ? item.label : t(item.keyLabel ?? "")}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.id}>
              {headers.map((head, i) => (
                <StyledTableCell align="center" {...head.styledBodyCol} key={i}>
                  {row[head.keyData] ?? ""}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
