import React from 'react';

import { api } from '../config/axiosConnection';
import { blockTypes } from '../config/blocksConfig';


function BodyfullBlock({ type, path, parameters = {}, placeholder, responses }) {
  const paramsRef = React.useRef(null);
  const bodyRef = React.useRef(null); // body ref
  const [params, setParams] = React.useState([]);   // params
  const [paramTypes, setParamTypes] = React.useState([]); // datatypes of params
  const [resps, setResps] = React.useState([]);     // responses
  const [respTypes, setRespsTypes] = React.useState([]);  // descriptions of responses
  const [defaultBody, setDefaultBody] = React.useState();

  const [builtPath, setBuiltPath] = React.useState(path);

  const [isCollapsed, setIsCollapsed] = React.useState(true);


  React.useEffect(() => {
    const parsedPlaceholder = JSON.parse(placeholder)
    const stringifiedPlaceholder = JSON.stringify(parsedPlaceholder, undefined, 4);
    setDefaultBody(stringifiedPlaceholder);

    setParams(Object.keys(parameters));
    setParamTypes(Object.values(parameters));
    setResps(Object.keys(responses));
    setRespsTypes(Object.values(responses));
  }, [])



  let originalPathParts = [];
  let modifiedPathParts = [];

  function handleParamsChange() {
    const reg = /\//
    const partes = path.split(reg)
    for (const valor of partes) { // creates 2 arrays. One has the original positions, the other has the data
      originalPathParts.push(valor);
      modifiedPathParts.push(valor);
    }
    params.map(element => {
      const elementValue = paramsRef.current[element].value;
      if (elementValue.length > 0) {  // if modified, corrects the data array according to the position given by the first array
        let key = '{'
        key += element;
        key += '}';
        const keyIndex = originalPathParts.indexOf(key)
        modifiedPathParts[keyIndex] = elementValue;
        const newPath = modifiedPathParts.join('/');
        setBuiltPath(newPath);
      } else {  // leave the path as original
        setBuiltPath(path)
      }
    })
  }


  const textRef = React.useRef(null);
  const [resStatus, setResStatus] = React.useState();
  const [showTextdata, setShowTextdata] = React.useState(false);

  async function handleMakeRequest( path ) {
    setShowTextdata(true);
    try {
      const stringBody = bodyRef.current.value;
      const body = JSON.parse(stringBody);
      const config = {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        }
      };
      let response;
      switch (type) {
        case 'post':
          response = await api.post(path, body, config);
          break;
        case 'put':
          response = await api.put(path, body, config);
          break;
        case 'patch':
          response = await api.patch(path, body, config);
          break;
      }
      const {data} = response;
      const {status} = response;
      setResStatus(status);
      const stringifiedData = JSON.stringify(data)
      textRef.current.value = stringifiedData;
    }
    catch (err) {
      if (err.response.status === 400) { // wrong datatype
        const error = err.response.data.error;
        const stringifiedError = JSON.stringify(error);
        textRef.current.value = stringifiedError;
      }
      else if (err.response.status === 409) {
        const error = err.response.data.error;
        const stringifiedError = JSON.stringify(error);
        textRef.current.value = stringifiedError;
      }
      else if (err.response.status === 500 ) {  // id not found
        const stringifiedError = JSON.stringify({ statusCode: err.response.status, message: 'ID not found' });
        textRef.current.value = stringifiedError;
      }
      else {
        console.log(err)
        const stringifiedError = JSON.stringify({ statusCode: err.response.status, message: 'There has been an error' });
        textRef.current.value = stringifiedError;
      }
      setResStatus(err.response.status);
    }
    prettyPrint();
  }

  function prettyPrint() {
    const ugly = textRef.current.value;
    const obj = JSON.parse(ugly);
    const pretty = JSON.stringify(obj, undefined, 4);
    textRef.current.value = pretty;
  }


  return (
    <div>
      {/* Block title */}
      <section className={`w-full h-16 px-6 text-white ${blockTypes[type].titleColor} flex flex-row justify-between items-center  hover:cursor-pointer`} onClick={() => setIsCollapsed(prev => !prev)}>
        <div className='h-full flex flex-row items-center gap-8'>
          <p className='w-20 h-3/4 text-2xl font-bold bg-black bg-opacity-40 flex justify-center items-center rounded-lg'>{blockTypes[type].title}</p>
          <p className='text-xl drop-shadow-lg'>{path}</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`w-6 h-6 ${isCollapsed ? 'rotate-0' : 'rotate-180'} transition-all duration-200 fill-current text-white`}>
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
        </svg>
      </section>

      {/* Request information */}
      <div className={`${isCollapsed && 'hidden'}`}>
        <section className={`w-full h-auto text-white ${blockTypes[type].contentColor}`}>
          <div className='p-6 flex flex-col gap-4'>

            {/* Each parameter */}
            {(Object.keys(parameters).length > 0) &&
              <div>
                <p className='p-2 text-xl rounded-md bg-black bg-opacity-40'>Parameters</p>
                <form ref={paramsRef}>
                  {params.map((element, index) => (
                    <div key={element} className='border-b border-separationBorder py-4'>
                      <section className='flex flex-row'>
                        <div className='w-20 mr-4'>
                          <label htmlFor={element} className='font-bold'>{element}</label>
                        </div>
                        <input
                          onChange={handleParamsChange}
                          id={element}
                          name={element}
                          type='text'
                          autoComplete='off'
                          placeholder={element}
                          className='py-1 px-2 bg-slate-800 rounded-md focus:outline-none'
                        />
                      </section>
                      <section className='mt-4 flex flex-row'>
                        <p className='w-24'>Description:</p>
                        <p>{paramTypes[index]}</p>
                      </section>
                    </div>
                  ))}
                </form>
              </div>
            }

            {/* Expected path */}
            {(Object.keys(parameters).length > 0) &&
            <section className='p-2 rounded-md bg-black bg-opacity-20 flex flex-row gap-8'>
              <p>Expected path:</p>
              <span>{builtPath}</span>
            </section>
            }

            {/* Post's Body */}
            <div>
              <p className='mb-2 text-xl p-2 rounded-md bg-black bg-opacity-40'>Body</p>
              <div>
                <textarea
                  ref={bodyRef}
                  defaultValue={defaultBody}
                  className='w-full h-52 mt-2 mb-2 p-2 text-md text-zinc-300 bg-slate-900 resize-none focus:outline-none'
                />
                <p className={`${(type === 'put' || type === 'patch') ? 'text-black' : 'text-white'}`}>JSON format does not allow trailing commas</p>
              </div>
            </div>

            {/* Possible responses */}
            <div className={`mt-10 ${(type === 'put' || type === 'patch') ? 'text-black' : 'text-white'}`}>
              <p className='mb-2 text-xl p-2 rounded-md bg-black bg-opacity-40 text-white'>Possible responses</p>
              <ul>
                {resps.map((res, index) => (
                  <li key={res} className='mb-2 flex flex-row gap-5'>
                    <p>{res}</p>
                    <p>{respTypes[index]}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Request button */}
            <button onClick={() => handleMakeRequest(builtPath)} className={`p-2 ${blockTypes[type].makeRequestColor} rounded-md transition-all duration-150   hover:bg-opacity-75 hover:shadow-md`}>Make request</button>
          </div>
        </section>

        {/* Response */}
        <section className={`w-full h-auto px-6 ${blockTypes[type].contentColor}`}>
          {showTextdata &&
            <div>
              <div className={`mb-3 ${(type === 'put' || type === 'patch') ? 'text-black' : 'text-white'} flex flex-row justify-between items-center`}>
                <p className='text-xl'>Response</p>
                <div className='text-lg flex flex-row items-center gap-4'>
                  <p>Status</p>
                  <p className={`
                    font-bold
                    p-1
                    ${(resStatus === 200 || resStatus === 201) ? 'text-white' : 'text-black'}
                    ${(resStatus === 200 || resStatus === 201) ? 'bg-green-600' : 'bg-red-600'}
                    rounded-md
                    `}>
                    {resStatus}
                  </p>
                </div>
              </div>
              <textarea
                ref={textRef}
                readOnly
                className='w-full h-80 mb-4 p-2 text-md text-zinc-300 bg-slate-900 resize-none focus:outline-none'
              />
            </div>
          }
        </section>
      </div>
    </div>
  )
}

export { BodyfullBlock };