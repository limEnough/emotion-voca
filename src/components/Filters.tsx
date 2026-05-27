import { useMemo } from "react";
import { DIFFICULTY_LABEL } from "@/lib/category-colors";
import type { Difficulty, EmotionCategory } from "@/types/domain";
import { cn } from "@/lib/utils";

type CategoryFilterProps = {
  categories: EmotionCategory[];
  active: string | "all";
  onChange: (slug: string | "all") => void;
};

export function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <FilterPill
        active={active === "all"}
        onClick={() => onChange("all")}
        label="전체"
      />
      {categories.map((cat) => {
        const isActive = active === cat.slug;
        return (
          <FilterPill
            key={cat.slug}
            active={isActive}
            onClick={() => onChange(cat.slug)}
            label={cat.name_ko}
          />
        );
      })}
    </div>
  );
}

type DifficultyFilterProps = {
  active: Difficulty | "all";
  onChange: (d: Difficulty | "all") => void;
  counts?: Record<string, number>;
};

export function DifficultyFilter({
  active,
  onChange,
  counts,
}: DifficultyFilterProps) {
  const items: Array<{ key: Difficulty | "all"; label: string }> = useMemo(
    () => [
      { key: "all", label: "전체" },
      { key: "beginner", label: DIFFICULTY_LABEL.beginner.ko },
      { key: "intermediate", label: DIFFICULTY_LABEL.intermediate.ko },
      { key: "advanced", label: DIFFICULTY_LABEL.advanced.ko },
    ],
    [],
  );

  return (
    <div className="inline-flex items-center gap-1 flex-wrap">
      {items.map((item, idx) => {
        const isActive = active === item.key;
        return (
          <div key={item.key} className="inline-flex items-center">
            {idx > 0 && (
              <span
                className="px-2 text-grey-300 text-[12px]"
                aria-hidden="true"
              >
                ·
              </span>
            )}
            <button
              onClick={() => onChange(item.key)}
              className={cn(
                "focus-ring text-[13px] tracking-tight whitespace-nowrap transition-colors py-1 rounded-sm",
                isActive
                  ? "font-bold text-grey-900"
                  : "font-medium text-grey-500",
              )}
            >
              {item.label}
              {counts && counts[item.key] !== undefined && (
                <span
                  className={cn(
                    "ml-1",
                    isActive
                      ? "font-bold text-toss-500"
                      : "font-medium text-grey-500",
                  )}
                >
                  {counts[item.key]}
                </span>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "focus-ring px-4 py-2 text-[14px] font-semibold rounded-full transition-all tracking-tight",
        active
          ? "bg-grey-900 text-white"
          : "bg-grey-100 text-grey-700 hover:bg-grey-200",
      )}
    >
      {label}
    </button>
  );
}
