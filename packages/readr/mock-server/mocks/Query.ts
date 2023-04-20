const dataSetsCount = 16

export const Query = {
  categories: () => [...new Array(10)],
  editorChoices: () => [...new Array(6)],
  features: () => [...new Array(8)],
  posts: () => [...new Array(50)],
  quotes: () => [...new Array(20)],
  collaborations: () => [...new Array(15)],
  dataSets: () => [...new Array(dataSetsCount)],
  dataSetsCount: () => dataSetsCount,
}
