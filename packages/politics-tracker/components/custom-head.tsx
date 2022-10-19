import Head from 'next/head'

export default function CustomHead(): JSX.Element {
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="120x120" href="/favicon.png" />
      <link rel="shortcut icon" sizes="48x48" href="/favicon.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  )
}
