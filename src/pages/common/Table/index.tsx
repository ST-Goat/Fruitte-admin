import React from "react";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import { PaginationDefault } from "shared/comom.enum";

import "./index.scss";

const StyledTableCell = styled(TableCell)(({ theme, ...props }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#483729",
    color: theme.palette.grey[100],
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    cursor: "pointer",
  },
  ...props,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: "2px solid #bbc1c6",
  "&:last-child td, &:last-child": {
    border: 0,
  },
}));

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
} & { [key: string]: any };

export type TableCustomizerProps = {
  headers: Array<HeaderItem>;
  data: Array<DataItem>;
  handleClickRow?: (item: DataItem) => void;
  hover?: Boolean;
  loading: Boolean;
  totalRow?: number;
  RowLoadingCustom?: React.ReactElement;
};

const NewHOC = (PassedComponent: any) => {
  return class extends React.Component {
    render() {
      return (
        <div>
          <PassedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default function TableCustomizer({
  headers,
  data,
  handleClickRow,
  hover = false,
  loading = false,
  totalRow = PaginationDefault.PAGE,
  RowLoadingCustom,
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
          {Boolean(loading) ? (
            <>
              {Array.from(Array(totalRow).keys()).map((item) => (
                <TableRow key={`skeleton__loading-${item}`}>
                  {Boolean(RowLoadingCustom)
                    ? RowLoadingCustom
                    : headers.map((head, i) => (
                        <TableCell align="center" key={i}>
                          <Skeleton
                            sx={{ bgcolor: "grey.400" }}
                            variant="rectangular"
                            animation="wave"
                          />
                        </TableCell>
                      ))}
                </TableRow>
              ))}
            </>
          ) : data.length > 0 ? (
            data.map((row) => (
              <StyledTableRow
                className={hover ? "row__hover-bg-grey" : ""}
                onClick={() => handleClickRow && handleClickRow(row)}
                key={row.id}
              >
                {headers.map((head, i) => {
                  const isComponent = typeof row[head.keyData] === "function";
                  const NewContent = !isComponent
                    ? () => <div />
                    : NewHOC(row[head.keyData]);
                  return (
                    <React.Fragment key={i}>
                      {isComponent ? (
                        <TableCell align="center" {...head.styledBodyCol}>
                          <NewContent />
                        </TableCell>
                      ) : (
                        <StyledTableCell align="center" {...head.styledBodyCol}>
                          {row[head.keyData] ?? ""}
                        </StyledTableCell>
                      )}
                    </React.Fragment>
                  );
                })}
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length} align="center">
                {t("common.noData")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
