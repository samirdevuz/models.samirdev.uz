"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowIcon, SearchIcon } from "@/components/icons";
import type { ModelRecord } from "@/lib/models";

const filters = [
  { id: "all", label: "All models" },
  { id: "animated", label: "Animated" },
  { id: "animals", label: "Animals" },
  { id: "props", label: "Props" },
  { id: "characters", label: "Characters" },
  { id: "vehicles", label: "Vehicles" },
] as const;

type CatalogModel = Pick<
  ModelRecord,
  | "animated"
  | "category"
  | "id"
  | "index"
  | "slug"
  | "thumbnail"
  | "title"
  | "year"
>;

export function ModelCatalog({ models }: { models: CatalogModel[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [query, setQuery] = useState("");

  const visibleModels = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return models.filter((model) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "animated" && model.animated) ||
        model.category === filter;
      const matchesQuery =
        !normalizedQuery ||
        model.title.toLowerCase().includes(normalizedQuery) ||
        model.category.toLowerCase().includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [filter, models, query]);

  return (
    <>
      <div className="catalog-tools">
        <div className="filter-row" aria-label="Filter models">
          {filters.map((item) => (
            <button
              className="filter-button"
              data-active={filter === item.id}
              key={item.id}
              onClick={() => setFilter(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className="search-box">
          <SearchIcon />
          <span className="sr-only">Search models</span>
          <input
            type="search"
            placeholder="Search models…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <div className="model-grid" aria-live="polite">
        {visibleModels.map((model) => (
          <article className="model-card" key={model.id}>
            <Link
              href={`/models/${model.slug}`}
              aria-label={`Open ${model.title}`}
              prefetch={false}
            >
              <div className="model-thumb">
                <Image
                  src={model.thumbnail}
                  alt={`${model.title} preview on Sketchfab`}
                  fill
                  sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 33vw"
                />
                <span className="model-index">
                  M_{String(model.index).padStart(3, "0")}
                </span>
                <span className="review-badge">source review</span>
              </div>
            </Link>
            <div className="model-card-body">
              <div className="model-meta">
                <span>{model.category}</span>
                <span>{model.year}</span>
              </div>
              <h3>
                <Link href={`/models/${model.slug}`} prefetch={false}>
                  {model.title}
                </Link>
              </h3>
              <div className="model-card-footer">
                <div className="model-badges">
                  <span className="mini-badge">Blockbench</span>
                  {model.animated ? (
                    <span className="mini-badge mini-badge-neutral">Animated</span>
                  ) : null}
                </div>
                <Link
                  className="model-link"
                  href={`/models/${model.slug}`}
                  prefetch={false}
                >
                  Inspect
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </article>
        ))}

        {visibleModels.length === 0 ? (
          <div className="empty-results">
            No models match this search. Try a different name or filter.
          </div>
        ) : null}
      </div>
    </>
  );
}
