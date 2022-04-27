import { useTranslation } from "react-i18next";
import ButtonCustomizer from "pages/common/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Formik, Form, FormikProps } from "formik";
import InputWithLabel from "pages/common/Formik/Input/InputWithLabel";

import { changeUserPassword } from "services/userManagement";
import { HttpStatus, SNACKBAR_VARIANTS } from "shared/comom.enum";
import { useAppDispatch } from "utilities/useHook";
import { enqueueSnackbar } from "redux/slices/snackbar";

const modalStyles = {
  position: "absolute" as "absolute",
  borderRadius: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const PasswordModal = ({
  userId,
  open,
  handleClose,
}: {
  userId: string | number;
  open: boolean;
  handleClose: () => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const changeNewPassword = async (newPassword: string) => {
    try {
      const response = await changeUserPassword({
        id: userId,
        newPassword,
      });
      if (response.status === HttpStatus.OK)
        dispatch(
          enqueueSnackbar({
            message: "Success!",
            variant: SNACKBAR_VARIANTS.SUCCESS,
          })
        );
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyles }}>
        <h2 className="text-center font-bold text-xl">
          {t("pages.userManagement.changePasswordTitle")}
        </h2>
        <div className="mt-8 flex justify-center items-center">
          <Formik
            initialValues={{ password: "" }}
            onSubmit={(values) => {
              changeNewPassword(values.password);
            }}
          >
            {(props: FormikProps<any>) => (
              <Form className="w-full">
                <div className="mb-8">
                  <InputWithLabel
                    id="password"
                    name="password"
                    type="text"
                    label={t("pages.userManagement.newPassword")}
                    labelMinWidth="100px"
                    validate={(value: string) => {
                      let error = "";
                      if (!value) {
                        error = "새 비밀번호는 비워둘 수 없습니다.";
                      }
                      return error;
                    }}
                  />
                </div>
                <div className="mt-8 flex justify-center items-center">
                  <ButtonCustomizer type="submit" className="mr-4">
                    {t("common.produce")}
                  </ButtonCustomizer>
                  <ButtonCustomizer
                    onClick={handleClose}
                    type="button"
                    color="secondary"
                  >
                    {t("common.cancel")}
                  </ButtonCustomizer>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    </Modal>
  );
};

export default PasswordModal;
