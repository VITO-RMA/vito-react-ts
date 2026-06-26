import { useTranslation } from "react-i18next";

import { PageBase } from "@/pages/base/PageBase";
import { Header } from "@/components/layout/Header";

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <PageBase>
        <div className="flex flex-col min-h-[calc(100dvh-(--spacing(21)))] items-center justify-center lg:col-span-2">
          <h1 className="text-center mb-4 text-8xl font-bold">404</h1>
          <p className="text-center mb-4 text-xl text-muted-foreground">
            {t("label.notFound")}
          </p>
          <a
            href="/dashboard"
            className="text-center text-primary underline hover:text-primary/90"
          >
            {t("label.backToHome")}
          </a>
        </div>
      </PageBase>
    </>
  );
}
