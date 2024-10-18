/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: any; output: any }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any }
}

export type Announcement = {
  __typename?: 'Announcement'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  status?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type AnnouncementCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  name?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type AnnouncementOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  status?: InputMaybe<OrderDirection>
  type?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type AnnouncementUpdateArgs = {
  data: AnnouncementUpdateInput
  where: AnnouncementWhereUniqueInput
}

export type AnnouncementUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  name?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type AnnouncementWhereInput = {
  AND?: InputMaybe<Array<AnnouncementWhereInput>>
  NOT?: InputMaybe<Array<AnnouncementWhereInput>>
  OR?: InputMaybe<Array<AnnouncementWhereInput>>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  id?: InputMaybe<IdFilter>
  name?: InputMaybe<StringFilter>
  status?: InputMaybe<StringNullableFilter>
  type?: InputMaybe<StringNullableFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type AnnouncementWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type AuthenticatedItem = User

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>
  not?: InputMaybe<BooleanFilter>
}

export type Category = {
  __typename?: 'Category'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  id: Scalars['ID']['output']
  priority?: Maybe<Scalars['Int']['output']>
  slug?: Maybe<Scalars['String']['output']>
  summary?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type CategoryCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  priority?: InputMaybe<Scalars['Int']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  summary?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type CategoryManyRelationFilter = {
  every?: InputMaybe<CategoryWhereInput>
  none?: InputMaybe<CategoryWhereInput>
  some?: InputMaybe<CategoryWhereInput>
}

export type CategoryOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  priority?: InputMaybe<OrderDirection>
  slug?: InputMaybe<OrderDirection>
  summary?: InputMaybe<OrderDirection>
  title?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type CategoryRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>
  create?: InputMaybe<Array<CategoryCreateInput>>
}

export type CategoryRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>
  create?: InputMaybe<Array<CategoryCreateInput>>
  disconnect?: InputMaybe<Array<CategoryWhereUniqueInput>>
  set?: InputMaybe<Array<CategoryWhereUniqueInput>>
}

export type CategoryRelateToOneForCreateInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>
  create?: InputMaybe<CategoryCreateInput>
}

export type CategoryRelateToOneForUpdateInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>
  create?: InputMaybe<CategoryCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type CategoryUpdateArgs = {
  data: CategoryUpdateInput
  where: CategoryWhereUniqueInput
}

export type CategoryUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  priority?: InputMaybe<Scalars['Int']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  summary?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>
  NOT?: InputMaybe<Array<CategoryWhereInput>>
  OR?: InputMaybe<Array<CategoryWhereInput>>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  id?: InputMaybe<IdFilter>
  priority?: InputMaybe<IntFilter>
  slug?: InputMaybe<StringFilter>
  summary?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type CategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type CloudImageFieldOutput = ImageFieldOutput & {
  __typename?: 'CloudImageFieldOutput'
  extension: ImageExtension
  filesize: Scalars['Int']['output']
  height: Scalars['Int']['output']
  id: Scalars['ID']['output']
  ref: Scalars['String']['output']
  url: Scalars['String']['output']
  width: Scalars['Int']['output']
}

export type Collection = {
  __typename?: 'Collection'
  collectionpicks?: Maybe<Array<CollectionPick>>
  collectionpicksCount?: Maybe<Scalars['Int']['output']>
  comment?: Maybe<Array<Comment>>
  commentCount?: Maybe<Scalars['Int']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  creator?: Maybe<Member>
  format?: Maybe<Scalars['String']['output']>
  heroImage?: Maybe<Photo>
  id: Scalars['ID']['output']
  picks?: Maybe<Array<Pick>>
  picksCount?: Maybe<Scalars['Int']['output']>
  public?: Maybe<Scalars['String']['output']>
  slug?: Maybe<Scalars['String']['output']>
  status?: Maybe<Scalars['String']['output']>
  summary?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type CollectionCollectionpicksArgs = {
  orderBy?: Array<CollectionPickOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CollectionPickWhereInput
}

export type CollectionCollectionpicksCountArgs = {
  where?: CollectionPickWhereInput
}

export type CollectionCommentArgs = {
  orderBy?: Array<CommentOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CommentWhereInput
}

export type CollectionCommentCountArgs = {
  where?: CommentWhereInput
}

export type CollectionPicksArgs = {
  orderBy?: Array<PickOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PickWhereInput
}

export type CollectionPicksCountArgs = {
  where?: PickWhereInput
}

export type CollectionCreateInput = {
  collectionpicks?: InputMaybe<CollectionPickRelateToManyForCreateInput>
  comment?: InputMaybe<CommentRelateToManyForCreateInput>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  creator?: InputMaybe<MemberRelateToOneForCreateInput>
  format?: InputMaybe<Scalars['String']['input']>
  heroImage?: InputMaybe<PhotoRelateToOneForCreateInput>
  picks?: InputMaybe<PickRelateToManyForCreateInput>
  public?: InputMaybe<Scalars['String']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<Scalars['String']['input']>
  summary?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type CollectionManyRelationFilter = {
  every?: InputMaybe<CollectionWhereInput>
  none?: InputMaybe<CollectionWhereInput>
  some?: InputMaybe<CollectionWhereInput>
}

export type CollectionMember = {
  __typename?: 'CollectionMember'
  added_by?: Maybe<Member>
  added_date?: Maybe<Scalars['DateTime']['output']>
  collection?: Maybe<Collection>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  id: Scalars['ID']['output']
  member?: Maybe<Member>
  role?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
  updated_by?: Maybe<Member>
  updated_date?: Maybe<Scalars['DateTime']['output']>
}

export type CollectionMemberCreateInput = {
  added_by?: InputMaybe<MemberRelateToOneForCreateInput>
  added_date?: InputMaybe<Scalars['DateTime']['input']>
  collection?: InputMaybe<CollectionRelateToOneForCreateInput>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  member?: InputMaybe<MemberRelateToOneForCreateInput>
  role?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
  updated_by?: InputMaybe<MemberRelateToOneForCreateInput>
  updated_date?: InputMaybe<Scalars['DateTime']['input']>
}

export type CollectionMemberManyRelationFilter = {
  every?: InputMaybe<CollectionMemberWhereInput>
  none?: InputMaybe<CollectionMemberWhereInput>
  some?: InputMaybe<CollectionMemberWhereInput>
}

export type CollectionMemberOrderByInput = {
  added_date?: InputMaybe<OrderDirection>
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  role?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
  updated_date?: InputMaybe<OrderDirection>
}

export type CollectionMemberRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CollectionMemberWhereUniqueInput>>
  create?: InputMaybe<Array<CollectionMemberCreateInput>>
}

export type CollectionMemberRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CollectionMemberWhereUniqueInput>>
  create?: InputMaybe<Array<CollectionMemberCreateInput>>
  disconnect?: InputMaybe<Array<CollectionMemberWhereUniqueInput>>
  set?: InputMaybe<Array<CollectionMemberWhereUniqueInput>>
}

export type CollectionMemberUpdateArgs = {
  data: CollectionMemberUpdateInput
  where: CollectionMemberWhereUniqueInput
}

export type CollectionMemberUpdateInput = {
  added_by?: InputMaybe<MemberRelateToOneForUpdateInput>
  added_date?: InputMaybe<Scalars['DateTime']['input']>
  collection?: InputMaybe<CollectionRelateToOneForUpdateInput>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  member?: InputMaybe<MemberRelateToOneForUpdateInput>
  role?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
  updated_by?: InputMaybe<MemberRelateToOneForUpdateInput>
  updated_date?: InputMaybe<Scalars['DateTime']['input']>
}

export type CollectionMemberWhereInput = {
  AND?: InputMaybe<Array<CollectionMemberWhereInput>>
  NOT?: InputMaybe<Array<CollectionMemberWhereInput>>
  OR?: InputMaybe<Array<CollectionMemberWhereInput>>
  added_by?: InputMaybe<MemberWhereInput>
  added_date?: InputMaybe<DateTimeNullableFilter>
  collection?: InputMaybe<CollectionWhereInput>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  id?: InputMaybe<IdFilter>
  member?: InputMaybe<MemberWhereInput>
  role?: InputMaybe<StringNullableFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
  updated_by?: InputMaybe<MemberWhereInput>
  updated_date?: InputMaybe<DateTimeNullableFilter>
}

export type CollectionMemberWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type CollectionOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  format?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  public?: InputMaybe<OrderDirection>
  slug?: InputMaybe<OrderDirection>
  status?: InputMaybe<OrderDirection>
  summary?: InputMaybe<OrderDirection>
  title?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type CollectionPick = {
  __typename?: 'CollectionPick'
  collection?: Maybe<Collection>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  creator?: Maybe<Member>
  custom_day?: Maybe<Scalars['Int']['output']>
  custom_month?: Maybe<Scalars['Int']['output']>
  custom_time?: Maybe<Scalars['DateTime']['output']>
  custom_year?: Maybe<Scalars['Int']['output']>
  id: Scalars['ID']['output']
  objective?: Maybe<Scalars['String']['output']>
  picked_date?: Maybe<Scalars['DateTime']['output']>
  sort_order?: Maybe<Scalars['Int']['output']>
  story?: Maybe<Story>
  summary?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
  updated_date?: Maybe<Scalars['DateTime']['output']>
}

export type CollectionPickCreateInput = {
  collection?: InputMaybe<CollectionRelateToOneForCreateInput>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  creator?: InputMaybe<MemberRelateToOneForCreateInput>
  custom_day?: InputMaybe<Scalars['Int']['input']>
  custom_month?: InputMaybe<Scalars['Int']['input']>
  custom_time?: InputMaybe<Scalars['DateTime']['input']>
  custom_year?: InputMaybe<Scalars['Int']['input']>
  objective?: InputMaybe<Scalars['String']['input']>
  picked_date?: InputMaybe<Scalars['DateTime']['input']>
  sort_order?: InputMaybe<Scalars['Int']['input']>
  story?: InputMaybe<StoryRelateToOneForCreateInput>
  summary?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
  updated_date?: InputMaybe<Scalars['DateTime']['input']>
}

export type CollectionPickManyRelationFilter = {
  every?: InputMaybe<CollectionPickWhereInput>
  none?: InputMaybe<CollectionPickWhereInput>
  some?: InputMaybe<CollectionPickWhereInput>
}

export type CollectionPickOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  custom_day?: InputMaybe<OrderDirection>
  custom_month?: InputMaybe<OrderDirection>
  custom_time?: InputMaybe<OrderDirection>
  custom_year?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  objective?: InputMaybe<OrderDirection>
  picked_date?: InputMaybe<OrderDirection>
  sort_order?: InputMaybe<OrderDirection>
  summary?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
  updated_date?: InputMaybe<OrderDirection>
}

export type CollectionPickRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CollectionPickWhereUniqueInput>>
  create?: InputMaybe<Array<CollectionPickCreateInput>>
}

export type CollectionPickRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CollectionPickWhereUniqueInput>>
  create?: InputMaybe<Array<CollectionPickCreateInput>>
  disconnect?: InputMaybe<Array<CollectionPickWhereUniqueInput>>
  set?: InputMaybe<Array<CollectionPickWhereUniqueInput>>
}

export type CollectionPickUpdateArgs = {
  data: CollectionPickUpdateInput
  where: CollectionPickWhereUniqueInput
}

export type CollectionPickUpdateInput = {
  collection?: InputMaybe<CollectionRelateToOneForUpdateInput>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  creator?: InputMaybe<MemberRelateToOneForUpdateInput>
  custom_day?: InputMaybe<Scalars['Int']['input']>
  custom_month?: InputMaybe<Scalars['Int']['input']>
  custom_time?: InputMaybe<Scalars['DateTime']['input']>
  custom_year?: InputMaybe<Scalars['Int']['input']>
  objective?: InputMaybe<Scalars['String']['input']>
  picked_date?: InputMaybe<Scalars['DateTime']['input']>
  sort_order?: InputMaybe<Scalars['Int']['input']>
  story?: InputMaybe<StoryRelateToOneForUpdateInput>
  summary?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
  updated_date?: InputMaybe<Scalars['DateTime']['input']>
}

export type CollectionPickWhereInput = {
  AND?: InputMaybe<Array<CollectionPickWhereInput>>
  NOT?: InputMaybe<Array<CollectionPickWhereInput>>
  OR?: InputMaybe<Array<CollectionPickWhereInput>>
  collection?: InputMaybe<CollectionWhereInput>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  creator?: InputMaybe<MemberWhereInput>
  custom_day?: InputMaybe<IntNullableFilter>
  custom_month?: InputMaybe<IntNullableFilter>
  custom_time?: InputMaybe<DateTimeNullableFilter>
  custom_year?: InputMaybe<IntNullableFilter>
  id?: InputMaybe<IdFilter>
  objective?: InputMaybe<StringNullableFilter>
  picked_date?: InputMaybe<DateTimeNullableFilter>
  sort_order?: InputMaybe<IntNullableFilter>
  story?: InputMaybe<StoryWhereInput>
  summary?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
  updated_date?: InputMaybe<DateTimeNullableFilter>
}

export type CollectionPickWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type CollectionRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CollectionWhereUniqueInput>>
  create?: InputMaybe<Array<CollectionCreateInput>>
}

export type CollectionRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CollectionWhereUniqueInput>>
  create?: InputMaybe<Array<CollectionCreateInput>>
  disconnect?: InputMaybe<Array<CollectionWhereUniqueInput>>
  set?: InputMaybe<Array<CollectionWhereUniqueInput>>
}

export type CollectionRelateToOneForCreateInput = {
  connect?: InputMaybe<CollectionWhereUniqueInput>
  create?: InputMaybe<CollectionCreateInput>
}

