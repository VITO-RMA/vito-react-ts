import { useMemo, useState, type ReactNode } from "react";
import { Portal } from "@mui/material";
import { uniqueId } from "lodash-es";
import type { Map as MaplibreMap } from "maplibre-gl";
import { useControl, type ControlPosition } from "react-map-gl/maplibre";

interface Props {
  children?: ReactNode | ReactNode[];
  position?: ControlPosition;
  className?: string;
}

export function MapControlBase(props: Props) {
  const { children = null, className, position = "top-right" } = props;
  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null);
  const uuid = useMemo(() => uniqueId("maplibregl-ctrl"), []);

  useControl(
    () => ({
      onAdd: (map: MaplibreMap) => {
        if (!wrapper) {
          const container = map
            .getContainer()
            .querySelector(`div.maplibregl-ctrl-${position}`);
          const controlContainer = (container?.querySelector(
            `div.maplibregl-ctrl.${uuid}`
          ) || document.createElement("div")) as HTMLDivElement;
          controlContainer.classList.add(
            "maplibregl-ctrl",
            uuid,
            className || "undefined-control"
          );
          if (container) container.appendChild(controlContainer);
          setWrapper(controlContainer);

          return controlContainer;
        }
        return wrapper;
      },
      onRemove: () => {
        if (wrapper) {
          wrapper.remove();
          setWrapper(null);
        }
        return wrapper;
      },
    }),
    { position }
  );

  if (!wrapper) return null;
  return <Portal container={wrapper}>{children}</Portal>;
}
