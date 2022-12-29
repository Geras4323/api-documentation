import React from 'react';
import Head from 'next/head';

import { BodylessBlock } from '../../containers/BodylessBlock';
import { BodyfullBlock } from '../../containers/BodyfullBlock';


export default function Categories() {

  return (
    <>
      <Head>
        <title>Categories - Docs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className='w-full h-full bg-black grid grid-cols-3 gap-3'>
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
      </main>
    </>
  )
}