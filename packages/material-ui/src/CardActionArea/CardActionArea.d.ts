import * as React from 'react';
import { StandardProps } from '../StandardProps';
import { ButtonBaseProps } from '../ButtonBase';

export interface CardActionAreaProps
  extends StandardProps<ButtonBaseProps, CardActionAreaClassKey> {
  focusVisibleClassName?: string;
}

export type CardActionAreaClassKey = 'root' | 'focusVisible' | 'focusHighlight';

declare const CardActionArea: React.ComponentType<CardActionAreaProps>;

export default CardActionArea;