export type CollectionRelateToOneForUpdateInput = {
  connect?: InputMaybe<CollectionWhereUniqueInput>
  create?: InputMaybe<CollectionCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type CollectionUpdateArgs = {
  data: CollectionUpdateInput
  where: CollectionWhereUniqueInput
}

export type CollectionUpdateInput = {
  collectionpicks?: InputMaybe<CollectionPickRelateToManyForUpdateInput>
  comment?: InputMaybe<CommentRelateToManyForUpdateInput>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  creator?: InputMaybe<MemberRelateToOneForUpdateInput>
  format?: InputMaybe<Scalars['String']['input']>
  heroImage?: InputMaybe<PhotoRelateToOneForUpdateInput>
  picks?: InputMaybe<PickRelateToManyForUpdateInput>
  public?: InputMaybe<Scalars['String']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<Scalars['String']['input']>
  summary?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type CollectionWhereInput = {
  AND?: InputMaybe<Array<CollectionWhereInput>>
  NOT?: InputMaybe<Array<CollectionWhereInput>>
  OR?: InputMaybe<Array<CollectionWhereInput>>
  collectionpicks?: InputMaybe<CollectionPickManyRelationFilter>
  comment?: InputMaybe<CommentManyRelationFilter>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  creator?: InputMaybe<MemberWhereInput>
  format?: InputMaybe<StringNullableFilter>
  heroImage?: InputMaybe<PhotoWhereInput>
  id?: InputMaybe<IdFilter>
  picks?: InputMaybe<PickManyRelationFilter>
  public?: InputMaybe<StringNullableFilter>
  slug?: InputMaybe<StringFilter>
  status?: InputMaybe<StringNullableFilter>
  summary?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type CollectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type Comment = {
  __typename?: 'Comment'
  collection?: Maybe<Collection>
  content?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  id: Scalars['ID']['output']
  is_active?: Maybe<Scalars['Boolean']['output']>
  is_edited?: Maybe<Scalars['Boolean']['output']>
  like?: Maybe<Array<Member>>
  likeCount?: Maybe<Scalars['Int']['output']>
  member?: Maybe<Member>
  parent?: Maybe<Comment>
  published_date?: Maybe<Scalars['DateTime']['output']>
  root?: Maybe<Comment>
  state?: Maybe<Scalars['String']['output']>
  story?: Maybe<Story>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type CommentLikeArgs = {
  orderBy?: Array<MemberOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: MemberWhereInput
}

export type CommentLikeCountArgs = {
  where?: MemberWhereInput
}

export type CommentCreateInput = {
  collection?: InputMaybe<CollectionRelateToOneForCreateInput>
  content?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  is_edited?: InputMaybe<Scalars['Boolean']['input']>
  like?: InputMaybe<MemberRelateToManyForCreateInput>
  member?: InputMaybe<MemberRelateToOneForCreateInput>
  parent?: InputMaybe<CommentRelateToOneForCreateInput>
  published_date?: InputMaybe<Scalars['DateTime']['input']>
  root?: InputMaybe<CommentRelateToOneForCreateInput>
  state?: InputMaybe<Scalars['String']['input']>
  story?: InputMaybe<StoryRelateToOneForCreateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type CommentManyRelationFilter = {
  every?: InputMaybe<CommentWhereInput>
  none?: InputMaybe<CommentWhereInput>
  some?: InputMaybe<CommentWhereInput>
}

export type CommentOrderByInput = {
  content?: InputMaybe<OrderDirection>
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  is_active?: InputMaybe<OrderDirection>
  is_edited?: InputMaybe<OrderDirection>
  published_date?: InputMaybe<OrderDirection>
  state?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type CommentRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CommentWhereUniqueInput>>
  create?: InputMaybe<Array<CommentCreateInput>>
}

export type CommentRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CommentWhereUniqueInput>>
  create?: InputMaybe<Array<CommentCreateInput>>
  disconnect?: InputMaybe<Array<CommentWhereUniqueInput>>
  set?: InputMaybe<Array<CommentWhereUniqueInput>>
}

export type CommentRelateToOneForCreateInput = {
  connect?: InputMaybe<CommentWhereUniqueInput>
  create?: InputMaybe<CommentCreateInput>
}

export type CommentRelateToOneForUpdateInput = {
  connect?: InputMaybe<CommentWhereUniqueInput>
  create?: InputMaybe<CommentCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type CommentUpdateArgs = {
  data: CommentUpdateInput
  where: CommentWhereUniqueInput
}

export type CommentUpdateInput = {
  collection?: InputMaybe<CollectionRelateToOneForUpdateInput>
  content?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  is_edited?: InputMaybe<Scalars['Boolean']['input']>
  like?: InputMaybe<MemberRelateToManyForUpdateInput>
  member?: InputMaybe<MemberRelateToOneForUpdateInput>
  parent?: InputMaybe<CommentRelateToOneForUpdateInput>
  published_date?: InputMaybe<Scalars['DateTime']['input']>
  root?: InputMaybe<CommentRelateToOneForUpdateInput>
  state?: InputMaybe<Scalars['String']['input']>
  story?: InputMaybe<StoryRelateToOneForUpdateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type CommentWhereInput = {
  AND?: InputMaybe<Array<CommentWhereInput>>
  NOT?: InputMaybe<Array<CommentWhereInput>>
  OR?: InputMaybe<Array<CommentWhereInput>>
  collection?: InputMaybe<CollectionWhereInput>
  content?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  id?: InputMaybe<IdFilter>
  is_active?: InputMaybe<BooleanFilter>
  is_edited?: InputMaybe<BooleanFilter>
  like?: InputMaybe<MemberManyRelationFilter>
  member?: InputMaybe<MemberWhereInput>
  parent?: InputMaybe<CommentWhereInput>
  published_date?: InputMaybe<DateTimeNullableFilter>
  root?: InputMaybe<CommentWhereInput>
  state?: InputMaybe<StringNullableFilter>
  story?: InputMaybe<StoryWhereInput>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type CommentWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<Scalars['String']['input']>
}

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>
  gt?: InputMaybe<Scalars['DateTime']['input']>
  gte?: InputMaybe<Scalars['DateTime']['input']>
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>
  lt?: InputMaybe<Scalars['DateTime']['input']>
  lte?: InputMaybe<Scalars['DateTime']['input']>
  not?: InputMaybe<DateTimeNullableFilter>
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>
}

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>
  gt?: InputMaybe<Scalars['Float']['input']>
  gte?: InputMaybe<Scalars['Float']['input']>
  in?: InputMaybe<Array<Scalars['Float']['input']>>
  lt?: InputMaybe<Scalars['Float']['input']>
  lte?: InputMaybe<Scalars['Float']['input']>
  not?: InputMaybe<FloatNullableFilter>
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>
}

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>
  gt?: InputMaybe<Scalars['ID']['input']>
  gte?: InputMaybe<Scalars['ID']['input']>
  in?: InputMaybe<Array<Scalars['ID']['input']>>
  lt?: InputMaybe<Scalars['ID']['input']>
  lte?: InputMaybe<Scalars['ID']['input']>
  not?: InputMaybe<IdFilter>
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>
}

export enum ImageExtension {
  Gif = 'gif',
  Jpg = 'jpg',
  Png = 'png',
  Webp = 'webp',
}

export type ImageFieldInput = {
  ref?: InputMaybe<Scalars['String']['input']>
  upload?: InputMaybe<Scalars['Upload']['input']>
}

export type ImageFieldOutput = {
  extension: ImageExtension
  filesize: Scalars['Int']['output']
  height: Scalars['Int']['output']
  id: Scalars['ID']['output']
  ref: Scalars['String']['output']
  url: Scalars['String']['output']
  width: Scalars['Int']['output']
}

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>
  gt?: InputMaybe<Scalars['Int']['input']>
  gte?: InputMaybe<Scalars['Int']['input']>
  in?: InputMaybe<Array<Scalars['Int']['input']>>
  lt?: InputMaybe<Scalars['Int']['input']>
  lte?: InputMaybe<Scalars['Int']['input']>
  not?: InputMaybe<IntFilter>
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>
}

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>
  gt?: InputMaybe<Scalars['Int']['input']>
  gte?: InputMaybe<Scalars['Int']['input']>
  in?: InputMaybe<Array<Scalars['Int']['input']>>
  lt?: InputMaybe<Scalars['Int']['input']>
  lte?: InputMaybe<Scalars['Int']['input']>
  not?: InputMaybe<IntNullableFilter>
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>
}

export type InvitationCode = {
  __typename?: 'InvitationCode'
  code?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  expired?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['ID']['output']
  receive?: Maybe<Member>
  send?: Maybe<Member>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type InvitationCodeCreateInput = {
  code?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  expired?: InputMaybe<Scalars['Boolean']['input']>
  receive?: InputMaybe<MemberRelateToOneForCreateInput>
  send?: InputMaybe<MemberRelateToOneForCreateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type InvitationCodeManyRelationFilter = {
  every?: InputMaybe<InvitationCodeWhereInput>
  none?: InputMaybe<InvitationCodeWhereInput>
  some?: InputMaybe<InvitationCodeWhereInput>
}

export type InvitationCodeOrderByInput = {
  code?: InputMaybe<OrderDirection>
  createdAt?: InputMaybe<OrderDirection>
  expired?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type InvitationCodeRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<InvitationCodeWhereUniqueInput>>
  create?: InputMaybe<Array<InvitationCodeCreateInput>>
}

export type InvitationCodeRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<InvitationCodeWhereUniqueInput>>
  create?: InputMaybe<Array<InvitationCodeCreateInput>>
  disconnect?: InputMaybe<Array<InvitationCodeWhereUniqueInput>>
  set?: InputMaybe<Array<InvitationCodeWhereUniqueInput>>
}

export type InvitationCodeRelateToOneForCreateInput = {
  connect?: InputMaybe<InvitationCodeWhereUniqueInput>
  create?: InputMaybe<InvitationCodeCreateInput>
}

export type InvitationCodeRelateToOneForUpdateInput = {
  connect?: InputMaybe<InvitationCodeWhereUniqueInput>
  create?: InputMaybe<InvitationCodeCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type InvitationCodeUpdateArgs = {
  data: InvitationCodeUpdateInput
  where: InvitationCodeWhereUniqueInput
}

export type InvitationCodeUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  expired?: InputMaybe<Scalars['Boolean']['input']>
  receive?: InputMaybe<MemberRelateToOneForUpdateInput>
  send?: InputMaybe<MemberRelateToOneForUpdateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type InvitationCodeWhereInput = {
  AND?: InputMaybe<Array<InvitationCodeWhereInput>>
  NOT?: InputMaybe<Array<InvitationCodeWhereInput>>
  OR?: InputMaybe<Array<InvitationCodeWhereInput>>
  code?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  expired?: InputMaybe<BooleanFilter>
  id?: InputMaybe<IdFilter>
  receive?: InputMaybe<MemberWhereInput>
  send?: InputMaybe<MemberWhereInput>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type InvitationCodeWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta'
  enableSessionItem: Scalars['Boolean']['output']
  enableSignout: Scalars['Boolean']['output']
  list?: Maybe<KeystoneAdminUiListMeta>
  lists: Array<KeystoneAdminUiListMeta>
}

export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input']
}

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta'
  createView: KeystoneAdminUiFieldMetaCreateView
  customViewsIndex?: Maybe<Scalars['Int']['output']>
  fieldMeta?: Maybe<Scalars['JSON']['output']>
  isFilterable: Scalars['Boolean']['output']
  isOrderable: Scalars['Boolean']['output']
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>
  label: Scalars['String']['output']
  listView: KeystoneAdminUiFieldMetaListView
  path: Scalars['String']['output']
  search?: Maybe<QueryMode>
  viewsIndex: Scalars['Int']['output']
}

export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView'
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode
}

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView'
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>
}

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read',
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView'
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode
}

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read',
}

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta'
  description?: Maybe<Scalars['String']['output']>
  fields: Array<KeystoneAdminUiFieldMeta>
  hideCreate: Scalars['Boolean']['output']
  hideDelete: Scalars['Boolean']['output']
  initialColumns: Array<Scalars['String']['output']>
  initialSort?: Maybe<KeystoneAdminUiSort>
  isHidden: Scalars['Boolean']['output']
  itemQueryName: Scalars['String']['output']
  key: Scalars['String']['output']
  label: Scalars['String']['output']
  labelField: Scalars['String']['output']
  listQueryName: Scalars['String']['output']
  pageSize: Scalars['Int']['output']
  path: Scalars['String']['output']
  plural: Scalars['String']['output']
  singular: Scalars['String']['output']
}

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort'
  direction: KeystoneAdminUiSortDirection
  field: Scalars['String']['output']
}

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta'
  adminMeta: KeystoneAdminMeta
}

export type LocalImageFieldOutput = ImageFieldOutput & {
  __typename?: 'LocalImageFieldOutput'
  extension: ImageExtension
  filesize: Scalars['Int']['output']
  height: Scalars['Int']['output']
  id: Scalars['ID']['output']
  ref: Scalars['String']['output']
  url: Scalars['String']['output']
  width: Scalars['Int']['output']
}

export type Member = {
  __typename?: 'Member'
  avatar?: Maybe<Scalars['String']['output']>
  avatar_image?: Maybe<Photo>
  block?: Maybe<Array<Member>>
  blockCount?: Maybe<Scalars['Int']['output']>
  blocked?: Maybe<Array<Member>>
  blockedCount?: Maybe<Scalars['Int']['output']>
  comment?: Maybe<Array<Comment>>
  commentCount?: Maybe<Scalars['Int']['output']>
  create_collection?: Maybe<Array<CollectionMember>>
  create_collectionCount?: Maybe<Scalars['Int']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  customId?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  firebaseId?: Maybe<Scalars['String']['output']>
  follow_publisher?: Maybe<Array<Publisher>>
  follow_publisherCount?: Maybe<Scalars['Int']['output']>
  follower?: Maybe<Array<Member>>
  followerCount?: Maybe<Scalars['Int']['output']>
  following?: Maybe<Array<Member>>
  followingCount?: Maybe<Scalars['Int']['output']>
  following_category?: Maybe<Array<Category>>
  following_categoryCount?: Maybe<Scalars['Int']['output']>
  following_collection?: Maybe<Array<Collection>>
  following_collectionCount?: Maybe<Scalars['Int']['output']>
  id: Scalars['ID']['output']
  intro?: Maybe<Scalars['String']['output']>
  invited?: Maybe<Array<InvitationCode>>
  invitedCount?: Maybe<Scalars['Int']['output']>
  invited_by?: Maybe<InvitationCode>
  is_active?: Maybe<Scalars['Boolean']['output']>
  member_like?: Maybe<Array<Comment>>
  member_likeCount?: Maybe<Scalars['Int']['output']>
  modify_collection?: Maybe<Array<CollectionMember>>
  modify_collectionCount?: Maybe<Scalars['Int']['output']>
  name?: Maybe<Scalars['String']['output']>
  nickname?: Maybe<Scalars['String']['output']>
  pick?: Maybe<Array<Pick>>
  pickCount?: Maybe<Scalars['Int']['output']>
  sponsor?: Maybe<Array<Sponsorship>>
  sponsorCount?: Maybe<Scalars['Int']['output']>
  transaction?: Maybe<Array<Transaction>>
  transactionCount?: Maybe<Scalars['Int']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
  verified?: Maybe<Scalars['Boolean']['output']>
  wallet?: Maybe<Scalars['String']['output']>
}

export type MemberBlockArgs = {
  orderBy?: Array<MemberOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: MemberWhereInput
}

export type MemberBlockCountArgs = {
  where?: MemberWhereInput
}

export type MemberBlockedArgs = {
  orderBy?: Array<MemberOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: MemberWhereInput
}

export type MemberBlockedCountArgs = {
  where?: MemberWhereInput
}

export type MemberCommentArgs = {
  orderBy?: Array<CommentOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CommentWhereInput
}

export type MemberCommentCountArgs = {
  where?: CommentWhereInput
}

export type MemberCreate_CollectionArgs = {
  orderBy?: Array<CollectionMemberOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CollectionMemberWhereInput
}

export type MemberCreate_CollectionCountArgs = {
  where?: CollectionMemberWhereInput
}

export type MemberFollow_PublisherArgs = {
  orderBy?: Array<PublisherOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PublisherWhereInput
}

export type MemberFollow_PublisherCountArgs = {
  where?: PublisherWhereInput
}

export type MemberFollowerArgs = {
  orderBy?: Array<MemberOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: MemberWhereInput
}

export type MemberFollowerCountArgs = {
  where?: MemberWhereInput
}

export type MemberFollowingArgs = {
  orderBy?: Array<MemberOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: MemberWhereInput
}

export type MemberFollowingCountArgs = {
  where?: MemberWhereInput
}

export type MemberFollowing_CategoryArgs = {
  orderBy?: Array<CategoryOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CategoryWhereInput
}

export type MemberFollowing_CategoryCountArgs = {
  where?: CategoryWhereInput
}

export type MemberFollowing_CollectionArgs = {
  orderBy?: Array<CollectionOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CollectionWhereInput
}

export type MemberFollowing_CollectionCountArgs = {
  where?: CollectionWhereInput
}

export type MemberInvitedArgs = {
  orderBy?: Array<InvitationCodeOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: InvitationCodeWhereInput
}

export type MemberInvitedCountArgs = {
  where?: InvitationCodeWhereInput
}

export type MemberMember_LikeArgs = {
  orderBy?: Array<CommentOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CommentWhereInput
}

export type MemberMember_LikeCountArgs = {
  where?: CommentWhereInput
}

export type MemberModify_CollectionArgs = {
  orderBy?: Array<CollectionMemberOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CollectionMemberWhereInput
}

export type MemberModify_CollectionCountArgs = {
  where?: CollectionMemberWhereInput
}

export type MemberPickArgs = {
  orderBy?: Array<PickOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PickWhereInput
}

export type MemberPickCountArgs = {
  where?: PickWhereInput
}

export type MemberSponsorArgs = {
  orderBy?: Array<SponsorshipOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: SponsorshipWhereInput
}

export type MemberSponsorCountArgs = {
  where?: SponsorshipWhereInput
}

export type MemberTransactionArgs = {
  orderBy?: Array<TransactionOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: TransactionWhereInput
}

export type MemberTransactionCountArgs = {
  where?: TransactionWhereInput
}

export type MemberCreateInput = {
  avatar?: InputMaybe<Scalars['String']['input']>
  avatar_image?: InputMaybe<PhotoRelateToOneForCreateInput>
  block?: InputMaybe<MemberRelateToManyForCreateInput>
  blocked?: InputMaybe<MemberRelateToManyForCreateInput>
  comment?: InputMaybe<CommentRelateToManyForCreateInput>
  create_collection?: InputMaybe<CollectionMemberRelateToManyForCreateInput>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  customId?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  firebaseId?: InputMaybe<Scalars['String']['input']>
  follow_publisher?: InputMaybe<PublisherRelateToManyForCreateInput>
  follower?: InputMaybe<MemberRelateToManyForCreateInput>
  following?: InputMaybe<MemberRelateToManyForCreateInput>
  following_category?: InputMaybe<CategoryRelateToManyForCreateInput>
  following_collection?: InputMaybe<CollectionRelateToManyForCreateInput>
  intro?: InputMaybe<Scalars['String']['input']>
  invited?: InputMaybe<InvitationCodeRelateToManyForCreateInput>
  invited_by?: InputMaybe<InvitationCodeRelateToOneForCreateInput>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  member_like?: InputMaybe<CommentRelateToManyForCreateInput>
  modify_collection?: InputMaybe<CollectionMemberRelateToManyForCreateInput>
  name?: InputMaybe<Scalars['String']['input']>
  nickname?: InputMaybe<Scalars['String']['input']>
  pick?: InputMaybe<PickRelateToManyForCreateInput>
  sponsor?: InputMaybe<SponsorshipRelateToManyForCreateInput>
  transaction?: InputMaybe<TransactionRelateToManyForCreateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
  verified?: InputMaybe<Scalars['Boolean']['input']>
  wallet?: InputMaybe<Scalars['String']['input']>
}

export type MemberManyRelationFilter = {
  every?: InputMaybe<MemberWhereInput>
  none?: InputMaybe<MemberWhereInput>
  some?: InputMaybe<MemberWhereInput>
}

export type MemberOrderByInput = {
  avatar?: InputMaybe<OrderDirection>
  createdAt?: InputMaybe<OrderDirection>
  customId?: InputMaybe<OrderDirection>
  email?: InputMaybe<OrderDirection>
  firebaseId?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  intro?: InputMaybe<OrderDirection>
  is_active?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  nickname?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
  verified?: InputMaybe<OrderDirection>
  wallet?: InputMaybe<OrderDirection>
}

export type MemberRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<MemberWhereUniqueInput>>
  create?: InputMaybe<Array<MemberCreateInput>>
}

export type MemberRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<MemberWhereUniqueInput>>
  create?: InputMaybe<Array<MemberCreateInput>>
  disconnect?: InputMaybe<Array<MemberWhereUniqueInput>>
  set?: InputMaybe<Array<MemberWhereUniqueInput>>
}

export type MemberRelateToOneForCreateInput = {
  connect?: InputMaybe<MemberWhereUniqueInput>
  create?: InputMaybe<MemberCreateInput>
}

