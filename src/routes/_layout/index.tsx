import { createFileRoute } from "@tanstack/react-router";
import { PageBase } from "pages/base/PageBase";

export const Route = createFileRoute("/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageBase >Hello from '/' please change me</PageBase>;
}
