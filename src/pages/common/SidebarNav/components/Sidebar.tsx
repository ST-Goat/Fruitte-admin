import cn from "classnames";

interface SidebarProps {
  collapse?: boolean;
}
type SidebarType = SidebarProps & React.ComponentProps<"div">;
const Sidebar: React.FC<SidebarType> = ({
  children,
  className,
  collapse,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex h-full relative z-50 transition-sidebar duration-sidebar ease-sidebar delay-sidebar text-white",
        !collapse ? "text-left w-60 min-w-60" : "text-center w-20 min-w-20",
        className
      )}
      {...props}
    >
      <div className="h-full w-full relative z-40 bg-secondary2-default border-t-2 border-grey-500">
        <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden relative z-40">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
