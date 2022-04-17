import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

import TablePaginations from "pages/common/Paginations";
import TableCustomizer from "pages/common/Table";
import CheckBoxCustomizer from "pages/common/CheckBox";
import ButtonCustomizer from "pages/common/Button";
import Controller from "./Controller";

import {
  FeedbackStatus,
  FeedbackType,
  getFeedbackList,
  resolvedFeedback,
} from "services/feedback";
import {
  EVENT_TYPES,
  Pagination,
  PaginationDefault,
  SNACKBAR_VARIANTS,
} from "shared/comom.enum";
import { useAppDispatch, triggerEvent } from "utilities";
import { farmDetailUrl } from "routes";
import { gettotalRowCurrent, useEventListener } from "utilities";
import { enqueueSnackbar } from "redux/slices/snackbar";
import { throttle } from "lodash";

const feedbackHeaders = [
  {
    id: "No-col",
    label: "No",
    keyData: "no",
  },
  {
    id: "Farm-col",
    keyLabel: "pages.farmManagement.farmName",
    keyData: "farmName",
  },
  {
    id: "User-name-col",
    keyLabel: "common.user",
    keyData: "user",
  },
  {
    id: "Date-col",
    keyLabel: "pages.farmManagement.sendDate",
    keyData: "sendDate",
  },
  {
    id: "Activity-col",
    keyLabel: "pages.farmManagement.activityName",
    keyData: "activityName",
  },
  {
    id: "Status-col",
    keyLabel: "common.status",
    keyData: "status",
  },
  {
    id: "checkbox-col",
    keyLabel: "common.select",
    keyData: "read",
  },
];

export type Filters = {
  status: FeedbackStatus | undefined;
};

const CheckBoxAction = ({
  feedBackId,
  status,
  handleRefresh,
}: {
  feedBackId: string;
  status: FeedbackStatus;
  handleRefresh: () => void;
}) => {
  const [checked, setChecked] = useState(
    status === FeedbackStatus.ON_GOING ? false : true
  );
  const dispatch = useAppDispatch();
  useEventListener(EVENT_TYPES.FEEDBACK_RESOLVED, () => {
    if (checked && status === FeedbackStatus.ON_GOING) {
      resolvedFeedback({ id: feedBackId }).then(() => {
        dispatch(
          enqueueSnackbar({
            message: "Success!",
            variant: SNACKBAR_VARIANTS.SUCCESS,
          })
        );
        throttle(handleRefresh, 300);
      });
    }
  });
  return (
    <CheckBoxCustomizer
      checked={checked}
      onClick={(event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setChecked((prev) => !prev);
      }}
      disabled={status !== FeedbackStatus.ON_GOING}
    />
  );
};

const convertFeedbackData = (
  data: FeedbackType[],
  page: number,
  pageSize: number,
  translate: (text: string) => string,
  handleRefresh: () => void
) => {
  return data.map((item, index) => ({
    id: item.id,
    no: (page - 1) * pageSize + index + 1,
    farmName: item.farmName,
    user: item?.user?.name,
    sendDate: format(new Date(item?.createdAt), "yyyy/MM/dd"),
    activityName: item.farmActivityName,
    status: () => (
      <div
        className={
          item.status === FeedbackStatus.ON_GOING
            ? "text-primary-default font-bold"
            : "text-black-default font-bold"
        }
      >
        {item.status === FeedbackStatus.ON_GOING
          ? translate("common.open")
          : translate("common.resolved")}
      </div>
    ),
    read: () => (
      <CheckBoxAction
        feedBackId={item.id}
        status={item.status}
        handleRefresh={handleRefresh}
      />
    ),
  }));
};

const initialPagination = {
  page: PaginationDefault.PAGE,
  pageSize: PaginationDefault.PAGE_SIZE,
};
function Feedback() {
  const { t } = useTranslation();
  const history = useHistory();
  const { id: farmId } = useParams<{ id: string }>();
  const [filters, setFilters] = useState<Filters>({
    status: undefined,
  });
  const [reload, setReload] = useState(false);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState<{
    data: FeedbackType[];
    total: number;
  }>({
    data: [],
    total: 0,
  });

  const fetchFeedbacks = async ({
    page,
    pageSize,
    status,
  }: Pagination & Filters) => {
    setIsLoading(true);
    try {
      const response = await getFeedbackList({
        limit: pageSize,
        skip: (page - 1) * pageSize,
        status: status,
        farmId
      });
      setFeedbacks({
        data: response.data,
        total: response.count,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks({
      page: pagination.page,
      pageSize: pagination.pageSize,
      status: filters.status,
    });
  }, [pagination, filters, reload]);

  return (
    <>
      <Controller
        filters={filters}
        onSubmit={() => {
          setPagination(initialPagination);
          setReload((prev) => !prev);
        }}
        onChange={(newFilter) => {
          setFilters(newFilter);
        }}
      />
      <div className="mt-6 mb-16">
        <TablePaginations
          count={feedbacks.total}
          rowsPerPage={pagination.pageSize}
          page={pagination.page}
          handleChangePage={(newPage) => {
            setPagination((prev) => ({ ...prev, page: newPage }));
          }}
        >
          <div className="rounded-md border-2 border-grey-300">
            <TableCustomizer
              headers={feedbackHeaders}
              hover
              loading={isLoading}
              totalRow={gettotalRowCurrent(
                feedbacks.total,
                pagination.page,
                pagination.pageSize
              )}
              data={convertFeedbackData(
                feedbacks.data,
                pagination.page,
                pagination.pageSize,
                t,
                () => setReload((prev) => !prev)
              )}
              handleClickRow={(row) => {
                history.push(`${farmDetailUrl}/${farmId}/feedbacks/${row.id}`);
              }}
            />
          </div>
        </TablePaginations>
      </div>
      <div className="flex justify-end">
        <ButtonCustomizer
          onClick={() => {
            triggerEvent(EVENT_TYPES.FEEDBACK_RESOLVED);
          }}
          color="secondary"
        >
          {t("pages.farmManagement.markAsResolved")}
        </ButtonCustomizer>
      </div>
    </>
  );
}

export default Feedback;
