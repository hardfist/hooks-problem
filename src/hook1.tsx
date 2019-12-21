import React from "react";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { useForceUpdate } from "./utils";
function Child(props) {
  const [result, setResult] = useState("");
  const { fetchData } = props;
  useEffect(() => {
    console.log("trigger effect");
    fetchData().then(result => {
      setResult(result);
    });
  }, [props.query, fetchData]);
  return (
    <>
      <div>query:{props.query}</div>
      <div>result:{result}</div>
    </>
  );
}
const [useStore] = create((set, get) => ({
  query: "react",
  setQuery(query) {
    set(state => ({
      ...state,
      query
    }));
  },
  fetchData: async () => {
    const url = "https://hn.algolia.com/api/v1/search?query=" + get().query;
    const x = await (await fetch(url)).text();
    return x;
  }
}));
export function Parent() {
  const store = useStore();
  const forceUpdate = useForceUpdate();
  console.log("parent rerender");
  useEffect(() => {
    setInterval(() => {
      forceUpdate({});
    }, 1000);
  }, [forceUpdate]);
  return (
    <div>
      <input
        onChange={e => store.setQuery(e.target.value)}
        value={store.query}
      />
      <Child fetchData={store.fetchData} query={store.query} />
    </div>
  );
}
