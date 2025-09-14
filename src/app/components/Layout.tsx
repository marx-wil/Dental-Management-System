'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import DashboardLayout from './DashboardLayout';
import LandingNavigation from './landing/LandingNavigation';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();

  // Don't show dashboard layout on landing page or auth pages
  const hideDashboardLayout = !user;

  if (hideDashboardLayout) {
    return (
      <Box minH="100vh">
        <LandingNavigation />
        <Box pt={16}>{children}</Box>
      </Box>
    );
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
