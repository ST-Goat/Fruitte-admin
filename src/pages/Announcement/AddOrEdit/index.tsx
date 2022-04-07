import { useEffect, useState, useRef, memo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
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

import {
  createNewAnnouncement,
  fetchAnnouncementDetail,
} from "services/announcement";
import { useAppDispatch } from "utilities/useHook";
import { HttpStatus, SNACKBAR_VARIANTS } from "shared/comom.enum";
import { enqueueSnackbar } from "redux/slices/snackbar";
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

const initialValue = {
  title: "",
  content: "",
};
type announcementForm = {
  title: string;
  content: string;
};
function AddOrEdit() {
  const { id: announcementId } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [announcement, setAnnouncement] =
    useState<announcementForm>(initialValue);
  const getDetailOfAnnouncementId = async (_id: string) => {
    setIsLoading(true);
    try {
      const response = await fetchAnnouncementDetail({ id: _id });
      if (response.status === HttpStatus.OK) {
        setAnnouncement({
          title: response.data.content.title,
          content: response.data.content.content,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (announcementId !== "create") {
      getDetailOfAnnouncementId(announcementId);
    }
  }, [announcementId]);

  const dispatch = useAppDispatch();
  const history = useHistory();
  const handleSubmit = async (values: announcementForm) => {
    try {
      const response = await createNewAnnouncement(values);
      if (response.status === HttpStatus.OK) {
        dispatch(
          enqueueSnackbar({
            message: "Success!",
            variant: SNACKBAR_VARIANTS.SUCCESS,
          })
        );
        history.push(announcementUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="mb-4 font-bold text-4xl">
        {t("pages.announcement.title")}
      </h1>
      {Boolean(announcement && !isLoading) ? (
        <div className="p-8">
          <Formik
            initialValues={{
              title: announcement.title,
              content: announcement.content,
            }}
            onSubmit={handleSubmit}
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
        <div>{t("common.loading")}</div>
      )}
    </>
  );
}

export default AddOrEdit;
