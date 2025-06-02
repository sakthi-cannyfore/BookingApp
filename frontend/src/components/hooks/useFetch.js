import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setDate] = useState([]);
  const [loading, seLoading] = useState(false);
  const [Error, setError] = useState(false);

  useEffect(() => {
    const fetchDate = async () => {
      seLoading(true);
      try {
        const res = await axios.get(url);
        setDate(res.data);
      } catch (error) {
        setError(error);
      }
      seLoading(false);
    };
    fetchDate();
  }, [url]);

  const refetch = async () => {
    seLoading(true);
    try {
      const res = await axios.get(url);
      setDate(res.data);
    } catch (error) {
      setError(error);
    }
    seLoading(false);
  };
  return { data, loading, Error, refetch };
};

export default useFetch;
