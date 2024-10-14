import React, { useEffect, useState } from "react";
import './App.css'
export default function App() {
  let styleInput = {
    border: '0px',
    height: '3rem',
    paddingInline: '1rem',
  };
  
  const [query, setQuery] = useState(1);
  const [toBeConvertedFrom, setToBeConvertedFrom] = useState('EUR');
  const [toBeConvertedInto, setToBeConvertedInto] = useState('USD');
  const [isLoading,setIsLoading]=useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${query}&from=${toBeConvertedFrom}&to=${toBeConvertedInto}`
        );
        console.log(`https://api.frankfurter.app/latest?amount=${query}&from=${toBeConvertedFrom}&to=${toBeConvertedInto}`);
        const data = await res.json();
        setResult(data.rates[toBeConvertedInto]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    }
    if(toBeConvertedFrom==toBeConvertedInto){
      return setResult(query);
    }
    if (query > 0) {
      fetchData();
    }
  }, [query, toBeConvertedFrom, toBeConvertedInto]);

  return (
    <div style={{width:'100vw', height:'100vh', display:'flex', flexDirection:'column',gap:'3rem', justifyContent:'center', alignItems:'center'}}>
      <h1>
        Currency Converter
      </h1>
      <div className="input">
        <input
          type="number"
          step="0.01"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter amount"
          style={styleInput}
          disabled={isLoading}
        />
        <select onChange={(e) => setToBeConvertedFrom(e.target.value)}
          style={styleInput}
          disabled={isLoading}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select onChange={(e) => setToBeConvertedInto(e.target.value)}
          style={styleInput}
          disabled={isLoading}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <p style={{fontSize:'20px'}}>{result ? `${result} ${toBeConvertedInto}` : 'Enter an amount to convert.'}</p>
    </div>
  );
}
