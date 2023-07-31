import { useContext } from "react";
import { SiteContext } from "../contexts/SiteContext";

const Navbar = () => {
    const ctx = useContext(SiteContext);
    console.log(ctx);
    return (
        <>
            <h1>{"isLoggedIn: " +ctx.sessionData.isLoggedIn}</h1>
            <button onClick={ctx.toggleDarkmode}>setDarkMode</button>
        </>
    );
};

export default Navbar;