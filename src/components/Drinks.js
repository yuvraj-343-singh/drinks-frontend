import React, { useCallback, useEffect, useState } from 'react'
import Navbar from './Navbar';
import axios from "axios";

export default function Drinks() {
  const url = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState([]);
  const [loader,setLoader] =useState(true);
 
  const fetchData = useCallback(async () => {
    await axios.get(`${url}/fetch`).then((response) => {
        setData(response.data.data)
    })
    setLoader(false)
  })
  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
     <Navbar />
     <div className='container'>
     {loader && (
            <div className="w-100 text-center my-5">
                <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )}
       {data.length === 0  && !loader && (
        <div className="my-5 text-center h3">No data found. </div>
       )}
        {data && data.length > 0 && !loader && (
          <ul className="list-group my-3">
            {data.map((el, index) => (
              <li className="list-group-item d-flex" key={index}>
                <div className="w-50 d-flex">
                    <div className="mx-2" > <img src={el.strDrinkThumb} alt="" width={'50px'} /></div>
                    <div className="mx-2">{el.strDrink}</div>
                </div>
                
              </li>
            ))}
          </ul>
        )}
    </div>
    </>
   
  )
}
