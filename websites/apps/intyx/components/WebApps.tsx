"use client";

import { motion } from "framer-motion";
import { blurIn, fadeInUp, staggerContainer, staggerContainerFast } from "@websites/shared/animations";
import { Thumbnail } from "@websites/shared/assets";
import { products } from "@/content";

const categoryOrder = ["Web", "Flutter Package", "Mobile"];

export function WebApps() {
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    items: products.items.filter((p) => p.category === cat),
  }));

  return (
    <section id="products" className="relative px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeInUp}
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent"
          >
            {products.heading}
          </motion.p>
          <motion.h2
            variants={blurIn}
            className="mb-16 text-4xl font-bold tracking-tight text-primary md:text-5xl"
          >
            Everything we ship.
            <br />
            <span className="text-muted">Web, Flutter, Mobile.</span>
          </motion.h2>

          <div className="space-y-14">
            {grouped.map(({ category, items }) => (
              <motion.div key={category} variants={fadeInUp}>
                <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
                  {category}
                </p>
                <motion.div variants={staggerContainerFast} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
}: {
  product: {
    label: string;
    status: string;
    tagline: string;
    description: string;
    href: string | null;
    color: string;
    category: string;
  };
}) {
  const isLive = product.status === "Live";
  const isPackage = product.category === "Flutter Package";

  const inner = (
    <motion.div
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-2 transition-all duration-300 group-hover:border-accent/30"
      whileHover={product.href ? { y: -3 } : undefined}
    >
      <Thumbnail color={product.color} label={product.label} className="h-28 w-full" />

      <div className="flex flex-1 flex-col p-6">
      <div className="mb-4 flex items-start justify-between">
        <span
          className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
          style={{ background: `${product.color}20`, color: product.color }}
        >
          {product.status}
        </span>
        {product.href && (
          <span
            className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            style={{ color: product.color }}
          >
            ↗
          </span>
        )}
      </div>

      <h3
        className={`mb-1 text-lg font-bold text-primary${isPackage ? " font-mono" : ""}`}
      >
        {product.label}
      </h3>
      <p className="mb-3 text-xs font-medium" style={{ color: product.color }}>
        {product.tagline}
      </p>
      <p className="text-sm leading-relaxed text-muted">{product.description}</p>

      {!isLive && (
        <div className="mt-4 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-muted/50" />
          <span className="text-xs text-muted/60">In development</span>
        </div>
      )}
      </div>
    </motion.div>
  );

  if (product.href) {
    return (
      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full"
      >
        {inner}
      </a>
    );
  }

  return <div className="group block h-full">{inner}</div>;
}
