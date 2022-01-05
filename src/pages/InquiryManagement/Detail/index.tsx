import React from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import ButtonCustomizer from "pages/common/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { Size } from "shared/comom.enum";
import { inquiryManagementUrl } from "routes";

const InqiuryDetail = () => {
  const history = useHistory();
  const { t } = useTranslation();

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
              <b>Sender name:</b> 홍길동
            </li>
            <li>
              <b>Send date:</b> 2/12/2021
            </li>
          </ul>
          <ul className="p-12 text-left">
            <li className="mb-4">
              <b>Phone number:</b> 012-3456-888
            </li>
            <li>
              <b>Email:</b> honggik@email.com
            </li>
          </ul>
        </section>
        <section className="p-12">
          <h3 className="font-bold text-left">
            Title: I want to know how to book an activity
          </h3>
          <div className="mt-4 text-left">
            <b>Message body:</b>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InqiuryDetail;
