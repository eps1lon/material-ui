import { StandardProps } from '../StandardProps';

export interface ListItemIconProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListItemIconClassKey> {
  children: React.ReactElement<any>;
}

export type ListItemIconClassKey = 'root';

declare const ListItemIcon: React.ComponentType<ListItemIconProps>;

export default ListItemIcon;
