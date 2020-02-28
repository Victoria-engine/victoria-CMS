import { IconName, ButtonAppearance } from 'evergreen-ui'
import { History } from 'history'

export type $TS_FIXME = any

export interface PostEditProps {
  
}

export interface PostsProps {
  
}

export type ReduxAction = {
  payload: object | any,
  type: string,
  error: string,
}

export type TabbarActionItem = {
  iconName: IconName,
  label: string,
  to?: string,
  isDisabled?: boolean,
  isLoading?: boolean,
  appearance?: ButtonAppearance,

  onClick?: (...args: any) => void,
}

export interface SidebarProps {
  tabs: TabbarActionItem[],
  activeItem: History['location']['pathname'],
}

export interface TopbarProps {
  title: string,
  actions: TabbarActionItem[],
}

export interface LayoutProps {
  history: History,
}
