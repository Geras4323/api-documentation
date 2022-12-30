import React from 'react';

import { api } from '../config/axiosConnection';
import { blockTypes } from '../config/blocksConfig';


function BodylessBlock({ type, path, parameters = {}, querys = {}, responses }) {
  const paramsRef = React.useRef(null); // params form ref
  const queryRef = React.useRef(null); // query form ref
  const [params, setParams] = React.useState([]);   // params
  const [paramTypes, setParamTypes] = React.useState([]); // datatypes of params
  const [queryParams, setQueryParams] = React.useState([]);   // querys
  const [queryTypes, setQueryTypes] = React.useState([]); // datatypes of querys
  const [resps, setResps] = React.useState([]);     // responses
  const [respTypes, setRespsTypes] = React.useState([]);  // descriptions of responses

  const [builtPath, setBuiltPath] = React.useState(path);

  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const [extraPath, setExtraPath] = React.useState(''); // querys path
  const querys_values = {};  // querys object


  React.useEffect(() => {
    setParams(Object.keys(parameters));
    setParamTypes(Object.values(parameters));
    setQueryParams(Object.keys(querys));
    setQueryTypes(Object.values(querys));
    setResps(Object.keys(responses));
    setRespsTypes(Object.values(responses));
  }, [])


  function handleQueryChange() {
    // build an object with the original keys and the values entered
    queryParams.map(element => {
      const elementValue = queryRef.current[element].value; // the input's value
      if (elementValue.length > 0) {
        querys_values[element] = elementValue;
      } else {
        querys_values[element] = '';
      }
    })
    // iterate that above object to build a path array
    let finalPath = '?';
    for (const [key, value] of Object.entries(querys_values)) {
      if (value.length > 0) {
        finalPath += `${key}=${value}&`;
      }
    }
    setExtraPath(finalPath.slice(0, -1)); // delete last character (can be a '&' or the '?')
  }


  let originalPathParts = [];
  let modifiedPathParts = [];

  function handleParamsChange() {
    const reg = /\//
    const partes = path.split(reg)
    for (const valor of partes) { // creates 2 arrays. One has the original positions, the other has the data
      originalPathParts.push(valor);
      modifiedPathParts.push(valor);
    }
    params.map(param => {
      let key = '{'
      key += param;
      key += '}';   // create the key to find its index
      const keyIndex = originalPathParts.indexOf(key);
      const paramValue = paramsRef.current[param].value; // the input's value
      if (paramValue.length > 0) {  // if modified, corrects the data array according to the position given by the first array
        modifiedPathParts[keyIndex] = paramValue;
      } else {
        modifiedPathParts[keyIndex] = '';
      }
      const newPath = modifiedPathParts.join('/');
      setBuiltPath(newPath);
    })
  }


  const textRef = React.useRef(null);
  const [resStatus, setResStatus] = React.useState();
  const [showTextdata, setShowTextdata] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function handleMakeRequest( path, extraPath ) {
    setLoading(true);
    setShowTextdata(true);
    try {
      let response;
      switch (type) {
        case 'get':
          response = await api.get(`${path}${extraPath}`)
          break;
        case 'delete':
          response = await api.delete(path)
          break;
      }
      const {data} = response;
      const {status} = response;
      setResStatus(status);
      const stringifiedData = JSON.stringify(data)
      textRef.current.value = stringifiedData;
    } catch (err) {
      // console.log(err);
      const error = err.response.data.error || err.response.data.message;
      setResStatus(err.response.status);
      const stringifiedError = JSON.stringify(error);
      textRef.current.value = stringifiedError;
    }
    setLoading(false);
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
      <section className={`w-full h-16 px-6 text-white ${blockTypes[type].titleColor} flex flex-row justify-between items-center rounded-t-lg ${isCollapsed ? 'rounded-b-lg' : ''}   hover:cursor-pointer`} onClick={() => setIsCollapsed(prev => !prev)}>
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
        <section className={`w-full h-auto text-white ${blockTypes[type].contentColor} ${showTextdata ? '' : 'rounded-b-lg'}`}>
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

            {/* Each query parameter */}
            {(Object.keys(querys).length > 0) &&
              <div>
                <p className='p-2 text-xl rounded-md bg-black bg-opacity-40'>Query Parameters</p>
                <form ref={queryRef}>
                  {queryParams.map((element, index) => (
                    <div key={element} className='border-b border-separationBorder py-4'>
                      <section className='flex flex-row'>
                        <div className='w-20 mr-4'>
                          <label htmlFor={element} className='font-bold'>{element}</label>
                        </div>
                        <input
                          onChange={handleQueryChange}
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
                        <p>{queryTypes[index]}</p>
                      </section>
                    </div>
                  ))}
                </form>
              </div>
            }

            {/* Expected path */}
            <section className='p-2 rounded-md bg-black bg-opacity-20 flex flex-row gap-8'>
              <p>Expected path:</p>
              <div>
                <span>{builtPath}</span>
                <span className='text-zinc-500'>{extraPath}</span>
              </div>
            </section>

            {/* Possible responses */}
            <div className='mt-10 text-white'>
              <p className='mb-2 text-xl p-2 rounded-md bg-black bg-opacity-40'>Possible responses</p>
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
            {!loading
              ? <button onClick={() => handleMakeRequest(builtPath, extraPath)} className={`p-2 ${blockTypes[type].makeRequestColor} rounded-md transition-all duration-150   hover:bg-opacity-75 hover:shadow-md`}>Make request</button>
              : <span className={`relative w-full h-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${blockTypes[type].makeRequestColor}`}>
                  <span className='animate-spin'>
                    <svg className='h-full text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                  </span>
                </span>
            }
          </div>
        </section>

        {/* Response */}
        <section className={`w-full h-auto px-6 ${blockTypes[type].contentColor} rounded-b-lg`}>
          {showTextdata &&
            <div>
              <div className='mb-3 text-white flex flex-row justify-between items-center'>
                <p className='text-xl'>Response</p>
                <div className='text-lg flex flex-row items-center gap-4'>
                  <p>Status</p>
                  <p className={`
                    font-bold
                    p-1
                    ${(resStatus === 200) ? 'text-white' : 'text-black'}
                    ${(resStatus === 200) ? 'bg-green-600' : 'bg-red-600'}
                    rounded-md
                    `}>
                    {resStatus}
                  </p>
                </div>
              </div>
              <textarea
                id="myTextArea"
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

export { BodylessBlock };