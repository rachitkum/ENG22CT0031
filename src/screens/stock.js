// import React, { useState } from 'react';
// import axios from 'axios';

// function MainPage() {
//   const [ticker, setTicker] = useState('');
//   const [minutes, setMinutes] = useState('');
//   const [averagePrice, setAveragePrice] = useState(null);
//   const [correlationData, setCorrelationData] = useState(null);
//   const [error, setError] = useState('');
//   const [ticker1, setTicker1] = useState('');
//   const [ticker2, setTicker2] = useState('');

//   const baseUrl = 'http://localhost:3000'; // Backend Url
// //api calling for avg price
//   const fetchAveragePrice = async () => {
//     try {
//       const response = await axios.get(`${baseUrl}/average-price?ticker=${ticker}&minutes=${minutes}`);
//       setAveragePrice(response.data);
//       setError('');
//     } catch (err) {
//       setError('Failed to fetch data. Please check your inputs.');
//       setAveragePrice(null);
//     }
//   };
// //calling api for correlation
//   const fetchCorrelation = async () => {
//     try {
//       const response = await axios.get(`${baseUrl}/correlation?minutes=${minutes}&ticker=${ticker1}&ticker=${ticker2}`);
//       setCorrelationData(response.data);
//       setError('');
//     } catch (err) {
//       setError('Failed to fetch data. Please check your inputs.');
//       setCorrelationData(null);
//     }
//   };

//   return (
//     <div>
//       <h1>Stock Analysis</h1>

//       <div>
//         <h2>Average Price</h2>
//         <input
//           type="text"
//           placeholder="Enter stock ticker"
//           value={ticker}
//           onChange={(e) => setTicker(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Enter time in minutes"
//           value={minutes}
//           onChange={(e) => setMinutes(e.target.value)}
//         />
//         <button onClick={fetchAveragePrice}>Get Average Price</button>

//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {averagePrice && (
//           <div>
//             <h3>Average Price for {ticker}</h3>
//             <p>Price: ${averagePrice.averagePrice}</p>
//             <h4>Price History</h4>
//             <pre>{JSON.stringify(averagePrice.priceHistory, null, 2)}</pre>
//           </div>
//         )}
//       </div>

//       <div>
//         <h2>Stock Correlation</h2>
//         <input
//           type="text"
//           placeholder="Enter first stock ticker"
//           value={ticker1}
//           onChange={(e) => setTicker1(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter second stock ticker"
//           value={ticker2}
//           onChange={(e) => setTicker2(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Enter time in minutes"
//           value={minutes}
//           onChange={(e) => setMinutes(e.target.value)}
//         />
//         <button onClick={fetchCorrelation}>Get Correlation</button>

//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {correlationData && (
//           <div>
//             <h3>Correlation between {ticker1} and {ticker2}</h3>
//             <p>Correlation: {correlationData.correlation}</p>
//             <h4>Price History</h4>
//             <h5>{ticker1}</h5>
//             <pre>{JSON.stringify(correlationData.stocks[ticker1].priceHistory, null, 2)}</pre>
//             <h5>{ticker2}</h5>
//             <pre>{JSON.stringify(correlationData.stocks[ticker2].priceHistory, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MainPage;


import React, { useState } from 'react';
import axios from 'axios';

function MainPage() {
  const [ticker, setTicker] = useState('');
  const [minutes, setMinutes] = useState('');
  const [averagePrice, setAveragePrice] = useState(null);
  const [correlationData, setCorrelationData] = useState(null);
  const [error, setError] = useState('');
  const [ticker1, setTicker1] = useState('');
  const [ticker2, setTicker2] = useState('');

  const baseUrl = 'http://localhost:3000';

  const fetchAveragePrice = async () => {
    try {
      const response = await axios.get(`${baseUrl}/average-price?ticker=${ticker}&minutes=${minutes}`);
      setAveragePrice(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch data. Please check your inputs.');
      setAveragePrice(null);
    }
  };

  const fetchCorrelation = async () => {
    try {
      const response = await axios.get(`${baseUrl}/correlation?minutes=${minutes}&ticker=${ticker1}&ticker=${ticker2}`);
      setCorrelationData(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch data. Please check your inputs.');
      setCorrelationData(null);
    }
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const sectionStyle = {
    background: '#f9f9f9',
    padding: '20px',
    marginBottom: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const inputGroupStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '10px',
  };

  const inputStyle = {
    flex: '1',
    minWidth: '150px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '10px 16px',
    background: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const errorStyle = {
    color: 'red',
    marginTop: '10px',
  };

  const preStyle = {
    background: '#eee',
    padding: '10px',
    borderRadius: '5px',
    overflowX: 'auto',
  };

  return (
    <div style={containerStyle}>

      {/* Average Price Section */}
      <div style={sectionStyle}>
        <h2>Average Price</h2>
        <div style={inputGroupStyle}>
          <input
            type="text"
            placeholder="Enter stock ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Enter time in minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            style={inputStyle}
          />
          <button onClick={fetchAveragePrice} style={buttonStyle}>Get Average Price</button>
        </div>

        {error && <p style={errorStyle}>{error}</p>}

        {averagePrice && (
          <div>
            <h3>Average Price for {ticker.toUpperCase()}</h3>
            <p><strong>Price:</strong> ${averagePrice.averagePrice.toFixed(2)}</p>
            <h4>Price History</h4>
            <pre style={preStyle}>{JSON.stringify(averagePrice.priceHistory, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Correlation Section */}
      <div style={sectionStyle}>
        <h2>Stock Correlation</h2>
        <div style={inputGroupStyle}>
          <input
            type="text"
            placeholder="Enter first stock ticker"
            value={ticker1}
            onChange={(e) => setTicker1(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Enter second stock ticker"
            value={ticker2}
            onChange={(e) => setTicker2(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Enter time in minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            style={inputStyle}
          />
          <button onClick={fetchCorrelation} style={buttonStyle}>Get Correlation</button>
        </div>

        {error && <p style={errorStyle}>{error}</p>}

        {correlationData && (
          <div>
            <h3>Correlation between {ticker1.toUpperCase()} and {ticker2.toUpperCase()}</h3>
            <p><strong>Correlation:</strong> {correlationData.correlation.toFixed(4)}</p>

            <h4>Price History</h4>
            <div>
              <h5>{ticker1.toUpperCase()}</h5>
              <pre style={preStyle}>{JSON.stringify(correlationData.stocks[ticker1].priceHistory, null, 2)}</pre>
              <h5>{ticker2.toUpperCase()}</h5>
              <pre style={preStyle}>{JSON.stringify(correlationData.stocks[ticker2].priceHistory, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
