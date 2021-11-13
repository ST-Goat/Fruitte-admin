import { useState } from "react";
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
import NavBar from "pages/common/NavBar";

function validateEmail(value: string) {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

function validatePassword(value: string) {
  let error;
  if (!value) {
    error = "Required";
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

  const hideOrShowPass = () => {
    setPassIsShowred(!passIsShowred);
  };

  const onSubmit = (values: FormValues, actions: FormikActions<any>) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="login__wrapper">
      <NavBar />
      <div className="login__form-wrapper pt-32 w-1/3 m-auto bg-grey-100">
        <h1 className="text-5xl text-center font-bold mb-16">
          {t("pages.login.title")}
        </h1>
        <Formik initialValues={{ email: "", password: "" }} onSubmit={onSubmit}>
          {(props: FormikProps<any>) => (
            <Form>
              <Input
                type="text"
                autoFocus
                name="email"
                validate={validateEmail}
                placeholder={`${t("common.email")}/ID`}
              />

              <Input
                type={passIsShowred ? "text" : "password"}
                name="password"
                validate={validatePassword}
                placeholder={`${t("common.email")}/ID`}
                onClickIcon={hideOrShowPass}
                EndIcon={
                  <img
                    className="cursor-pointer"
                    alt="hideOrShowPass"
                    src={!passIsShowred ? EyesShow : EyesHide}
                  />
                }
              />
              <button
                className="w-full p-2 rounded-lg bg-primary-default"
                type="submit"
              >
                {t("pages.login.submit")}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="login__footer w-full h-16 absolute bottom-0 bg-secondary2-default"></div>
    </div>
  );
};
export default Login;
