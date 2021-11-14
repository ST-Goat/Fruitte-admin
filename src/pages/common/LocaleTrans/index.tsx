import { useTranslation } from "react-i18next";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Icon from "pages/common/components/Icon";
import Text from "pages/common/components/Text";
import { Size } from "shared/comom.enum";

function LocaleTrans({ onChange }: { onChange?: (value: string) => void }) {
  const { i18n } = useTranslation();
  const handleChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    i18n.changeLanguage(event.target.value);
    onChange && onChange(event.target.value);
  };
  return (
    <Select
      sx={{ height: "32px", backgroundColor: "#ffffff" }}
      value={i18n.language}
      onChange={handleChange}
    >
      <MenuItem value="en">
        <div className="flex">
          <Icon size={Size.SMALL} name="en-flag" />
          <Text className="ml-2">English</Text>
        </div>
      </MenuItem>
      <MenuItem value="ko">
        <div className="flex">
          <Icon size={Size.SMALL} name="ko-flag" />{" "}
          <Text className="ml-2">한국</Text>
        </div>
      </MenuItem>
    </Select>
  );
}

export default LocaleTrans;
