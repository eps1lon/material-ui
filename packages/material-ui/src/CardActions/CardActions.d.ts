import * as React from 'react';
import { StandardProps } from '../StandardProps';

export interface CardActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, CardActionsClassKey> {
  disableActionSpacing?: boolean;
}

export type CardActionsClassKey = 'root' | 'action';

declare const CardActions: React.ComponentType<CardActionsProps>;

export default CardActions;
