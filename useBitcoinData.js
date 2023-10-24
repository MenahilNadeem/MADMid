import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const STORAGE_KEY = '@BitcoinData';

const useBitcoinData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
     
        
        const cachedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (cachedData) {
          
          setData(JSON.parse(cachedData));
          setLoading(false);

          console.log('Cached Data:', JSON.parse(cachedData));
        } else {
          console.log("i am in else");
          const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
          const bitcoinData = response.data.bpi;
          const bitcoinRecords = Object.entries(bitcoinData).map(([currency, details]) => ({
            currency,
            rate: details.rate,
            description: details.description,
          }));
          setData(bitcoinRecords);
          
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bitcoinRecords));
          console.log(setData());
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useBitcoinData;
