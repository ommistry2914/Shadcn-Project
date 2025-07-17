// hooks/useResponses.js
import { useState, useEffect } from 'react';
import { getResponses } from '../utils/storage';

export const useResponses = () => {
  const [responses, setResponses] = useState([]);
  
  useEffect(() => {
    const loadResponses = async () => {
      const data = await getResponses();
      setResponses(data);
    };
    
    loadResponses();
  }, []);
  
  return { responses };
};
