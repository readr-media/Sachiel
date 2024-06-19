/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  'fragment ListStory on Story {\n  id\n  title\n  summary\n  og_image\n  published_date\n  source {\n    title\n  }\n  pickCount\n  pick {\n    createdAt\n    member {\n      id\n      name\n      avatar\n    }\n  }\n  commentCount\n  paywall\n  full_screen_ad\n}':
    types.ListStoryFragmentDoc,
  'fragment UserActionStory on Story {\n  id\n  url\n  title\n  og_image\n  og_description\n  source {\n    title\n    createdAt\n  }\n  published_date\n  paywall\n  full_screen_ad\n  pickCount\n  pick {\n    createdAt\n    member {\n      id\n      name\n      avatar\n    }\n  }\n  commentCount\n  comment {\n    id\n    content\n    state\n    published_date\n    createdAt\n    member {\n      id\n      name\n      avatar\n    }\n  }\n}':
    types.UserActionStoryFragmentDoc,
  'query GetMemberFollowing($memberId: ID!, $takes: Int!) {\n  member(where: {id: $memberId}) {\n    id\n    name\n    avatar\n    following {\n      id\n      name\n      avatar\n      following(where: {id: {gte: 0}}, orderBy: {id: asc}, take: 10000) {\n        id\n        name\n        avatar\n        followerCount\n      }\n      pick(orderBy: {createdAt: desc}, take: $takes) {\n        id\n        createdAt\n        story {\n          ...UserActionStory\n        }\n      }\n      comment(orderBy: {createdAt: desc}, take: $takes) {\n        id\n        createdAt\n        story {\n          ...UserActionStory\n        }\n      }\n    }\n    pick {\n      id\n      story {\n        id\n      }\n    }\n  }\n}':
    types.GetMemberFollowingDocument,
  'query GetPublishers($take: Int) {\n  publishers(take: $take) {\n    id\n    title\n  }\n}':
    types.GetPublishersDocument,
  'query GetLatestStories($take: Int) {\n  stories(take: $take, orderBy: {published_date: desc}) {\n    ...ListStory\n  }\n}\n\nquery GetMostPickedStory($id: ID) {\n  story(where: {id: $id}) {\n    ...ListStory\n  }\n}':
    types.GetLatestStoriesDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment ListStory on Story {\n  id\n  title\n  summary\n  og_image\n  published_date\n  source {\n    title\n  }\n  pickCount\n  pick {\n    createdAt\n    member {\n      id\n      name\n      avatar\n    }\n  }\n  commentCount\n  paywall\n  full_screen_ad\n}'
): typeof documents['fragment ListStory on Story {\n  id\n  title\n  summary\n  og_image\n  published_date\n  source {\n    title\n  }\n  pickCount\n  pick {\n    createdAt\n    member {\n      id\n      name\n      avatar\n    }\n  }\n  commentCount\n  paywall\n  full_screen_ad\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment UserActionStory on Story {\n  id\n  url\n  title\n  og_image\n  og_description\n  source {\n    title\n    createdAt\n  }\n  published_date\n  paywall\n  full_screen_ad\n  pickCount\n  pick {\n    createdAt\n    member {\n      id\n      name\n      avatar\n    }\n  }\n  commentCount\n  comment {\n    id\n    content\n    state\n    published_date\n    createdAt\n    member {\n      id\n      name\n      avatar\n    }\n  }\n}'
): typeof documents['fragment UserActionStory on Story {\n  id\n  url\n  title\n  og_image\n  og_description\n  source {\n    title\n    createdAt\n  }\n  published_date\n  paywall\n  full_screen_ad\n  pickCount\n  pick {\n    createdAt\n    member {\n      id\n      name\n      avatar\n    }\n  }\n  commentCount\n  comment {\n    id\n    content\n    state\n    published_date\n    createdAt\n    member {\n      id\n      name\n      avatar\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetMemberFollowing($memberId: ID!, $takes: Int!) {\n  member(where: {id: $memberId}) {\n    id\n    name\n    avatar\n    following {\n      id\n      name\n      avatar\n      following(where: {id: {gte: 0}}, orderBy: {id: asc}, take: 10000) {\n        id\n        name\n        avatar\n        followerCount\n      }\n      pick(orderBy: {createdAt: desc}, take: $takes) {\n        id\n        createdAt\n        story {\n          ...UserActionStory\n        }\n      }\n      comment(orderBy: {createdAt: desc}, take: $takes) {\n        id\n        createdAt\n        story {\n          ...UserActionStory\n        }\n      }\n    }\n    pick {\n      id\n      story {\n        id\n      }\n    }\n  }\n}'
): typeof documents['query GetMemberFollowing($memberId: ID!, $takes: Int!) {\n  member(where: {id: $memberId}) {\n    id\n    name\n    avatar\n    following {\n      id\n      name\n      avatar\n      following(where: {id: {gte: 0}}, orderBy: {id: asc}, take: 10000) {\n        id\n        name\n        avatar\n        followerCount\n      }\n      pick(orderBy: {createdAt: desc}, take: $takes) {\n        id\n        createdAt\n        story {\n          ...UserActionStory\n        }\n      }\n      comment(orderBy: {createdAt: desc}, take: $takes) {\n        id\n        createdAt\n        story {\n          ...UserActionStory\n        }\n      }\n    }\n    pick {\n      id\n      story {\n        id\n      }\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetPublishers($take: Int) {\n  publishers(take: $take) {\n    id\n    title\n  }\n}'
): typeof documents['query GetPublishers($take: Int) {\n  publishers(take: $take) {\n    id\n    title\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetLatestStories($take: Int) {\n  stories(take: $take, orderBy: {published_date: desc}) {\n    ...ListStory\n  }\n}\n\nquery GetMostPickedStory($id: ID) {\n  story(where: {id: $id}) {\n    ...ListStory\n  }\n}'
): typeof documents['query GetLatestStories($take: Int) {\n  stories(take: $take, orderBy: {published_date: desc}) {\n    ...ListStory\n  }\n}\n\nquery GetMostPickedStory($id: ID) {\n  story(where: {id: $id}) {\n    ...ListStory\n  }\n}']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
