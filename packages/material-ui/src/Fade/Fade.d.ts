import * as React from 'react';
import { TransitionProps } from '../transitions/transition';

export interface FadeProps extends TransitionProps {}

declare const Fade: React.ComponentType<FadeProps>;

export default Fade;
