import React from 'react';
import Head from 'next/head';

import { BodylessBlock } from '../../containers/BodylessBlock';
import { BodyfullBlock } from '../../containers/BodyfullBlock';


export default function Payments() {

  return (
    <>
      <Head>
        <title>Payments - Docs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className='w-full h-full bg-black grid grid-cols-3 gap-3'>
        <BodylessBlock
          type = 'get'
          path = '/payments'
          querys = {{ limit: 'integer', offset: 'integer', amount: 'float', amount_min: 'float', amount_max: 'float' }}
          responses = {{ 200: 'OK', 400: 'Bad request (check parameters datatypes)' }}
        />
        <BodylessBlock
          type = 'get'
          path = '/payments/{id}'
          parameters = {{ id: 'integer' }}
          responses = {{ 200: 'OK', 400: 'Bad request (check parameters datatypes)', 404: 'Not found' }}
        />
        <BodyfullBlock
          type = 'post'
          path='/payments'
          placeholder='{ "orderID": "integer", "amount": "float" }'
          responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)' }}
        />
        <BodyfullBlock
          type = 'put'
          path='/payments/{id}'
          parameters = {{ id: 'integer' }}
          placeholder='{ "orderID": "integer", "amount": "float" }'
          responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)' }}
        />
        <BodyfullBlock
          type = 'patch'
          path='/payments/{id}'
          parameters = {{ id: 'integer' }}
          placeholder='{ "orderID": "integer", "amount": "float" }'
          responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)' }}
        />
        <BodylessBlock
          type = 'delete'
          path = '/payments/{id}'
          parameters = {{ id: 'integer' }}
          responses = {{ 200: 'OK', 400: 'Bad request (check parameters datatypes)', 404: 'Not found' }}
        />
      </main>
    </>
  )
}