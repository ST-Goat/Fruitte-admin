import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBox(props: any) {
  return (
    <Paper
      square={false}
      elevation={4}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        border: "1px solid #76848d",
        height: "40px",
      }}
    >
      <InputBase sx={{ ml: 1, flex: 1 }} fullWidth {...props} />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
