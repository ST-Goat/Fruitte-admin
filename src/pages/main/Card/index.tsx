import React from "react";
import classNames from "classnames";

import BookOnlineIcon from "@mui/icons-material/BookOnline";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HelpIcon from "@mui/icons-material/Help";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import ChatIcon from "@mui/icons-material/Chat";

import { formatNumber } from "utilities";

export enum CardIconKeys {
  reservation = "reservation",
  settlement = "settlement",
  question = "question",
  assistant = "assistant",
  feedback = "feedback",
}

const CardIcon = {
  reservation: <BookOnlineIcon fontSize="large" />,
  settlement: <AccountBalanceIcon fontSize="large" />,
  question: <HelpIcon fontSize="large" />,
  assistant: <AssistantPhotoIcon fontSize="large" />,
  feedback: <ChatIcon fontSize="large" />,
};

const CardStatistic = ({
  title,
  subTitle,
  total,
  icon,
}: {
  title: string;
  subTitle?: string;
  total?: number;
  icon: CardIconKeys;
}) => {
  return (
    <div
      className={classNames(
        "w-72 p-4 mr-8 mt-8 float-left",
        "bg-white-default shadow-md hover:shadow-lg",
        "grid grid-rows-1 grid-cols-2 grid-flow-col gap-4",
        "rounded"
      )}
    >
      <ul className="col-span-2">
        <li className="text-lg text-grey-300">{title}</li>
        <li className="text-2xl font-bold">{formatNumber(total)}</li>
        <li>{subTitle ?? <br />}</li>
      </ul>
      <div className="flex items-center justify-center">{CardIcon[icon]}</div>
    </div>
  );
};

export default CardStatistic;
