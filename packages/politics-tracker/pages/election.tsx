import DefaultLayout from '~/components/layout/default'
import Nav from '~/components/election/nav'
type ElectionPageProps = {
  data: any
  prev: RawElection
  next: RawElection
}

const Election = (props: ElectionPageProps) => {
  return (
    <DefaultLayout>
      <main className="mt-header flex w-screen flex-col items-center md:mt-header-md">
        <Nav />
      </main>
    </DefaultLayout>
  )
}

export default Election
