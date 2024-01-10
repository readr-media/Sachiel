import { print } from 'graphql'
import styled from 'styled-components'

import type { DraftPolitic } from '~/components/politics/politic-form'
import PoliticForm from '~/components/politics/politic-form'
import Sources from '~/components/politics-detail/sources'
import { useIsPartyPage } from '~/components/react-context/use-check-party-page'
import { useToast } from '~/components/toast/use-toast'
import { SOURCE_DELIMITER } from '~/constants/politics'
import AddEditingPoliticToThread from '~/graphql/mutation/politics/add-editing-politic-to-thread.graphql'
import type { GenericGQLData } from '~/types/common'
import type { CreatedEditingPoliticData } from '~/types/politics'
import type { PoliticDetail } from '~/types/politics-detail'
import { isDraftPoliticForModification } from '~/utils/politic'
import { fireGqlRequest } from '~/utils/utils'

const DetailContainer = styled.div`
  padding: 20px 0px;

  > li:nth-child(2) {
    padding-top: 30px;
  }
`
const DetailList = styled.li`
  list-style: none;
  position: relative;
  word-break: break-word;

  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.8;
    color: #0f2d35;
    margin-bottom: 12px;
  }

  > span {
    display: inline-block;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.3;
    color: #0f2d35;
    margin-bottom: 10px;
    padding-left: 15px;
  }

  &:before {
    content: '';
    display: inline-block;
    background-color: #f7ba31;
    border-radius: 50%;
    width: 6px;
    height: 6px;
    text-align: center;
    position: absolute;
    left: 0px;
    top: 10px;
  }
  &:nth-child(2):before {
    top: 40px;
  }
  ${({ theme }) => theme.breakpoint.md} {
    p,
    span {
      font-size: 18px;
    }
  }
`

type DetailsProps = {
  politic: PoliticDetail
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Details({
  politic,
  setEditMode = () => {},
  editMode = false,
}: DetailsProps): JSX.Element {
  const { desc, content, source, person, organization } = politic

  const toast = useToast()
  const { isPartyPage } = useIsPartyPage()

  async function appendPoliticToThread(data: DraftPolitic): Promise<boolean> {
    if (!person && !organization) throw new Error('electionData is null')
    if (!isDraftPoliticForModification(data)) throw Error('`id` is not in data')

    const cmsApiUrl = `${window.location.origin}/api/data`

    try {
      let variables: any

      if (isPartyPage) {
        variables = {
          data: {
            thread_parent: {
              connect: {
                id: data.id,
              },
            },
            organization: {
              connect: {
                id: organization?.id,
              },
            },
            desc: data.desc,
            source: data.source,
            content: data.content,
          },
        }
      } else {
        variables = {
          data: {
            thread_parent: {
              connect: {
                id: data.id,
              },
            },
            person: {
              connect: {
                id: person?.id,
              },
            },
            desc: data.desc,
            source: data.source,
            content: data.content,
          },
        }
      }

      // result is not used currently
      // eslint-disable-next-line
      const result: GenericGQLData<
        CreatedEditingPoliticData,
        'createEditingPolitic'
      > = await fireGqlRequest(
        print(AddEditingPoliticToThread),
        variables,
        cmsApiUrl
      )

      toast.open({
        status: 'success',
        title: '送出成功',
        desc: '通過志工審核後，您修改的政見就會出現在這裡',
      })

      setEditMode(false)

      return true
    } catch (err) {
      console.error(err)

      toast.open({
        status: 'fail',
        title: '出了點問題...',
        desc: '送出失敗，請重試一次',
      })

      return false
    }
  }

  return (
    <DetailContainer>
      {editMode ? (
        <PoliticForm
          politic={politic}
          closeForm={() => setEditMode(false)}
          submitForm={appendPoliticToThread}
        />
      ) : (
        <>
          <DetailList>
            <span>政見</span>
            {desc.split(SOURCE_DELIMITER).map((item) => {
              return <p key={item}>{item}</p>
            })}
          </DetailList>

          {content !== '' && (
            <DetailList>
              <span>補充說明</span>
              {content.split(SOURCE_DELIMITER).map((item) => {
                return <p key={item}>{item}</p>
              })}
            </DetailList>
          )}
          <Sources sources={source} />
        </>
      )}
    </DetailContainer>
  )
}
