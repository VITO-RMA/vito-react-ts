import type { CSSProperties } from "@mui/material/styles";

export function mixinTransform(
  mixin: CSSProperties,
  from: keyof CSSProperties,
  to: keyof CSSProperties,
  mapping?: (value: unknown | CSSProperties) => unknown | CSSProperties
): CSSProperties {
  const keys: (keyof typeof mixin)[] = Object.keys(
    mixin
  ) as (keyof CSSProperties)[];
  return keys.reduce(
    (updatedMixin: CSSProperties, currentKey: keyof CSSProperties) => {
      if (currentKey === from) {
        if (mapping === undefined)
          return Object.assign(updatedMixin, { [to]: mixin[currentKey] });
        return Object.assign(updatedMixin, {
          [to]: mapping(mixin[currentKey]),
        });
      }
      if (typeof mixin[currentKey] === "object") {
        return Object.assign(updatedMixin, {
          [currentKey]: {
            ...mixinTransform(
              mixin[currentKey] as CSSProperties,
              from,
              to,
              mapping
            ),
          },
        });
      }
      if (mapping === undefined)
        return Object.assign(updatedMixin, { [currentKey]: mixin[currentKey] });
      return Object.assign(updatedMixin, {
        [currentKey]: mapping(mixin[currentKey]),
      });
    },
    {}
  );
}
