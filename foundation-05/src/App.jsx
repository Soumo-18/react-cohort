import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState(true);
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((current) => Math.max(current - 1, 0)); //to ensure it always uses the latest state value without needing seconds in the dependency array
    }, 1000);

    return () => {
      //cleanup -> stops the timer if the component is removed (unmounted), preventing "ghost" timers from running in the background
      clearInterval(timerId);
    };
  }, []);
  //This block runs once when the component mounts because of the empty dependency array []
// It creates an interval that updates the seconds state every 1,000 milliseconds (1 second).
  useEffect(() => {
    const controller = new AbortController();

    async function loadPost() {
      try {
        setStatus("loading");
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5",
          { signal: controller.signal }
        );
        const data = await response.json();
        setPosts(data);
        setStatus("success");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setStatus("error");
        }
      }
    }
    loadPost();


    return () => {
      controller.abort()
    }
  }, []);

  

  return (
    <>
      <div>
        <h1>useEffect</h1>
        <h1>{seconds}</h1>
      </div>
    </>
  );
}

export default App;
