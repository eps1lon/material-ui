/**
 * alias for concrete color values
 */
type SurfaceType = 'surface' | 'primary' | 'secondary' | 'mixed';
type VisibleState =
  | 'disabled'
  | 'hover'
  | 'focus'
  | 'selected'
  | 'activated'
  | 'pressed'
  | 'dragged';

interface SurfaceStyles {
  backgroundColor: string;
  opacity: number;
}

declare const TRANSPARENT: SurfaceStyles;

/**
 * pre computed values when creating the theme. For individual colors use computeStyles
 */
type StaticVisibleStates = Record<SurfaceType, Record<VisibleState, SurfaceStyles>>;

/**
 * helper function. Basically `mix` but with readable semamtics
 *
 * @param surface
 * @param states
 */
export function computeStyles(surface: SurfaceStyles, states: VisibleState[]): SurfaceStyles;

export interface States {
  computeStyles: typeof computeStyles;
  types: StaticVisibleStates;
}
