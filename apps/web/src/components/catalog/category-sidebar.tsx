import { getAssetUrl } from "@/lib/assets";
import { type CategoryTreeItem } from "@/services/api";
import { company } from "@/companyLayer/company.config";
import { companyStyles } from "@/companyLayer/company.styles";

type CategorySidebarVariant = "desktop" | "mobile";

type CategorySidebarProps = {
  variant?: CategorySidebarVariant;
  categoryTree: CategoryTreeItem[];
  selectedCategoryId: number | null;
  selectedProductLineId: number | null;
  expandedGroups: Record<string, boolean>;
  onToggleGroup: (groupName: string) => void;
  onSelectCategory: (categoryId: number) => void;
  onSelectProductLine: (productLineId: number) => void;
  onClearCategory: () => void;
};

export function CategorySidebar({
  variant = "desktop",
  categoryTree,
  selectedCategoryId,
  selectedProductLineId,
  expandedGroups,
  onToggleGroup,
  onSelectCategory,
  onSelectProductLine,
  onClearCategory,
}: CategorySidebarProps) {
  const isMobile = variant === "mobile";

  return (
    <aside
      className={
        isMobile
          ? "rounded-2xl border border-slate-800 bg-slate-900 p-3"
          : "rounded-2xl border border-slate-800 bg-slate-900 p-5"
      }
    >
      <div className="mb-3 flex items-center justify-between">
        <h2
          className={
            isMobile
              ? "text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
              : "text-sm font-semibold uppercase tracking-[0.2em] text-slate-400"
          }
        >
          {company.content.catalog.categoriesTitle}
        </h2>

        {(selectedCategoryId || selectedProductLineId) && (
          <button
            type="button"
            onClick={onClearCategory}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            {company.content.catalog.allCategoriesLabel}
          </button>
        )}
      </div>

      {isMobile ? (
        <div className="flex snap-x gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]">
          {categoryTree.map((category) => {
            const isSelected =
              selectedCategoryId === category.id ||
              category.children.some(
                (child) => child.id === selectedProductLineId
              );

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className={`min-w-[115px] snap-start rounded-2xl border p-2 text-center transition ${
                  isSelected
                    ? "bg-slate-800"
                    : "border-slate-800 bg-slate-950/70 hover:bg-slate-800"
                }`}
                style={
                  isSelected
                    ? {
                        borderColor: companyStyles.primaryColor,
                        color: companyStyles.primaryColor,
                      }
                    : undefined
                }
              >
                <div className="relative mx-auto mb-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-800 text-[10px] font-bold text-slate-300">
                  <span className="absolute inset-0 flex items-center justify-center">
                    {category.name.slice(0, 2)}
                  </span>

                  {category.imageUrl && (
                    <img
                      src={getAssetUrl(category.imageUrl)}
                      alt={category.name}
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                      className="relative z-10 h-full w-full object-cover"
                    />
                  )}
                </div>

                <span className="line-clamp-2 text-[11px] font-semibold leading-tight text-slate-200">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {categoryTree.map((category) => {
            const isExpanded = expandedGroups[category.name] ?? false;

            const groupIsActive =
              selectedCategoryId === category.id ||
              category.children.some(
                (child) => child.id === selectedProductLineId
              );

            return (
              <div
                key={category.id}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-2"
              >
                <button
                  type="button"
                  onClick={() => {
                    onToggleGroup(category.name);
                    onSelectCategory(category.id);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg border px-2 py-2 text-left transition ${
                    groupIsActive
                      ? "bg-slate-800 text-white"
                      : "border-transparent text-slate-300 hover:bg-slate-800"
                  }`}
                  style={
                    groupIsActive
                      ? {
                          borderColor: companyStyles.primaryColor,
                          color: companyStyles.primaryColor,
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-800 text-xs font-bold text-slate-300">
                      <span className="absolute">
                        {category.name.slice(0, 2)}
                      </span>

                      {category.imageUrl && (
                        <img
                          src={getAssetUrl(category.imageUrl)}
                          alt={category.name}
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                          className="relative z-10 h-full w-full object-cover"
                        />
                      )}
                    </div>

                    <span className="text-sm font-semibold">
                      {category.name}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400">
                    {isExpanded ? "▼" : "▶"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="ml-6 mt-2 space-y-1 border-l border-slate-800 pl-3">
                    {category.children.map((child) => {
                      const isSelected = selectedProductLineId === child.id;

                      return (
                        <button
                          key={child.id}
                          type="button"
                          onClick={() => onSelectProductLine(child.id)}
                          className={`flex w-full items-center gap-2 rounded-lg border px-2 py-1.5 text-left text-sm transition ${
                            isSelected
                              ? "bg-slate-700 text-white"
                              : "border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                          }`}
                          style={
                            isSelected
                              ? {
                                  borderColor: companyStyles.primaryColor,
                                  color: companyStyles.primaryColor,
                                }
                              : undefined
                          }
                        >
                          <span className="text-slate-600">└</span>
                          <span>{child.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}