'use client';

import React from 'react';
import { Box, Text, VStack, Icon } from '@chakra-ui/react';
import { FiLock } from 'react-icons/fi';
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
