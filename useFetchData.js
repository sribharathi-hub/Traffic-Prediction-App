import { useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";

function useFetchData() {

  const { setData } = useContext(DataContext);

  useEffect(() => {
    fetch("http://localhost:5000/traffic/all")
      .then(res => res.json())
      .then(result => {
        console.log("DATA FROM BACKEND:", result);
        setData(result);
      })
      .catch(err => console.log(err));
  }, []);
}

export default useFetchData;