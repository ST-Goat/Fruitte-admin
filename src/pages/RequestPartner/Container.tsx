import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  HttpStatus,
  PaginationDefault,
  SNACKBAR_VARIANTS,
} from "shared/comom.enum";
import {
  Partner,
  fetchPartners,
  cancelPartnerById,
} from "services/userManagement";
import ConfirmModal from "pages/common/ConfirmModal";
import RequestPartnerView from "./View";

import type { Filters } from "services/userManagement";
import { enqueueSnackbar } from "redux/slices/snackbar";
import { useAppDispatch } from "utilities/useHook";

export type PartnerState = {
  data: Array<Partner>;
  total: number;
};

const RequestPartnerContainer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [filters, setFilters] = useState<Filters>({
    keyword: "",
  });
  const [pagination, setPagination] = useState({
    page: PaginationDefault.PAGE,
    pageSize: PaginationDefault.PAGE_SIZE,
  });
  const [loading, setLoading] = useState(false);
  const [partners, setPartners] = useState<PartnerState>({
    data: [],
    total: 0,
  });
  const [reload, setReload] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [partnerSelected, setParnerSelected] = useState<{
    id: string | number;
    status: boolean;
  } | null>(null);

  const submitFilters = () => {
    setPagination({
      page: PaginationDefault.PAGE,
      pageSize: PaginationDefault.PAGE_SIZE,
    });
    setReload(!reload);
  };
  const onChangeFilters = useCallback(
    (name: string, value: string | undefined) => {
      setFilters((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  async function fetPartnerList(pagination: any, filters: Filters) {
    setLoading(true);
    try {
      const response = await fetchPartners({
        pagination: pagination,
        filters: filters,
      });
      setPartners({
        data: response.content,
        // total: response.metadata.total,
        total: response.content.length,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const requestCancelPartner = async ({
    id,
    status,
  }: {
    id: string | number;
    status: boolean;
  }) => {
    try {
      const response = await cancelPartnerById(id, status);
      if (response.status === HttpStatus.OK) {
        dispatch(
          enqueueSnackbar({
            message: "Success!",
            variant: SNACKBAR_VARIANTS.SUCCESS,
          })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setParnerSelected(null);
      fetPartnerList(pagination, filters);
    }
  };
  useEffect(() => {
    fetPartnerList(pagination, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.pageSize, reload]);

  return (
    <>
      <RequestPartnerView
        filters={filters}
        submitFilters={submitFilters}
        onChangeFilters={onChangeFilters}
        partners={partners}
        loading={loading}
        rowsPerPage={pagination.pageSize}
        page={pagination.page}
        handleChangePage={(newPage: number) => {
          setPagination((prev) => ({ ...prev, page: newPage }));
        }}
        handleCancel={({
          id,
          status,
        }: {
          id: string | number;
          status: boolean;
        }) => {
          setIsOpenModal(true);
          setParnerSelected({ id, status });
        }}
      />
      <ConfirmModal
        open={isOpenModal}
        handleClose={() => {
          setIsOpenModal(false);
          setParnerSelected(null);
        }}
        handleAccepted={() => {
          if (partnerSelected) {
            setIsOpenModal(false);
            requestCancelPartner(partnerSelected);
          }
        }}
        title={
          partnerSelected?.status
            ? t("pages.requestPartner.acceptedTitle")
            : t("pages.requestPartner.cancelTitle")
        }
      />
    </>
  );
};

export default RequestPartnerContainer;
