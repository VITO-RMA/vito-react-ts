import type { HTMLAttributes, MouseEvent, ReactNode } from "react";
import { RefreshCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import type { FallbackProps } from "react-error-boundary";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement>, FallbackProps {
  label: ReactNode;
  color?: "error";
  direction?: "row" | "column";
}

export function LabeledRetryErrorFallback(props: Props) {
  const {
    color = "error",
    direction = "row",
    label,
    resetErrorBoundary,
    className,
    onClick: onParentClick,
    ...divProps
  } = props;
  const { reset } = useQueryErrorResetBoundary();
  const { t } = useTranslation();

  async function onClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    if (onParentClick !== undefined)
      onParentClick(e as unknown as MouseEvent<HTMLDivElement>);
    reset();
    resetErrorBoundary();
  }

  return (
    <div
      {...divProps}
      className={cn(
        `flex flex-col gap-2 items-center ${className} flex-${direction}`
      )}
    >
      {label}
      <Tooltip>
        <TooltipTrigger
          render={
            <Button onClick={onClick}>
              <RefreshCcw />
            </Button>
          }
        />
        <TooltipContent>{t("label.retry")}</TooltipContent>
      </Tooltip>
    </div>
  );
}
