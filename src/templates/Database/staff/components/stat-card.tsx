export interface StatCardProps {
  heading: string;
  items: {
    name: string;
    value: number;
  }[];
}

export function StatCard({ heading, items }: StatCardProps) {
  return (
    <div className="w-full min-w-0 space-y-2 rounded-xl border border-border-colour-light bg-white p-4">
      <h5 className="text-sm text-gray-800 font-medium">{heading}</h5>
      <div className="flex flex-wrap items-end justify-between gap-3">
        {items.map(item => {
          return (
            <div key={`stat-for-${item.name}}`} className="flex items-center">
              <p className=" uppercase mr-2 ">{item.name}</p>
              <p className="text-Text-high-emphasis text-2xl font-bold">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
