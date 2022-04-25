import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { reduce } from "lodash";

import { InputWithLabel } from "pages/common/Formik/Input";

import { editSettingItem, fetchSettings, SettingItem, SettingType } from "services/settings";
import { Form, Formik, FormikProps } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useAppDispatch } from "utilities/useHook";
import { enqueueSnackbar } from "redux/slices/snackbar";
import { HttpStatus, SNACKBAR_VARIANTS } from "shared/comom.enum";

const FieldItem = ({
  item,
  defaultValue,
  settingId
}: {
  item: { label: string; type: SettingType };
  defaultValue: string;
  settingId?: string | number;
}) => {
  const [disabled, setDisabled] = useState(true);
  const [iconSelected, setIconSelected] = useState<"edit" | "save">("edit");
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const dispatch = useAppDispatch();

  const requestChangeContent = async (newContent: string) => {
    try {
      if(settingId) {
        const response = await editSettingItem({ id: settingId, type: item.type, content: newContent});
        if(response.status === HttpStatus.OK) {
          dispatch(
            enqueueSnackbar({
              message: "Success!",
              variant: SNACKBAR_VARIANTS.SUCCESS,
            })
          );
        }
        
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mb-4">
      <InputWithLabel
        id={item.label}
        name={item.type}
        type="text"
        label={item.label}
        EndIcon={
          iconSelected === "edit" ? (
            <EditIcon
              color="action"
              fontSize="large"
              className="cursor-pointer active:transform active:scale-75"
            />
          ) : (
            <SaveIcon
              color="primary"
              fontSize="large"
              className="cursor-pointer active:transform active:scale-75"
            />
          )
        }
        onClickIcon={() => {
          if (iconSelected === "edit") setIconSelected("save");
          else {
            requestChangeContent(currentValue)
            setIconSelected("edit");
          }
          setDisabled((prev) => !prev);
        }}
        onBlur={() => {}}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setCurrentValue(event.target.value)}}
        disabled={disabled}
      />
    </div>
  );
};

const Settings = () => {
  const [settings, setSettings] = useState<SettingItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getSettingList = async () => {
    setLoading(true);
    try {
      const response = await fetchSettings();
      setSettings(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSettingList();
  }, []);

  const { t } = useTranslation();

  const fields = [
    { label: t("pages.settings.aboutUs"), type: SettingType.ABOUT_US },
    {
      label: t("pages.settings.aboutUsDetail"),
      type: SettingType.ABOUT_US_DETAIL,
    },
    {
      label: t("pages.settings.serviceFruitPicnic"),
      type: SettingType.SERVICE_FRUIT_PICNIC,
    },
    {
      label: t("pages.settings.serviceFruitStore"),
      type: SettingType.SERVICE_FRUIT_STORE,
    },
  ];

  if (!settings || settings.length === 0) return <>{t("common.noData")}</>;
  return (
    <div>
      <h1 className="text-2xl font-bold">{t("pages.settings.title")}</h1>
      <div className="mt-8">
        {loading ? (
          <>{t("common.loading")}</>
        ) : (
          <Formik
            initialValues={reduce(
              settings,
              (result, value) => {
                return { ...result, [value.type]: value.content };
              },
              {}
            )}
            onSubmit={() => {}}
          >
            {(props: FormikProps<any>) => {
              return (
                <Form>
                  {fields.map((item, i) => (
                    <FieldItem key={i} item={item} settingId={settings.find(f => f.type === item.type)?.id} defaultValue={settings.find(f => f.type === item.type)?.content ?? ''} />
                  ))}
                </Form>
              );
            }}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Settings;
