import { ConsistentWith } from "./ConsistentWith";
import { PropsOf } from "./PropsOf";
import { Omit } from "./Omit";
/**
 * a function that takes {component} and returns a component that passes along
 * all the props to {component} except the {InjectedProps} and will accept
 * additional {AdditionalProps}
 */
export type PropInjector<InjectedProps, AdditionalProps = {}> = <
  C extends React.ComponentType<ConsistentWith<PropsOf<C>, InjectedProps>>
>(
  component: C,
) => React.ComponentType<
  Omit<JSX.LibraryManagedAttributes<C, PropsOf<C>>, keyof InjectedProps> & AdditionalProps
>;
