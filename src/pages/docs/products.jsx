import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { BodylessBlock } from '../../containers/BodylessBlock';
import { BodyfullBlock } from '../../containers/BodyfullBlock';


export default function Products() {

  return (
    <>
      <Head>
        <title>Products - Docs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className='p-4'>
        <div className='border flex flex-col rounded-xl'>
          <section className='glow h-16 px-6 rounded-t-xl bg-black bg-opacity-60 text-3xl flex items-center gap-4'>
            <Link href='/docs'>
              <svg xmlns="http://www.w3.org/2000/svg" className='w-7 h-7 fill-current text-white   hover:scale-90 transition-all duration-100' viewBox="0 0 384 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
            </Link>
            <p>Products</p>
          </section>

          <section className='w-full h-full p-4 bg-black bg-opacity-20 rounded-b-xl grid grid-cols-1 gap-3   lg:grid-cols-2   2xl:grid-cols-3'>
            <BodylessBlock
              type = 'get'
              path = '/products'
              querys = {{ limit: 'integer', offset: 'integer', price: 'float', price_min: 'float', price_max: 'float' }}
              responses = {{ 200: 'OK', 400: 'Bad request (verify parameters datatypes)' }}
            />
            <BodylessBlock
              type = 'get'
              path = '/products/{id}'
              parameters = {{ id: 'integer' }}
              responses = {{ 200: 'OK', 400: 'Bad request (verify parameters datatypes)', 404: 'Not found' }}
            />
            <BodyfullBlock
              type = 'post'
              path = '/products'
              placeholder='{ "categoryID": "integer", "supplierID": "integer", "name": "string", "description": "string", "image": "(optional: url)", "price": "float" }'
              responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)' }}
            />
            <BodyfullBlock
              type = 'put'
              path = '/products/{id}'
              parameters = {{ id: 'integer' }}
              placeholder='{ "categoryID": "integer", "supplierID": "integer", "name": "string", "description": "string", "image": "(optional: url)", "price": "float", "active": "boolean" }'
              responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)', 404: 'Not found' }}
            />
            <BodyfullBlock
              type = 'patch'
              path = '/products/{id}'
              parameters = {{ id: 'integer' }}
              placeholder='{ "categoryID": "integer", "supplierID": "integer", "name": "string", "description": "string", "image": "(optional: url)", "price": "float" }'
              responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)', 404: 'Not found' }}
            />
            <BodylessBlock
              type = 'delete'
              path = '/products/{id}'
              parameters = {{ id: 'integer' }}
              responses = {{ 200: 'OK', 400: 'Bad request (verify parameters datatypes)', 404: 'Not found' }}
            />
          </section>
        </div>
      </main>
    </>
  )
}