import * as React from 'react';

import { Breakpoints } from './createBreakpoints';
import { Spacing } from './spacing';
import { StyleRules } from '../styles/StyleRules';
import { CSSProperties } from "./CSSProperties";

export interface Mixins {
  gutters: (styles?: CSSProperties) => CSSProperties;
  toolbar: CSSProperties;
  // ... use interface declaration merging to add custom mixins
}

export interface MixinsOptions extends Partial<Mixins> {
  // ... use interface declaration merging to add custom mixin options
}

export default function createMixins(
  breakpoints: Breakpoints,
  spacing: Spacing,
  mixins: MixinsOptions,
): Mixins;
