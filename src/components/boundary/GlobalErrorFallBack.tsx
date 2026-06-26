
import { useState } from "react";
import { useTranslation } from "react-i18next";

import axios from "axios";
import type { FallbackProps } from "react-error-boundary";
import JSONPretty from "react-json-pretty";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";

export function GlobalErrorFallBack(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);

  function isError(e: unknown | Error): e is Error {
    return e instanceof Error;
  }

  return (
    <Card>
      <CardHeader>
        <Avatar>😕</Avatar>
        <CardTitle>{t("label.somethingWentWrong")}</CardTitle>
        <CardDescription>{t("label.tryAgainAndOtherOptions")}</CardDescription>
      </CardHeader>
      <CardAction>
        <Button onClick={() => resetErrorBoundary()} variant="default">
          {t("label.tryAgain")}
        </Button>
        <CollapsibleTrigger
          render={
            <Button onClick={() => setExpanded(!expanded)}>
              {t("label.errorDetails")}
            </Button>
          }
        />
      </CardAction>
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <CardContent className="error-details">
          {axios.isAxiosError(error) && (
            <JSONPretty data={JSON.stringify(error.response)} />
          )}
          {isError(error) && (
            <div className="grid gap-1">
              <h5 className="detail-title">{t("label.name")}</h5>
              <JSONPretty data={error.name} />
              <h5 className="detail-title">{t("label.message")}</h5>
              <JSONPretty data={error.message} />
              <h5 className="detail-title">{t("label.stacktrace")}</h5>
              <JSONPretty data={error.stack} />
            </div>
          )}
        </CardContent>
      </Collapsible>
    </Card>
  );
}
