import * as React from 'react';
import { PropsOf } from '../PropsOf';
import { Omit } from '../Omit';
import { PropInjector } from '../PropInjector';
import { Theme } from './createMuiTheme';
import * as CSS from 'csstype';
import * as JSS from 'jss';
import { StyleRules } from './StyleRules';
import { StyleRulesCallback } from './StyleRulesCallback';
import { StyledComponentProps } from './StyledComponentProps';
import { ClassNameMap } from './ClassNameMap';

export { StyleRules, StyleRulesCallback };

export interface StylesCreator {
  create(theme: Theme, name: string): StyleRules;
  options: { index: number };
  themingEnabled: boolean;
}

export interface WithStylesOptions<ClassKey extends string = string>
  extends JSS.CreateStyleSheetOptions<ClassKey> {
  flip?: boolean;
  withTheme?: boolean;
  name?: string;
}

export type WithStyles<
  T extends string | StyleRules | StyleRulesCallback = string,
  IncludeTheme extends boolean | undefined = false
> = (IncludeTheme extends true ? { theme: Theme } : {}) & {
  classes: ClassNameMap<
    T extends string
      ? T
      : T extends StyleRulesCallback<infer K> ? K : T extends StyleRules<infer K> ? K : never
  >;
  innerRef?: React.Ref<any> | React.RefObject<any>;
};

export default function withStyles<
  ClassKey extends string,
  Options extends WithStylesOptions<ClassKey> = {}
>(
  style: StyleRulesCallback<ClassKey> | StyleRules<ClassKey>,
  options?: Options,
): PropInjector<WithStyles<ClassKey, Options['withTheme']>, StyledComponentProps<ClassKey>>;
