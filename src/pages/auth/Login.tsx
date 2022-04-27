import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Login.scss";

import {
  Form,
  Formik,
  FormikProps,
  FormikHelpers as FormikActions,
} from "formik";
import EyesHide from "assets/icons/eyes-hide.svg";
import EyesShow from "assets/icons/eyes-show.svg";
import Input from "pages/common/Formik/Input";
import NavBar from "layouts/NavBar";
import ButtonCustomizer from "pages/common/Button";

import { loginRequest } from "redux/slices/auth";
import { useAppDispatch } from "utilities/useHook";
import { validateEmail } from "utilities/helper";
import CONFIGS from "shared/configs";
import { homepageUrl } from "routes";
import { useHistory } from "react-router-dom";

function validatePassword(value: string) {
  let error;
  if (!value) {
    error = "필수정보 입니다";
  }
  return error;
}

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [passIsShowred, setPassIsShowred] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const hideOrShowPass = () => {
    setPassIsShowred(!passIsShowred);
  };

  const onSubmit = (values: FormValues, actions: FormikActions<any>) => {
    const { email, password } = values;
    dispatch(
      loginRequest({
        email: email,
        password: password,
        isFarmer: false,
      })
    );
    actions.setSubmitting(false);
  };

  useEffect(() => {
    const isHavedToken = Boolean(
      localStorage.getItem(CONFIGS.HEADER_PAYLOAD_KEY)
    );
    if (isHavedToken) {
      history.push(homepageUrl);
    }
  }, []);

  return (
    <div className="login__wrapper">
      <NavBar disableExpand />
      <div className="login__form-wrapper pt-32 w-1/3 m-auto bg-white-default">
        <h1 className="text-5xl text-center font-bold mb-16">
          {t("pages.login.title")}
        </h1>
        <Formik initialValues={{ email: "", password: "" }} onSubmit={onSubmit}>
          {(props: FormikProps<any>) => {
            return (
              <Form>
                <div className="mb-6">
                  <Input
                    type="text"
                    autoFocus
                    name="email"
                    validate={validateEmail}
                    placeholder={t("common.email")}
                  />
                </div>
                <div className="mb-12">
                  <Input
                    type={passIsShowred ? "text" : "password"}
                    name="password"
                    validate={validatePassword}
                    placeholder={t("common.password")}
                    onClickIcon={hideOrShowPass}
                    EndIcon={
                      <img
                        className="cursor-pointer"
                        alt="hideOrShowPass"
                        src={!passIsShowred ? EyesShow : EyesHide}
                      />
                    }
                  />
                </div>

                <ButtonCustomizer className="w-full" type="submit">
                  {t("pages.login.submit")?.toLocaleUpperCase()}
                </ButtonCustomizer>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="login__footer w-full h-16 absolute bottom-0 bg-primary-default"></div>
    </div>
  );
};
export default Login;
