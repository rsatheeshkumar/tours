import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
import axios from "axios";

const url = "https://course-api.com/react-tours-project";
function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(null);

  const fetchTours = () => {
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
        setLoading(false);
        setTours(data);
      })
      .catch((error) => {
        setLoading(true);
        console.log(error);
      });
  };
  useEffect(() => {
    fetchTours();
  }, []);
  const removeTour = (id) => {
    const newState = tours.filter((tour) => tour.id !== id);
    setTours(newState);
  };

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
