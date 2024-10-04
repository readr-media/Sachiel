'use client'

import React from 'react'

import { CommentProvider, useComment } from '@/context/comment-context'
import { type GetStoryQuery } from '@/graphql/__generated__/graphql'

import { MobileCommentModalContent } from '../mobile-comment-section/mobile-comment-modal-content'

type Story = NonNullable<GetStoryQuery>['story']

export default function MobileCommentModalWrapper({
  children,
  storyData,
}: {
  children: Readonly<React.ReactNode>
  storyData: Story
}) {
  return (
    <CommentProvider initialComments={storyData?.comments || []}>
      <MobileCommentModalContent storyData={storyData} />
      {children}
    </CommentProvider>
  )
}

export const useCommentBlock = useComment
