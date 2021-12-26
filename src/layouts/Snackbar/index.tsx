import { SnackbarProvider } from "notistack";
import SnackbarContainer from "./Container";

const Snackbar = ({ children }: { children: any }) => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <SnackbarContainer>{children}</SnackbarContainer>
    </SnackbarProvider>
  );
};

export default Snackbar;
