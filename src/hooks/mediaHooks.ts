export function useCurrentDomain() {
  const parts = [window.location.protocol, "//", window.location.hostname];
  if (["443", "80"].indexOf(window.location.port) === -1)
    parts.push(":", window.location.port);
  return parts.join("");
}
