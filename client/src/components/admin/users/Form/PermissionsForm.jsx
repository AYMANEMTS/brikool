import React, {useEffect, useState} from 'react';

function PermissionsForm({setValue,user}) {
  const [selectedPermissions, setSelectedPermissions] = useState(user?.permissions || []);
  const permissions = [
    'create_jobs',
    'edit_jobs',
    'delete_jobs',
    'create_category',
    'edit_category',
    'delete_category',
    'create_users',
    'view_users',
    'edit_users',
    'delete_users',
    'edit_permissions',
    'delete_comments',
  ];

  const handleToggle = (permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((item) => item !== permission) // Remove if already selected
        : [...prev, permission] // Add if not selected
    );
  };

  useEffect(() => {
    if (selectedPermissions){
      setValue('permissions',selectedPermissions);
    }
  }, [selectedPermissions]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Permissions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {permissions.map((permission) => (
          <button
            key={permission}
            onClick={() => handleToggle(permission)}
            className={`px-4 py-2 rounded border ${
              selectedPermissions.includes(permission)
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-gray-200 text-gray-800 border-gray-300'
            } hover:shadow-md transition`}
          >
            {permission.replace('_', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PermissionsForm;
