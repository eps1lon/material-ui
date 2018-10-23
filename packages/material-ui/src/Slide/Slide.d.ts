import * as React from 'react';
import { TransitionProps } from '../transitions/transition';

export interface SlideProps extends TransitionProps {
  direction: 'left' | 'right' | 'up' | 'down';
}

declare const Slide: React.ComponentType<SlideProps>;

export default Slide;
