import * as CSS from 'csstype';

export interface CSSProperties extends CSS.Properties<number | string> {
  // Allow pseudo selectors and media queries
  [k: string]: CSS.Properties<number | string>[keyof CSS.Properties] | CSSProperties;
}
