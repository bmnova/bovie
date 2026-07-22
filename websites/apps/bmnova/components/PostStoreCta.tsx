import Link from "next/link";
import { StoreBadges } from "@/components/StoreBadges";
import { storeLinks } from "@/config/store-links";
import { SOFTWARE_APPS } from "@/lib/json-ld";
import type { FirstPartyProject } from "@/lib/site";

type PostStoreCtaProps = {
  product: FirstPartyProject;
};

export function PostStoreCta({ product }: PostStoreCtaProps) {
  const app = SOFTWARE_APPS[product];
  const store =
    product === "dietpal" ||
    product === "fitvibe" ||
    product === "offer" ||
    product === "roompace"
      ? storeLinks[product]
      : null;

  return (
    <aside className="mt-12 rounded-2xl border border-border bg-primary/[0.03] px-6 py-8 text-center">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
        From BMNova
      </p>
      <h2 className="mb-2 text-xl font-bold text-primary">{app.name}</h2>
      <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
        {app.description}
      </p>
      <div className="mb-4 flex justify-center">
        <Link
          href={app.path}
          className="text-sm font-semibold text-accent transition-opacity hover:opacity-80"
        >
          Learn more about {app.name} →
        </Link>
      </div>
      {store ? (
        <StoreBadges
          googlePlayUrl={store.googlePlay}
          appStoreUrl={store.appStore}
        />
      ) : null}
    </aside>
  );
}
