import Checkbox from "@mui/material/Checkbox";

function CheckBoxCustomizer(props: any) {
  return (
    <Checkbox
      {...props}
      sx={{
        "&.Mui-checked": {
          color: "#4C9C2E",
        },
      }}
    />
  );
}

export default CheckBoxCustomizer;
