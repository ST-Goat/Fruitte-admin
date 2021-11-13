import React from "react";
import Pagination from "@mui/material/Pagination";
import { PaginationDefault } from "shared/comom.enum";

export type TablePaginationProps = {
  children: any;
  count: number;
  rowsPerPage: number;
  page: number;
  handleChangePage: (newPage: number) => void;
  handleChangeRowsPerPage?: (newRowsPerPage: number) => void;
};

function TablePaginations({
  children,
  count = 0,
  rowsPerPage = PaginationDefault.PAGE_SIZE,
  page = PaginationDefault.PAGE,
  handleChangePage,
  handleChangeRowsPerPage,
}: TablePaginationProps) {
  return (
    <>
      {children}
      <div className="flex justify-between w-full py-3 pl-2">
        <div>
          <p>{`${page * rowsPerPage} -  ${
            (page + 1) * rowsPerPage
          } of ${count}`}</p>
        </div>
        <Pagination
          siblingCount={0}
          boundaryCount={2}
          count={count}
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, value: number) =>
            handleChangePage(value)
          }
        />
      </div>
    </>
  );
}

export default TablePaginations;
