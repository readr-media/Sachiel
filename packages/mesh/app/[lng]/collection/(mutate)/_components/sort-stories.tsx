'use client'

import type { DragEndEvent } from '@dnd-kit/core'
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type { PointerEvent } from 'react'
import React from 'react'

import type { UseCollection } from '../_types/collection'
import SortStoryCard from './sort-story-card'

class SmartPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: 'onPointerDown' as const,
      handler: ({ nativeEvent: event }: PointerEvent) => {
        // custom logic to skip drag and drop
        if (
          !event.isPrimary ||
          event.button !== 0 ||
          (event.target as Element).tagName.toLowerCase() === 'button'
        ) {
          return false
        }
        return true
      },
    },
  ]
}

export default function SortStories({
  useCollection,
}: {
  useCollection: UseCollection
}) {
  const { collectionPickStories, setCollectionPickStories } = useCollection()
  const sensors = useSensors(useSensor(SmartPointerSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      setCollectionPickStories((stories) => {
        const oldIndex = stories.findIndex((item) => item.id === active.id)
        const newIndex = stories.findIndex((item) => item.id === over?.id)

        return arrayMove(stories, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={collectionPickStories}
        strategy={verticalListSortingStrategy}
      >
        {collectionPickStories.map((story) => (
          <SortStoryCard
            key={story.id}
            story={story}
            useCollection={useCollection}
          />
        ))}
      </SortableContext>
    </DndContext>
  )
}
