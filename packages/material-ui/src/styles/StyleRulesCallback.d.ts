import { Theme } from './createMuiTheme';
import { StyleRules } from './StyleRules';

export type StyleRulesCallback<ClassKey extends string = string> = (
  theme: Theme,
) => StyleRules<ClassKey>;
