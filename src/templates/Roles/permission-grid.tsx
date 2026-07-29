import {
  MODULE_KEYS,
  MODULE_LABELS,
  ModuleKey,
  PermissionFlags,
} from "./hooks";

export default function PermissionGrid({
  permissions,
  onChange,
  disabled,
}: {
  permissions: Record<ModuleKey, PermissionFlags>;
  onChange: (module: ModuleKey, flag: keyof PermissionFlags) => void;
  disabled?: boolean;
}) {
  return (
    <div className="overflow-x-auto border border-border-colour-light rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-xs text-gray-700">
          <tr>
            <th className="px-4 py-2">Feature</th>
            <th className="px-4 py-2 text-center">View</th>
            <th className="px-4 py-2 text-center">Create</th>
            <th className="px-4 py-2 text-center">Edit</th>
            <th className="px-4 py-2 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {MODULE_KEYS.map(moduleKey => (
            <tr key={moduleKey} className="border-t border-border-colour-light">
              <td className="px-4 py-2 font-medium text-Text-high-emphasis">
                {MODULE_LABELS[moduleKey]}
              </td>
              {(["view", "create", "edit", "delete"] as const).map(flag => (
                <td key={flag} className="px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    disabled={disabled}
                    checked={permissions[moduleKey]?.[flag] ?? false}
                    onChange={() => onChange(moduleKey, flag)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
