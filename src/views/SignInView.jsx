import { useContext, Memo } from "react";
import { SiteContext } from "../contexts/SiteContext";

const SignInView = () => {
    const ctx = useContext(SiteContext);
    console.log(ctx.sessionData.isLoggedIn);
    return (<button onClick={ctx.onLogInHandler.bind(null, 2979)}>Click me</button>);
};

export default SignInView;