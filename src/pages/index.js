import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'



export default function Home() {
  return (
    <>
      <Head>
        <title>SC CSE Registrations</title>
        <meta name="description" content="Students Chapter Cse Registraions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link href='/admin/adminLogin' >
          sign in
        </Link>
      </main>
    </>
  )
}
