import React from 'react';
import Head from 'next/head';

import { BodylessBlock } from '../../containers/BodylessBlock';
import { BodyfullBlock } from '../../containers/BodyfullBlock';


export default function Orders() {

  return (
    <>
      <Head>
        <title>Orders - Docs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className='w-full h-full bg-black grid grid-cols-2 gap-3'>
        <BodylessBlock
          type = 'get'
          path = '/orders'
          querys = {{ limit: 'integer', offset: 'integer', total: 'float', total_min: 'float', total_max: 'float' }}
          responses = {{ 200: 'OK', 400: 'Bad request (check parameters datatypes)' }}
        />
        <BodylessBlock
          type = 'get'
          path = '/orders/{id}'
          parameters = {{ id: 'integer' }}
          responses = {{ 200: 'OK', 400: 'Bad request (check parameters datatypes)', 404: 'Not found' }}
        />
        <BodyfullBlock
          type = 'post'
          path='/orders'
          placeholder='{ "userID": "integer", "total": "float" }'
          responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)' }}
        />
        <BodyfullBlock
          type = 'post'
          path='/orders/add-product'
          placeholder='{ "orderID": "integer", "productID": "integer", "quantity": "integer" }'
          responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)', 404: 'Not found' }}
        />
        <BodyfullBlock
          type = 'put'
          path='/orders/{id}'
          parameters = {{ id: 'integer' }}
          placeholder='{ "userID": "integer", "total": "float" }'
          responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)' }}
        />
        <BodyfullBlock
          type = 'patch'
          path='/orders/{id}'
          parameters = {{ id: 'integer' }}
          placeholder='{ "userID": "integer", "total": "float" }'
          responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)' }}
        />
        <BodylessBlock
          type = 'delete'
          path = '/orders/{id}'
          parameters = {{ id: 'integer' }}
          responses = {{ 200: 'OK', 400: 'Bad request (check parameters datatypes)', 404: 'Not found' }}
        />
        <BodylessBlock
          type = 'delete'
          path = '/orders/{id}/remove-product/{productID}'
          parameters = {{ id: 'integer', productID: 'integer' }}
          responses = {{ 200: 'OK', 400: 'Bad request (check parameters datatypes)', 404: 'Not found' }}
        />
      </main>
    </>
  )
}