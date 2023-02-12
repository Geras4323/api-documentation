import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { IndexLink } from '../containers/IndexLink';


export default function Home(): JSX.Element {

  return (
    <>
      <Head>
        <title>API Docs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className='w-full h-screen p-16 text-white flex flex-col gap-8   lg:flex-row lg:gap-16   xl:gap-24   2xl:p-24'>
        <section className='flex flex-col   lg:w-1/3'>
          <h1 className='glow text-3xl mb-6   ssm:text-4xl   sm:text-5xl   2xl:text-6xl'>API Documentation</h1>
          <h2 className='text-2xl mb-8   ssm:text-3xl   sm:text-4xl   2xl:text-5xl'>PostgreSQL Database</h2>
          <p className='text-gray-400 text-xl mb-8   ssm:text-2xl   sm:text-3xl   2xl:text-4xl'>| Ecommerce-like |</p>
          <Link href='/docs' className='w-fit mb-4 bg-black bg-opacity-40 p-3 text-xl rounded-xl border   hover:scale-105 transition-all duration-100'>View docs</Link>
        </section>

        <section className='w-full h-full mt-6 flex flex-col gap-10 justify-between items-center   lg:w-2/3 lg:justify-start   xl:w-1/3'>
          <img
            src='/business.png' alt='business'
            className='w-72   ssm:w-96   sm:w-96'
          />
          <div className='w-full flex flex-col gap-4   sm:flex-row'>
            <IndexLink
              title='API repository'
              description='See how this API was made'
              link='https://github.com/Geras4323/web-shop-nodeExpress'
            />
            <IndexLink
              title={`This website's repository`}
              description={`View this website's code`}
              link='https://github.com/Geras4323/api-documentation'
            />
          </div>
        </section>
      </main>

    </>
  )
}
