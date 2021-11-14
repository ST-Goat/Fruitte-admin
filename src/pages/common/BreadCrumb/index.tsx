import { useMemo } from "react";
import { useLocation } from "react-router";
import cn from "classnames";

import { Link } from "../components/Link";

import { menuItems } from "shared/menu.item";
import { useTranslation } from "react-i18next";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export type BreadItem = {
  label?: string;
  keyLabel?: string;
  href: string;
};

export type BreadcrumbProps = {
  data?: Array<BreadItem>;
};

function BreadCrumb({ data }: BreadcrumbProps) {
  const location = useLocation();
  const { t } = useTranslation();

  const crumbs = useMemo(() => {
    if (!data) {
      return location.pathname
        .split("/")
        .slice(1)
        .map((path) => {
          const match = menuItems.find((menu) => menu.to === `/${path}`);
          if (!match) return { key: path, label: path, to: path };
          return { ...match, label: t(match.label) };
        });
    }
    return data.map((item) => ({
      key: item.href,
      label: !item.keyLabel ? item.label : t(item.keyLabel),
      to: item.href,
    }));
  }, [data, location, t]);

  return (
    <div className="flex">
      {crumbs.map((item, i) => {
        const isLastest = i === crumbs.length - 1;
        return (
          <Link key={item.key} to={item.to}>
            <b
              className={cn(
                "text-2xl font-bold",
                isLastest
                  ? "text-black cursor-auto"
                  : `text-blue-500 hover:underline`
              )}
            >
              {item.label}
            </b>
            <span className="text-xl font-bold">
              {isLastest ? (
                ""
              ) : (
                <ArrowForwardIosIcon sx={{ marginBottom: "5px" }} />
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default BreadCrumb;
