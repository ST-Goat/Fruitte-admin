import Grid from "@mui/material/Grid";
import classNames from "classnames";

const MAGIRN_LEFT = "ml-16";
const MAGIRN_RIGHT = "mr-16";
const MAGIRN_BOTTOM = "mb-8";

const RowStyled = ({
  leftContent,
  rightContent,
}: {
  leftContent: any;
  rightContent: any;
}) => (
  <>
    <Grid item xs={2}>
      <div className={classNames(MAGIRN_LEFT, MAGIRN_BOTTOM, "h-full")}>
        {leftContent}
      </div>
    </Grid>
    <Grid item xs={10}>
      <div className={classNames(MAGIRN_RIGHT, MAGIRN_BOTTOM, "h-full")}>
        {rightContent}
      </div>
    </Grid>
  </>
);
export default RowStyled;
