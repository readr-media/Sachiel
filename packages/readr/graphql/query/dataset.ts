import gql from 'graphql-tag'

import { resizeImagesFragment } from '~/graphql/fragments/resized-images'
import type {
  GenericAuthor,
  GenericDataSet,
  GenericGallery,
  Override,
  PhotoWithResizedOnly,
} from '~/types/common'

type Auther = Pick<GenericAuthor, 'id' | 'name'>
type Gallery = Override<
  Pick<GenericGallery, 'id' | 'link' | 'writer' | 'heroImage'>,
  { writer: Auther[]; heroImage: PhotoWithResizedOnly }
>
export type DataSet = Override<
  Pick<GenericDataSet, 'id' | 'title' | 'link' | 'gallery'>,
  { gallery: Gallery[] }
>
export type DataSetWithCount = {
  dataSets: DataSet[]
  count?: number
}

const dataSets = gql`
  query ($skip: Int, $first: Int = 3, $shouldQueryCount: Boolean! = true) {
    dataSets(
      orderBy: [{ publishTime: desc }, { id: desc }]
      take: $first
      skip: $skip
      where: { state: { equals: "published" } }
    ) {
      id
      title: name
      link
      gallery(orderBy: { createdAt: desc }, take: 3) {
        id
        link
        writer {
          id
          name
        }
        heroImage {
          resized {
            ...ResizedImagesField
          }
        }
      }
    }
    count: dataSetsCount(where: { state: { equals: "published" } })
      @include(if: $shouldQueryCount)
  }
  ${resizeImagesFragment}
`

export { dataSets }
