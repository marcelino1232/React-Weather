import { Fragment } from 'react'

export default function Weather({loading,temperatura,humedad,clima,message}) {
  return (
    <Fragment>
       { !loading && !clima == ""  && (<div className='card mt-4 shadow'>
            <div className=' card-body'>
                <div className='d-flex'>
                    <p className='fw-bold text-uppercase mb-0 me-1'>clima:</p> {clima}
                </div>
                <div className='my-3 d-flex'>
                    <p className='fw-bold text-uppercase mb-0 me-1'>humedad:</p> {humedad}
                </div>
                <div className='d-flex'>
                    <p className='fw-bold text-uppercase mb-0 me-1'>temperatura:</p> <p>{temperatura}</p>
                </div>
            </div>
        </div>)}
    </Fragment>
  
  )
}
