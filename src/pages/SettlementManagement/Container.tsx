import classNames from "classnames";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import SettlementManagementView from "./View";
import Controller from "./Controller";
import TablePaginations from "pages/common/Paginations";
import ConfirmModal, { ModalType } from "./ConfirmModal";

import {
  editSettlements,
  fetchPayments,
  PaymentStatus,
} from "services/settlements";
import {
  HttpStatus,
  PaginationDefault,
  SNACKBAR_VARIANTS,
} from "shared/comom.enum";
import { enqueueSnackbar } from "redux/slices/snackbar";
import { useAppDispatch } from "utilities";
import { difference, union, xor } from "lodash";

const Header = ({
  title,
  subTitle,
  actionLabel,
  onChange,
}: {
  title: string;
  subTitle: string;
  actionLabel: string;
  onChange: () => void;
}) => {
  return (
    <div>
      <h1 className="text-lg font-bold">{title}</h1>
      <div className="flex items-center">
        <h2 className="text-2xl font-bold">{subTitle}</h2>
        <button
          className={classNames(
            "ml-4 text-lg underline leading-8",
            "active:transform active:scale-95"
          )}
          onClick={onChange}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
};

const initFilters = {
  keyword: "",
  farmId: undefined,
  status: PaymentStatus.UNSETTLED,
};

const initialPagination = {
  page: PaginationDefault.PAGE,
  pageSize: PaginationDefault.PAGE_SIZE,
};
function SettlementManagementContainer() {
  const { t } = useTranslation();
  const translationText = {
    unsettled: t("pages.settlement.unsettled"),
    viewCompletionList: t("pages.settlement.viewCompletionList"),
    settlementCompleted: t("pages.settlement.settlementCompleted"),
    viewUnsettledList: t("pages.settlement.viewUnsettledList"),
  };
  const [isViewUnsettled, setIsViewUnsettled] = useState(true);
  const [filters, setFilters] = useState<{
    keyword: string;
    farmId?: string | number;
    status?: PaymentStatus;
  }>(initFilters);
  const [settlement, setSettlement] = useState({
    data: [],
    total: 0,
  });
  const [modal, setModal] = useState<ModalType | null>(null);
  const [reload, setReload] = useState(false);
  const [pagination, setPagination] = useState(initialPagination);
  const [listIdSelected, setListIdSelected] = useState<Array<string | number>>(
    []
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleProgress = () => {
    setModal(isViewUnsettled ? ModalType.settle : ModalType.unsettled);
  };

  const handleCloseModal = () => {
    setModal(null);
  };

  const getSettlements = async () => {
    setLoading(true);
    try {
      const response = await fetchPayments({
        limit: pagination.pageSize,
        skip: (pagination.page - 1) * pagination.pageSize,
        status: filters.status,
        farmId: filters.farmId,
        farmName: filters.keyword,
      });
      if (response.status === HttpStatus.OK) {
        setSettlement({
          data: response.data.content,
          total: response.data.total,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const editPaymentStatus = async () => {
    try {
      if (listIdSelected.length > 0) {
        const body: {
          settlementBillIds: any[];
          unsettlementBillIds: any[];
        } = {
          settlementBillIds: [],
          unsettlementBillIds: [],
        };
        if (isViewUnsettled) body.settlementBillIds = listIdSelected;
        else body.unsettlementBillIds = listIdSelected;
        const response = await editSettlements(body);
        if (response.status === HttpStatus.OK) {
          dispatch(
            enqueueSnackbar({
              message: "Success!",
              variant: SNACKBAR_VARIANTS.SUCCESS,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setListIdSelected([]);
      getSettlements();
      handleCloseModal();
    }
  };

  useEffect(() => {
    getSettlements();
  }, [isViewUnsettled, reload, filters.status, filters.farmId, pagination]);

  return (
    <div>
      <Header
        title={t("pages.settlement.title")}
        subTitle={
          isViewUnsettled
            ? translationText.unsettled
            : translationText.settlementCompleted
        }
        actionLabel={
          isViewUnsettled
            ? translationText.viewCompletionList
            : translationText.viewUnsettledList
        }
        onChange={() => {
          setIsViewUnsettled(!isViewUnsettled);
          setFilters((prev) => ({
            ...initFilters,
            status:
              prev.status !== PaymentStatus.SETTLED
                ? PaymentStatus.SETTLED
                : PaymentStatus.UNSETTLED,
          }));
          setListIdSelected([]);
        }}
      />
      <div className="mt-8">
        <Controller
          isViewUnsettled={isViewUnsettled}
          listIdSelected={listIdSelected}
          filters={filters}
          onChange={(name: string, value: any) => {
            setFilters((prev) => ({ ...prev, [name]: value }));
          }}
          handleSubmitSearch={() => {
            setReload((prev) => !prev);
          }}
          handleProgress={handleProgress}
          settlement={settlement.data}
        />
      </div>
      <div className="mt-4">
        <TablePaginations
          count={settlement.total}
          rowsPerPage={pagination.pageSize}
          page={pagination.page}
          handleChangePage={(newPage) => {
            setPagination((prev) => ({ ...prev, page: newPage }));
          }}
        >
          <SettlementManagementView
            loading={loading}
            data={settlement.data}
            total={settlement.total}
            pagination={pagination}
            listIdSelected={listIdSelected}
            callbackCheckBox={(_ids: Array<string | number>, type) => {
              if (type === 'selectALl') {
                setListIdSelected((prev) => union(prev, _ids));
                return;
              }
              if (type === "unSelectAll") {
                setListIdSelected((prev) => difference(prev, _ids));
                return;
              }
              setListIdSelected((prev) => xor(prev, _ids));
            }}
          />
        </TablePaginations>
      </div>
      <ConfirmModal
        open={Boolean(modal)}
        handleAccepted={() => {
          editPaymentStatus();
        }}
        handleClose={handleCloseModal}
        type={modal}
      />
    </div>
  );
}

export default SettlementManagementContainer;
