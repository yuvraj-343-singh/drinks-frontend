import React, { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from './Navbar';
import axios from "axios";

export default function Drinks() {
  const url = process.env.REACT_APP_BASE_URL;
  const [drinks, setDrinks] = useState([]);
  const [loader,setLoader] =useState(true);
  const [res, setRes] = useState('');
  const mounted = useRef(null)
  const fetchData = async () => {
    await axios.get(`${url}/fetch`).then((response) => {
      console.log(response)
        setDrinks(response.data.data)
        setLoader(false)
        if(response.data.data.length === 0) {
          setRes('No data records found');
        } else {
          setRes('');
        }
    }).catch((err) => {
      setRes('Error Occured')
      setLoader(false)
    })
    
  }

  useEffect(() => {
    if(!mounted.current) {
      fetchData()
      mounted.current = true;
    }
  })

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
       {res && (
        <div className="my-5 text-center h3">{res} </div>
       )}
        {drinks && drinks.length > 0 && !loader && (
          <ul className="list-group my-3">
            {drinks.map((el, index) => (
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
