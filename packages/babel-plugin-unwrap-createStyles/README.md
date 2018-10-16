## Motivation

We write our demos in TS but want to offer the same demos to JS users.
Maintaining two versions of the demos is hard and therefore we simply transpile
the TS demos with babel to JS.

However we have some TS only utility functions that are essentially identity function
with no side-effects whos only purpose is to defeat type widening. These add noise
to the JS files and bundle size for everyone.

This plugin unwraps them

## Recognized patterns

```ts
import { createStyles, withStyles } from '@material-ui/core/styles'

const styles = () => createStyles({});

export default withStyles(styles)(Component);
```

```js
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({});

export default withStyles(styles)(Component);
```

### Missing
- default import from `createStyles`
- aliased imports
