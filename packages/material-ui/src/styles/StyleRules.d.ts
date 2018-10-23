import { CSSProperties } from './CSSProperties';
/**
 * This is basically the API of JSS. It defines a Map<string, CSS>,
 * where
 *
 * - the `keys` are the class (names) that will be created
 * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
 */
export type StyleRules<ClassKey extends string = string> = Record<ClassKey, CSSProperties>;