export type MemberRelateToOneForUpdateInput = {
  connect?: InputMaybe<MemberWhereUniqueInput>
  create?: InputMaybe<MemberCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type MemberUpdateArgs = {
  data: MemberUpdateInput
  where: MemberWhereUniqueInput
}

export type MemberUpdateInput = {
  avatar?: InputMaybe<Scalars['String']['input']>
  avatar_image?: InputMaybe<PhotoRelateToOneForUpdateInput>
  block?: InputMaybe<MemberRelateToManyForUpdateInput>
  blocked?: InputMaybe<MemberRelateToManyForUpdateInput>
  comment?: InputMaybe<CommentRelateToManyForUpdateInput>
  create_collection?: InputMaybe<CollectionMemberRelateToManyForUpdateInput>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  customId?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  firebaseId?: InputMaybe<Scalars['String']['input']>
  follow_publisher?: InputMaybe<PublisherRelateToManyForUpdateInput>
  follower?: InputMaybe<MemberRelateToManyForUpdateInput>
  following?: InputMaybe<MemberRelateToManyForUpdateInput>
  following_category?: InputMaybe<CategoryRelateToManyForUpdateInput>
  following_collection?: InputMaybe<CollectionRelateToManyForUpdateInput>
  intro?: InputMaybe<Scalars['String']['input']>
  invited?: InputMaybe<InvitationCodeRelateToManyForUpdateInput>
  invited_by?: InputMaybe<InvitationCodeRelateToOneForUpdateInput>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  member_like?: InputMaybe<CommentRelateToManyForUpdateInput>
  modify_collection?: InputMaybe<CollectionMemberRelateToManyForUpdateInput>
  name?: InputMaybe<Scalars['String']['input']>
  nickname?: InputMaybe<Scalars['String']['input']>
  pick?: InputMaybe<PickRelateToManyForUpdateInput>
  sponsor?: InputMaybe<SponsorshipRelateToManyForUpdateInput>
  transaction?: InputMaybe<TransactionRelateToManyForUpdateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
  verified?: InputMaybe<Scalars['Boolean']['input']>
  wallet?: InputMaybe<Scalars['String']['input']>
}

export type MemberWhereInput = {
  AND?: InputMaybe<Array<MemberWhereInput>>
  NOT?: InputMaybe<Array<MemberWhereInput>>
  OR?: InputMaybe<Array<MemberWhereInput>>
  avatar?: InputMaybe<StringFilter>
  avatar_image?: InputMaybe<PhotoWhereInput>
  block?: InputMaybe<MemberManyRelationFilter>
  blocked?: InputMaybe<MemberManyRelationFilter>
  comment?: InputMaybe<CommentManyRelationFilter>
  create_collection?: InputMaybe<CollectionMemberManyRelationFilter>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  customId?: InputMaybe<StringFilter>
  email?: InputMaybe<StringFilter>
  firebaseId?: InputMaybe<StringFilter>
  follow_publisher?: InputMaybe<PublisherManyRelationFilter>
  follower?: InputMaybe<MemberManyRelationFilter>
  following?: InputMaybe<MemberManyRelationFilter>
  following_category?: InputMaybe<CategoryManyRelationFilter>
  following_collection?: InputMaybe<CollectionManyRelationFilter>
  id?: InputMaybe<IdFilter>
  intro?: InputMaybe<StringFilter>
  invited?: InputMaybe<InvitationCodeManyRelationFilter>
  invited_by?: InputMaybe<InvitationCodeWhereInput>
  is_active?: InputMaybe<BooleanFilter>
  member_like?: InputMaybe<CommentManyRelationFilter>
  modify_collection?: InputMaybe<CollectionMemberManyRelationFilter>
  name?: InputMaybe<StringFilter>
  nickname?: InputMaybe<StringFilter>
  pick?: InputMaybe<PickManyRelationFilter>
  sponsor?: InputMaybe<SponsorshipManyRelationFilter>
  transaction?: InputMaybe<TransactionManyRelationFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
  verified?: InputMaybe<BooleanFilter>
  wallet?: InputMaybe<StringFilter>
}

export type MemberWhereUniqueInput = {
  customId?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  firebaseId?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type Mutation = {
  __typename?: 'Mutation'
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>
  createAnnouncement?: Maybe<Announcement>
  createAnnouncements?: Maybe<Array<Maybe<Announcement>>>
  createCategories?: Maybe<Array<Maybe<Category>>>
  createCategory?: Maybe<Category>
  createCollection?: Maybe<Collection>
  createCollectionMember?: Maybe<CollectionMember>
  createCollectionMembers?: Maybe<Array<Maybe<CollectionMember>>>
  createCollectionPick?: Maybe<CollectionPick>
  createCollectionPicks?: Maybe<Array<Maybe<CollectionPick>>>
  createCollections?: Maybe<Array<Maybe<Collection>>>
  createComment?: Maybe<Comment>
  createComments?: Maybe<Array<Maybe<Comment>>>
  createInitialUser: UserAuthenticationWithPasswordSuccess
  createInvitationCode?: Maybe<InvitationCode>
  createInvitationCodes?: Maybe<Array<Maybe<InvitationCode>>>
  createMember?: Maybe<Member>
  createMembers?: Maybe<Array<Maybe<Member>>>
  createNotifies?: Maybe<Array<Maybe<Notify>>>
  createNotify?: Maybe<Notify>
  createPhoto?: Maybe<Photo>
  createPhotos?: Maybe<Array<Maybe<Photo>>>
  createPick?: Maybe<Pick>
  createPicks?: Maybe<Array<Maybe<Pick>>>
  createPolicies?: Maybe<Array<Maybe<Policy>>>
  createPolicy?: Maybe<Policy>
  createPublisher?: Maybe<Publisher>
  createPublishers?: Maybe<Array<Maybe<Publisher>>>
  createSponsorship?: Maybe<Sponsorship>
  createSponsorships?: Maybe<Array<Maybe<Sponsorship>>>
  createStories?: Maybe<Array<Maybe<Story>>>
  createStory?: Maybe<Story>
  createTag?: Maybe<Tag>
  createTags?: Maybe<Array<Maybe<Tag>>>
  createTransaction?: Maybe<Transaction>
  createTransactions?: Maybe<Array<Maybe<Transaction>>>
  createUser?: Maybe<User>
  createUsers?: Maybe<Array<Maybe<User>>>
  deleteAnnouncement?: Maybe<Announcement>
  deleteAnnouncements?: Maybe<Array<Maybe<Announcement>>>
  deleteCategories?: Maybe<Array<Maybe<Category>>>
  deleteCategory?: Maybe<Category>
  deleteCollection?: Maybe<Collection>
  deleteCollectionMember?: Maybe<CollectionMember>
  deleteCollectionMembers?: Maybe<Array<Maybe<CollectionMember>>>
  deleteCollectionPick?: Maybe<CollectionPick>
  deleteCollectionPicks?: Maybe<Array<Maybe<CollectionPick>>>
  deleteCollections?: Maybe<Array<Maybe<Collection>>>
  deleteComment?: Maybe<Comment>
  deleteComments?: Maybe<Array<Maybe<Comment>>>
  deleteInvitationCode?: Maybe<InvitationCode>
  deleteInvitationCodes?: Maybe<Array<Maybe<InvitationCode>>>
  deleteMember?: Maybe<Member>
  deleteMembers?: Maybe<Array<Maybe<Member>>>
  deleteNotifies?: Maybe<Array<Maybe<Notify>>>
  deleteNotify?: Maybe<Notify>
  deletePhoto?: Maybe<Photo>
  deletePhotos?: Maybe<Array<Maybe<Photo>>>
  deletePick?: Maybe<Pick>
  deletePicks?: Maybe<Array<Maybe<Pick>>>
  deletePolicies?: Maybe<Array<Maybe<Policy>>>
  deletePolicy?: Maybe<Policy>
  deletePublisher?: Maybe<Publisher>
  deletePublishers?: Maybe<Array<Maybe<Publisher>>>
  deleteSponsorship?: Maybe<Sponsorship>
  deleteSponsorships?: Maybe<Array<Maybe<Sponsorship>>>
  deleteStories?: Maybe<Array<Maybe<Story>>>
  deleteStory?: Maybe<Story>
  deleteTag?: Maybe<Tag>
  deleteTags?: Maybe<Array<Maybe<Tag>>>
  deleteTransaction?: Maybe<Transaction>
  deleteTransactions?: Maybe<Array<Maybe<Transaction>>>
  deleteUser?: Maybe<User>
  deleteUsers?: Maybe<Array<Maybe<User>>>
  endSession: Scalars['Boolean']['output']
  updateAnnouncement?: Maybe<Announcement>
  updateAnnouncements?: Maybe<Array<Maybe<Announcement>>>
  updateCategories?: Maybe<Array<Maybe<Category>>>
  updateCategory?: Maybe<Category>
  updateCollection?: Maybe<Collection>
  updateCollectionMember?: Maybe<CollectionMember>
  updateCollectionMembers?: Maybe<Array<Maybe<CollectionMember>>>
  updateCollectionPick?: Maybe<CollectionPick>
  updateCollectionPicks?: Maybe<Array<Maybe<CollectionPick>>>
  updateCollections?: Maybe<Array<Maybe<Collection>>>
  updateComment?: Maybe<Comment>
  updateComments?: Maybe<Array<Maybe<Comment>>>
  updateInvitationCode?: Maybe<InvitationCode>
  updateInvitationCodes?: Maybe<Array<Maybe<InvitationCode>>>
  updateMember?: Maybe<Member>
  updateMembers?: Maybe<Array<Maybe<Member>>>
  updateNotifies?: Maybe<Array<Maybe<Notify>>>
  updateNotify?: Maybe<Notify>
  updatePhoto?: Maybe<Photo>
  updatePhotos?: Maybe<Array<Maybe<Photo>>>
  updatePick?: Maybe<Pick>
  updatePicks?: Maybe<Array<Maybe<Pick>>>
  updatePolicies?: Maybe<Array<Maybe<Policy>>>
  updatePolicy?: Maybe<Policy>
  updatePublisher?: Maybe<Publisher>
  updatePublishers?: Maybe<Array<Maybe<Publisher>>>
  updateSponsorship?: Maybe<Sponsorship>
  updateSponsorships?: Maybe<Array<Maybe<Sponsorship>>>
  updateStories?: Maybe<Array<Maybe<Story>>>
  updateStory?: Maybe<Story>
  updateTag?: Maybe<Tag>
  updateTags?: Maybe<Array<Maybe<Tag>>>
  updateTransaction?: Maybe<Transaction>
  updateTransactions?: Maybe<Array<Maybe<Transaction>>>
  updateUser?: Maybe<User>
  updateUsers?: Maybe<Array<Maybe<User>>>
}

export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type MutationCreateAnnouncementArgs = {
  data: AnnouncementCreateInput
}

export type MutationCreateAnnouncementsArgs = {
  data: Array<AnnouncementCreateInput>
}

export type MutationCreateCategoriesArgs = {
  data: Array<CategoryCreateInput>
}

export type MutationCreateCategoryArgs = {
  data: CategoryCreateInput
}

export type MutationCreateCollectionArgs = {
  data: CollectionCreateInput
}

export type MutationCreateCollectionMemberArgs = {
  data: CollectionMemberCreateInput
}

export type MutationCreateCollectionMembersArgs = {
  data: Array<CollectionMemberCreateInput>
}

export type MutationCreateCollectionPickArgs = {
  data: CollectionPickCreateInput
}

export type MutationCreateCollectionPicksArgs = {
  data: Array<CollectionPickCreateInput>
}

export type MutationCreateCollectionsArgs = {
  data: Array<CollectionCreateInput>
}

export type MutationCreateCommentArgs = {
  data: CommentCreateInput
}

export type MutationCreateCommentsArgs = {
  data: Array<CommentCreateInput>
}

export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput
}

export type MutationCreateInvitationCodeArgs = {
  data: InvitationCodeCreateInput
}

export type MutationCreateInvitationCodesArgs = {
  data: Array<InvitationCodeCreateInput>
}

export type MutationCreateMemberArgs = {
  data: MemberCreateInput
}

export type MutationCreateMembersArgs = {
  data: Array<MemberCreateInput>
}

export type MutationCreateNotifiesArgs = {
  data: Array<NotifyCreateInput>
}

export type MutationCreateNotifyArgs = {
  data: NotifyCreateInput
}

export type MutationCreatePhotoArgs = {
  data: PhotoCreateInput
}

export type MutationCreatePhotosArgs = {
  data: Array<PhotoCreateInput>
}

export type MutationCreatePickArgs = {
  data: PickCreateInput
}

export type MutationCreatePicksArgs = {
  data: Array<PickCreateInput>
}

export type MutationCreatePoliciesArgs = {
  data: Array<PolicyCreateInput>
}

export type MutationCreatePolicyArgs = {
  data: PolicyCreateInput
}

export type MutationCreatePublisherArgs = {
  data: PublisherCreateInput
}

export type MutationCreatePublishersArgs = {
  data: Array<PublisherCreateInput>
}

export type MutationCreateSponsorshipArgs = {
  data: SponsorshipCreateInput
}

export type MutationCreateSponsorshipsArgs = {
  data: Array<SponsorshipCreateInput>
}

export type MutationCreateStoriesArgs = {
  data: Array<StoryCreateInput>
}

export type MutationCreateStoryArgs = {
  data: StoryCreateInput
}

export type MutationCreateTagArgs = {
  data: TagCreateInput
}

export type MutationCreateTagsArgs = {
  data: Array<TagCreateInput>
}

export type MutationCreateTransactionArgs = {
  data: TransactionCreateInput
}

export type MutationCreateTransactionsArgs = {
  data: Array<TransactionCreateInput>
}

export type MutationCreateUserArgs = {
  data: UserCreateInput
}

export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>
}

export type MutationDeleteAnnouncementArgs = {
  where: AnnouncementWhereUniqueInput
}

export type MutationDeleteAnnouncementsArgs = {
  where: Array<AnnouncementWhereUniqueInput>
}

export type MutationDeleteCategoriesArgs = {
  where: Array<CategoryWhereUniqueInput>
}

export type MutationDeleteCategoryArgs = {
  where: CategoryWhereUniqueInput
}

export type MutationDeleteCollectionArgs = {
  where: CollectionWhereUniqueInput
}

export type MutationDeleteCollectionMemberArgs = {
  where: CollectionMemberWhereUniqueInput
}

export type MutationDeleteCollectionMembersArgs = {
  where: Array<CollectionMemberWhereUniqueInput>
}

export type MutationDeleteCollectionPickArgs = {
  where: CollectionPickWhereUniqueInput
}

export type MutationDeleteCollectionPicksArgs = {
  where: Array<CollectionPickWhereUniqueInput>
}

export type MutationDeleteCollectionsArgs = {
  where: Array<CollectionWhereUniqueInput>
}

export type MutationDeleteCommentArgs = {
  where: CommentWhereUniqueInput
}

export type MutationDeleteCommentsArgs = {
  where: Array<CommentWhereUniqueInput>
}

export type MutationDeleteInvitationCodeArgs = {
  where: InvitationCodeWhereUniqueInput
}

export type MutationDeleteInvitationCodesArgs = {
  where: Array<InvitationCodeWhereUniqueInput>
}

export type MutationDeleteMemberArgs = {
  where: MemberWhereUniqueInput
}

export type MutationDeleteMembersArgs = {
  where: Array<MemberWhereUniqueInput>
}

export type MutationDeleteNotifiesArgs = {
  where: Array<NotifyWhereUniqueInput>
}

export type MutationDeleteNotifyArgs = {
  where: NotifyWhereUniqueInput
}

export type MutationDeletePhotoArgs = {
  where: PhotoWhereUniqueInput
}

export type MutationDeletePhotosArgs = {
  where: Array<PhotoWhereUniqueInput>
}

export type MutationDeletePickArgs = {
  where: PickWhereUniqueInput
}

export type MutationDeletePicksArgs = {
  where: Array<PickWhereUniqueInput>
}

export type MutationDeletePoliciesArgs = {
  where: Array<PolicyWhereUniqueInput>
}

export type MutationDeletePolicyArgs = {
  where: PolicyWhereUniqueInput
}

export type MutationDeletePublisherArgs = {
  where: PublisherWhereUniqueInput
}

export type MutationDeletePublishersArgs = {
  where: Array<PublisherWhereUniqueInput>
}

export type MutationDeleteSponsorshipArgs = {
  where: SponsorshipWhereUniqueInput
}

export type MutationDeleteSponsorshipsArgs = {
  where: Array<SponsorshipWhereUniqueInput>
}

export type MutationDeleteStoriesArgs = {
  where: Array<StoryWhereUniqueInput>
}

export type MutationDeleteStoryArgs = {
  where: StoryWhereUniqueInput
}

export type MutationDeleteTagArgs = {
  where: TagWhereUniqueInput
}

export type MutationDeleteTagsArgs = {
  where: Array<TagWhereUniqueInput>
}

export type MutationDeleteTransactionArgs = {
  where: TransactionWhereUniqueInput
}

export type MutationDeleteTransactionsArgs = {
  where: Array<TransactionWhereUniqueInput>
}

export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput
}

export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>
}

export type MutationUpdateAnnouncementArgs = {
  data: AnnouncementUpdateInput
  where: AnnouncementWhereUniqueInput
}

export type MutationUpdateAnnouncementsArgs = {
  data: Array<AnnouncementUpdateArgs>
}

export type MutationUpdateCategoriesArgs = {
  data: Array<CategoryUpdateArgs>
}

export type MutationUpdateCategoryArgs = {
  data: CategoryUpdateInput
  where: CategoryWhereUniqueInput
}

export type MutationUpdateCollectionArgs = {
  data: CollectionUpdateInput
  where: CollectionWhereUniqueInput
}

export type MutationUpdateCollectionMemberArgs = {
  data: CollectionMemberUpdateInput
  where: CollectionMemberWhereUniqueInput
}

export type MutationUpdateCollectionMembersArgs = {
  data: Array<CollectionMemberUpdateArgs>
}

export type MutationUpdateCollectionPickArgs = {
  data: CollectionPickUpdateInput
  where: CollectionPickWhereUniqueInput
}

export type MutationUpdateCollectionPicksArgs = {
  data: Array<CollectionPickUpdateArgs>
}

export type MutationUpdateCollectionsArgs = {
  data: Array<CollectionUpdateArgs>
}

export type MutationUpdateCommentArgs = {
  data: CommentUpdateInput
  where: CommentWhereUniqueInput
}

export type MutationUpdateCommentsArgs = {
  data: Array<CommentUpdateArgs>
}

export type MutationUpdateInvitationCodeArgs = {
  data: InvitationCodeUpdateInput
  where: InvitationCodeWhereUniqueInput
}

export type MutationUpdateInvitationCodesArgs = {
  data: Array<InvitationCodeUpdateArgs>
}

export type MutationUpdateMemberArgs = {
  data: MemberUpdateInput
  where: MemberWhereUniqueInput
}

export type MutationUpdateMembersArgs = {
  data: Array<MemberUpdateArgs>
}

export type MutationUpdateNotifiesArgs = {
  data: Array<NotifyUpdateArgs>
}

export type MutationUpdateNotifyArgs = {
  data: NotifyUpdateInput
  where: NotifyWhereUniqueInput
}

export type MutationUpdatePhotoArgs = {
  data: PhotoUpdateInput
  where: PhotoWhereUniqueInput
}

export type MutationUpdatePhotosArgs = {
  data: Array<PhotoUpdateArgs>
}

export type MutationUpdatePickArgs = {
  data: PickUpdateInput
  where: PickWhereUniqueInput
}

export type MutationUpdatePicksArgs = {
  data: Array<PickUpdateArgs>
}

export type MutationUpdatePoliciesArgs = {
  data: Array<PolicyUpdateArgs>
}

export type MutationUpdatePolicyArgs = {
  data: PolicyUpdateInput
  where: PolicyWhereUniqueInput
}

export type MutationUpdatePublisherArgs = {
  data: PublisherUpdateInput
  where: PublisherWhereUniqueInput
}

