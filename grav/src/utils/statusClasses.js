/**
 * Static Tailwind class maps — avoids dynamic class construction
 * that would be tree-shaken in production builds.
 *
 * Usage:
 *   import { badgeClass, bgClass, textClass } from '@/utils/statusClasses';
 *   className={badgeClass(color)}   // → 'bg-brand-success/10 text-brand-success'
 */

const badge = {
  success: 'bg-brand-success/10 text-brand-success',
  danger:  'bg-brand-danger/10 text-brand-danger',
  warning: 'bg-brand-warning/10 text-brand-warning',
  info:    'bg-brand-info/10 text-brand-info',
  pending: 'bg-brand-text-muted/10 text-brand-text-muted',
};

const badgeSolid = {
  success: 'bg-brand-success/90 text-white',
  danger:  'bg-brand-danger/90 text-white',
  warning: 'bg-brand-warning/90 text-white',
  info:    'bg-brand-info/90 text-white',
  pending: 'bg-brand-text-muted/90 text-white',
};

const border = {
  success: 'border-brand-success/20',
  danger:  'border-brand-danger/20',
  warning: 'border-brand-warning/20',
  info:    'border-brand-info/20',
  pending: 'border-brand-text-muted/20',
};

const bgLight = {
  success: 'bg-brand-success/10',
  danger:  'bg-brand-danger/10',
  warning: 'bg-brand-warning/10',
  info:    'bg-brand-info/10',
  pending: 'bg-brand-text-muted/10',
};

const text = {
  success: 'text-brand-success',
  danger:  'text-brand-danger',
  warning: 'text-brand-warning',
  info:    'text-brand-info',
  pending: 'text-brand-text-muted',
};

const FALLBACK = 'bg-gray-100 text-gray-600';

/** bg + text for badges (e.g. 'bg-brand-success/10 text-brand-success') */
export const badgeClass = (color) => badge[color] || FALLBACK;

/** solid bg + white text for badges */
export const badgeSolidClass = (color) => badgeSolid[color] || FALLBACK;

/** border color */
export const borderClass = (color) => border[color] || '';

/** light bg only */
export const bgLightClass = (color) => bgLight[color] || '';

/** text color only */
export const textClass = (color) => text[color] || '';
