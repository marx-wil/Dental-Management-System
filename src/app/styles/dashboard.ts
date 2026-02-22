/**
 * Shared dark theme style constants for all dashboard pages.
 * Import these into any dashboard page to maintain consistency.
 */

/** Glass-morphism dark card wrapper */
export const darkCard = {
  bg: 'rgba(15,22,41,0.7)',
  border: '1px solid',
  borderColor: 'rgba(255,255,255,0.07)',
  backdropFilter: 'blur(12px)',
  borderRadius: '2xl',
  boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
  transition: 'all 0.25s ease',
  _hover: {
    borderColor: 'rgba(255,255,255,0.12)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
  },
} as const;

/** Compact card (no hover state, used inside modals) */
export const darkCardFlat = {
  bg: 'rgba(15,22,41,0.7)',
  border: '1px solid',
  borderColor: 'rgba(255,255,255,0.07)',
  borderRadius: '2xl',
} as const;

/** Dark input/select/textarea */
export const darkInput = {
  bg: 'rgba(255,255,255,0.05)',
  border: '1.5px solid',
  borderColor: 'rgba(255,255,255,0.1)',
  color: 'white',
  borderRadius: 'xl',
  _focus: {
    bg: 'rgba(6,182,212,0.06)',
    borderColor: 'cyan.500',
    boxShadow: '0 0 0 3px rgba(6,182,212,0.15)',
  },
  _hover: { borderColor: 'rgba(255,255,255,0.2)' },
  _placeholder: { color: 'whiteAlpha.300' },
} as const;

/** Dark modal ModalContent */
export const darkModalContent = {
  bg: '#0f1629',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
  borderRadius: '2xl',
} as const;

/** Dark ModalOverlay */
export const darkOverlay = {
  bg: 'blackAlpha.800',
  backdropFilter: 'blur(6px)',
} as const;

/** Table header row */
export const darkTh = {
  bg: 'rgba(255,255,255,0.03)',
  color: 'whiteAlpha.500',
  borderColor: 'rgba(255,255,255,0.06)',
  fontSize: 'xs',
  fontWeight: '700',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  py: 3,
} as const;

/** Table data cell */
export const darkTd = {
  color: 'whiteAlpha.800',
  borderColor: 'rgba(255,255,255,0.05)',
  fontSize: 'sm',
  py: 4,
} as const;

/** Table row */
export const darkTr = {
  _hover: { bg: 'rgba(255,255,255,0.03)' },
  transition: 'background 0.15s ease',
} as const;

/** Form label */
export const darkLabel = {
  fontSize: 'xs',
  fontWeight: '600',
  color: 'whiteAlpha.500',
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  mb: 2,
} as const;

/** Page heading */
export const pageHeading = {
  fontSize: { base: 'xl', md: '2xl' },
  fontWeight: '800',
  color: 'white',
  letterSpacing: '-0.02em',
} as const;

/** Page subtitle */
export const pageSubtitle = {
  fontSize: 'sm',
  color: 'whiteAlpha.500',
} as const;

/** Divider */
export const darkDivider = {
  borderColor: 'rgba(255,255,255,0.07)',
} as const;

/** Search input group wrapper props */
export const darkSearchInput = {
  ...darkInput,
  pl: 10,
} as const;

/** Inline tag-style badge helpers */
export const statusColors: Record<string, { bg: string; color: string; border: string }> = {
  active:    { bg: 'rgba(16,185,129,0.12)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
  inactive:  { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
  confirmed: { bg: 'rgba(16,185,129,0.12)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
  scheduled: { bg: 'rgba(6,182,212,0.12)',   color: '#22d3ee', border: 'rgba(6,182,212,0.3)' },
  completed: { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
  cancelled: { bg: 'rgba(244,63,94,0.12)',   color: '#fb7185', border: 'rgba(244,63,94,0.3)' },
  'no-show': { bg: 'rgba(245,158,11,0.12)',  color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  paid:      { bg: 'rgba(16,185,129,0.12)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
  overdue:   { bg: 'rgba(244,63,94,0.12)',   color: '#fb7185', border: 'rgba(244,63,94,0.3)' },
  draft:     { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
  sent:      { bg: 'rgba(6,182,212,0.12)',   color: '#22d3ee', border: 'rgba(6,182,212,0.3)' },
  'in-stock':      { bg: 'rgba(16,185,129,0.12)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
  'low-stock':     { bg: 'rgba(245,158,11,0.12)',  color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  'out-of-stock':  { bg: 'rgba(244,63,94,0.12)',   color: '#fb7185', border: 'rgba(244,63,94,0.3)' },
  expired:         { bg: 'rgba(139,92,246,0.12)',  color: '#c4b5fd', border: 'rgba(139,92,246,0.3)' },
};
