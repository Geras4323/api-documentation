import React from 'react';
import Head from 'next/head';

import { BodylessBlock } from '../../containers/BodylessBlock';
import { BodyfullBlock } from '../../containers/BodyfullBlock';


export default function Suppliers() {

  return (
    <>
      <Head>
        <title>Suppliers - Docs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className='w-full h-full bg-black grid grid-cols-3 gap-3'>
        <BodylessBlock
          type = 'get'
          path = '/suppliers'
          querys = {{ limit: 'integer', offset: 'integer' }}
          responses = {{ 200: 'OK', 400: 'Bad request (check parameters datatypes)' }}
        />
        <BodylessBlock
          type = 'get'
          path = '/suppliers'
          parameters = {{ id: 'integer' }}
          responses = {{ 200: 'OK', 400: 'Bad request (check parameters datatypes)', 404: 'Not found' }}
        />
        <BodyfullBlock
          type = 'post'
          path='/suppliers'
          placeholder='{ "name": "string" }'
          responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)', 409: 'Conflict' }}
        />
        <BodyfullBlock
          type = 'put'
          path='/suppliers/{id}'
          parameters = {{ id: 'integer' }}
          placeholder='{ "name": "string" }'
          responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)', 404: 'Not found' }}
        />
        <BodyfullBlock
          type = 'patch'
          path='/suppliers/{id}'
          parameters = {{ id: 'integer' }}
          placeholder='{ "name": "string" }'
          responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)', 404: 'Not found' }}
        />
        <BodylessBlock
          type = 'delete'
          path = '/suppliers/{id}'
          parameters = {{ id: 'integer' }}
          responses = {{ 200: 'OK', 400: 'Bad request (check parameters datatypes)', 404: 'Not found' }}
        />
      </main>
    </>
  )
}