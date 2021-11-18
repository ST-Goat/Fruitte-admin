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
  bgSelected?: string;
};

function TablePaginations({
  children,
  count = 0,
  rowsPerPage = PaginationDefault.PAGE_SIZE,
  page = PaginationDefault.PAGE,
  handleChangePage,
  handleChangeRowsPerPage,
  bgSelected = "#483729 !important",
}: TablePaginationProps) {
  const start = (page - 1) * rowsPerPage + 1;
  const end = page * rowsPerPage;
  return (
    <>
      {children}
      <div className="flex justify-between w-full py-3 pl-2">
        <div>
          <p>{`${start} -  ${end > count ? count : end} of ${count}`}</p>
        </div>
        <Pagination
          siblingCount={0}
          boundaryCount={2}
          count={Boolean(count) ? Math.ceil(count / rowsPerPage) : 0}
          page={page}
          sx={{
            "& .Mui-selected": {
              backgroundColor: bgSelected,
              color: "#ffffff",
            },
          }}
          // color="primary"
          onChange={(event: React.ChangeEvent<unknown>, value: number) =>
            handleChangePage(value)
          }
        />
      </div>
    </>
  );
}

export default TablePaginations;