export type MutationUpdatePublishersArgs = {
  data: Array<PublisherUpdateArgs>
}

export type MutationUpdateSponsorshipArgs = {
  data: SponsorshipUpdateInput
  where: SponsorshipWhereUniqueInput
}

export type MutationUpdateSponsorshipsArgs = {
  data: Array<SponsorshipUpdateArgs>
}

export type MutationUpdateStoriesArgs = {
  data: Array<StoryUpdateArgs>
}

export type MutationUpdateStoryArgs = {
  data: StoryUpdateInput
  where: StoryWhereUniqueInput
}

export type MutationUpdateTagArgs = {
  data: TagUpdateInput
  where: TagWhereUniqueInput
}

export type MutationUpdateTagsArgs = {
  data: Array<TagUpdateArgs>
}

export type MutationUpdateTransactionArgs = {
  data: TransactionUpdateInput
  where: TransactionWhereUniqueInput
}

export type MutationUpdateTransactionsArgs = {
  data: Array<TransactionUpdateArgs>
}

export type MutationUpdateUserArgs = {
  data: UserUpdateInput
  where: UserWhereUniqueInput
}

export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>
}

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  equals?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  not?: InputMaybe<NestedStringFilter>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  equals?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  not?: InputMaybe<NestedStringNullableFilter>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export type Notify = {
  __typename?: 'Notify'
  action_date?: Maybe<Scalars['DateTime']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  id: Scalars['ID']['output']
  member?: Maybe<Member>
  object_id?: Maybe<Scalars['Int']['output']>
  objective?: Maybe<Scalars['String']['output']>
  sender?: Maybe<Member>
  state?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type NotifyCreateInput = {
  action_date?: InputMaybe<Scalars['DateTime']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  member?: InputMaybe<MemberRelateToOneForCreateInput>
  object_id?: InputMaybe<Scalars['Int']['input']>
  objective?: InputMaybe<Scalars['String']['input']>
  sender?: InputMaybe<MemberRelateToOneForCreateInput>
  state?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type NotifyOrderByInput = {
  action_date?: InputMaybe<OrderDirection>
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  object_id?: InputMaybe<OrderDirection>
  objective?: InputMaybe<OrderDirection>
  state?: InputMaybe<OrderDirection>
  type?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type NotifyUpdateArgs = {
  data: NotifyUpdateInput
  where: NotifyWhereUniqueInput
}

export type NotifyUpdateInput = {
  action_date?: InputMaybe<Scalars['DateTime']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  member?: InputMaybe<MemberRelateToOneForUpdateInput>
  object_id?: InputMaybe<Scalars['Int']['input']>
  objective?: InputMaybe<Scalars['String']['input']>
  sender?: InputMaybe<MemberRelateToOneForUpdateInput>
  state?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type NotifyWhereInput = {
  AND?: InputMaybe<Array<NotifyWhereInput>>
  NOT?: InputMaybe<Array<NotifyWhereInput>>
  OR?: InputMaybe<Array<NotifyWhereInput>>
  action_date?: InputMaybe<DateTimeNullableFilter>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  id?: InputMaybe<IdFilter>
  member?: InputMaybe<MemberWhereInput>
  object_id?: InputMaybe<IntNullableFilter>
  objective?: InputMaybe<StringNullableFilter>
  sender?: InputMaybe<MemberWhereInput>
  state?: InputMaybe<StringNullableFilter>
  type?: InputMaybe<StringNullableFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type NotifyWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type PasswordState = {
  __typename?: 'PasswordState'
  isSet: Scalars['Boolean']['output']
}

export type Photo = {
  __typename?: 'Photo'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  file?: Maybe<ImageFieldOutput>
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  resized?: Maybe<ResizedImages>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
  urlOriginal?: Maybe<Scalars['String']['output']>
}

export type PhotoCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  file?: InputMaybe<ImageFieldInput>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
  urlOriginal?: InputMaybe<Scalars['String']['input']>
}

export type PhotoOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
  urlOriginal?: InputMaybe<OrderDirection>
}

export type PhotoRelateToOneForCreateInput = {
  connect?: InputMaybe<PhotoWhereUniqueInput>
  create?: InputMaybe<PhotoCreateInput>
}

export type PhotoRelateToOneForUpdateInput = {
  connect?: InputMaybe<PhotoWhereUniqueInput>
  create?: InputMaybe<PhotoCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type PhotoUpdateArgs = {
  data: PhotoUpdateInput
  where: PhotoWhereUniqueInput
}

export type PhotoUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  file?: InputMaybe<ImageFieldInput>
  name?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
  urlOriginal?: InputMaybe<Scalars['String']['input']>
}

export type PhotoWhereInput = {
  AND?: InputMaybe<Array<PhotoWhereInput>>
  NOT?: InputMaybe<Array<PhotoWhereInput>>
  OR?: InputMaybe<Array<PhotoWhereInput>>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  id?: InputMaybe<IdFilter>
  name?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
  urlOriginal?: InputMaybe<StringFilter>
}

export type PhotoWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type Pick = {
  __typename?: 'Pick'
  collection?: Maybe<Collection>
  comment?: Maybe<Comment>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  id: Scalars['ID']['output']
  is_active?: Maybe<Scalars['Boolean']['output']>
  kind?: Maybe<Scalars['String']['output']>
  member?: Maybe<Member>
  objective?: Maybe<Scalars['String']['output']>
  paywall?: Maybe<Scalars['Boolean']['output']>
  pick_comment?: Maybe<Array<Comment>>
  pick_commentCount?: Maybe<Scalars['Int']['output']>
  picked_date?: Maybe<Scalars['DateTime']['output']>
  state?: Maybe<Scalars['String']['output']>
  story?: Maybe<Story>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type PickPick_CommentArgs = {
  orderBy?: Array<CommentOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CommentWhereInput
}

export type PickPick_CommentCountArgs = {
  where?: CommentWhereInput
}

export type PickCreateInput = {
  collection?: InputMaybe<CollectionRelateToOneForCreateInput>
  comment?: InputMaybe<CommentRelateToOneForCreateInput>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  kind?: InputMaybe<Scalars['String']['input']>
  member?: InputMaybe<MemberRelateToOneForCreateInput>
  objective?: InputMaybe<Scalars['String']['input']>
  paywall?: InputMaybe<Scalars['Boolean']['input']>
  pick_comment?: InputMaybe<CommentRelateToManyForCreateInput>
  picked_date?: InputMaybe<Scalars['DateTime']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  story?: InputMaybe<StoryRelateToOneForCreateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type PickManyRelationFilter = {
  every?: InputMaybe<PickWhereInput>
  none?: InputMaybe<PickWhereInput>
  some?: InputMaybe<PickWhereInput>
}

export type PickOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  is_active?: InputMaybe<OrderDirection>
  kind?: InputMaybe<OrderDirection>
  objective?: InputMaybe<OrderDirection>
  paywall?: InputMaybe<OrderDirection>
  picked_date?: InputMaybe<OrderDirection>
  state?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type PickRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PickWhereUniqueInput>>
  create?: InputMaybe<Array<PickCreateInput>>
}

export type PickRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PickWhereUniqueInput>>
  create?: InputMaybe<Array<PickCreateInput>>
  disconnect?: InputMaybe<Array<PickWhereUniqueInput>>
  set?: InputMaybe<Array<PickWhereUniqueInput>>
}

export type PickUpdateArgs = {
  data: PickUpdateInput
  where: PickWhereUniqueInput
}

export type PickUpdateInput = {
  collection?: InputMaybe<CollectionRelateToOneForUpdateInput>
  comment?: InputMaybe<CommentRelateToOneForUpdateInput>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  kind?: InputMaybe<Scalars['String']['input']>
  member?: InputMaybe<MemberRelateToOneForUpdateInput>
  objective?: InputMaybe<Scalars['String']['input']>
  paywall?: InputMaybe<Scalars['Boolean']['input']>
  pick_comment?: InputMaybe<CommentRelateToManyForUpdateInput>
  picked_date?: InputMaybe<Scalars['DateTime']['input']>
  state?: InputMaybe<Scalars['String']['input']>
  story?: InputMaybe<StoryRelateToOneForUpdateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type PickWhereInput = {
  AND?: InputMaybe<Array<PickWhereInput>>
  NOT?: InputMaybe<Array<PickWhereInput>>
  OR?: InputMaybe<Array<PickWhereInput>>
  collection?: InputMaybe<CollectionWhereInput>
  comment?: InputMaybe<CommentWhereInput>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  id?: InputMaybe<IdFilter>
  is_active?: InputMaybe<BooleanFilter>
  kind?: InputMaybe<StringNullableFilter>
  member?: InputMaybe<MemberWhereInput>
  objective?: InputMaybe<StringNullableFilter>
  paywall?: InputMaybe<BooleanFilter>
  pick_comment?: InputMaybe<CommentManyRelationFilter>
  picked_date?: InputMaybe<DateTimeNullableFilter>
  state?: InputMaybe<StringNullableFilter>
  story?: InputMaybe<StoryWhereInput>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type PickWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type Policy = {
  __typename?: 'Policy'
  charge?: Maybe<Scalars['Float']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  duration?: Maybe<Scalars['Int']['output']>
  explanation?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  publisher?: Maybe<Publisher>
  type?: Maybe<PolicyTypeType>
  unlockSingle?: Maybe<Scalars['Boolean']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type PolicyCreateInput = {
  charge?: InputMaybe<Scalars['Float']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  duration?: InputMaybe<Scalars['Int']['input']>
  explanation?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publisher?: InputMaybe<PublisherRelateToOneForCreateInput>
  type?: InputMaybe<PolicyTypeType>
  unlockSingle?: InputMaybe<Scalars['Boolean']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type PolicyOrderByInput = {
  charge?: InputMaybe<OrderDirection>
  createdAt?: InputMaybe<OrderDirection>
  duration?: InputMaybe<OrderDirection>
  explanation?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  type?: InputMaybe<OrderDirection>
  unlockSingle?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type PolicyRelateToOneForCreateInput = {
  connect?: InputMaybe<PolicyWhereUniqueInput>
  create?: InputMaybe<PolicyCreateInput>
}

export type PolicyRelateToOneForUpdateInput = {
  connect?: InputMaybe<PolicyWhereUniqueInput>
  create?: InputMaybe<PolicyCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export enum PolicyTypeType {
  Deposit = 'deposit',
  UnlockAllPublishers = 'unlock_all_publishers',
  UnlockOnePublisher = 'unlock_one_publisher',
}

export type PolicyTypeTypeNullableFilter = {
  equals?: InputMaybe<PolicyTypeType>
  in?: InputMaybe<Array<PolicyTypeType>>
  not?: InputMaybe<PolicyTypeTypeNullableFilter>
  notIn?: InputMaybe<Array<PolicyTypeType>>
}

export type PolicyUpdateArgs = {
  data: PolicyUpdateInput
  where: PolicyWhereUniqueInput
}

export type PolicyUpdateInput = {
  charge?: InputMaybe<Scalars['Float']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  duration?: InputMaybe<Scalars['Int']['input']>
  explanation?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publisher?: InputMaybe<PublisherRelateToOneForUpdateInput>
  type?: InputMaybe<PolicyTypeType>
  unlockSingle?: InputMaybe<Scalars['Boolean']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type PolicyWhereInput = {
  AND?: InputMaybe<Array<PolicyWhereInput>>
  NOT?: InputMaybe<Array<PolicyWhereInput>>
  OR?: InputMaybe<Array<PolicyWhereInput>>
  charge?: InputMaybe<FloatNullableFilter>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  duration?: InputMaybe<IntNullableFilter>
  explanation?: InputMaybe<StringFilter>
  id?: InputMaybe<IdFilter>
  name?: InputMaybe<StringFilter>
  publisher?: InputMaybe<PublisherWhereInput>
  type?: InputMaybe<PolicyTypeTypeNullableFilter>
  unlockSingle?: InputMaybe<BooleanFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type PolicyWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type Publisher = {
  __typename?: 'Publisher'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  customId?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  follower?: Maybe<Array<Member>>
  followerCount?: Maybe<Scalars['Int']['output']>
  full_content?: Maybe<Scalars['Boolean']['output']>
  full_screen_ad?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  lang?: Maybe<Scalars['String']['output']>
  logo?: Maybe<Scalars['String']['output']>
  official_site?: Maybe<Scalars['String']['output']>
  paywall?: Maybe<Scalars['Boolean']['output']>
  rss?: Maybe<Scalars['String']['output']>
  source_type?: Maybe<Scalars['String']['output']>
  sponsored?: Maybe<Array<Sponsorship>>
  sponsoredCount?: Maybe<Scalars['Int']['output']>
  summary?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
  wallet?: Maybe<Scalars['String']['output']>
}

export type PublisherFollowerArgs = {
  orderBy?: Array<MemberOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: MemberWhereInput
}

export type PublisherFollowerCountArgs = {
  where?: MemberWhereInput
}

export type PublisherSponsoredArgs = {
  orderBy?: Array<SponsorshipOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: SponsorshipWhereInput
}

export type PublisherSponsoredCountArgs = {
  where?: SponsorshipWhereInput
}

export type PublisherCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  customId?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  follower?: InputMaybe<MemberRelateToManyForCreateInput>
  full_content?: InputMaybe<Scalars['Boolean']['input']>
  full_screen_ad?: InputMaybe<Scalars['String']['input']>
  lang?: InputMaybe<Scalars['String']['input']>
  logo?: InputMaybe<Scalars['String']['input']>
  official_site?: InputMaybe<Scalars['String']['input']>
  paywall?: InputMaybe<Scalars['Boolean']['input']>
  rss?: InputMaybe<Scalars['String']['input']>
  source_type?: InputMaybe<Scalars['String']['input']>
  sponsored?: InputMaybe<SponsorshipRelateToManyForCreateInput>
  summary?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
  wallet?: InputMaybe<Scalars['String']['input']>
}

export type PublisherManyRelationFilter = {
  every?: InputMaybe<PublisherWhereInput>
  none?: InputMaybe<PublisherWhereInput>
  some?: InputMaybe<PublisherWhereInput>
}

export type PublisherOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  customId?: InputMaybe<OrderDirection>
  description?: InputMaybe<OrderDirection>
  full_content?: InputMaybe<OrderDirection>
  full_screen_ad?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  lang?: InputMaybe<OrderDirection>
  logo?: InputMaybe<OrderDirection>
  official_site?: InputMaybe<OrderDirection>
  paywall?: InputMaybe<OrderDirection>
  rss?: InputMaybe<OrderDirection>
  source_type?: InputMaybe<OrderDirection>
  summary?: InputMaybe<OrderDirection>
  title?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
  wallet?: InputMaybe<OrderDirection>
}

export type PublisherRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PublisherWhereUniqueInput>>
  create?: InputMaybe<Array<PublisherCreateInput>>
}

export type PublisherRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PublisherWhereUniqueInput>>
  create?: InputMaybe<Array<PublisherCreateInput>>
  disconnect?: InputMaybe<Array<PublisherWhereUniqueInput>>
  set?: InputMaybe<Array<PublisherWhereUniqueInput>>
}

export type PublisherRelateToOneForCreateInput = {
  connect?: InputMaybe<PublisherWhereUniqueInput>
  create?: InputMaybe<PublisherCreateInput>
}

export type PublisherRelateToOneForUpdateInput = {
  connect?: InputMaybe<PublisherWhereUniqueInput>
  create?: InputMaybe<PublisherCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type PublisherUpdateArgs = {
  data: PublisherUpdateInput
  where: PublisherWhereUniqueInput
}

export type PublisherUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  customId?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  follower?: InputMaybe<MemberRelateToManyForUpdateInput>
  full_content?: InputMaybe<Scalars['Boolean']['input']>
  full_screen_ad?: InputMaybe<Scalars['String']['input']>
  lang?: InputMaybe<Scalars['String']['input']>
  logo?: InputMaybe<Scalars['String']['input']>
  official_site?: InputMaybe<Scalars['String']['input']>
  paywall?: InputMaybe<Scalars['Boolean']['input']>
  rss?: InputMaybe<Scalars['String']['input']>
  source_type?: InputMaybe<Scalars['String']['input']>
  sponsored?: InputMaybe<SponsorshipRelateToManyForUpdateInput>
  summary?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
  wallet?: InputMaybe<Scalars['String']['input']>
}

export type PublisherWhereInput = {
  AND?: InputMaybe<Array<PublisherWhereInput>>
  NOT?: InputMaybe<Array<PublisherWhereInput>>
  OR?: InputMaybe<Array<PublisherWhereInput>>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  customId?: InputMaybe<StringFilter>
  description?: InputMaybe<StringFilter>
  follower?: InputMaybe<MemberManyRelationFilter>
  full_content?: InputMaybe<BooleanFilter>
  full_screen_ad?: InputMaybe<StringNullableFilter>
  id?: InputMaybe<IdFilter>
  lang?: InputMaybe<StringNullableFilter>
  logo?: InputMaybe<StringFilter>
  official_site?: InputMaybe<StringFilter>
  paywall?: InputMaybe<BooleanFilter>
  rss?: InputMaybe<StringFilter>
  source_type?: InputMaybe<StringNullableFilter>
  sponsored?: InputMaybe<SponsorshipManyRelationFilter>
  summary?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
  wallet?: InputMaybe<StringFilter>
}

export type PublisherWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type Query = {
  __typename?: 'Query'
  announcement?: Maybe<Announcement>
  announcements?: Maybe<Array<Announcement>>
  announcementsCount?: Maybe<Scalars['Int']['output']>
  authenticatedItem?: Maybe<AuthenticatedItem>
  categories?: Maybe<Array<Category>>
  categoriesCount?: Maybe<Scalars['Int']['output']>
  category?: Maybe<Category>
  collection?: Maybe<Collection>
  collectionMember?: Maybe<CollectionMember>
  collectionMembers?: Maybe<Array<CollectionMember>>
  collectionMembersCount?: Maybe<Scalars['Int']['output']>
  collectionPick?: Maybe<CollectionPick>
  collectionPicks?: Maybe<Array<CollectionPick>>
  collectionPicksCount?: Maybe<Scalars['Int']['output']>
  collections?: Maybe<Array<Collection>>
  collectionsCount?: Maybe<Scalars['Int']['output']>
  comment?: Maybe<Comment>
  comments?: Maybe<Array<Comment>>
  commentsCount?: Maybe<Scalars['Int']['output']>
  invitationCode?: Maybe<InvitationCode>
  invitationCodes?: Maybe<Array<InvitationCode>>
  invitationCodesCount?: Maybe<Scalars['Int']['output']>
  keystone: KeystoneMeta
  member?: Maybe<Member>
  members?: Maybe<Array<Member>>
  membersCount?: Maybe<Scalars['Int']['output']>
  notifies?: Maybe<Array<Notify>>
  notifiesCount?: Maybe<Scalars['Int']['output']>
  notify?: Maybe<Notify>
  photo?: Maybe<Photo>
  photos?: Maybe<Array<Photo>>
  photosCount?: Maybe<Scalars['Int']['output']>
  pick?: Maybe<Pick>
  picks?: Maybe<Array<Pick>>
  picksCount?: Maybe<Scalars['Int']['output']>
  policies?: Maybe<Array<Policy>>
  policiesCount?: Maybe<Scalars['Int']['output']>
  policy?: Maybe<Policy>
  publisher?: Maybe<Publisher>
  publishers?: Maybe<Array<Publisher>>
  publishersCount?: Maybe<Scalars['Int']['output']>
  sponsorship?: Maybe<Sponsorship>
  sponsorships?: Maybe<Array<Sponsorship>>
  sponsorshipsCount?: Maybe<Scalars['Int']['output']>
  stories?: Maybe<Array<Story>>
  storiesCount?: Maybe<Scalars['Int']['output']>
  story?: Maybe<Story>
  tag?: Maybe<Tag>
  tags?: Maybe<Array<Tag>>
  tagsCount?: Maybe<Scalars['Int']['output']>
  transaction?: Maybe<Transaction>
  transactions?: Maybe<Array<Transaction>>
  transactionsCount?: Maybe<Scalars['Int']['output']>
  user?: Maybe<User>
  users?: Maybe<Array<User>>
  usersCount?: Maybe<Scalars['Int']['output']>
}

export type QueryAnnouncementArgs = {
  where: AnnouncementWhereUniqueInput
}

export type QueryAnnouncementsArgs = {
  orderBy?: Array<AnnouncementOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: AnnouncementWhereInput
}

export type QueryAnnouncementsCountArgs = {
  where?: AnnouncementWhereInput
}

export type QueryCategoriesArgs = {
  orderBy?: Array<CategoryOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CategoryWhereInput
}

export type QueryCategoriesCountArgs = {
  where?: CategoryWhereInput
}

export type QueryCategoryArgs = {
  where: CategoryWhereUniqueInput
}

export type QueryCollectionArgs = {
  where: CollectionWhereUniqueInput
}

export type QueryCollectionMemberArgs = {
  where: CollectionMemberWhereUniqueInput
}

export type QueryCollectionMembersArgs = {
  orderBy?: Array<CollectionMemberOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CollectionMemberWhereInput
}

export type QueryCollectionMembersCountArgs = {
  where?: CollectionMemberWhereInput
}

export type QueryCollectionPickArgs = {
  where: CollectionPickWhereUniqueInput
}

export type QueryCollectionPicksArgs = {
  orderBy?: Array<CollectionPickOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CollectionPickWhereInput
}

export type QueryCollectionPicksCountArgs = {
  where?: CollectionPickWhereInput
}

export type QueryCollectionsArgs = {
  orderBy?: Array<CollectionOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CollectionWhereInput
}

export type QueryCollectionsCountArgs = {
  where?: CollectionWhereInput
}

export type QueryCommentArgs = {
  where: CommentWhereUniqueInput
}

export type QueryCommentsArgs = {
  orderBy?: Array<CommentOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CommentWhereInput
}

export type QueryCommentsCountArgs = {
  where?: CommentWhereInput
}

export type QueryInvitationCodeArgs = {
  where: InvitationCodeWhereUniqueInput
}

export type QueryInvitationCodesArgs = {
  orderBy?: Array<InvitationCodeOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: InvitationCodeWhereInput
}

export type QueryInvitationCodesCountArgs = {
  where?: InvitationCodeWhereInput
}

export type QueryMemberArgs = {
  where: MemberWhereUniqueInput
}

export type QueryMembersArgs = {
  orderBy?: Array<MemberOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: MemberWhereInput
}

export type QueryMembersCountArgs = {
  where?: MemberWhereInput
}

export type QueryNotifiesArgs = {
  orderBy?: Array<NotifyOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: NotifyWhereInput
}

export type QueryNotifiesCountArgs = {
  where?: NotifyWhereInput
}

export type QueryNotifyArgs = {
  where: NotifyWhereUniqueInput
}

export type QueryPhotoArgs = {
  where: PhotoWhereUniqueInput
}

export type QueryPhotosArgs = {
  orderBy?: Array<PhotoOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PhotoWhereInput
}

export type QueryPhotosCountArgs = {
  where?: PhotoWhereInput
}

export type QueryPickArgs = {
  where: PickWhereUniqueInput
}

export type QueryPicksArgs = {
  orderBy?: Array<PickOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PickWhereInput
}

export type QueryPicksCountArgs = {
  where?: PickWhereInput
}

export type QueryPoliciesArgs = {
  orderBy?: Array<PolicyOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PolicyWhereInput
}

export type QueryPoliciesCountArgs = {
  where?: PolicyWhereInput
}

export type QueryPolicyArgs = {
  where: PolicyWhereUniqueInput
}

export type QueryPublisherArgs = {
  where: PublisherWhereUniqueInput
}

export type QueryPublishersArgs = {
  orderBy?: Array<PublisherOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PublisherWhereInput
}

export type QueryPublishersCountArgs = {
  where?: PublisherWhereInput
}

export type QuerySponsorshipArgs = {
  where: SponsorshipWhereUniqueInput
}

export type QuerySponsorshipsArgs = {
  orderBy?: Array<SponsorshipOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: SponsorshipWhereInput
}

export type QuerySponsorshipsCountArgs = {
  where?: SponsorshipWhereInput
}

export type QueryStoriesArgs = {
  orderBy?: Array<StoryOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: StoryWhereInput
}

export type QueryStoriesCountArgs = {
  where?: StoryWhereInput
}

export type QueryStoryArgs = {
  where: StoryWhereUniqueInput
}

export type QueryTagArgs = {
  where: TagWhereUniqueInput
}

export type QueryTagsArgs = {
  orderBy?: Array<TagOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: TagWhereInput
}

export type QueryTagsCountArgs = {
  where?: TagWhereInput
}

export type QueryTransactionArgs = {
  where: TransactionWhereUniqueInput
}

export type QueryTransactionsArgs = {
  orderBy?: Array<TransactionOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: TransactionWhereInput
}

export type QueryTransactionsCountArgs = {
  where?: TransactionWhereInput
}

export type QueryUserArgs = {
  where: UserWhereUniqueInput
}

export type QueryUsersArgs = {
  orderBy?: Array<UserOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: UserWhereInput
}

export type QueryUsersCountArgs = {
  where?: UserWhereInput
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type ResizedImages = {
  __typename?: 'ResizedImages'
  original?: Maybe<Scalars['String']['output']>
  w480?: Maybe<Scalars['String']['output']>
  w800?: Maybe<Scalars['String']['output']>
  w1200?: Maybe<Scalars['String']['output']>
  w1600?: Maybe<Scalars['String']['output']>
  w2400?: Maybe<Scalars['String']['output']>
}

export type Sponsorship = {
  __typename?: 'Sponsorship'
  complement?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  fee?: Maybe<Scalars['Float']['output']>
  id: Scalars['ID']['output']
  publisher?: Maybe<Publisher>
  sponsor?: Maybe<Member>
  status?: Maybe<SponsorshipStatusType>
  tid?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type SponsorshipCreateInput = {
  complement?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  fee?: InputMaybe<Scalars['Float']['input']>
  publisher?: InputMaybe<PublisherRelateToOneForCreateInput>
  sponsor?: InputMaybe<MemberRelateToOneForCreateInput>
  status?: InputMaybe<SponsorshipStatusType>
  tid?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type SponsorshipManyRelationFilter = {
  every?: InputMaybe<SponsorshipWhereInput>
  none?: InputMaybe<SponsorshipWhereInput>
  some?: InputMaybe<SponsorshipWhereInput>
}

export type SponsorshipOrderByInput = {
  complement?: InputMaybe<OrderDirection>
  createdAt?: InputMaybe<OrderDirection>
  fee?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  status?: InputMaybe<OrderDirection>
  tid?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type SponsorshipRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<SponsorshipWhereUniqueInput>>
  create?: InputMaybe<Array<SponsorshipCreateInput>>
}

export type SponsorshipRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<SponsorshipWhereUniqueInput>>
  create?: InputMaybe<Array<SponsorshipCreateInput>>
  disconnect?: InputMaybe<Array<SponsorshipWhereUniqueInput>>
  set?: InputMaybe<Array<SponsorshipWhereUniqueInput>>
}

export enum SponsorshipStatusType {
  Failed = 'Failed',
  Success = 'Success',
}

export type SponsorshipStatusTypeNullableFilter = {
  equals?: InputMaybe<SponsorshipStatusType>
  in?: InputMaybe<Array<SponsorshipStatusType>>
  not?: InputMaybe<SponsorshipStatusTypeNullableFilter>
  notIn?: InputMaybe<Array<SponsorshipStatusType>>
}

export type SponsorshipUpdateArgs = {
  data: SponsorshipUpdateInput
  where: SponsorshipWhereUniqueInput
}

export type SponsorshipUpdateInput = {
  complement?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  fee?: InputMaybe<Scalars['Float']['input']>
  publisher?: InputMaybe<PublisherRelateToOneForUpdateInput>
  sponsor?: InputMaybe<MemberRelateToOneForUpdateInput>
  status?: InputMaybe<SponsorshipStatusType>
  tid?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type SponsorshipWhereInput = {
  AND?: InputMaybe<Array<SponsorshipWhereInput>>
  NOT?: InputMaybe<Array<SponsorshipWhereInput>>
  OR?: InputMaybe<Array<SponsorshipWhereInput>>
  complement?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  fee?: InputMaybe<FloatNullableFilter>
  id?: InputMaybe<IdFilter>
  publisher?: InputMaybe<PublisherWhereInput>
  sponsor?: InputMaybe<MemberWhereInput>
  status?: InputMaybe<SponsorshipStatusTypeNullableFilter>
  tid?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type SponsorshipWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type Story = {
  __typename?: 'Story'
  apiData?: Maybe<Scalars['JSON']['output']>
  author?: Maybe<Member>
  category?: Maybe<Category>
  comment?: Maybe<Array<Comment>>
  commentCount?: Maybe<Scalars['Int']['output']>
  content?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  full_content?: Maybe<Scalars['Boolean']['output']>
  full_screen_ad?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  isMember?: Maybe<Scalars['Boolean']['output']>
  is_active?: Maybe<Scalars['Boolean']['output']>
  og_description?: Maybe<Scalars['String']['output']>
  og_image?: Maybe<Scalars['String']['output']>
  og_title?: Maybe<Scalars['String']['output']>
  origid?: Maybe<Scalars['String']['output']>
  paywall?: Maybe<Scalars['Boolean']['output']>
  pick?: Maybe<Array<Pick>>
  pickCount?: Maybe<Scalars['Int']['output']>
  published_date?: Maybe<Scalars['DateTime']['output']>
  related?: Maybe<Array<Story>>
  relatedCount?: Maybe<Scalars['Int']['output']>
  source?: Maybe<Publisher>
  summary?: Maybe<Scalars['String']['output']>
  tag?: Maybe<Array<Tag>>
  tagCount?: Maybe<Scalars['Int']['output']>
  title?: Maybe<Scalars['String']['output']>
  trimApiData?: Maybe<Scalars['JSON']['output']>
  trimContent?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
  url?: Maybe<Scalars['String']['output']>
  writer?: Maybe<Scalars['String']['output']>
}

export type StoryCommentArgs = {
  orderBy?: Array<CommentOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: CommentWhereInput
}

export type StoryCommentCountArgs = {
  where?: CommentWhereInput
}

export type StoryPickArgs = {
  orderBy?: Array<PickOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PickWhereInput
}

export type StoryPickCountArgs = {
  where?: PickWhereInput
}

export type StoryRelatedArgs = {
  orderBy?: Array<StoryOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: StoryWhereInput
}

export type StoryRelatedCountArgs = {
  where?: StoryWhereInput
}

export type StoryTagArgs = {
  orderBy?: Array<TagOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: TagWhereInput
}

export type StoryTagCountArgs = {
  where?: TagWhereInput
}

export type StoryCreateInput = {
  apiData?: InputMaybe<Scalars['JSON']['input']>
  author?: InputMaybe<MemberRelateToOneForCreateInput>
  category?: InputMaybe<CategoryRelateToOneForCreateInput>
  comment?: InputMaybe<CommentRelateToManyForCreateInput>
  content?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  full_content?: InputMaybe<Scalars['Boolean']['input']>
  full_screen_ad?: InputMaybe<Scalars['String']['input']>
  isMember?: InputMaybe<Scalars['Boolean']['input']>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  og_description?: InputMaybe<Scalars['String']['input']>
  og_image?: InputMaybe<Scalars['String']['input']>
  og_title?: InputMaybe<Scalars['String']['input']>
  origid?: InputMaybe<Scalars['String']['input']>
  paywall?: InputMaybe<Scalars['Boolean']['input']>
  pick?: InputMaybe<PickRelateToManyForCreateInput>
  published_date?: InputMaybe<Scalars['DateTime']['input']>
  related?: InputMaybe<StoryRelateToManyForCreateInput>
  source?: InputMaybe<PublisherRelateToOneForCreateInput>
  summary?: InputMaybe<Scalars['String']['input']>
  tag?: InputMaybe<TagRelateToManyForCreateInput>
  title?: InputMaybe<Scalars['String']['input']>
  trimApiData?: InputMaybe<Scalars['JSON']['input']>
  trimContent?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
  url?: InputMaybe<Scalars['String']['input']>
  writer?: InputMaybe<Scalars['String']['input']>
}

export type StoryManyRelationFilter = {
  every?: InputMaybe<StoryWhereInput>
  none?: InputMaybe<StoryWhereInput>
  some?: InputMaybe<StoryWhereInput>
}

export type StoryOrderByInput = {
  content?: InputMaybe<OrderDirection>
  createdAt?: InputMaybe<OrderDirection>
  full_content?: InputMaybe<OrderDirection>
  full_screen_ad?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  isMember?: InputMaybe<OrderDirection>
  is_active?: InputMaybe<OrderDirection>
  og_description?: InputMaybe<OrderDirection>
  og_image?: InputMaybe<OrderDirection>
  og_title?: InputMaybe<OrderDirection>
  origid?: InputMaybe<OrderDirection>
  paywall?: InputMaybe<OrderDirection>
  published_date?: InputMaybe<OrderDirection>
  summary?: InputMaybe<OrderDirection>
  title?: InputMaybe<OrderDirection>
  trimContent?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
  url?: InputMaybe<OrderDirection>
  writer?: InputMaybe<OrderDirection>
}

export type StoryRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<StoryWhereUniqueInput>>
  create?: InputMaybe<Array<StoryCreateInput>>
}

export type StoryRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<StoryWhereUniqueInput>>
  create?: InputMaybe<Array<StoryCreateInput>>
  disconnect?: InputMaybe<Array<StoryWhereUniqueInput>>
  set?: InputMaybe<Array<StoryWhereUniqueInput>>
}

export type StoryRelateToOneForCreateInput = {
  connect?: InputMaybe<StoryWhereUniqueInput>
  create?: InputMaybe<StoryCreateInput>
}

export type StoryRelateToOneForUpdateInput = {
  connect?: InputMaybe<StoryWhereUniqueInput>
  create?: InputMaybe<StoryCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type StoryUpdateArgs = {
  data: StoryUpdateInput
  where: StoryWhereUniqueInput
}

export type StoryUpdateInput = {
  apiData?: InputMaybe<Scalars['JSON']['input']>
  author?: InputMaybe<MemberRelateToOneForUpdateInput>
  category?: InputMaybe<CategoryRelateToOneForUpdateInput>
  comment?: InputMaybe<CommentRelateToManyForUpdateInput>
  content?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  full_content?: InputMaybe<Scalars['Boolean']['input']>
  full_screen_ad?: InputMaybe<Scalars['String']['input']>
  isMember?: InputMaybe<Scalars['Boolean']['input']>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  og_description?: InputMaybe<Scalars['String']['input']>
  og_image?: InputMaybe<Scalars['String']['input']>
  og_title?: InputMaybe<Scalars['String']['input']>
  origid?: InputMaybe<Scalars['String']['input']>
  paywall?: InputMaybe<Scalars['Boolean']['input']>
  pick?: InputMaybe<PickRelateToManyForUpdateInput>
  published_date?: InputMaybe<Scalars['DateTime']['input']>
  related?: InputMaybe<StoryRelateToManyForUpdateInput>
  source?: InputMaybe<PublisherRelateToOneForUpdateInput>
  summary?: InputMaybe<Scalars['String']['input']>
  tag?: InputMaybe<TagRelateToManyForUpdateInput>
  title?: InputMaybe<Scalars['String']['input']>
  trimApiData?: InputMaybe<Scalars['JSON']['input']>
  trimContent?: InputMaybe<Scalars['String']['input']>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
  url?: InputMaybe<Scalars['String']['input']>
  writer?: InputMaybe<Scalars['String']['input']>
}

export type StoryWhereInput = {
  AND?: InputMaybe<Array<StoryWhereInput>>
  NOT?: InputMaybe<Array<StoryWhereInput>>
  OR?: InputMaybe<Array<StoryWhereInput>>
  author?: InputMaybe<MemberWhereInput>
  category?: InputMaybe<CategoryWhereInput>
  comment?: InputMaybe<CommentManyRelationFilter>
  content?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  full_content?: InputMaybe<BooleanFilter>
  full_screen_ad?: InputMaybe<StringNullableFilter>
  id?: InputMaybe<IdFilter>
  isMember?: InputMaybe<BooleanFilter>
  is_active?: InputMaybe<BooleanFilter>
  og_description?: InputMaybe<StringFilter>
  og_image?: InputMaybe<StringFilter>
  og_title?: InputMaybe<StringFilter>
  origid?: InputMaybe<StringFilter>
  paywall?: InputMaybe<BooleanFilter>
  pick?: InputMaybe<PickManyRelationFilter>
  published_date?: InputMaybe<DateTimeNullableFilter>
  related?: InputMaybe<StoryManyRelationFilter>
  source?: InputMaybe<PublisherWhereInput>
  summary?: InputMaybe<StringFilter>
  tag?: InputMaybe<TagManyRelationFilter>
  title?: InputMaybe<StringFilter>
  trimContent?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
  url?: InputMaybe<StringFilter>
  writer?: InputMaybe<StringFilter>
}

export type StoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  equals?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<NestedStringFilter>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  equals?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<NestedStringNullableFilter>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export type Tag = {
  __typename?: 'Tag'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  pick?: Maybe<Array<Pick>>
  pickCount?: Maybe<Scalars['Int']['output']>
  story?: Maybe<Array<Story>>
  storyCount?: Maybe<Scalars['Int']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type TagPickArgs = {
  orderBy?: Array<PickOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: PickWhereInput
}

export type TagPickCountArgs = {
  where?: PickWhereInput
}

export type TagStoryArgs = {
  orderBy?: Array<StoryOrderByInput>
  skip?: Scalars['Int']['input']
  take?: InputMaybe<Scalars['Int']['input']>
  where?: StoryWhereInput
}

export type TagStoryCountArgs = {
  where?: StoryWhereInput
}

export type TagCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  name?: InputMaybe<Scalars['String']['input']>
  pick?: InputMaybe<PickRelateToManyForCreateInput>
  story?: InputMaybe<StoryRelateToManyForCreateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type TagManyRelationFilter = {
  every?: InputMaybe<TagWhereInput>
  none?: InputMaybe<TagWhereInput>
  some?: InputMaybe<TagWhereInput>
}

export type TagOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type TagRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>
  create?: InputMaybe<Array<TagCreateInput>>
}

export type TagRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>
  create?: InputMaybe<Array<TagCreateInput>>
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>
  set?: InputMaybe<Array<TagWhereUniqueInput>>
}

export type TagUpdateArgs = {
  data: TagUpdateInput
  where: TagWhereUniqueInput
}

export type TagUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  name?: InputMaybe<Scalars['String']['input']>
  pick?: InputMaybe<PickRelateToManyForUpdateInput>
  story?: InputMaybe<StoryRelateToManyForUpdateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>
  NOT?: InputMaybe<Array<TagWhereInput>>
  OR?: InputMaybe<Array<TagWhereInput>>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  id?: InputMaybe<IdFilter>
  name?: InputMaybe<StringFilter>
  pick?: InputMaybe<PickManyRelationFilter>
  story?: InputMaybe<StoryManyRelationFilter>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type TagWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type Transaction = {
  __typename?: 'Transaction'
  active?: Maybe<Scalars['Boolean']['output']>
  complement?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  createdBy?: Maybe<User>
  depositVolume?: Maybe<Scalars['Float']['output']>
  expireDate?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  member?: Maybe<Member>
  policy?: Maybe<Policy>
  status?: Maybe<TransactionStatusType>
  tid?: Maybe<Scalars['String']['output']>
  unlockStory?: Maybe<Story>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  updatedBy?: Maybe<User>
}

export type TransactionCreateInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>
  complement?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>
  depositVolume?: InputMaybe<Scalars['Float']['input']>
  expireDate?: InputMaybe<Scalars['DateTime']['input']>
  member?: InputMaybe<MemberRelateToOneForCreateInput>
  policy?: InputMaybe<PolicyRelateToOneForCreateInput>
  status?: InputMaybe<TransactionStatusType>
  tid?: InputMaybe<Scalars['String']['input']>
  unlockStory?: InputMaybe<StoryRelateToOneForCreateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForCreateInput>
}

export type TransactionManyRelationFilter = {
  every?: InputMaybe<TransactionWhereInput>
  none?: InputMaybe<TransactionWhereInput>
  some?: InputMaybe<TransactionWhereInput>
}

export type TransactionOrderByInput = {
  active?: InputMaybe<OrderDirection>
  complement?: InputMaybe<OrderDirection>
  createdAt?: InputMaybe<OrderDirection>
  depositVolume?: InputMaybe<OrderDirection>
  expireDate?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  status?: InputMaybe<OrderDirection>
  tid?: InputMaybe<OrderDirection>
  updatedAt?: InputMaybe<OrderDirection>
}

export type TransactionRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TransactionWhereUniqueInput>>
  create?: InputMaybe<Array<TransactionCreateInput>>
}

export type TransactionRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TransactionWhereUniqueInput>>
  create?: InputMaybe<Array<TransactionCreateInput>>
  disconnect?: InputMaybe<Array<TransactionWhereUniqueInput>>
  set?: InputMaybe<Array<TransactionWhereUniqueInput>>
}

export enum TransactionStatusType {
  Failed = 'Failed',
  Success = 'Success',
}

export type TransactionStatusTypeNullableFilter = {
  equals?: InputMaybe<TransactionStatusType>
  in?: InputMaybe<Array<TransactionStatusType>>
  not?: InputMaybe<TransactionStatusTypeNullableFilter>
  notIn?: InputMaybe<Array<TransactionStatusType>>
}

export type TransactionUpdateArgs = {
  data: TransactionUpdateInput
  where: TransactionWhereUniqueInput
}

export type TransactionUpdateInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>
  complement?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['DateTime']['input']>
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>
  depositVolume?: InputMaybe<Scalars['Float']['input']>
  expireDate?: InputMaybe<Scalars['DateTime']['input']>
  member?: InputMaybe<MemberRelateToOneForUpdateInput>
  policy?: InputMaybe<PolicyRelateToOneForUpdateInput>
  status?: InputMaybe<TransactionStatusType>
  tid?: InputMaybe<Scalars['String']['input']>
  unlockStory?: InputMaybe<StoryRelateToOneForUpdateInput>
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>
  updatedBy?: InputMaybe<UserRelateToOneForUpdateInput>
}

export type TransactionWhereInput = {
  AND?: InputMaybe<Array<TransactionWhereInput>>
  NOT?: InputMaybe<Array<TransactionWhereInput>>
  OR?: InputMaybe<Array<TransactionWhereInput>>
  active?: InputMaybe<BooleanFilter>
  complement?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeNullableFilter>
  createdBy?: InputMaybe<UserWhereInput>
  depositVolume?: InputMaybe<FloatNullableFilter>
  expireDate?: InputMaybe<DateTimeNullableFilter>
  id?: InputMaybe<IdFilter>
  member?: InputMaybe<MemberWhereInput>
  policy?: InputMaybe<PolicyWhereInput>
  status?: InputMaybe<TransactionStatusTypeNullableFilter>
  tid?: InputMaybe<StringFilter>
  unlockStory?: InputMaybe<StoryWhereInput>
  updatedAt?: InputMaybe<DateTimeNullableFilter>
  updatedBy?: InputMaybe<UserWhereInput>
}

export type TransactionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type User = {
  __typename?: 'User'
  email?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  isProtected?: Maybe<Scalars['Boolean']['output']>
  name?: Maybe<Scalars['String']['output']>
  password?: Maybe<PasswordState>
  role?: Maybe<Scalars['String']['output']>
}

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure'
  message: Scalars['String']['output']
}

export type UserAuthenticationWithPasswordResult =
  | UserAuthenticationWithPasswordFailure
  | UserAuthenticationWithPasswordSuccess

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess'
  item: User
  sessionToken: Scalars['String']['output']
}

export type UserCreateInput = {
  email?: InputMaybe<Scalars['String']['input']>
  isProtected?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<Scalars['String']['input']>
}

export type UserOrderByInput = {
  email?: InputMaybe<OrderDirection>
  id?: InputMaybe<OrderDirection>
  isProtected?: InputMaybe<OrderDirection>
  name?: InputMaybe<OrderDirection>
  role?: InputMaybe<OrderDirection>
}

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>
  create?: InputMaybe<UserCreateInput>
}

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>
  create?: InputMaybe<UserCreateInput>
  disconnect?: InputMaybe<Scalars['Boolean']['input']>
}

export type UserUpdateArgs = {
  data: UserUpdateInput
  where: UserWhereUniqueInput
}

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>
  isProtected?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<Scalars['String']['input']>
}

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>
  NOT?: InputMaybe<Array<UserWhereInput>>
  OR?: InputMaybe<Array<UserWhereInput>>
  email?: InputMaybe<StringFilter>
  id?: InputMaybe<IdFilter>
  isProtected?: InputMaybe<BooleanFilter>
  name?: InputMaybe<StringFilter>
  role?: InputMaybe<StringFilter>
}

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type UserActionStoryFragment = {
  __typename?: 'Story'
  id: string
  url?: string | null
  title?: string | null
  og_image?: string | null
  og_description?: string | null
  published_date?: any | null
  paywall?: boolean | null
  full_screen_ad?: string | null
  pickCount?: number | null
  commentCount?: number | null
  source?: {
    __typename?: 'Publisher'
    customId?: string | null
    title?: string | null
    createdAt?: any | null
  } | null
  pick?: Array<{
    __typename?: 'Pick'
    createdAt?: any | null
    member?: {
      __typename?: 'Member'
      id: string
      name?: string | null
      avatar?: string | null
    } | null
  }> | null
  comment?: Array<{
    __typename?: 'Comment'
    id: string
    content?: string | null
    state?: string | null
    published_date?: any | null
    createdAt?: any | null
    member?: {
      __typename?: 'Member'
      id: string
      name?: string | null
      avatar?: string | null
    } | null
  }> | null
}

