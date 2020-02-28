import { IconName, ButtonAppearance } from 'evergreen-ui'
import { History } from 'history'

export type ValueOf<T> = T[keyof T]

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
  hasSidebar: boolean,
}

export interface AppStore {
  error: string | null,
}

export interface AuthStore {
  authToken: string | null,
  loggedInUserID: string,
  working: boolean,
  error: string | null,
}

export type BlogPost = {
  tags: string[],
  _id: string,
  html: string,
  title: string,
  slug: string,
  excerpt: string,
  visibility: 'private' | 'public',
  reading_time: number,
  author: string,
  createdAt: string,
  updatedAt: string
}

export interface BlogStore {
  working: boolean,
  blog: {
    name: string,
    description: string,
    author: string,
    key: string,
    posts: BlogPost[],
  },
  error: string | null,
}