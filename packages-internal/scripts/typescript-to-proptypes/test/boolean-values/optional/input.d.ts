import type { JSX } from "react";
type Props = {
  foo?: boolean;
  bar?: true;
  baz?: false;
};

export default function Foo(props: Props): JSX.Element;
