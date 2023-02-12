import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { DocsOption } from '../../containers/DocsOption';

export default function DocsHome(): JSX.Element {

  return (
    <>
      <Head>
        <title>API Docs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Link href='/'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='w-10 h-10 fixed top-4 left-4 fill-current text-white   hover:scale-90 transition-all duration-100'>
          <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
        </svg>
      </Link>

      <main className='w-full h-full p-12 text-white'>
        <h1 className='mb-12 px-4 text-3xl text-center glow   lg:text-4xl'>Database's tables</h1>

        <section className='cards-container'>
          <DocsOption
            title='Categories'
            image='categories.png'
            path='categories'
          />
          <DocsOption
            title='Orders'
            image='orders.png'
            path='orders'
          />
          <DocsOption
            title='Payments'
            image='payments.png'
            path='payments'
          />
          <DocsOption
            title='Products'
            image='products.png'
            path='products'
          />
          <DocsOption
            title='Suppliers'
            image='suppliers.png'
            path='suppliers'
          />
          <DocsOption
            title='Users'
            image='users.png'
            path='users'
          />
        </section>
      </main>
    </>
  )
}