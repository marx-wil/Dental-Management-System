// Role-based permissions system based on FRD specifications

export type UserRole = 'admin' | 'dentist' | 'staff' | 'patient';

export interface Permission {
  module: string;
  actions: string[];
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    { module: 'dashboard', actions: ['view'] },
    { module: 'patients', actions: ['view', 'create', 'edit', 'delete'] },
    { module: 'appointments', actions: ['view', 'create', 'edit', 'delete', 'schedule'] },
    { module: 'billing', actions: ['view', 'create', 'edit', 'delete', 'process'] },
    { module: 'inventory', actions: ['view', 'create', 'edit', 'delete', 'manage'] },
    { module: 'charting', actions: ['view', 'create', 'edit', 'delete'] },
    { module: 'reports', actions: ['view', 'generate', 'export'] },
    { module: 'notifications', actions: ['view', 'create', 'send'] },
    { module: 'settings', actions: ['view', 'edit', 'configure'] },
    { module: 'users', actions: ['view', 'create', 'edit', 'delete'] },
  ],
  dentist: [
    { module: 'dashboard', actions: ['view'] },
    { module: 'patients', actions: ['view', 'edit'] },
    { module: 'appointments', actions: ['view', 'edit'] },
    { module: 'billing', actions: ['view'] },
    { module: 'charting', actions: ['view', 'create', 'edit'] },
    { module: 'reports', actions: ['view'] },
    { module: 'notifications', actions: ['view'] },
    { module: 'settings', actions: ['view'] },
  ],
  staff: [
    { module: 'dashboard', actions: ['view'] },
    { module: 'patients', actions: ['view', 'create'] },
    { module: 'appointments', actions: ['view', 'create', 'edit', 'schedule'] },
    { module: 'billing', actions: ['view', 'create', 'edit', 'process'] },
    { module: 'inventory', actions: ['view', 'edit', 'manage'] },
    { module: 'charting', actions: ['view'] },
    { module: 'reports', actions: ['view'] },
    { module: 'notifications', actions: ['view', 'create', 'send'] },
    { module: 'settings', actions: ['view'] },
  ],
  patient: [
    { module: 'dashboard', actions: ['view'] },
    { module: 'appointments', actions: ['view', 'request'] },
    { module: 'billing', actions: ['view'] },
    { module: 'notifications', actions: ['view'] },
  ],
};

export const hasPermission = (
  userRole: UserRole,
  module: string,
  action: string
): boolean => {
  const rolePermissions = ROLE_PERMISSIONS[userRole];
  if (!rolePermissions) return false;

  const modulePermission = rolePermissions.find(p => p.module === module);
  if (!modulePermission) return false;

  return modulePermission.actions.includes(action);
};

export const canAccessModule = (userRole: UserRole, module: string): boolean => {
  return hasPermission(userRole, module, 'view');
};

export const getAccessibleModules = (userRole: UserRole): string[] => {
  const rolePermissions = ROLE_PERMISSIONS[userRole];
  if (!rolePermissions) return [];

  return rolePermissions.map(p => p.module);
};

// Menu items configuration with role restrictions
export interface MenuItem {
  icon: string;
  label: string;
  href: string;
  requiredRole?: UserRole[];
  requiredPermission?: { module: string; action: string };
}

export const getMenuItemsForRole = (userRole: UserRole): MenuItem[] => {
  const allMenuItems: MenuItem[] = [
    { 
      icon: 'FiHome', 
      label: 'Dashboard', 
      href: '/dashboard',
      requiredPermission: { module: 'dashboard', action: 'view' }
    },
    { 
      icon: 'FiUsers', 
      label: 'Patients', 
      href: '/patients',
      requiredPermission: { module: 'patients', action: 'view' }
    },
    { 
      icon: 'FiCalendar', 
      label: 'Appointments', 
      href: '/appointments',
      requiredPermission: { module: 'appointments', action: 'view' }
    },
    { 
      icon: 'FiDollarSign', 
      label: 'Billing', 
      href: '/billing',
      requiredPermission: { module: 'billing', action: 'view' }
    },
    { 
      icon: 'FiPackage', 
      label: 'Inventory', 
      href: '/inventory',
      requiredPermission: { module: 'inventory', action: 'view' }
    },
    { 
      icon: 'FiFileText', 
      label: 'Charting', 
      href: '/charting',
      requiredPermission: { module: 'charting', action: 'view' }
    },
    { 
      icon: 'FiBarChart', 
      label: 'Reports', 
      href: '/reports',
      requiredPermission: { module: 'reports', action: 'view' }
    },
    { 
      icon: 'FiMessageSquare', 
      label: 'Notifications', 
      href: '/notifications',
      requiredPermission: { module: 'notifications', action: 'view' }
    },
    { 
      icon: 'FiUserCheck', 
      label: 'User Management', 
      href: '/users',
      requiredPermission: { module: 'users', action: 'view' }
    },
    { 
      icon: 'FiSettings', 
      label: 'Settings', 
      href: '/settings',
      requiredPermission: { module: 'settings', action: 'view' }
    },
  ];

  return allMenuItems.filter(item => {
    if (!item.requiredPermission) return true;
    return hasPermission(userRole, item.requiredPermission.module, item.requiredPermission.action);
  });
};
