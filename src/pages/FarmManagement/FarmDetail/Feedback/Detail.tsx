/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import Text from "pages/common/components/Text";
import LeftHeader from "pages/FarmManagement/components/LeftHeader";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Input from "pages/common/Formik/Input";

import {
  createNewMessageForFeedBack,
  getFeedbackDetail,
} from "services/feedback";
import { USER_TYPES } from "shared/comom.enum";
import { Form, Formik, FormikProps } from "formik";
import ButtonCustomizer from "pages/common/Button";

const FeedbackRow = ({
  message,
  avatarUrl,
  userName,
  userType,
}: {
  message: string;
  avatarUrl: string;
  userName: string;
  userType: USER_TYPES;
}) => {
  return (
    <div
      className={classNames(
        "flex items-center mb-4",
        userType === USER_TYPES.ADMIN ? "flex-row-reverse" : ""
      )}
    >
      <Avatar
        sx={{ width: 48, height: 48, fontSize: "1rem" }}
        alt={!avatarUrl ? userName[0] : avatarUrl}
        src={avatarUrl ?? "/blank_image_grey.svg"}
      />
      <div
        className={classNames(
          userType === USER_TYPES.ADMIN
            ? "bg-primary-default"
            : "bg-secondary1-default",
          "mx-2 p-4 rounded",
          "text-white-default"
        )}
      >
        {message}
      </div>
    </div>
  );
};

const FeedbackDetail = () => {
  const { t } = useTranslation();
  const { feedbackId } = useParams<{ feedbackId: string }>();
  const [feedbackInfor, setFeedbackInfor] = useState<any[]>([]);
  const [reload, setReload] = useState(false);

  const getFeedbackInfor = async (id: string) => {
    try {
      const response = await getFeedbackDetail({ id: feedbackId });
      setFeedbackInfor(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeedbackInfor(feedbackId);
  }, [feedbackId, reload]);

  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <LeftHeader />
      </div>
      <div
        className={classNames(
          "flex flex-col px-16 py-4 justify-center items-center ",
          "rounded border-2 border-grey-default",
          "mt-8 mx-16"
        )}
      >
        <Text className="font-bold text-3xl">
          {t("pages.farmManagement.feedbackDetails")}
        </Text>
        <div className="w-full mt-8">
          {feedbackInfor.length > 0 ? (
            <>
              {feedbackInfor.map((item, i) => (
                <FeedbackRow
                  key={i}
                  message={item.message}
                  avatarUrl={item.fromUser.avatarUrl}
                  userName={item.fromUser.name}
                  userType={item.fromUser.userType}
                />
              ))}
            </>
          ) : (
            <>{t("common.noData")}</>
          )}
          <div className="mt-16 mb-8">
            <Formik
              initialValues={{ message: "" }}
              onSubmit={(values) => {
                createNewMessageForFeedBack({
                  feedbackId: feedbackId,
                  targetId:
                    feedbackInfor[0]?.fromUser.userType === USER_TYPES.ADMIN
                      ? feedbackInfor[0]?.targetUser.id
                      : feedbackInfor[0]?.fromUser.id,
                  message: values.message,
                }).then((response) => {
                  setReload(!reload);
                });
              }}
            >
              {(props: FormikProps<any>) => {
                return (
                  <Form>
                    <div className="grid grid-rows-1 grid-cols-6 gap-4 mt-6">
                      <div className="col-span-5">
                        <Input type="text" autoFocus name="message" />
                      </div>

                      <div className="flex items-center justify-end">
                        <ButtonCustomizer className="w-32" type="submit">
                          {t("common.send")}
                        </ButtonCustomizer>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetail;
