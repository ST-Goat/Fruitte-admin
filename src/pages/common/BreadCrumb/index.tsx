import { useMemo } from "react";
import { useLocation } from "react-router";
import cn from "classnames";

import { Link } from "../components/Link";

import { menuItems } from "shared/menu.item";
import { useTranslation } from "react-i18next";

function BreadCrumb() {
  const location = useLocation();
  const { t } = useTranslation();

  const crumbs = useMemo(
    () =>
      location.pathname
        .split("/")
        .slice(1)
        .map((path) => {
          const match = menuItems.find((menu) => menu.to === `/${path}`);
          if (!match) return { key: path, label: path, to: path };
          return { ...match, label: t(match.label) };
        }),
    [location]
  );

  return (
    <div className="flex">
      {crumbs.map((item, i) => {
        const isLastest = i === crumbs.length - 1;
        return (
          <Link key={item.key} to={item.to}>
            <b
              className={cn(
                "text-2xl font-bold",
                isLastest ? "text-black" : `text-blue-500`
              )}
            >
              {item.label}
            </b>
            <span className="text-xl font-bold">{isLastest ? "" : ` > `}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default BreadCrumb;
