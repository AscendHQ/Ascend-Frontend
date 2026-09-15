export interface StatCardProps {
  heading: string;
  items: {
    name: string;
    value: number;
  }[];
}

export function StatCard({ heading, items }: StatCardProps) {
  return (
    <div className="w-full min-w-0 space-y-3 rounded-lg border border-border-colour-light bg-white p-4">
      <h5 className="text-sm font-medium text-Text-meduim-emphasis">
        {heading}
      </h5>
      <div className="flex flex-wrap items-end justify-between gap-3">
        {items.map(item => {
          return (
            <div key={`stat-for-${item.name}}`}>
              <p className="text-xs font-medium uppercase text-Text-meduim-emphasis">
                {item.name}
              </p>
              <p className="mt-1 text-2xl font-semibold text-Text-high-emphasis">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
