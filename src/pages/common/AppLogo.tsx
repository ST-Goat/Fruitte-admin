import cn from "classnames";

interface AppLogoProps {
  white?: boolean;
  logoClassName?: string;
}
type AppLogoType = AppLogoProps & React.ComponentProps<"img">;

const AppLogo: React.FC<AppLogoType> = ({
  className,
  logoClassName,
  white,
}) => {
  return (
    <a href="/" className={cn("flex items-center justify-center", className)}>
      <img className={logoClassName} src="/Logo.svg" alt="Fruittee Logo" />
    </a>
  );
};
export default AppLogo;
