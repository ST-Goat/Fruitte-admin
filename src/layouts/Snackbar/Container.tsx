import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "utilities/useHook";

import { removeSnackbar } from "redux/slices/snackbar";
import type { SnackbarItem } from "redux/slices/snackbar";
import type { SnackbarKey } from "notistack";

let displayed: Array<SnackbarKey> = [];
const Snackbar = ({ children }: { children: any }) => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((store) => store.snackbar.data || []);
  const { enqueueSnackbar } = useSnackbar();

  const storeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  useEffect(() => {
    notifications.length > 0 &&
      notifications.forEach(({ message, options }: SnackbarItem) => {
        const { key: snackbarId } = options;
        if (displayed.includes(snackbarId)) return;
        enqueueSnackbar(message, {
          ...options,
          // onClose: (event, reason, myKey) => {},
          onExited: (event, myKey) => {
            // remove this snackbar from redux store
            dispatch(removeSnackbar(myKey));
            removeDisplayed(myKey);
          },
        });
        storeDisplayed(snackbarId);
      });
  }, [notifications, enqueueSnackbar, dispatch]);
  return <>{children}</>;
};

export default Snackbar;
