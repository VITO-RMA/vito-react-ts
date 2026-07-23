---
name: component-structure
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

### Stack

- React + tailwind + base-ui + Lucide-React icons + TanStack Router + TanStack Query + TypeScript
- Theme: `src/styles/global.css` (`VITO`, `Belgian army style`)
- Do not add dependencies for styling unless necessary

### HTML tags

- Semantic HTML tags are used for structure and accessibility
- Try to avoid wrapping alot of elements for convience, use as minimal tags as possible for nesting.

### TypeScript

- TypeScript is used for type safety and better developer experience
- **NEVER** use `any` types, figure out the correct type instead

### Components structure

```
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

import { ErrorBoundary } from "react-error-boundary";

import { cn } from "@/lib/utils";
import { PageBase } from "@/pages/base/PageBase";
import { LabeledRetryErrorFallback } from "@/components/boundary/LabeledRetryErrorFallback";

//main component props are always defined as `Props` and extend `ComponentPropsWithRef | ComponentPropsWithoutRef` depending on the used symantic element
interface Props extends ComponentPropsWithRef<typeof "symantic_html_element"> {}

export function MyComponent(props: Props) {
 const { t } = useTranslation();
  return (
    <PageBase>
      <ErrorBoundary
        fallbackRender={(errorProps) => (
          <LabeledRetryErrorFallback
            {...errorProps}
            label={t("error.unableToLoadData")}
          />
        )}
      >
        <Suspense fallback={<DashboardSkeleton />}>
          <DataLoader {...props} />
        </Suspense>
      </ErrorBoundary>
    </PageBase>
  );
}

//The useage of the DataLoader component is only needed when the data is fetched asynchronously, else this should be in the main component above
function DataLoader(props:Props) {
  // destructure of props is **ALWAYS** this first line - always prop the className to the main element
  const { customProps, className, ...itemProps } = props;

  const { param1, param2 } = useParams({from: '/path/to/page/component/$param1/$param2'});
  const navigate = useNavigate();

  const {data: posts} = usePosts(params.id);

  /**
   * Component state - avoid state, state should only be used for simple things, otherwise use search params + navigate to hold the state
   */
  const [count, setCount] = useState<number>(0)

  /**
   * Callbacks
   */
  const handleDrawCallback = useCallback(handleDraw, [map])

  /**
   * Memo
   */
  const layers = useMemo(() => {
    ...
  }, [])


  /**
   * Functions
   * event callbacks should always start with `on<NameOfEvent>`
   */

   function handleSubmit() {
     ...
   }

  function handleDraw() {
    ...
  }

  // render the component
  return <symantic_html_element className={cn("all tailwind classes here make multiline when to many classes", className)} {...itemProps}>/* Your child components */</symantic_html_element>
}

```
