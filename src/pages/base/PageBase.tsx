import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function PageBase(props: Props) {
  const { children, className = "", ...itemProps } = props;

  return (
    <main
      className={`flex-1 grid lg:grid-cols-[0.3fr_0.7fr] max-w-dvw overflow-hidden ${className}`}
      {...itemProps}
    >
      {children}
    </main>
  );
}
