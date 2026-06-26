import type { ComponentPropsWithoutRef } from "react";
import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Link } from "@tanstack/react-router";

import { Avatar } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

interface Props extends ComponentPropsWithoutRef<"header"> {}

export function Header(props: Props) {
  const { className = "", ...itemProps } = props;
  const { t } = useTranslation();

  return (
    <header
      className={cn(
        "border-b border-border/60 bg-primary backdrop-blur-sm",
        className
      )}
      {...itemProps}
    >
      <div className="px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="stencil text-sm hover:text-primary transition-colors"
          >
            {t("title.globalTitle")}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <Avatar className="stencil text-sm leading-tight">D.</Avatar>
          </div>
          <Link to="/" className="tag hover:text-foreground transition-colors">
            <LogOut className="w-3 h-3" /> LOG OUT
          </Link>
        </div>
      </div>
    </header>
  );
}
