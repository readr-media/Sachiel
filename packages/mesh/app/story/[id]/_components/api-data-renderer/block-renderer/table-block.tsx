import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

type ContentTableCell = {
  html: string
}
export interface ApiDataTable extends ApiDataBlockBase {
  type: ApiDataBlockType.Table
  content: ContentTableCell[][]
}

export default function TableBlock({
  apiDataBlock,
}: {
  apiDataBlock: ApiDataTable
}) {
  const tableData = apiDataBlock.content
  const tableHeadRow = tableData[0]
  const tableBodyRows = tableData.slice(1)

  return (
    <table>
      <thead>
        <tr>
          {tableHeadRow.map((cell, i) => {
            return (
              <th key={i}>
                <div
                  className="cell"
                  dangerouslySetInnerHTML={{ __html: cell.html }}
                />
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {tableBodyRows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, i) => (
              <td key={i}>
                <div
                  className="cell"
                  dangerouslySetInnerHTML={{ __html: cell.html }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
