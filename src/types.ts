import { IconName, ButtonAppearance, IntentTypes } from 'evergreen-ui'
import { History } from 'history'
import { RouteComponentProps } from 'react-router-dom'
import { OutputData } from '@editorjs/editorjs'

export type ValueOf<T> = T[keyof T]

export type $TS_FIXME = any
export type ComponentType = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>

export type Store = {
  auth: AuthStore,
  app: AppStore,
  blog: BlogStore,
}

export interface PostEditProps {

}

export interface PostsProps {

}

export type ReduxAction = {
  payload: object | any,
  type: string,
  error: Error,
}

export type TabbarActionItem = {
  iconName: IconName,
  label: string,
  to?: string,
  isDisabled?: boolean,
  isLoading?: boolean,
  appearance?: ButtonAppearance,
  intent?: IntentTypes,

  onClick?: (...args: any) => void,
}

export interface SidebarProps {
  tabs: TabbarActionItem[],
  activeItem: History['location']['pathname'],
  title: string,
}

export interface TopbarProps {
  title: string,
  description?: string,
  actions?: TabbarActionItem[],
}

export interface LayoutProps {
  history: History,
  hasSidebar: boolean,
  blog: BlogStore['blog'],
}

export interface AppStore {
  error: string | null,
}

export interface AuthStore {
  authToken?: string,
  working: boolean,
  error: string | null,
  success: boolean,
  accountDeleted: boolean,
}

export enum PostVisibility {
  All = 'all',
  Public = 'public',
  NotListed = 'not-listed'
}

export type BlogPost = {
  tags: string[],
  id: string,
  text: OutputData | string,
  title: string,
  description: string,
  visibility: PostVisibility,
  reading_time: number,
  user: {
    id: string,
    name: string,
  },
  created_at: string,
  updated_at: string,
}

export interface BlogData {
  id: string,
  description: string,
  name: string,
  key: string,
  posts: BlogPost[],
}

export interface UserData {
  name: string,
  email: string,
  created_at: string,
}

export enum RemoteDataStatus {
  Idle = 'idle',
  Fetching = 'fetching',
  Success = 'success',
  Failed = 'failed',
}

export interface RemoteData<T> {
  value: T,
  status: RemoteDataStatus,
}

export interface BlogStore {
  working: boolean,
  blog: {
    id: string,
    title: string,
    description: string,
    key: RemoteData<string>,
    posts: BlogPost[],
  },
  user: UserData,
  error: string | null,
  hasSavedSuccess: boolean,
  blogCreated: boolean,
  gotBlog: boolean,
  postDeletedID: string,
}

export interface RegisterUserPayload {
  email: string,
  password: string,
  name: string,
}
export interface RegisterUserSuccessPayload {
  access_token: string,
  blogID: string,
}

export interface LoginserPayload {
  email: string,
  password: string,
}
export interface LoginUserSuccessPayload {
  access_token: string,
  blogID: string,
}


export interface GetUserDataSuccess {
  blog: BlogData,
  user: UserData,
  posts: BlogPost[],
}

export interface PostLinkProps {
  postData: BlogPost,
}

export interface GatekeeperProps {
  Component: any,
  authToken: string,
  isAutorizing: boolean,
}

export interface GetPostByIDPayload {
  postID: string,
}

export type GetPostByIDSuccessPayload = BlogPost

export interface SavePostPayload {
  id?: string,
  title?: string,
  text?: OutputData | string,
  description?: string,
  visibility?: BlogPost['visibility'],
}

export interface LoginSignInSwitcherProps {
  isLoginActive: boolean,
  onChange: any,
}

export interface PostsTableProps {
  posts: BlogPost[],
  onSelect: (postID: string) => () => void,
  onSearchChange?: (value: string) => void,
}

export type StepperStep = {
  title: string,
}

export interface StepperProps {
  steps: StepperStep[],
  activeStep: number,
  showNumber?: boolean,
  isNextBlocked: boolean,

  onSelect: (step: any) => void,
}

export type CreateBlogPayload = {
  title: string,
  description: string,
}

export interface BlogCreationSectionProps {
  blogData: CreateBlogPayload,
  userData: UserData,

  onBlogDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onEnd: () => void,
}