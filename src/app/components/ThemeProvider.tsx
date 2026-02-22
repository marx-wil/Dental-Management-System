'use client';

import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    // Primary: Cyan — trust, clean, medical
    cyan: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
    // Secondary: Violet — premium, modern
    violet: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
    // Emerald — success, positive trends
    emerald: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
    // Rose — alerts, errors
    rose: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fb7185',
      500: '#f43f5e',
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337',
    },
    // Amber — warnings
    amber: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    // Navy — dark backgrounds
    navy: {
      50: '#f0f4ff',
      100: '#dce6ff',
      200: '#baccff',
      300: '#85a8ff',
      400: '#4a78ff',
      500: '#1e4dff',
      600: '#0a2de0',
      700: '#0920b3',
      800: '#0c1a85',
      900: '#080d1a',
      950: '#04060f',
    },
    // Slate — neutral/surface
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
  },

  fonts: {
    heading: '"Inter", system-ui, -apple-system, sans-serif',
    body: '"Inter", system-ui, -apple-system, sans-serif',
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },

  radii: {
    none: '0',
    sm: '0.25rem',
    base: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.25rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
    md: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)',
    lg: '0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.05)',
    xl: '0 20px 25px rgba(0,0,0,0.08), 0 8px 10px rgba(0,0,0,0.04)',
    '2xl': '0 25px 50px rgba(0,0,0,0.12)',
    'cyan-glow': '0 0 20px rgba(6, 182, 212, 0.35), 0 0 40px rgba(6, 182, 212, 0.15)',
    'cyan-glow-sm': '0 0 12px rgba(6, 182, 212, 0.4)',
    'violet-glow': '0 0 20px rgba(139, 92, 246, 0.35), 0 0 40px rgba(139, 92, 246, 0.15)',
    'card': '0 1px 3px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.06)',
    'card-hover': '0 4px 6px rgba(15, 23, 42, 0.04), 0 20px 40px rgba(15, 23, 42, 0.1)',
  },

  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'xl',
        transition: 'all 0.25s ease',
        _focus: { boxShadow: 'none', outline: 'none' },
      },
      variants: {
        solid: (props: { colorScheme: string }) => ({
          bg: `${props.colorScheme}.500`,
          color: 'white',
          _hover: {
            bg: `${props.colorScheme}.600`,
            transform: 'translateY(-2px)',
            boxShadow: `${props.colorScheme === 'cyan' ? 'cyan-glow-sm' : 'lg'}`,
          },
          _active: { transform: 'translateY(0px)' },
        }),
        outline: (props: { colorScheme: string }) => ({
          border: '2px solid',
          borderColor: `${props.colorScheme}.500`,
          color: `${props.colorScheme}.400`,
          bg: 'transparent',
          _hover: {
            bg: `rgba(6,182,212,0.08)`,
            transform: 'translateY(-2px)',
          },
          _active: { transform: 'translateY(0px)' },
        }),
        ghost: {
          color: 'whiteAlpha.700',
          _hover: { bg: 'rgba(255,255,255,0.07)', color: 'white' },
        },
        gradient: {
          background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
          color: 'white',
          fontWeight: '600',
          _hover: {
            background: 'linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 30px rgba(6, 182, 212, 0.4)',
          },
          _active: { transform: 'translateY(0px)' },
        },
      },
      defaultProps: {
        colorScheme: 'cyan',
      },
    },

    Card: {
      baseStyle: {
        container: {
          borderRadius: '2xl',
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.07)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
          bg: 'rgba(15,22,41,0.7)',
          backdropFilter: 'blur(12px)',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          _hover: {
            borderColor: 'rgba(255,255,255,0.12)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          },
        },
      },
    },

    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: 'xl',
            border: '1.5px solid',
            borderColor: 'rgba(255,255,255,0.1)',
            bg: 'rgba(255,255,255,0.05)',
            color: 'white',
            fontSize: 'sm',
            _focus: {
              borderColor: 'cyan.500',
              bg: 'rgba(6,182,212,0.06)',
              boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.15)',
            },
            _hover: { borderColor: 'rgba(255,255,255,0.2)' },
            _placeholder: { color: 'whiteAlpha.300' },
          },
        },
        filled: {
          field: {
            borderRadius: 'xl',
            bg: 'rgba(255,255,255,0.05)',
            border: '1.5px solid transparent',
            color: 'white',
            _focus: {
              bg: 'rgba(6,182,212,0.06)',
              borderColor: 'cyan.500',
              boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.15)',
            },
            _hover: { bg: 'rgba(255,255,255,0.08)' },
            _placeholder: { color: 'whiteAlpha.300' },
          },
        },
      },
      defaultProps: { variant: 'outline' },
    },

    Select: {
      variants: {
        outline: {
          field: {
            borderRadius: 'xl',
            border: '1.5px solid',
            borderColor: 'rgba(255,255,255,0.1)',
            bg: 'rgba(255,255,255,0.05)',
            color: 'white',
            fontSize: 'sm',
            colorScheme: 'dark',
            _focus: {
              borderColor: 'cyan.500',
              bg: 'rgba(6,182,212,0.06)',
              boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.15)',
            },
            _hover: { borderColor: 'rgba(255,255,255,0.2)' },
          },
        },
      },
      defaultProps: { variant: 'outline' },
    },

    Textarea: {
      variants: {
        outline: {
          borderRadius: 'xl',
          border: '1.5px solid',
          borderColor: 'rgba(255,255,255,0.1)',
          bg: 'rgba(255,255,255,0.05)',
          color: 'white',
          fontSize: 'sm',
          _focus: {
            borderColor: 'cyan.500',
            bg: 'rgba(6,182,212,0.06)',
            boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.15)',
          },
          _hover: { borderColor: 'rgba(255,255,255,0.2)' },
          _placeholder: { color: 'whiteAlpha.300' },
        },
      },
      defaultProps: { variant: 'outline' },
    },

    Badge: {
      baseStyle: {
        borderRadius: 'full',
        fontWeight: '600',
        fontSize: 'xs',
        px: 3,
        py: 1,
        textTransform: 'none',
        letterSpacing: 'normal',
      },
    },

    Heading: {
      baseStyle: {
        fontWeight: '700',
        color: 'white',
        lineHeight: '1.2',
        letterSpacing: '-0.02em',
      },
    },

    Text: {
      baseStyle: {
        color: 'whiteAlpha.800',
      },
    },

    FormLabel: {
      baseStyle: {
        fontSize: 'xs',
        fontWeight: '600',
        color: 'whiteAlpha.500',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        mb: 2,
      },
    },

    Divider: {
      baseStyle: {
        borderColor: 'rgba(255,255,255,0.07)',
      },
    },

    Modal: {
      baseStyle: {
        overlay: {
          bg: 'blackAlpha.800',
          backdropFilter: 'blur(6px)',
        },
        dialog: {
          bg: '#0f1629',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          borderRadius: '2xl',
        },
        header: {
          color: 'white',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          pb: 4,
        },
        body: {
          color: 'whiteAlpha.800',
        },
        footer: {
          borderTop: '1px solid rgba(255,255,255,0.07)',
          pt: 4,
        },
        closeButton: {
          color: 'whiteAlpha.600',
          _hover: { bg: 'rgba(255,255,255,0.07)', color: 'white' },
        },
      },
    },

    Menu: {
      baseStyle: {
        list: {
          bg: '#0f1629',
          borderRadius: '2xl',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          py: 2,
          px: 1,
          overflow: 'hidden',
        },
        item: {
          bg: 'transparent',
          borderRadius: 'xl',
          fontSize: 'sm',
          fontWeight: '500',
          color: 'whiteAlpha.800',
          px: 3,
          py: 2,
          _hover: { bg: 'rgba(255,255,255,0.07)', color: 'white' },
          _focus: { bg: 'rgba(255,255,255,0.07)' },
        },
        divider: {
          borderColor: 'rgba(255,255,255,0.07)',
        },
      },
    },

    Table: {
      variants: {
        simple: {
          th: {
            fontSize: 'xs',
            fontWeight: '700',
            color: 'whiteAlpha.500',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            borderColor: 'rgba(255,255,255,0.06)',
            bg: 'rgba(255,255,255,0.03)',
            py: 3,
          },
          td: {
            fontSize: 'sm',
            borderColor: 'rgba(255,255,255,0.05)',
            py: 4,
            color: 'whiteAlpha.800',
          },
          tbody: {
            tr: {
              _hover: { bg: 'rgba(255,255,255,0.03)' },
              transition: 'background 0.15s ease',
            },
          },
        },
      },
    },

    Popover: {
      baseStyle: {
        content: {
          bg: '#0f1629',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          borderRadius: '2xl',
          color: 'whiteAlpha.800',
        },
        arrow: {
          bg: '#0f1629',
        },
        header: {
          borderColor: 'rgba(255,255,255,0.07)',
          color: 'white',
        },
        body: {
          color: 'whiteAlpha.800',
        },
        footer: {
          borderColor: 'rgba(255,255,255,0.07)',
        },
      },
    },

    Tooltip: {
      baseStyle: {
        bg: '#1a2744',
        color: 'white',
        borderRadius: 'xl',
        px: 3,
        py: 2,
        fontSize: 'xs',
        fontWeight: '500',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.08)',
      },
    },
  },

  styles: {
    global: {
      body: {
        fontFamily: '"Inter", system-ui, sans-serif',
        bg: '#080d1a',
        color: 'white',
        lineHeight: 'base',
        colorScheme: 'dark',
      },
      '*': {
        boxSizing: 'border-box',
      },
      '::selection': {
        bg: 'rgba(6,182,212,0.3)',
        color: 'white',
      },
      /* Force native select dropdown to dark theme */
      'select, select option': {
        colorScheme: 'dark',
        backgroundColor: '#0f1629 !important',
        color: '#e2e8f0 !important',
      },
      'select option:hover, select option:focus, select option:checked': {
        backgroundColor: '#1a2744 !important',
        color: '#ffffff !important',
      },
    },
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
}
