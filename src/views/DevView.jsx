import { useContext } from "react";
import { SiteContext } from "../contexts/SiteContext";

const DevView = () => {
  const ctx = useContext(SiteContext); // Call the useContext hook here to get the context values
  return (
    <>
    <button onClick={ctx.toggleDarkmode}>setDarkMode</button>
    <button onClick={() => ctx.onLogInHandler("2979")}>load userData 2979</button>
    <button onClick={ctx.getRekemList}>load rekemList</button>
    <pre>ctx: {JSON.stringify(ctx,undefined, 2)}</pre>

    </>
  );
};

export default DevView;