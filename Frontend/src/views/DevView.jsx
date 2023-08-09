import { useContext } from "react";
import { SiteContext } from "../contexts/SiteContext";

const DevView = () => {
  const ctx = useContext(SiteContext); // Call the useContext hook here to get the context values
  return (
    <>
    <button onClick={ctx.toggleDarkmode}>setDarkMode</button>
    <button onClick={() => ctx.onLogInHandler("2181")}>load userData 2181 (manager)</button>
    <button onClick={() => ctx.onLogInHandler("8147")}>load userData 8174 (not manager)</button>
    <button onClick={ctx.getSummarizedRekemList}>load rekemList</button>
    <pre>ctx: {JSON.stringify(ctx,undefined, 2)}</pre>

    </>
  );
};

export default DevView;