'use client';

import React from 'react';
import { hasPermission } from '../utils/permissions';
import { useAuth } from '../contexts/AuthContext';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredPermission: {
    module: string;
    action: string;
  };
  fallback?: React.ReactNode;
}

export default function RoleGuard({ 
  children, 
  requiredPermission, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fallback 
}: RoleGuardProps) {
  const { user } = useAuth();

  const hasAccess = hasPermission(
    user?.role || 'patient',
    requiredPermission.module,
    requiredPermission.action
  );

  if (!hasAccess) {
    // Return null to completely hide the component
    return null;
  }

  return <>{children}</>;
}
