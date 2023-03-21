import type { DataSet } from '~/graphql/query/dataset'
import type { DataSetItem } from '~/types/component'

export function convertDataSet(item: DataSet): DataSetItem {
  const { id = '', title = '', link = '', gallery: galleries = [] } = item

  const names = galleries[0]?.writer.map((w) => w.name)

  return {
    id,
    title,
    href: link,
    writerName: names?.[0] ?? '',
    galleries: galleries.map((gallery) => {
      const { id = '', link = '', heroImage } = gallery

      return {
        id,
        href: link,
        images: heroImage?.resized ?? {},
      }
    }),
  }
}
