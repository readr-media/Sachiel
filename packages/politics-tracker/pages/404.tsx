import type { NextPage } from 'next'
import DefaultLayout from '~/components/layout/default'

export async function getStaticProps() {
  return {
    props: {},
  }
}

const Custom404: NextPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <DefaultLayout>
        <div className="flex grow flex-row self-center">
          <div className="self-center">
            <h1 className="m-0 mr-5 inline-block border-r border-black border-opacity-30 pr-[23px] align-middle text-[24px] font-medium leading-[49px]">
              404
            </h1>
            <div className="inline-block h-[49px] text-left align-middle leading-[49px]">
              <h2 className="m-0 p-0 text-[14px] font-normal leading-[49px]">
                This page could not be found.
              </h2>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </div>
  )
}

export default Custom404
