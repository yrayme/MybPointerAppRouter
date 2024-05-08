'use client'
import { useSidebar } from "@/hooks/useCommon";
import { OpenSubmenu } from "@/interfaces";
import { useSession } from "next-auth/react";
import { redirect, useParams, usePathname } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const LayoutContext = createContext<any>(undefined);

interface Props {
  children: ReactNode;
}

export function LayoutContextProvider({ children }: Props) {
  const { t } = useTranslation();
  const  pathname  = usePathname();
  const { locale } = useParams();
  const currentRoute = pathname.replace(`/${locale}`, "");
  const { menuItems } = useSidebar();
  const [optionName, setOptionName] = useState<string>("");
  const [openSubmenu, setOpenSubmenu] = useState<OpenSubmenu>({
      0: false,
  });

  const handleOpenSubmenu = (id: number) => {
      setOpenSubmenu({ ...openSubmenu, [id]: !openSubmenu[id] });
  }

  useEffect(() => {
    const menu = menuItems.find(item => item.routes?.includes(currentRoute));
    if (menu) setOptionName(menu.name)
    else {
      const submenu = menuItems.find(item => item.submenu);
      const submenuName = submenu?.submenu?.find(item => item.routes?.includes(currentRoute.toLowerCase()));
      if (submenuName) setOptionName(submenuName?.name)
      else {
        if ( currentRoute === "/settings") setOptionName(t("common:menu:settings"))
      }
    }
  }, [currentRoute, menuItems])
  
  const value = {
    openSubmenu,
    optionName,
    setOptionName,
    handleOpenSubmenu
  }
  
  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutContext() {
  return useContext(LayoutContext);
}
