'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f3ff',
      100: '#b3d9ff',
      200: '#80bfff',
      300: '#4da6ff',
      400: '#1a8cff',
      500: '#0066cc',
      600: '#0052a3',
      700: '#003d7a',
      800: '#002952',
      900: '#001429',
    },
    dental: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    accent: {
      50: '#fef7ff',
      100: '#fce7ff',
      200: '#f8d0ff',
      300: '#f2a8ff',
      400: '#e970ff',
      500: '#dd3bff',
      600: '#c71aff',
      700: '#a800e6',
      800: '#8b00c2',
      900: '#72009e',
    },
    success: {
      50: '#f0fff4',
      100: '#c6f6d5',
      200: '#9ae6b4',
      300: '#68d391',
      400: '#48bb78',
      500: '#38a169',
      600: '#2f855a',
      700: '#276749',
      800: '#22543d',
      900: '#1a202c',
    }
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'dental',
      },
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'xl',
        transition: 'all 0.3s ease',
      },
    },
    Card: {
      baseStyle: {
        container: {
          boxShadow: 'xl',
          borderRadius: '2xl',
          border: '1px solid',
          borderColor: 'gray.100',
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        lineHeight: 'shorter',
      },
    },
  },
  styles: {
    global: {
      body: {
        fontFamily: 'Inter, system-ui, sans-serif',
        lineHeight: 'base',
      },
    },
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
