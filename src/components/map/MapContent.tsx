import type { ComponentPropsWithRef, ReactNode } from "react";
import MaplibreMap, { type MapLayerMouseEvent } from "react-map-gl/maplibre";

interface Props extends ComponentPropsWithRef<typeof MaplibreMap> {
  className?: string;
  children?: ReactNode | ReactNode[];
}

export function MapContent(props: Props) {
  const { children = null, className, ref, ...mapProps } = props;

  function onMouseEnter(e: MapLayerMouseEvent) {
    e.target.getCanvas().style.cursor = "pointer";
  }
  function onMouseLeave(e: MapLayerMouseEvent) {
    e.target.getCanvas().style.cursor = "auto";
  }

  return (
    <MaplibreMap
      id="map-container"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      {...mapProps}
      ref={(r) => {
        const filteredClassNames = (className || "")
          .split(" ")
          .filter((c) => !!c);
        if (r && filteredClassNames.length > 0)
          r.getContainer().classList.add(...filteredClassNames);
        if (typeof ref === "function") ref(r);
        else if (ref) ref.current = r;
      }}
    >
      {children}
    </MaplibreMap>
  );
}
