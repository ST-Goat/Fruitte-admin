import React from "react";
import { useTranslation } from "react-i18next";

function LocaleTrans({ onChange }: { onChange?: (value: string) => void }) {
  const { i18n } = useTranslation();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    i18n.changeLanguage(event.target.value);
    onChange && onChange(event.target.value);
  };
  return (
    <select defaultValue={i18n.language} onChange={handleChange}>
      <option value="en">English</option>
      <option value="ko">한국</option>
    </select>
  );
}

export default LocaleTrans;
