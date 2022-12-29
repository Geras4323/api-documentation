import React from 'react';
import Head from 'next/head';

import { BodylessBlock } from '../../containers/BodylessBlock';
import { BodyfullBlock } from '../../containers/BodyfullBlock';


export default function Products() {

  return (
    <>
      <Head>
        <title>Products - Docs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className='w-full h-full bg-black grid grid-cols-3 gap-3'>
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
      </main>
    </>
  )
}