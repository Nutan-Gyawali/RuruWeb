/**
 * @file icons.tsx
 * @input Uses lucide-react icon components, IconRegistry type
 * @output Exports gardenIconRegistry for the garden theme
 * @position Icon configuration for the garden theme; consumed by gardenTheme.ts
 *
 * Maps semantic icon names to Lucide icon components.
 * These icons are bundled with the theme, not with @astryxdesign/core.
 */

// @ts-expect-error — unused under the app's automatic JSX runtime, but
// required by `astryx theme build`'s jiti loader, which transforms this
// file's JSX with the classic runtime (needs `React` in scope).
import React from 'react';
import type {IconRegistry} from '@astryxdesign/core/Icon';

import {
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Calendar,
  Clock,
  ExternalLink,
  Menu,
  MoreHorizontal,
  Search,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Filter,
  EyeOff,
  Columns,
  Copy,
  CheckCheck,
  Wrench,
  Square,
  Mic,
} from 'lucide-react';

const iconProps = {
  size: '1em',
  'aria-hidden': true as const,
};

export const gardenIconRegistry: IconRegistry = {
  close: <X {...iconProps} />,
  chevronDown: <ChevronDown {...iconProps} />,
  chevronLeft: <ChevronLeft {...iconProps} />,
  chevronRight: <ChevronRight {...iconProps} />,
  check: <Check {...iconProps} />,
  success: <CheckCircle {...iconProps} />,
  error: <XCircle {...iconProps} />,
  warning: <AlertTriangle {...iconProps} />,
  info: <Info {...iconProps} />,
  calendar: <Calendar {...iconProps} />,
  clock: <Clock {...iconProps} />,
  externalLink: <ExternalLink {...iconProps} />,
  menu: <Menu {...iconProps} />,
  moreHorizontal: <MoreHorizontal {...iconProps} />,
  search: <Search {...iconProps} />,
  arrowUp: <ArrowUp {...iconProps} />,
  arrowDown: <ArrowDown {...iconProps} />,
  arrowsUpDown: <ArrowUpDown {...iconProps} />,
  funnel: <Filter {...iconProps} />,
  eyeSlash: <EyeOff {...iconProps} />,
  viewColumns: <Columns {...iconProps} />,
  copy: <Copy {...iconProps} />,
  checkDouble: <CheckCheck {...iconProps} />,
  wrench: <Wrench {...iconProps} />,
  stop: <Square {...iconProps} />,
  microphone: <Mic {...iconProps} />,
};
