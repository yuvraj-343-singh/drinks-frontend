import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const [drinks, setDrinks] = useState([]);
  const [loader,setLoader] =useState(false);
  const [resLoader,setResLoader] = useState(false);
  const url = process.env.REACT_APP_BASE_URL;
  const fetchData = (event) => {
    setLoader(true);
    if (event.target.value !== "") {
      let getUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${event.target.value}`;
      axios.get(getUrl).then((response) => {
        setDrinks(response.data.drinks);
        setLoader(false);
      });
      console.log(drinks);
    } else {
        setLoader(false);
        setDrinks([])
    }
  };
  const addDrink = (event, data) => {
    setResLoader(true);
    axios.post(`${url}/add`, data).then((response) => {
        setResLoader(false);
        toast.success(response.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    })
  }
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div>
          <label htmlFor="" className="h3">
            Search drinks here...
          </label>
          <input type="text" className="form-control" onKeyUp={fetchData} />
        </div>
      </div>
      <div className="container mb-3">
        <div htmlFor="" className="h2">
          Results
        </div>
        {loader && (
            <div className="w-100 text-center my-5">
                <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )}
       
        {drinks && drinks.length > 0 && !loader && (
          <ul className="list-group">
            {drinks.map((el) => (
              <li className="list-group-item d-flex" key={el.idDrink}>
                <div className="w-50 d-flex">
                    <div className="mx-2" > <img src={el.strDrinkThumb} alt="" width={'50px'} /></div>
                    <div className="mx-2">{el.strDrink}</div>
                </div>
                <div className="w-50 text-end">
                  <button className="btn btn-primary " onClick={(event) => addDrink(event, el)} disabled={resLoader}>Save</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <ToastContainer />
    </>
  );
}
