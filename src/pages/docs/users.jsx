import React from 'react';
import Head from 'next/head';

import { BodylessBlock } from '../../containers/BodylessBlock';
import { BodyfullBlock } from '../../containers/BodyfullBlock';


export default function Users() {

  return (
    <>
      <Head>
        <title>Users - Docs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className='w-full h-full bg-black grid grid-cols-3 gap-3'>
        <BodylessBlock
          type = 'get'
          path = '/users'
          querys = {{ limit: 'integer', offset: 'integer', active: 'boolean', role: 'string (administrator / customer)' }}
          responses = {{ 200: 'OK', 400: 'Bad request (verify parameters datatypes)' }}
        />
        <BodylessBlock
          type = 'get'
          path = '/users/{id}'
          parameters = {{ id: 'integer' }}
          responses = {{ 200: 'OK', 400: 'Bad request (verify parameters datatypes)', 404: 'Not found' }}
        />
        <BodyfullBlock
          type = 'post'
          path = '/users'
          placeholder = '{ "username": "string", "email": "string", "password": "string", "first_name": "string", "last_name": "string", "phone": "{valid phone format}" }'
          responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)' }}
        />
        <BodyfullBlock
          type = 'put'
          path = '/users/{id}'
          parameters = {{ id: 'integer' }}
          placeholder = '{ "username": "string", "email": "string", "password": "string", "first_name": "string", "last_name": "string", "phone": "{valid phone format}", "role": "string", "active": "boolean" }'
          responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)', 404: 'Not found' }}
        />
        <BodyfullBlock
          type = 'patch'
          path = '/users/{id}'
          parameters = {{ id: 'integer' }}
          placeholder = '{ "username": "string", "email": "string", "password": "string", "first_name": "string", "last_name": "string", "phone": "{valid phone format}" }'
          responses = {{ 201: 'Create OK', 400: 'Bad request (verify parameters datatypes)', 404: 'Not found' }}
        />
        <BodylessBlock
          type = 'delete'
          path = '/users/{id}'
          parameters = {{ id: 'integer' }}
          responses = {{ 200: 'OK', 400: 'Bad request (verify parameters datatypes)', 404: 'Not found' }}
        />
      </main>
    </>
  )
}