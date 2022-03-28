import { useEffect, useState } from "react";

import TablePaginations from "pages/common/Paginations";
import AnnouncementView from "./View";

import { fetchAnnouncements } from "services/announcement";
import { HttpStatus, PaginationDefault } from "shared/comom.enum";

const initialPagination = {
  page: PaginationDefault.PAGE,
  pageSize: PaginationDefault.PAGE_SIZE,
};

function AnnouncementContainer() {
  const [announcements, setAnnouncements] = useState({
    data: [],
    total: 0,
  });
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const getAnnouncements = async (_page: number, _pageSize: number) => {
    setIsLoading(true);
    try {
      const res = await fetchAnnouncements({
        limit: _pageSize,
        skip: (_page - 1) * _pageSize,
      });
      if (res.status === HttpStatus.OK) {
        setAnnouncements({
          data: res.data.content,
          total: res.data.metadata.total,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAnnouncements(pagination.page, pagination.pageSize);
  }, [pagination, reload]);

  return (
    <div>
      <TablePaginations
        count={announcements.total}
        rowsPerPage={pagination.pageSize}
        page={pagination.page}
        handleChangePage={(newPage) => {
          setPagination((prev) => ({ ...prev, page: newPage }));
        }}
      >
        <AnnouncementView
          pagination={pagination}
          isLoading={isLoading}
          announcements={announcements}
          handleRefresh={() => {
            setPagination(initialPagination);
            setReload(!reload);
          }}
        />
      </TablePaginations>
    </div>
  );
}

export default AnnouncementContainer;
