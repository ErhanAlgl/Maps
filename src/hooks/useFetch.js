import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function (url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const responseMaps = "https://random-data-api.com/api/v2/users?size=30";

  const fetch = useCallback(async () => {
    try {
      const { data: response } = await axios.get(responseMaps);
      setData(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetch();
  }, [fetch]);
  
  return { data, loading, error };
}
