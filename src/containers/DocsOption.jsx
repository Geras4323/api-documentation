import React from 'react';
import Link from 'next/link';

function DocsOption({ title, image, path }) {
  return (
    <div className='group
      w-[244px] h-[324px] bg-gray-200 relative flex justify-center items-center rounded-lg overflow-hidden
      hover:scale-105 transition-all duration-200
      '
    >

      <div className={`w-128 h-128  conic-gradient  animate-spin-slow absolute`} />

      <section className='w-60 h-80 text-white  linear-gradient  rounded-lg absolute flex flex-col justify-between'>
        <header className='w-full h-12 bg-black bg-opacity-30 flex justify-center items-center rounded-t-lg'>
          <p className='text-2xl'>{title}</p>
        </header>

        <section className='w-full flex justify-center'>
          <img
            src={`/${image}`}
            className='w-44'
          />
        </section>

        <Link
          href={`/docs/${path}`}
          className='w-full h-12 bg-black bg-opacity-30 flex justify-center items-center rounded-b-lg   group-hover:bg-opacity-70   transition-all duration-100'
        >
          <p className='flash text-lg'>View endpoints</p>
        </Link>
      </section>
    </div>
  )
}

export { DocsOption }