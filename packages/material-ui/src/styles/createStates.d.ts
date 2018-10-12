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

type SurfaceStyles =
  | 'transparent' // shorthand for { opacity: 0 }
  | {
      backgroundColor: string;
      opacity: number;
    };

/**
 *
 * @param surface - color and opacity of the surface on which the overlays are applied
 * @param overlays
 */
export function mix(surface: SurfaceStyles, overlays: SurfaceStyles[]): SurfaceStyles;

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
