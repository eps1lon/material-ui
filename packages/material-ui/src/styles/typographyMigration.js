/**
 * these variants will be removed in the next major
 */
export const deprecatedVariants = [
  'display4',
  'display3',
  'display2',
  'display1',
  'headline',
  'title',
  'subheading',
];

/**
 * these variants will change appearance in the next major
 * to get the new style use set `useNewVariants` in Typography props
 */
export const restyledVariants = ['body1', 'body2', 'caption', 'button'];

export const dangerousVariants = [...deprecatedVariants, ...restyledVariants];
