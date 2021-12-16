import { useEffect, useState, useRef, memo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { isEqual } from "lodash";

import InputWithLabel, {
  MIN_LEFT_WIDTH,
} from "pages/common/Formik/Input/InputWithLabel";
import EditIcon from "@mui/icons-material/Edit";
import {
  Form,
  Formik,
  Field,
  FieldInputProps,
  FieldMetaProps,
  FormikProps,
} from "formik";
import JoditEditor from "jodit-react";
import ButtonCustomizer from "pages/common/Button";

import { announcementUrl } from "routes";

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
      <JoditEditor
        ref={editor}
        config={{
          readonly: false,
          width: "100%",
        }}
        value={value}
        onBlur={(newContent) => setValue(newContent)}
      />
    );
  },
  (
    prevProps: JoditEditorCustomizerProps,
    nextProps: JoditEditorCustomizerProps
  ) => isEqual(prevProps, nextProps)
);

const fakeItem = {
  title: "fake-title",
  content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
};

const initialValue = {
  title: "",
  content: "",
};
function AddOrEdit() {
  const location = useLocation();
  const { t } = useTranslation();
  const [announcement, setAnnouncement] = useState<{
    title: string;
    content: string;
  }>(initialValue);

  useEffect(() => {
    if (location.pathname !== `/${announcementUrl}/create`) {
      //fetch data
      setAnnouncement(fakeItem);
    }
  }, []);

  return (
    <>
      <h1 className="mb-4 font-bold text-4xl">
        {t("pages.announcement.title")}
      </h1>
      {Boolean(announcement) ? (
        <div className="p-8">
          <Formik
            initialValues={{
              title: announcement.title,
              content: announcement.content,
            }}
            onSubmit={(values) => {
              console.log("submit", values);
            }}
          >
            {(props: FormikProps<any>) => (
              <Form>
                <div className="mb-8">
                  <InputWithLabel
                    id="title"
                    name="title"
                    type="text"
                    label={t("common.title")}
                    onClickIcon={() => {
                      console.log("handle edit");
                    }}
                    disabled={false}
                    EndIcon={
                      <EditIcon
                        color="action"
                        fontSize="large"
                        className="cursor-pointer active:transform active:scale-75"
                      />
                    }
                  />
                </div>
                <div className="flex items-center justify-center">
                  <div style={{ minWidth: MIN_LEFT_WIDTH }} className="mr-16">
                    {t("common.content")}
                  </div>
                  <Field name="content">
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
                  <ButtonCustomizer type="button" color="secondary">
                    {t("common.cancel")}
                  </ButtonCustomizer>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default AddOrEdit;
