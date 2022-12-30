import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { BodylessBlock } from '../../containers/BodylessBlock';
import { BodyfullBlock } from '../../containers/BodyfullBlock';


export default function Categories() {

  return (
    <>
      <Head>
        <title>Categories - Docs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className='p-4'>
        <div className='border flex flex-col rounded-xl'>
          <section className='glow h-16 px-6 rounded-t-xl bg-black bg-opacity-60 text-3xl flex items-center gap-4'>
            <Link href='/docs'>
              <svg xmlns="http://www.w3.org/2000/svg" className='w-7 h-7 fill-current text-white   hover:scale-90 transition-all duration-100' viewBox="0 0 384 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
            </Link>
            <p>Categories</p>
          </section>

          <section className='w-full h-full p-4 bg-black bg-opacity-20 rounded-b-xl grid grid-cols-1 gap-3   lg:grid-cols-2   2xl:grid-cols-3'>
            <BodylessBlock
              type = 'get'
              path = '/categories'
              querys = {{ limit: 'integer', offset: 'integer', active: 'boolean' }}
              responses = {{ 200: 'OK', 400: 'Bad request (check parameters datatypes)' }}
            />
            <BodylessBlock
              type = 'get'
              path = '/categories/{id}'
              parameters = {{ id: 'integer' }}
              responses = {{ 200: 'OK', 400: 'Bad request (check parameters datatypes)', 404: 'Not found' }}
            />
            <BodyfullBlock
              type = 'post'
              path='/categories'
              placeholder='{ "name": "string", "active": "(optional: boolean)" }'
              responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)' }}
            />
            <BodyfullBlock
              type = 'put'
              path='/categories/{id}'
              parameters = {{ id: 'integer' }}
              placeholder='{ "name": "string", "active": "(optional: boolean)" }'
              responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)' }}
            />
            <BodyfullBlock
              type = 'patch'
              path='/categories/{id}'
              parameters = {{ id: 'integer' }}
              placeholder='{ "name": "string", "active": "(optional: boolean)" }'
              responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)' }}
            />
            <BodylessBlock
              type = 'delete'
              path = '/categories/{id}'
              parameters = {{ id: 'integer' }}
              responses = {{ 200: 'OK', 400: 'Bad request (check parameters datatypes)', 404: 'Not found' }}
            />
          </section>
        </div>
      </main>
    </>
  )
}