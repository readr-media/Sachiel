import { getAnswerWithProgress } from '@/app/actions/hybrid-search'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const questionId = searchParams.get('questionId')

    if (!questionId) {
      return Response.json({ error: 'questionId is required' }, { status: 400 })
    }

    const result = await getAnswerWithProgress(questionId)

    return Response.json(result)
  } catch (error) {
    console.error('[AI Answer API] Error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
