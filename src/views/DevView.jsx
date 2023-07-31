import { useContext } from "react";
import { SiteContext } from "../contexts/SiteContext";

const DevView = () => {
  const ctx = useContext(SiteContext); // Call the useContext hook here to get the context values
  return (
    <>
    <h1>ctx: {JSON.stringify(ctx,null, "\t")}</h1>
    <button onClick={ctx.toggleDarkmode}>setDarkMode</button>
    <button onClick={() => ctx.onLogInHandler("2979")}>load userData 2979</button>
    <button onClick={ctx.getRekemList}>load rekemList</button>
    </>
  );
};

export default DevView;