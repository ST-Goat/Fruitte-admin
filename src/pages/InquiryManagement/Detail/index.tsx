import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import ButtonCustomizer from "pages/common/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { Size } from "shared/comom.enum";
import { inquiryManagementUrl } from "routes";
import { fetchInquiryDetail, InquiryStatus } from "services/inquiry";

import type { Inquiry } from "services/inquiry";
import { format } from "date-fns/esm";

const InqiuryDetail = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState<Inquiry | null>(null);

  let ignore = false;
  const getInquiryDetails = async (_id: string) => {
    if (!ignore) setIsLoading(true);
    try {
      const response = await fetchInquiryDetail({ id: _id });
      if (!ignore) setDetail(response);
    } catch (error) {
      console.log(error);
    } finally {
      if (!ignore) setIsLoading(false);
    }
  };
  useEffect(() => {
    getInquiryDetails(id);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ignore = true;
    };
  }, [id]);

  if (!detail) return <>Something was wrong!...</>;
  if (isLoading) return <>{t("common.loading")}</>;
  return (
    <div>
      <div>
        <ButtonCustomizer
          variant="other"
          color="other"
          size={Size.CUSTOM}
          className={classNames(
            "flex items-center px-0",
            "active:transform active:scale-95",
            "font-bold"
          )}
          onClick={() => {
            history.push(inquiryManagementUrl);
          }}
        >
          <ArrowBackIosIcon fontSize="small" />
          {t("common.goBack")}
        </ButtonCustomizer>
      </div>
      <div
        className={classNames(
          "p-8 mx-32 my-8",
          "rounded rounded-lg border borde-grey-default",
          "text-center"
        )}
      >
        <h1 className="text-center font-bold text-2xl">Inquiry Details</h1>
        <section className="flex justify-between items-center">
          <ul className="p-12 text-left">
            <li className="mb-4">
              <b>{t("pages.inquiry.senderName")}:</b> {detail.sender}
            </li>
            <li>
              <b>{t("pages.inquiry.senderDate")}:</b>{" "}
              {format(new Date(detail.createdAt), "yyyy/MM/dd")}
            </li>
          </ul>
          <ul className="p-12 text-left">
            <li className="mb-4">
              {/* <b>{t("pages.inquiry.phoneNumber")}:</b> {detail.phone} */}
            </li>
            <li>
              <b>{t("common.email")}:</b> {detail.email}
            </li>
          </ul>
        </section>
        <section className="p-12">
          {/* <h3 className="font-bold text-left">Title: {detail.title}</h3> */}
          <h3 className="font-bold text-left">
            {t("common.status")}:{" "}
            <span
              className={classNames(
                "font-bold",
                detail.status === InquiryStatus.DONE
                  ? "text-success-default"
                  : "text-info-default"
              )}
            >
              {detail.status}
            </span>
          </h3>
          <div className="mt-4 text-left">
            <b>{t("pages.inquiry.messageBody")}:</b>
            <p>{detail.content}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InqiuryDetail;
