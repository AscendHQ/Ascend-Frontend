/* eslint-disable @typescript-eslint/no-explicit-any */

type PermissionCheckboxGroupProps = {
  entityType: string;
  register: any;
  actions: ("create" | "view" | "edit" | "delete")[];
};

function PermissionCheckboxGroup({
  entityType,
  register,
  actions = ["create", "view", "edit", "delete"],
}: PermissionCheckboxGroupProps) {
  return (
    <div className="flex gap-5 flex-wrap mt-2">
      {actions.map(action => (
        <label
          htmlFor={`${entityType}_${action}`}
          className="space-x-3"
          key={action}
        >
          <span className="text-gray-800 font-medium">
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </span>
          <input
            type="checkbox"
            id={`${entityType}_${action}`}
            {...register(`${entityType}_${action}`)}
          />
        </label>
      ))}
    </div>
  );
}

export default PermissionCheckboxGroup;
