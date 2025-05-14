const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3MjA3Njg3LCJpYXQiOjE3NDcyMDczODcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImVhMWJjNzZlLWQ5ZmEtNDFmZS1iOGQ4LWY3N2VlMWJiZmExMCIsInN1YiI6InJhY2hpdHBhbmRleTI2QGdtYWlsLmNvbSJ9LCJlbWFpbCI6InJhY2hpdHBhbmRleTI2QGdtYWlsLmNvbSIsIm5hbWUiOiJyYWNoaXQga3VtYXIiLCJyb2xsTm8iOiJlbmcyMmN0MDAzMSIsImFjY2Vzc0NvZGUiOiJDdnRQY1UiLCJjbGllbnRJRCI6ImVhMWJjNzZlLWQ5ZmEtNDFmZS1iOGQ4LWY3N2VlMWJiZmExMCIsImNsaWVudFNlY3JldCI6IlJDY3FrZndrQ25yclFCeU0ifQ.ttW6ga95lkDqo5Bm6akGTuVEIeo2x53trr1jYEne2MI';

const baseURL = 'http://20.244.56.144/evaluation-service';

const fetchStockData = async (ticker, minutes) => {
  try {
    const response = await axios.get(`${baseURL}/stocks/${ticker}?minutes=${minutes}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(`Error fetching ${ticker}:`, err.message);
    return null;
  }
};

app.get('/average-price', async (req, res) => {
  const { ticker, minutes } = req.query;
  if (!ticker || !minutes) {
    return res.status(400).json({ error: 'ticker and minutes are required' });
  }

  const data = await fetchStockData(ticker, minutes);
  if (!data || data.length === 0) {
    return res.status(500).json({ error: 'Failed to fetch stock data' });
  }

  const prices = data.map(entry => entry.price);
  const averagePrice = prices.reduce((sum, p) => sum + p, 0) / prices.length;

  res.json({
    ticker,
    averagePrice,
    priceHistory: data,
  });
});

app.get('/correlation', async (req, res) => {
    const { minutes } = req.query;
    let tickers = req.query.ticker;
  
    if (!tickers) {
      return res.status(400).json({ error: 'Ticker parameters are required.' });
    }
  
    if (!Array.isArray(tickers)) {
      tickers = [tickers];
    }
  
    if (tickers.length !== 2) {
      return res.status(400).json({ error: 'Provide exactly two tickers.' });
    }
  
    const [ticker1, ticker2] = tickers;
  
    try {
      const [data1, data2] = await Promise.all([
        fetchStockData(ticker1, minutes),
        fetchStockData(ticker2, minutes),
      ]);
  
      if (!data1?.length || !data2?.length) {
        return res.status(500).json({
          error: 'One or both stock data are missing or empty',
          debug: {
            [ticker1]: data1,
            [ticker2]: data2,
          }
        });
      }
  
      const minLength = Math.min(data1.length, data2.length);
      const prices1 = data1.slice(0, minLength).map(e => e.price);
      const prices2 = data2.slice(0, minLength).map(e => e.price);
  
      const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
      const stdDev = (arr, meanVal) =>
        Math.sqrt(arr.reduce((sum, x) => sum + Math.pow(x - meanVal, 2), 0) / (arr.length - 1));
  
      const mean1 = mean(prices1);
      const mean2 = mean(prices2);
      const std1 = stdDev(prices1, mean1);
      const std2 = stdDev(prices2, mean2);
  
      const covariance = prices1.reduce(
        (sum, x, i) => sum + (x - mean1) * (prices2[i] - mean2),
        0
      ) / (prices1.length - 1);
  
      const correlation = covariance / (std1 * std2);
  
      return res.json({
        correlation,
        stocks: {
          [ticker1]: {
            averagePrice: mean1,
            priceHistory: prices1,
          },
          [ticker2]: {
            averagePrice: mean2,
            priceHistory: prices2,
          },
        },
      });
    } catch (err) {
      console.error('Correlation error:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
