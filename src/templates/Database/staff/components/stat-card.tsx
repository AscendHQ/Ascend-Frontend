export interface StatCardProps {
  heading: string;
  items: {
    name: string;
    value: number;
  }[];
}

export function StatCard({ heading, items }: StatCardProps) {
  return (
    <div className="bg-white min-w-[330px] xl:flex-1 xl:min-w-fit border rounded-xl border-border-colour-light p-4 space-y-2">
      <h5 className="text-sm text-gray-800 font-medium">{heading}</h5>
      <div className="flex items-end justify-between">
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
