import Head from 'next/head'
import React from 'react'
import App from '../app'

export default function Home() {
  return (
    <>
      <Head>
        <title>Web sayt — Next</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <App />
    </>
  )
}