export type SignUpMemberMutationVariables = Exact<{
  registrationData: MemberCreateInput
}>

export type SignUpMemberMutation = {
  __typename?: 'Mutation'
  createMember?: {
    __typename?: 'Member'
    id: string
    firebaseId?: string | null
    email?: string | null
  } | null
}

export type UpdateMemberProfileMutationVariables = Exact<{
  customId?: InputMaybe<Scalars['String']['input']>
  changedCustomId?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  intro?: InputMaybe<Scalars['String']['input']>
}>

export type UpdateMemberProfileMutation = {
  __typename?: 'Mutation'
  updateMember?: {
    __typename?: 'Member'
    customId?: string | null
    avatar?: string | null
    name?: string | null
    intro?: string | null
  } | null
}

export type ConnectMemberAvatarMutationVariables = Exact<{
  customId?: InputMaybe<Scalars['String']['input']>
  imageId: Scalars['ID']['input']
  imageOriginUrl?: InputMaybe<Scalars['String']['input']>
}>

export type ConnectMemberAvatarMutation = {
  __typename?: 'Mutation'
  updateMember?: { __typename?: 'Member'; customId?: string | null } | null
}

export type CreatePhotoMutationVariables = Exact<{
  image?: InputMaybe<Scalars['Upload']['input']>
  imageName?: InputMaybe<Scalars['String']['input']>
}>

