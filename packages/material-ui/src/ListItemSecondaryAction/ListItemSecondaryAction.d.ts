import { StandardProps } from '../StandardProps';

export interface ListItemSecondaryActionProps
  extends StandardProps<{}, ListItemSecondaryActionClassKey> {}

export type ListItemSecondaryActionClassKey = 'root';

declare const ListItemSecondaryAction: React.ComponentType<ListItemSecondaryActionProps>;

export default ListItemSecondaryAction;
