import classNames from "classnames";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import SettlementManagementView from "./View";
import Controller from "./Controller";
import TablePaginations from "pages/common/Paginations";
import ConfirmModal, { ModalType } from "./ConfirmModal";

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

function SettlementManagementContainer() {
  const { t } = useTranslation();
  const translationText = {
    unsettled: t("pages.settlement.unsettled"),
    viewCompletionList: t("pages.settlement.viewCompletionList"),
    settlementCompleted: t("pages.settlement.settlementCompleted"),
    viewUnsettledList: t("pages.settlement.viewUnsettledList"),
  };
  const [isViewUnsettled, setIsViewUnsettled] = useState(true);
  const [filters, setFilters] = useState({
    keyword: "",
  });
  const [settlement, setSettlement] = useState({
    data: [],
    total: 0,
  });
  const [modal, setModal] = useState<ModalType | null>(null);

  useEffect(() => {
    if (isViewUnsettled) {
      // fetch unsettled
    } else {
      // fetch completed
    }
  }, [isViewUnsettled]);

  const handleProgress = () => {
    setModal(isViewUnsettled ? ModalType.settle : ModalType.unsettled);
  };

  const handleCloseModal = () => {
    setModal(null);
  };

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
        }}
      />
      <div className="mt-8">
        <Controller
          isViewUnsettled={isViewUnsettled}
          filters={filters}
          onChange={null}
          handleProgress={handleProgress}
        />
      </div>
      <div className="mt-4">
        <TablePaginations
          count={100}
          rowsPerPage={10}
          page={1}
          handleChangePage={() => {}}
        >
          <SettlementManagementView />
        </TablePaginations>
      </div>
      <ConfirmModal
        open={Boolean(modal)}
        handleAccepted={() => {}}
        handleClose={handleCloseModal}
        type={modal}
      />
    </div>
  );
}

export default SettlementManagementContainer;