export type CreatePhotoMutation = {
  __typename?: 'Mutation'
  createPhoto?: {
    __typename?: 'Photo'
    id: string
    resized?: { __typename?: 'ResizedImages'; original?: string | null } | null
  } | null
}

export type DeletePhotoMutationVariables = Exact<{
  memberId?: InputMaybe<Scalars['String']['input']>
}>

export type DeletePhotoMutation = {
  __typename?: 'Mutation'
  updateMember?: { __typename?: 'Member'; customId?: string | null } | null
}

export type UpdateWalletAddressMutationVariables = Exact<{
  id: Scalars['ID']['input']
  wallet: Scalars['String']['input']
}>

export type UpdateWalletAddressMutation = {
  __typename?: 'Mutation'
  updateMember?: {
    __typename?: 'Member'
    id: string
    wallet?: string | null
  } | null
}

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never }>

export type GetAllCategoriesQuery = {
  __typename?: 'Query'
  categories?: Array<{
    __typename?: 'Category'
    id: string
    slug?: string | null
    title?: string | null
  }> | null
}

export type GetCategoryInformationQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>
}>

export type GetCategoryInformationQuery = {
  __typename?: 'Query'
  categories?: Array<{
    __typename?: 'Category'
    id: string
    slug?: string | null
    title?: string | null
  }> | null
}

export type GetLatestAddedCommentQueryVariables = Exact<{
  memberId: Scalars['ID']['input']
  storyId: Scalars['ID']['input']
}>

export type GetLatestAddedCommentQuery = {
  __typename?: 'Query'
  comments?: Array<{ __typename?: 'Comment'; id: string }> | null
}

export type GetMemberFollowingQueryVariables = Exact<{
  memberId: Scalars['ID']['input']
  takes: Scalars['Int']['input']
}>

export type GetMemberFollowingQuery = {
  __typename?: 'Query'
  member?: {
    __typename?: 'Member'
    id: string
    name?: string | null
    avatar?: string | null
    following?: Array<{
      __typename?: 'Member'
      id: string
      customId?: string | null
      name?: string | null
      avatar?: string | null
      following?: Array<{
        __typename?: 'Member'
        id: string
        customId?: string | null
        name?: string | null
        avatar?: string | null
        followerCount?: number | null
      }> | null
      pick?: Array<{
        __typename?: 'Pick'
        id: string
        createdAt?: any | null
        story?: {
          __typename?: 'Story'
          id: string
          url?: string | null
          title?: string | null
          og_image?: string | null
          og_description?: string | null
          published_date?: any | null
          paywall?: boolean | null
          full_screen_ad?: string | null
          pickCount?: number | null
          commentCount?: number | null
          source?: {
            __typename?: 'Publisher'
            customId?: string | null
            title?: string | null
            createdAt?: any | null
          } | null
          pick?: Array<{
            __typename?: 'Pick'
            createdAt?: any | null
            member?: {
              __typename?: 'Member'
              id: string
              name?: string | null
              avatar?: string | null
            } | null
          }> | null
          comment?: Array<{
            __typename?: 'Comment'
            id: string
            content?: string | null
            state?: string | null
            published_date?: any | null
            createdAt?: any | null
            member?: {
              __typename?: 'Member'
              id: string
              name?: string | null
              avatar?: string | null
            } | null
          }> | null
        } | null
      }> | null
      comment?: Array<{
        __typename?: 'Comment'
        id: string
        createdAt?: any | null
        story?: {
          __typename?: 'Story'
          id: string
          url?: string | null
          title?: string | null
          og_image?: string | null
          og_description?: string | null
          published_date?: any | null
          paywall?: boolean | null
          full_screen_ad?: string | null
          pickCount?: number | null
          commentCount?: number | null
          source?: {
            __typename?: 'Publisher'
            customId?: string | null
            title?: string | null
            createdAt?: any | null
          } | null
          pick?: Array<{
            __typename?: 'Pick'
            createdAt?: any | null
            member?: {
              __typename?: 'Member'
              id: string
              name?: string | null
              avatar?: string | null
            } | null
          }> | null
          comment?: Array<{
            __typename?: 'Comment'
            id: string
            content?: string | null
            state?: string | null
            published_date?: any | null
            createdAt?: any | null
            member?: {
              __typename?: 'Member'
              id: string
              name?: string | null
              avatar?: string | null
            } | null
          }> | null
        } | null
      }> | null
    }> | null
    pick?: Array<{
      __typename?: 'Pick'
      id: string
      story?: { __typename?: 'Story'; id: string } | null
    }> | null
  } | null
}

export type GetMemberByFollowingCategoryQueryVariables = Exact<{
  slugs: Array<Scalars['String']['input']> | Scalars['String']['input']
}>

export type GetMemberByFollowingCategoryQuery = {
  __typename?: 'Query'
  members?: Array<{
    __typename?: 'Member'
    id: string
    customId?: string | null
    name?: string | null
    nickname?: string | null
    avatar?: string | null
  }> | null
}

export type GetCurrentUserMemberIdQueryVariables = Exact<{
  uid: Scalars['String']['input']
}>

export type GetCurrentUserMemberIdQuery = {
  __typename?: 'Query'
  member?: {
    __typename?: 'Member'
    id: string
    name?: string | null
    customId?: string | null
    email?: string | null
    avatar?: string | null
    intro?: string | null
    wallet?: string | null
    avatar_image?: { __typename?: 'Photo'; id: string } | null
    followingMembers?: Array<{ __typename?: 'Member'; id: string }> | null
    picks?: Array<{
      __typename?: 'Pick'
      story?: { __typename?: 'Story'; id: string } | null
    }> | null
    bookmarks?: Array<{
      __typename?: 'Pick'
      story?: { __typename?: 'Story'; id: string } | null
    }> | null
    followingCategories?: Array<{
      __typename?: 'Category'
      id: string
      title?: string | null
      slug?: string | null
    }> | null
    followingPublishers?: Array<{
      __typename?: 'Publisher'
      id: string
      title?: string | null
    }> | null
  } | null
}

export type GetMemberProfileQueryVariables = Exact<{
  customId?: InputMaybe<Scalars['String']['input']>
  takes: Scalars['Int']['input']
}>

export type GetMemberProfileQuery = {
  __typename?: 'Query'
  member?: {
    __typename?: 'Member'
    id: string
    name?: string | null
    avatar?: string | null
    customId?: string | null
    intro?: string | null
    followingCount?: number | null
    followerCount?: number | null
    picksCount?: number | null
    booksCount?: number | null
    avatar_image?: { __typename?: 'Photo'; urlOriginal?: string | null } | null
    picks?: Array<{
      __typename?: 'Pick'
      kind?: string | null
      story?: {
        __typename?: 'Story'
        id: string
        og_image?: string | null
        title?: string | null
        og_title?: string | null
        createdAt?: any | null
        pickCount?: number | null
        commentCount?: number | null
        paywall?: boolean | null
        full_screen_ad?: string | null
        published_date?: any | null
        source?: {
          __typename?: 'Publisher'
          title?: string | null
          official_site?: string | null
          id: string
        } | null
        tag?: Array<{
          __typename?: 'Tag'
          id: string
          name?: string | null
        }> | null
        pick?: Array<{
          __typename?: 'Pick'
          createdAt?: any | null
          member?: {
            __typename?: 'Member'
            id: string
            name?: string | null
            avatar?: string | null
          } | null
        }> | null
        comment?: Array<{
          __typename?: 'Comment'
          id: string
          content?: string | null
          createdAt?: any | null
          likeCount?: number | null
          isMemberLiked?: Array<{ __typename?: 'Member'; id: string }> | null
          member?: {
            __typename?: 'Member'
            id: string
            name?: string | null
            avatar?: string | null
          } | null
        }> | null
      } | null
    }> | null
    books?: Array<{
      __typename?: 'Pick'
      kind?: string | null
      story?: {
        __typename?: 'Story'
        id: string
        og_image?: string | null
        title?: string | null
        og_title?: string | null
        commentCount?: number | null
        createdAt?: any | null
        pickCount?: number | null
        paywall?: boolean | null
        full_screen_ad?: string | null
        published_date?: any | null
        source?: {
          __typename?: 'Publisher'
          title?: string | null
          official_site?: string | null
        } | null
        tag?: Array<{
          __typename?: 'Tag'
          id: string
          name?: string | null
        }> | null
        pick?: Array<{
          __typename?: 'Pick'
          createdAt?: any | null
          member?: {
            __typename?: 'Member'
            id: string
            name?: string | null
            avatar?: string | null
          } | null
        }> | null
        comment?: Array<{
          __typename?: 'Comment'
          id: string
          content?: string | null
          createdAt?: any | null
          likeCount?: number | null
          isMemberLiked?: Array<{ __typename?: 'Member'; id: string }> | null
          member?: {
            __typename?: 'Member'
            id: string
            name?: string | null
            avatar?: string | null
          } | null
        }> | null
      } | null
    }> | null
  } | null
}

