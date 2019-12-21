import React from "react";
import { useForceUpdate } from "./utils";
import { useState, useEffect } from "react";
function Child(props) {
  const [result, setResult] = useState("");
  const { fetchData } = props;
  useEffect(() => {
    console.log("trigger child useEffect");
    fetchData().then(result => {
      setResult(result);
    });
  }, [fetchData]);
  return (
    <div>
      <div>query:{props.query}</div>
      <div>result:{result}</div>
    </div>
  );
}
export function Parent() {
  const [query, setQuery] = useState("react");
  console.log("trigger parent rerender");
  const forceUpdate = useForceUpdate();
  const fetchData = () => {
    const url = "https://hn.algolia.com/api/v1/search?query=" + query;
    return fetch(url).then(x => x.text());
  };
  useEffect(() => {
    setInterval(() => {
      forceUpdate({});
    }, 1000);
  }, []);
  return (
    <div>
      <input onChange={e => setQuery(e.target.value)} value={query} />
      <Child fetchData={fetchData} query={query} />
    </div>
  );
}
