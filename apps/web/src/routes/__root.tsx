import type { QueryClient } from "@tanstack/react-query";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useLocation,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Button, buttonVariants } from "@relaxason/ui";
import { startAnalytics, trackPageView } from "../analytics";
import notFoundImage from "../assets/error404.svg";
import { CookieConsent } from "../components/cookie-consent";
import { Navbar } from "../components/navbar";
import { PageShell } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { SectionTitle } from "../components/section-title";
import { usePageMeta } from "../page-meta";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootLayout,
    errorComponent: ErrorPage,
    notFoundComponent: NotFoundPage,
  },
);

function RootLayout() {
  const { pathname, searchStr } = useLocation();

  useEffect(() => {
    startAnalytics();
  }, []);
  useEffect(() => {
    trackPageView(pathname + searchStr);
  }, [pathname, searchStr]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background px-6 pt-20 pb-6">
        <Outlet />
      </main>
      <CookieConsent />
    </div>
  );
}

function ErrorPage({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  const queryErrors = useQueryErrorResetBoundary();
  usePageMeta({ title: "Une erreur est survenue", noindex: true });
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageShell>
      <div className="py-20 text-center">
        <h1 className="h1 text-brand-700">Une erreur est survenue</h1>
        <p className="mt-2 text-body">Merci de réessayer.</p>
        <Button
          variant="cta"
          className="mt-6"
          onClick={() => {
            queryErrors.reset();
            reset();
            void router.invalidate();
          }}
        >
          Réessayer
        </Button>
      </div>
    </PageShell>
  );
}

// The server answers 404 for an address that matches no route (routes.json);
// a route's own "not found", such as a missing record, still answers 200, so
// the page also tells search engines not to index it.
function NotFoundPage() {
  usePageMeta({ title: "Page non trouvée", noindex: true });
  return (
    <PageShell>
      <Reveal className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        <div className="flex items-center justify-center">
          <img
            src={notFoundImage}
            alt=""
            className="mx-auto h-auto max-w-full transition-transform duration-300 hover:scale-[1.03]"
          />
        </div>
        <div className="mt-6 flex flex-col">
          <SectionTitle as="h1" className="h2 self-start">
            Oups... Quelque chose ne va pas !
          </SectionTitle>
          <p className="mt-6 mb-6 p-2.5 text-lg text-body">
            Cette page n'existe pas ou a été déplacée.
          </p>
          <Link
            to="/"
            className={buttonVariants({ variant: "cta", className: "mt-2.5" })}
          >
            Retour sur la page d'accueil
          </Link>
        </div>
      </Reveal>
    </PageShell>
  );
}