export type GetVisitorProfileQueryVariables = Exact<{
  customId?: InputMaybe<Scalars['String']['input']>
  takes: Scalars['Int']['input']
}>

export type GetVisitorProfileQuery = {
  __typename?: 'Query'
  member?: {
    __typename?: 'Member'
    id: string
    name?: string | null
    avatar?: string | null
    customId?: string | null
    intro?: string | null
    followingCount?: number | null
    followerCount?: number | null
    picksCount?: number | null
    avatar_image?: { __typename?: 'Photo'; urlOriginal?: string | null } | null
    picks?: Array<{
      __typename?: 'Pick'
      kind?: string | null
      story?: {
        __typename?: 'Story'
        id: string
        og_image?: string | null
        title?: string | null
        og_title?: string | null
        createdAt?: any | null
        pickCount?: number | null
        commentCount?: number | null
        paywall?: boolean | null
        full_screen_ad?: string | null
        published_date?: any | null
        source?: {
          __typename?: 'Publisher'
          title?: string | null
          official_site?: string | null
          id: string
        } | null
        tag?: Array<{
          __typename?: 'Tag'
          id: string
          name?: string | null
        }> | null
        pick?: Array<{
          __typename?: 'Pick'
          createdAt?: any | null
          member?: {
            __typename?: 'Member'
            id: string
            name?: string | null
            avatar?: string | null
          } | null
        }> | null
        comment?: Array<{
          __typename?: 'Comment'
          id: string
          content?: string | null
          createdAt?: any | null
          likeCount?: number | null
          member?: {
            __typename?: 'Member'
            id: string
            name?: string | null
            avatar?: string | null
          } | null
        }> | null
      } | null
    }> | null
  } | null
}

export type GetMemberFollowingListQueryVariables = Exact<{
  customId?: InputMaybe<Scalars['String']['input']>
  take: Scalars['Int']['input']
}>

export type GetMemberFollowingListQuery = {
  __typename?: 'Query'
  member?: {
    __typename?: 'Member'
    id: string
    name?: string | null
    avatar?: string | null
    followingCount?: number | null
    follow_publisherCount?: number | null
    following?: Array<{
      __typename?: 'Member'
      id: string
      customId?: string | null
      name?: string | null
      avatar?: string | null
    }> | null
    follow_publisher?: Array<{
      __typename?: 'Publisher'
      id: string
      customId?: string | null
      title?: string | null
      logo?: string | null
      source_type?: string | null
    }> | null
  } | null
}

export type GetMemberFollowerListQueryVariables = Exact<{
  customId?: InputMaybe<Scalars['String']['input']>
  take: Scalars['Int']['input']
}>

export type GetMemberFollowerListQuery = {
  __typename?: 'Query'
  member?: {
    __typename?: 'Member'
    id: string
    name?: string | null
    avatar?: string | null
    followingCount?: number | null
    follower?: Array<{
      __typename?: 'Member'
      id: string
      customId?: string | null
      name?: string | null
      avatar?: string | null
    }> | null
    mutualFans?: Array<{
      __typename?: 'Member'
      id: string
      customId?: string | null
      name?: string | null
    }> | null
  } | null
}

export type GetMemberProfileEditDataQueryVariables = Exact<{
  customId?: InputMaybe<Scalars['String']['input']>
}>

export type GetMemberProfileEditDataQuery = {
  __typename?: 'Query'
  member?: {
    __typename?: 'Member'
    customId?: string | null
    name?: string | null
    avatar?: string | null
    intro?: string | null
    avatar_image?: {
      __typename?: 'Photo'
      id: string
      resized?: {
        __typename?: 'ResizedImages'
        original?: string | null
      } | null
    } | null
  } | null
}

export type GetMemberSponsorShipsQueryVariables = Exact<{
  memberId: Scalars['ID']['input']
  publisherIdList?: InputMaybe<
    Array<Scalars['ID']['input']> | Scalars['ID']['input']
  >
}>

export type GetMemberSponsorShipsQuery = {
  __typename?: 'Query'
  member?: {
    __typename?: 'Member'
    sponsorCount?: number | null
    sponsor?: Array<{
      __typename?: 'Sponsorship'
      tid?: string | null
      publisher?: {
        __typename?: 'Publisher'
        id: string
        title?: string | null
      } | null
    }> | null
  } | null
}

export type GetMemberTransactionsQueryVariables = Exact<{
  memberId: Scalars['ID']['input']
  take?: InputMaybe<Scalars['Int']['input']>
}>

export type GetMemberTransactionsQuery = {
  __typename?: 'Query'
  member?: {
    __typename?: 'Member'
    sponsorCount?: number | null
    sponsor?: Array<{
      __typename?: 'Sponsorship'
      tid?: string | null
      fee?: number | null
      createdAt?: any | null
      publisher?: {
        __typename?: 'Publisher'
        id: string
        title?: string | null
        logo?: string | null
      } | null
    }> | null
    transaction?: Array<{
      __typename?: 'Transaction'
      tid?: string | null
      createdAt?: any | null
      expireDate?: any | null
      depositVolume?: number | null
      unlockStory?: {
        __typename?: 'Story'
        id: string
        title?: string | null
        source?: {
          __typename?: 'Publisher'
          id: string
          title?: string | null
          logo?: string | null
        } | null
      } | null
      policy?: {
        __typename?: 'Policy'
        type?: PolicyTypeType | null
        charge?: number | null
        unlockSingle?: boolean | null
        publisher?: {
          __typename?: 'Publisher'
          id: string
          title?: string | null
        } | null
      } | null
    }> | null
  } | null
  transactions?: Array<{
    __typename?: 'Transaction'
    tid?: string | null
    unlockStory?: { __typename?: 'Story'; id: string } | null
  }> | null
}

export type GetMemberUnlockStoriesQueryVariables = Exact<{
  memberId: Scalars['ID']['input']
  skip?: InputMaybe<Scalars['Int']['input']>
  take?: InputMaybe<Scalars['Int']['input']>
}>

export type GetMemberUnlockStoriesQuery = {
  __typename?: 'Query'
  member?: {
    __typename?: 'Member'
    transaction?: Array<{
      __typename?: 'Transaction'
      tid?: string | null
      expireDate?: any | null
      unlockStory?: {
        __typename?: 'Story'
        id: string
        title?: string | null
        og_image?: string | null
        source?: {
          __typename?: 'Publisher'
          id: string
          title?: string | null
          logo?: string | null
        } | null
      } | null
    }> | null
  } | null
}

export type GetMemberSingleTransactionQueryVariables = Exact<{
  memberId: Scalars['ID']['input']
  tid?: InputMaybe<Scalars['String']['input']>
}>

export type GetMemberSingleTransactionQuery = {
  __typename?: 'Query'
  member?: {
    __typename?: 'Member'
    transaction?: Array<{
      __typename?: 'Transaction'
      tid?: string | null
      createdAt?: any | null
      depositVolume?: number | null
      unlockStory?: {
        __typename?: 'Story'
        id: string
        title?: string | null
        source?: {
          __typename?: 'Publisher'
          id: string
          title?: string | null
        } | null
      } | null
      policy?: {
        __typename?: 'Policy'
        type?: PolicyTypeType | null
        charge?: number | null
        unlockSingle?: boolean | null
        publisher?: {
          __typename?: 'Publisher'
          id: string
          title?: string | null
        } | null
      } | null
    }> | null
    sponsor?: Array<{
      __typename?: 'Sponsorship'
      fee?: number | null
      createdAt?: any | null
      publisher?: {
        __typename?: 'Publisher'
        id: string
        title?: string | null
      } | null
    }> | null
  } | null
}

export type GetMemberPickCommentQueryVariables = Exact<{
  memberId?: InputMaybe<Scalars['ID']['input']>
  storyId?: InputMaybe<Scalars['ID']['input']>
}>

export type GetMemberPickCommentQuery = {
  __typename?: 'Query'
  members?: Array<{
    __typename?: 'Member'
    pick?: Array<{
      __typename?: 'Pick'
      id: string
      pick_comment?: Array<{
        __typename?: 'Comment'
        id: string
        content?: string | null
      }> | null
    }> | null
  }> | null
}

export type GetPublisherPolicyQueryVariables = Exact<{
  customId?: InputMaybe<Scalars['String']['input']>
}>

export type GetPublisherPolicyQuery = {
  __typename?: 'Query'
  policies?: Array<{
    __typename?: 'Policy'
    id: string
    charge?: number | null
    duration?: number | null
  }> | null
}

export type PublishersQueryVariables = Exact<{ [key: string]: never }>

export type PublishersQuery = {
  __typename?: 'Query'
  publishers?: Array<{
    __typename?: 'Publisher'
    id: string
    title?: string | null
    logo?: string | null
    rss?: string | null
    official_site?: string | null
    sponsorCount?: number | null
  }> | null
}

export type GetPublisherFollowerListQueryVariables = Exact<{
  publisherId?: InputMaybe<Scalars['String']['input']>
  takes: Scalars['Int']['input']
}>

export type GetPublisherFollowerListQuery = {
  __typename?: 'Query'
  publishers?: Array<{
    __typename?: 'Publisher'
    id: string
    title?: string | null
    logo?: string | null
    followerCount?: number | null
    follower?: Array<{
      __typename?: 'Member'
      id: string
      customId?: string | null
      name?: string | null
      avatar?: string | null
    }> | null
  }> | null
}

export type LatestStoriesQueryVariables = Exact<{
  date?: InputMaybe<Scalars['DateTime']['input']>
}>

export type LatestStoriesQuery = {
  __typename?: 'Query'
  stories?: Array<{
    __typename?: 'Story'
    id: string
    url?: string | null
    title?: string | null
    published_date?: any | null
    summary?: string | null
    content?: string | null
    og_title?: string | null
    og_image?: string | null
    og_description?: string | null
    full_content?: boolean | null
    origid?: string | null
    commentCount?: number | null
    paywall?: boolean | null
    full_screen_ad?: string | null
    picksCount?: number | null
    category?: {
      __typename?: 'Category'
      id: string
      slug?: string | null
    } | null
    source?: {
      __typename?: 'Publisher'
      id: string
      title?: string | null
      customId?: string | null
    } | null
    picks?: Array<{
      __typename?: 'Pick'
      createdAt?: any | null
      member?: {
        __typename?: 'Member'
        id: string
        name?: string | null
        avatar?: string | null
      } | null
    }> | null
  }> | null
}

export type GetStoryQueryVariables = Exact<{
  storyId?: InputMaybe<Scalars['ID']['input']>
  picksTake?: InputMaybe<Scalars['Int']['input']>
  commentsTake?: InputMaybe<Scalars['Int']['input']>
}>

export type GetStoryQuery = {
  __typename?: 'Query'
  story?: {
    __typename?: 'Story'
    id: string
    title?: string | null
    summary?: string | null
    url?: string | null
    og_image?: string | null
    published_date?: any | null
    full_content?: boolean | null
    content?: string | null
    apiData?: any | null
    trimApiData?: any | null
    isMember?: boolean | null
    picksCount?: number | null
    commentsCount?: number | null
    source?: {
      __typename?: 'Publisher'
      id: string
      title?: string | null
      customId?: string | null
    } | null
    picks?: Array<{
      __typename?: 'Pick'
      id: string
      createdAt?: any | null
      kind?: string | null
      member?: {
        __typename?: 'Member'
        id: string
        customId?: string | null
        name?: string | null
        avatar?: string | null
      } | null
    }> | null
    comments?: Array<{
      __typename?: 'Comment'
      id: string
      createdAt?: any | null
      content?: string | null
      state?: string | null
      member?: {
        __typename?: 'Member'
        id: string
        customId?: string | null
        name?: string | null
        avatar?: string | null
      } | null
    }> | null
  } | null
}

export type GetStoriesQueryVariables = Exact<{
  storyIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>
  picksTake?: InputMaybe<Scalars['Int']['input']>
  commentsTake?: InputMaybe<Scalars['Int']['input']>
}>

export type GetStoriesQuery = {
  __typename?: 'Query'
  stories?: Array<{
    __typename?: 'Story'
    id: string
    title?: string | null
    summary?: string | null
    url?: string | null
    og_image?: string | null
    published_date?: any | null
    content?: string | null
    apiData?: any | null
    trimApiData?: any | null
    isMember?: boolean | null
    picksCount?: number | null
    commentsCount?: number | null
    source?: {
      __typename?: 'Publisher'
      id: string
      title?: string | null
      customId?: string | null
    } | null
    picks?: Array<{
      __typename?: 'Pick'
      id: string
      createdAt?: any | null
      kind?: string | null
      member?: {
        __typename?: 'Member'
        id: string
        customId?: string | null
        name?: string | null
        avatar?: string | null
      } | null
    }> | null
    comments?: Array<{
      __typename?: 'Comment'
      id: string
      createdAt?: any | null
      content?: string | null
      state?: string | null
      member?: {
        __typename?: 'Member'
        id: string
        customId?: string | null
        name?: string | null
        avatar?: string | null
      } | null
    }> | null
  }> | null
}

export type GetStorySourceQueryVariables = Exact<{
  storyId?: InputMaybe<Scalars['ID']['input']>
}>

export type GetStorySourceQuery = {
  __typename?: 'Query'
  story?: {
    __typename?: 'Story'
    source?: {
      __typename?: 'Publisher'
      id: string
      customId?: string | null
      title?: string | null
    } | null
  } | null
}

export const UserActionStoryFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserActionStory' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Story' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'og_image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'og_description' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'source' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'customId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'published_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'paywall' } },
          { kind: 'Field', name: { kind: 'Name', value: 'full_screen_ad' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pickCount' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'pick' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'member' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'avatar' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'commentCount' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'comment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'published_date' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'member' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'avatar' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserActionStoryFragment, unknown>
export const SignUpMemberDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignUpMember' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'registrationData' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'MemberCreateInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createMember' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'registrationData' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firebaseId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SignUpMemberMutation,
  SignUpMemberMutationVariables
>
export const UpdateMemberProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateMemberProfile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'customId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'changedCustomId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'intro' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateMember' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'customId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'customId' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'name' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'customId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'changedCustomId' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'intro' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'intro' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'customId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'intro' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateMemberProfileMutation,
  UpdateMemberProfileMutationVariables
>
export const ConnectMemberAvatarDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ConnectMemberAvatar' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'customId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'imageId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'imageOriginUrl' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateMember' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'customId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'customId' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'avatar' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'imageOriginUrl' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'avatar_image' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'connect' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'id' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'imageId' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'customId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ConnectMemberAvatarMutation,
  ConnectMemberAvatarMutationVariables
>
export const CreatePhotoDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreatePhoto' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'image' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Upload' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'imageName' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createPhoto' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'imageName' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'file' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'upload' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'image' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'resized' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'original' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreatePhotoMutation, CreatePhotoMutationVariables>
export const DeletePhotoDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeletePhoto' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'memberId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateMember' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'customId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'memberId' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'avatar' },
                      value: { kind: 'StringValue', value: '', block: false },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'avatar_image' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'disconnect' },
                            value: { kind: 'BooleanValue', value: true },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'customId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeletePhotoMutation, DeletePhotoMutationVariables>
export const UpdateWalletAddressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateWalletAddress' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'wallet' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateMember' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'wallet' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'wallet' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'wallet' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateWalletAddressMutation,
  UpdateWalletAddressMutationVariables
>
export const GetAllCategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllCategories' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables
>
export const GetCategoryInformationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCategoryInformation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'slug' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'equals' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'slug' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCategoryInformationQuery,
  GetCategoryInformationQueryVariables
