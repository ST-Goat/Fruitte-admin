import { useEffect, useState, useRef, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { isEqual } from "lodash";

import InputWithLabel, {
  MIN_LEFT_WIDTH,
} from "pages/common/Formik/Input/InputWithLabel";

import {
  Form,
  Formik,
  Field,
  FieldInputProps,
  FieldMetaProps,
  FormikProps,
} from "formik";
import Editor from "pages/common/Editor";
import ButtonCustomizer from "pages/common/Button";

import { faqCreateUrl, faqManagementUrl } from "routes";

import { createNewFaq, editExistingFaq } from "services/faq";
import { HttpStatus, SNACKBAR_VARIANTS } from "shared/comom.enum";
import { useAppDispatch, useAppSelector } from "utilities";
import { enqueueSnackbar } from "redux/slices/snackbar";
import { getAllFaq } from "redux/slices/faq";

type JoditEditorCustomizerProps = {
  field: FieldInputProps<any>;
  meta: FieldMetaProps<any>;
};
const JoditEditorCustomizer = memo(
  ({ field, meta }: JoditEditorCustomizerProps) => {
    const editor = useRef(null);
    const [value, setValue] = useState(field.value);

    useEffect(() => {
      field.onChange({
        target: {
          name: field.name,
          value: value,
        },
      });
    }, [value]);

    return (
      <Editor
        ref={editor}
        value={value}
        onBlur={(newContent: string) => setValue(newContent)}
      />
    );
  },
  (
    prevProps: JoditEditorCustomizerProps,
    nextProps: JoditEditorCustomizerProps
  ) => isEqual(prevProps, nextProps)
);

const initDetail = {
  question: "",
  answer: "",
};
function AddOrEdit() {
  const location = useLocation();
  const history = useHistory();
  const { id: faqId } = useParams<any>();
  const dispatch = useAppDispatch();
  const { isLoading, data: faqs } = useAppSelector((state) => state.faq);
  const isCreate = location.pathname === faqCreateUrl;
  const faqDetail = useMemo(() => {
    const faqDataCurrent = faqs.find((item) => item.id.toString() === faqId);
    return isCreate || !faqDataCurrent ? initDetail : faqDataCurrent;
  }, [faqs, isCreate]);

  useEffect(() => {
    if (!isCreate && faqs.length === 0) {
      dispatch(getAllFaq(null));
    }
  }, []);

  const handleCreate = async (values: any) => {
    try {
      const response = await createNewFaq({ data: values });
      if (response.status === HttpStatus.OK) {
        dispatch(
          enqueueSnackbar({
            message: "Success!",
            variant: SNACKBAR_VARIANTS.SUCCESS,
          })
        );
        history.push(faqManagementUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (values: any) => {
    try {
      const response = await editExistingFaq({
        faqId: faqId,
        data: {
          question: values.question,
          answer: values.answer,
        },
      });
      if (response.status === HttpStatus.OK) {
        dispatch(
          enqueueSnackbar({
            message: "Success!",
            variant: SNACKBAR_VARIANTS.SUCCESS,
          })
        );
        history.push(faqManagementUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { t } = useTranslation();
  return (
    <>
      <h1 className="mb-4 font-bold text-4xl">{t("pages.faq.title")}</h1>
      {!isLoading ? (
        <div className="p-8">
          <Formik
            initialValues={faqDetail}
            onSubmit={(values) => {
              if (isCreate) {
                handleCreate(values);
              } else {
                handleEdit(values);
              }
            }}
          >
            {(props: FormikProps<any>) => (
              <Form>
                <div className="mb-8">
                  <InputWithLabel
                    id="faq-question"
                    name="question"
                    type="text"
                    label={t("pages.faq.question")}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <div style={{ minWidth: MIN_LEFT_WIDTH }} className="mr-16">
                    {t("pages.faq.answer")}
                  </div>
                  <Field name="answer">
                    {({
                      field,
                      meta,
                    }: {
                      field: FieldInputProps<any>;
                      meta: FieldMetaProps<any>;
                    }) => <JoditEditorCustomizer field={field} meta={meta} />}
                  </Field>
                </div>
                <div className="mt-16 mr-8 flex justify-end items-center">
                  <ButtonCustomizer type="submit" className="mr-4">
                    {t("common.produce")}
                  </ButtonCustomizer>
                  <Link to={faqManagementUrl}>
                    <ButtonCustomizer type="button" color="secondary">
                      {t("common.cancel")}
                    </ButtonCustomizer>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div>{t("common.loading")}</div>
      )}
    </>
  );
}

export default AddOrEdit;
