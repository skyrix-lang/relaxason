import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createQueryClient } from "./query-client";
import { routeTree } from "./routeTree.gen";
import "@fontsource/source-sans-3/400.css";
import "@fontsource/source-sans-3/500.css";
import "@fontsource/source-sans-3/600.css";
import "@fontsource/josefin-sans/600.css";
import "./styles.css";

const queryClient = createQueryClient(() => {
  const { pathname, search } = window.location;
  // Several requests can fail at once; the first one has already redirected.
  if (pathname === "/sign-in") return;
  void router.navigate({
    to: "/sign-in",
    search: { returnTo: pathname + search },
  });
});

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: "intent",
  // TanStack Query caches the data; the router only decides when to load it.
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  // Section links (/soins#tarifs) glide to their section.
  defaultHashScrollIntoView: { behavior: "smooth" },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