>
export const GetLatestAddedCommentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetLatestAddedComment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'memberId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'storyId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'comments' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'member' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'memberId' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'story' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'storyId' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'is_active' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'equals' },
                            value: { kind: 'BooleanValue', value: true },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'createdAt' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: { kind: 'IntValue', value: '1' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetLatestAddedCommentQuery,
  GetLatestAddedCommentQueryVariables
>
export const GetMemberFollowingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMemberFollowing' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'memberId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'takes' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'memberId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'following' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'avatar' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'following' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'where' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'id' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'gte' },
                                        value: { kind: 'IntValue', value: '0' },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'orderBy' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'id' },
                                  value: { kind: 'EnumValue', value: 'asc' },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'take' },
                            value: { kind: 'IntValue', value: '10000' },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'customId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'avatar' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'followerCount' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pick' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'where' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'kind' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'equals' },
                                        value: {
                                          kind: 'StringValue',
                                          value: 'read',
                                          block: false,
                                        },
                                      },
                                    ],
                                  },
                                },
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'AND' },
                                  value: {
                                    kind: 'ListValue',
                                    values: [
                                      {
                                        kind: 'ObjectValue',
                                        fields: [
                                          {
                                            kind: 'ObjectField',
                                            name: {
                                              kind: 'Name',
                                              value: 'is_active',
                                            },
                                            value: {
                                              kind: 'ObjectValue',
                                              fields: [
                                                {
                                                  kind: 'ObjectField',
                                                  name: {
                                                    kind: 'Name',
                                                    value: 'equals',
                                                  },
                                                  value: {
                                                    kind: 'BooleanValue',
                                                    value: true,
                                                  },
                                                },
                                              ],
                                            },
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'orderBy' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'createdAt' },
                                  value: { kind: 'EnumValue', value: 'desc' },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'take' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'takes' },
                            },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'story' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'FragmentSpread',
                                    name: {
                                      kind: 'Name',
                                      value: 'UserActionStory',
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'comment' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'orderBy' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'createdAt' },
                                  value: { kind: 'EnumValue', value: 'desc' },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'take' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'takes' },
                            },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'story' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'FragmentSpread',
                                    name: {
                                      kind: 'Name',
                                      value: 'UserActionStory',
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pick' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'kind' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'read',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'AND' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: {
                                        kind: 'Name',
                                        value: 'is_active',
                                      },
                                      value: {
                                        kind: 'ObjectValue',
                                        fields: [
                                          {
                                            kind: 'ObjectField',
                                            name: {
                                              kind: 'Name',
                                              value: 'equals',
                                            },
                                            value: {
                                              kind: 'BooleanValue',
                                              value: true,
                                            },
                                          },
                                        ],
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'story' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserActionStory' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Story' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'og_image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'og_description' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'source' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'customId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'published_date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'paywall' } },
          { kind: 'Field', name: { kind: 'Name', value: 'full_screen_ad' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pickCount' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'pick' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'member' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'avatar' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'commentCount' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'comment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'published_date' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'member' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'avatar' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetMemberFollowingQuery,
  GetMemberFollowingQueryVariables
>
export const GetMemberByFollowingCategoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMemberByFollowingCategory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'slugs' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'String' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'members' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'following_category' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'every' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'slug' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'in' },
                                        value: {
                                          kind: 'Variable',
                                          name: {
                                            kind: 'Name',
                                            value: 'slugs',
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'ListValue',
                  values: [
                    {
                      kind: 'ObjectValue',
                      fields: [
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'id' },
                          value: { kind: 'EnumValue', value: 'desc' },
                        },
                      ],
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: { kind: 'IntValue', value: '20' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: { kind: 'IntValue', value: '0' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'customId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'nickname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetMemberByFollowingCategoryQuery,
  GetMemberByFollowingCategoryQueryVariables
>
export const GetCurrentUserMemberIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCurrentUserMemberId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'uid' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'firebaseId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'uid' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'customId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'avatar_image' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'intro' } },
                { kind: 'Field', name: { kind: 'Name', value: 'wallet' } },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'followingMembers' },
                  name: { kind: 'Name', value: 'following' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'picks' },
                  name: { kind: 'Name', value: 'pick' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'AND' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: 'kind' },
                                      value: {
                                        kind: 'ObjectValue',
                                        fields: [
                                          {
                                            kind: 'ObjectField',
                                            name: {
                                              kind: 'Name',
                                              value: 'equals',
                                            },
                                            value: {
                                              kind: 'StringValue',
                                              value: 'read',
                                              block: false,
                                            },
                                          },
                                        ],
                                      },
                                    },
                                  ],
                                },
                                {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: {
                                        kind: 'Name',
                                        value: 'is_active',
                                      },
                                      value: {
                                        kind: 'ObjectValue',
                                        fields: [
                                          {
                                            kind: 'ObjectField',
                                            name: {
                                              kind: 'Name',
                                              value: 'equals',
                                            },
                                            value: {
                                              kind: 'BooleanValue',
                                              value: true,
                                            },
                                          },
                                        ],
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'story' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'bookmarks' },
                  name: { kind: 'Name', value: 'pick' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'AND' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: { kind: 'Name', value: 'kind' },
                                      value: {
                                        kind: 'ObjectValue',
                                        fields: [
                                          {
                                            kind: 'ObjectField',
                                            name: {
                                              kind: 'Name',
                                              value: 'equals',
                                            },
                                            value: {
                                              kind: 'StringValue',
                                              value: 'bookmark',
                                              block: false,
                                            },
                                          },
                                        ],
                                      },
                                    },
                                  ],
                                },
                                {
                                  kind: 'ObjectValue',
                                  fields: [
                                    {
                                      kind: 'ObjectField',
                                      name: {
                                        kind: 'Name',
                                        value: 'is_active',
                                      },
                                      value: {
                                        kind: 'ObjectValue',
                                        fields: [
                                          {
                                            kind: 'ObjectField',
                                            name: {
                                              kind: 'Name',
                                              value: 'equals',
                                            },
                                            value: {
                                              kind: 'BooleanValue',
                                              value: true,
                                            },
                                          },
                                        ],
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'story' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'followingCategories' },
                  name: { kind: 'Name', value: 'following_category' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: { kind: 'EnumValue', value: 'asc' },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'followingPublishers' },
                  name: { kind: 'Name', value: 'follow_publisher' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCurrentUserMemberIdQuery,
  GetCurrentUserMemberIdQueryVariables
>
export const GetMemberProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMemberProfile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'customId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'takes' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'customId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'customId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                { kind: 'Field', name: { kind: 'Name', value: 'customId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'avatar_image' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'urlOriginal' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'intro' } },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'picksCount' },
                  name: { kind: 'Name', value: 'pickCount' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'kind' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'read',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'followingCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'followerCount' },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'picks' },
                  name: { kind: 'Name', value: 'pick' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'kind' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'read',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'createdAt' },
                            value: { kind: 'EnumValue', value: 'desc' },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'take' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'takes' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'story' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'og_image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'source' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'official_site',
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'og_title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tag' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pick' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'member' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'avatar',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pickCount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'commentCount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'paywall' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'full_screen_ad' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'published_date' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'comment' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'orderBy' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: {
                                          kind: 'Name',
                                          value: 'createdAt',
                                        },
                                        value: {
                                          kind: 'EnumValue',
                                          value: 'desc',
                                        },
                                      },
                                    ],
                                  },
                                },
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'where' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'member' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: {
                                                kind: 'Name',
                                                value: 'customId',
                                              },
                                              value: {
                                                kind: 'ObjectValue',
                                                fields: [
                                                  {
                                                    kind: 'ObjectField',
                                                    name: {
                                                      kind: 'Name',
                                                      value: 'equals',
                                                    },
                                                    value: {
                                                      kind: 'Variable',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'customId',
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                  },
                                },
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'take' },
                                  value: { kind: 'IntValue', value: '1' },
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'content' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'likeCount' },
                                  },
                                  {
                                    kind: 'Field',
                                    alias: {
                                      kind: 'Name',
                                      value: 'isMemberLiked',
                                    },
                                    name: { kind: 'Name', value: 'like' },
                                    arguments: [
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'where' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: {
                                                kind: 'Name',
                                                value: 'customId',
                                              },
                                              value: {
                                                kind: 'ObjectValue',
                                                fields: [
                                                  {
                                                    kind: 'ObjectField',
                                                    name: {
                                                      kind: 'Name',
                                                      value: 'equals',
                                                    },
                                                    value: {
                                                      kind: 'Variable',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'customId',
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'member' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'avatar',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'source' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'kind' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'booksCount' },
                  name: { kind: 'Name', value: 'pickCount' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'kind' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'bookmark',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'books' },
                  name: { kind: 'Name', value: 'pick' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'kind' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'bookmark',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'createdAt' },
                            value: { kind: 'EnumValue', value: 'desc' },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'take' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'takes' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'story' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'og_image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'source' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'official_site',
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'og_title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'commentCount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tag' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pick' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'member' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'avatar',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pickCount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'commentCount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'paywall' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'full_screen_ad' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'published_date' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'comment' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'orderBy' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: {
                                          kind: 'Name',
                                          value: 'createdAt',
                                        },
                                        value: {
                                          kind: 'EnumValue',
                                          value: 'desc',
                                        },
                                      },
                                    ],
                                  },
                                },
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'where' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'member' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: {
                                                kind: 'Name',
                                                value: 'customId',
                                              },
                                              value: {
                                                kind: 'ObjectValue',
                                                fields: [
                                                  {
                                                    kind: 'ObjectField',
                                                    name: {
                                                      kind: 'Name',
                                                      value: 'equals',
                                                    },
                                                    value: {
                                                      kind: 'Variable',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'customId',
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                  },
                                },
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'take' },
                                  value: { kind: 'IntValue', value: '1' },
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'content' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'likeCount' },
                                  },
                                  {
                                    kind: 'Field',
                                    alias: {
                                      kind: 'Name',
                                      value: 'isMemberLiked',
                                    },
                                    name: { kind: 'Name', value: 'like' },
                                    arguments: [
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'where' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: {
                                                kind: 'Name',
                                                value: 'customId',
                                              },
                                              value: {
                                                kind: 'ObjectValue',
                                                fields: [
                                                  {
                                                    kind: 'ObjectField',
                                                    name: {
                                                      kind: 'Name',
                                                      value: 'equals',
                                                    },
                                                    value: {
                                                      kind: 'Variable',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'customId',
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'member' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'avatar',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'kind' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetMemberProfileQuery,
  GetMemberProfileQueryVariables
>
export const GetVisitorProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetVisitorProfile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'customId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'takes' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'customId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'customId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                { kind: 'Field', name: { kind: 'Name', value: 'customId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'avatar_image' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'urlOriginal' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'intro' } },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'picksCount' },
                  name: { kind: 'Name', value: 'pickCount' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'kind' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'read',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'followingCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'followerCount' },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'picks' },
                  name: { kind: 'Name', value: 'pick' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'kind' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'read',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'createdAt' },
                            value: { kind: 'EnumValue', value: 'desc' },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'take' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'takes' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'story' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'og_image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'source' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'official_site',
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'og_title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tag' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pick' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'member' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'avatar',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pickCount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'commentCount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'paywall' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'full_screen_ad' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'published_date' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'comment' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'orderBy' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: {
                                          kind: 'Name',
                                          value: 'createdAt',
                                        },
                                        value: {
                                          kind: 'EnumValue',
                                          value: 'desc',
                                        },
                                      },
                                    ],
                                  },
                                },
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'where' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'member' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: {
                                                kind: 'Name',
                                                value: 'customId',
                                              },
                                              value: {
                                                kind: 'ObjectValue',
                                                fields: [
                                                  {
                                                    kind: 'ObjectField',
                                                    name: {
                                                      kind: 'Name',
                                                      value: 'equals',
                                                    },
                                                    value: {
                                                      kind: 'Variable',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'customId',
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'content' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'likeCount' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'member' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'avatar',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'source' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'kind' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetVisitorProfileQuery,
  GetVisitorProfileQueryVariables
>
export const GetMemberFollowingListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMemberFollowingList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'customId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'customId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'customId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'followingCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'follow_publisherCount' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'source_type' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'not' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'equals' },
                                        value: {
                                          kind: 'StringValue',
                                          value: 'empty',
                                          block: false,
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'following' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'take' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'take' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'avatar' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'follow_publisher' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'source_type' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'not' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'equals' },
                                        value: {
                                          kind: 'StringValue',
                                          value: 'empty',
                                          block: false,
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'take' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'take' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'source_type' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetMemberFollowingListQuery,
  GetMemberFollowingListQueryVariables
>
export const GetMemberFollowerListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMemberFollowerList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'customId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'customId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'customId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'followingCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'follower' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'take' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'take' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'avatar' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'mutualFans' },
                  name: { kind: 'Name', value: 'follower' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'following' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'every' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: {
                                          kind: 'Name',
                                          value: 'customId',
                                        },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: {
                                                kind: 'Name',
                                                value: 'equals',
                                              },
                                              value: {
                                                kind: 'Variable',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'customId',
                                                },
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'take' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'take' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetMemberFollowerListQuery,
  GetMemberFollowerListQueryVariables
>
export const GetMemberProfileEditDataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMemberProfileEditData' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'customId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'customId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'customId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'customId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'avatar_image' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'resized' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'original' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'intro' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetMemberProfileEditDataQuery,
  GetMemberProfileEditDataQueryVariables
>
export const GetMemberSponsorShipsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMemberSponsorShips' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'memberId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'publisherIdList' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'memberId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sponsorCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sponsor' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'publisher' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'id' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'in' },
                                        value: {
                                          kind: 'Variable',
                                          name: {
                                            kind: 'Name',
                                            value: 'publisherIdList',
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'status' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'EnumValue',
                                    value: 'Success',
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'tid' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'publisher' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetMemberSponsorShipsQuery,
  GetMemberSponsorShipsQueryVariables
>
export const GetMemberTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMemberTransactions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'memberId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'memberId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sponsorCount' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'status' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'EnumValue',
                                    value: 'Success',
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sponsor' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'status' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'EnumValue',
                                    value: 'Success',
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'take' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'take' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'createdAt' },
                            value: { kind: 'EnumValue', value: 'desc' },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'tid' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'publisher' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'logo' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transaction' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'status' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'EnumValue',
                                    value: 'Success',
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'take' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'take' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'createdAt' },
                            value: { kind: 'EnumValue', value: 'desc' },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'tid' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'expireDate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'depositVolume' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'unlockStory' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'source' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'logo' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'policy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'charge' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'unlockSingle' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'publisher' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'transactions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'member' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'memberId' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'status' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'equals' },
                            value: { kind: 'EnumValue', value: 'Success' },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'active' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'equals' },
                            value: { kind: 'BooleanValue', value: true },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'unlockStory' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'gte' },
                                  value: { kind: 'IntValue', value: '0' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'createdAt' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'tid' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'unlockStory' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetMemberTransactionsQuery,
  GetMemberTransactionsQueryVariables
>
export const GetMemberUnlockStoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMemberUnlockStories' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'memberId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '0' },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'memberId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transaction' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'status' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'EnumValue',
                                    value: 'Success',
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'createdAt' },
                            value: { kind: 'EnumValue', value: 'desc' },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'skip' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'take' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'take' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'tid' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'expireDate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'unlockStory' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'og_image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'source' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'logo' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetMemberUnlockStoriesQuery,
  GetMemberUnlockStoriesQueryVariables
>
export const GetMemberSingleTransactionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMemberSingleTransaction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'memberId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'tid' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'member' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'memberId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transaction' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'tid' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'tid' },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'status' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'EnumValue',
                                    value: 'Success',
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'tid' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'depositVolume' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'unlockStory' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'source' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'policy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'charge' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'unlockSingle' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'publisher' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sponsor' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'tid' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'tid' },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'status' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'EnumValue',
                                    value: 'Success',
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'publisher' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetMemberSingleTransactionQuery,
  GetMemberSingleTransactionQueryVariables
>
export const GetMemberPickCommentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMemberPickComment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'memberId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'storyId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'members' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'equals' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'memberId' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pick' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'story' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'id' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'equals' },
                                        value: {
                                          kind: 'Variable',
                                          name: {
                                            kind: 'Name',
                                            value: 'storyId',
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pick_comment' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'where' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'is_active' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'equals' },
                                        value: {
                                          kind: 'BooleanValue',
                                          value: true,
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'content' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetMemberPickCommentQuery,
  GetMemberPickCommentQueryVariables
>
export const GetPublisherPolicyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPublisherPolicy' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'customId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'policies' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'publisher' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'customId' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'customId' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'unlockSingle' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'equals' },
                            value: { kind: 'BooleanValue', value: true },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'charge' } },
                { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPublisherPolicyQuery,
  GetPublisherPolicyQueryVariables
>
export const PublishersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Publishers' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'publishers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rss' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'official_site' },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'sponsorCount' },
                  name: { kind: 'Name', value: 'followerCount' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PublishersQuery, PublishersQueryVariables>
export const GetPublisherFollowerListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPublisherFollowerList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'publisherId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'takes' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'publishers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'customId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'equals' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'publisherId' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'followerCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'follower' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'take' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'takes' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'avatar' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPublisherFollowerListQuery,
  GetPublisherFollowerListQueryVariables
>
export const LatestStoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'LatestStories' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'date' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'DateTime' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'published_date' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'gte' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'date' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'category' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'gt' },
                                  value: { kind: 'IntValue', value: '0' },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'published_date' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'category' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'source' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customId' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'published_date' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'og_title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'og_image' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'og_description' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'full_content' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'origid' } },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'picksCount' },
                  name: { kind: 'Name', value: 'pickCount' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'kind' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'read',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'picks' },
                  name: { kind: 'Name', value: 'pick' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'kind' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'read',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'member' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'avatar' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'commentCount' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'paywall' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'full_screen_ad' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LatestStoriesQuery, LatestStoriesQueryVariables>
export const GetStoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetStory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'storyId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'picksTake' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commentsTake' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'story' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'storyId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'source' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customId' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'og_image' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'published_date' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'full_content' },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'picksCount' },
                  name: { kind: 'Name', value: 'pickCount' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'kind' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'read',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'picks' },
                  name: { kind: 'Name', value: 'pick' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'kind' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'read',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'take' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'picksTake' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'kind' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'member' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'customId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'avatar' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'commentsCount' },
                  name: { kind: 'Name', value: 'commentCount' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'state' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'public',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'comments' },
                  name: { kind: 'Name', value: 'comment' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'state' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'public',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'createdAt' },
                            value: { kind: 'EnumValue', value: 'desc' },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'take' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'commentsTake' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'member' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'customId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'avatar' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'content' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'apiData' } },
                { kind: 'Field', name: { kind: 'Name', value: 'trimApiData' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isMember' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetStoryQuery, GetStoryQueryVariables>
export const GetStoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetStories' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'storyIds' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'picksTake' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commentsTake' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'in' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'storyIds' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'source' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customId' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'og_image' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'published_date' },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'picksCount' },
                  name: { kind: 'Name', value: 'pickCount' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'kind' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'read',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'picks' },
                  name: { kind: 'Name', value: 'pick' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'kind' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'read',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'take' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'picksTake' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'kind' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'member' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'customId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'avatar' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'commentsCount' },
                  name: { kind: 'Name', value: 'commentCount' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'state' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'public',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'comments' },
                  name: { kind: 'Name', value: 'comment' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'state' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: {
                                    kind: 'StringValue',
                                    value: 'public',
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'is_active' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'equals' },
                                  value: { kind: 'BooleanValue', value: true },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'createdAt' },
                            value: { kind: 'EnumValue', value: 'desc' },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'take' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'commentsTake' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'member' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'customId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'avatar' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'content' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'apiData' } },
                { kind: 'Field', name: { kind: 'Name', value: 'trimApiData' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isMember' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetStoriesQuery, GetStoriesQueryVariables>
export const GetStorySourceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetStorySource' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'storyId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'story' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'storyId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'source' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetStorySourceQuery, GetStorySourceQueryVariables>
