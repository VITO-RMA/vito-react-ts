# Agent guidelines

React + TypeScript (Vite), TanStack Router/Query/forms, Tailwindcss (use them classes!), Biome, pnpm.

# SKILLS

## component-structure

[component-structure|.agents/skils/component-structure]

# Things to avoid

1. Do NOT make array's / objects of fields to iterate over to render de fields.
2. Make new componennts inside other
3. Place functions outside of the component structure

# Things to use

1. Use the available libraries to their fullest
2. Make new components to abstract complex component render logic
3. Keep code structure the same as the whole project

## Conventions

<!-- Learned from user feedback. Add rules under the matching subsection; see "Maintaining this file". -->

### General

- Keep it simple (KISS): trust the data shape our own APIs return; don't add defensive checks or heuristics (e.g. regex geometry filtering) for cases that can't happen.
- Avoid premature abstractions: only extract a component/hook/util when it's actually useful; otherwise keep the code in the component or its hooks file. A helper used by a single module stays private in that module.
- Use `function name() {}` for named functions, including handlers inside `useEffect`. Arrow functions are fine for inline callbacks and the `useEffect` cleanup `return () => {}`.

### Components

- Data fetching follows the boundary + `DataLoader` pattern, with the boundary as close as possible to what loads (never let lazily mounted content, e.g. an opened accordion, suspend a parent boundary):
  ```tsx
  export function MyComponent(props: Props) {
    return (
      <ErrorBoundary fallbackRender={BasicErrorFallback}>
        <Suspense fallback={<SuspenseLoader />}>
          <DataLoader {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  }
  function DataLoader(props: Props) { const { data } = useLayers(); ... }
  ```
- Component props are always `interface Props {}` in the component file.
- Use shadcn components (`@/components/ui/*`) instead of raw elements when one exists (e.g. `Button`, not `<button>`). Plain `<div>`s are fine for layout; not everything needs to be a `Card`.
- Avoid div hell: don't add wrapper elements unless they're needed for layout or semantics; style the existing element instead.
- Components that wrap a router link/navigation (`createLink`, `Link`) live in `src/components/router/` (e.g. `RouterButton`, `RouterBreadcrumbLink`).

### Hooks and state

- Group hooks by category, then theme (e.g. `analyseOpdrachtFormHooks.ts` and `analyseOpdrachtWaterFormHooks.ts`); do not create separate files per action such as ontvangen.
- Prefer `useSuspenseQuery`; use `useQuery` only when suspending doesn't fit (e.g. optional/background data).
- Question every `useEffect`; prefer derived values, event handlers, or query/router state. Use it only for real external sync (e.g. MapLibre events).
- Shareable UI state (filters, pagination, selection) lives in the URL: zod-validated search params, read with `useSearch({ from: "..." })` and written with `useNavigate()` in the component or a hook.

### Types and utils

- Prefer `interface` over `type` when either works; type form hook callbacks with `FormOnSubmit` / `FormOnSubmitInvalid` from `@/types/form`.
- Shared types live in `src/types/types.ts`; a domain with many specific types may get its own file (e.g. `src/types/layer.ts`). Never declare shared types elsewhere (component `Props` excepted).

### i18n

- Translation keys go under `label.` (e.g. `t("label.close")`), in both `public/locales/en` and `public/locales/nl`.
- When translations change, bump `VERSION` in `src/i18n.ts` by one patch (e.g. `0.1.7` → `0.1.8`), once per commit.

### Map

- Layer `maxZoom` belongs on the tile source (`maxzoom`), not on the map, so the map can overzoom.

## Maintaining this file

When the user gives structural or style feedback that applies beyond the current task:

1. Add or update **one line** under the matching "Conventions" subsection (add a subsection if none fits): imperative, specific, with a short example if unclear.
2. Merge with an existing rule instead of adding a near-duplicate; remove rules the user overrides.
3. Skip one-off, task-specific, or linter-enforced feedback.
4. Keep this file under ~100 lines. If it grows past that, or a subsection reaches ~5+ rules, propose moving that subsection to `.github/instructions/<topic>.instructions.md` with an `applyTo` glob (note: Copilot-only, other agents only read `AGENTS.md`).
5. Mention in your reply that you updated `AGENTS.md`.
