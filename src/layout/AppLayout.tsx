import { Header } from "components/layout/Header";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function AppLayout(props: Props) {
  const { children } = props;
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{children}</main>
    </>
  );
}
