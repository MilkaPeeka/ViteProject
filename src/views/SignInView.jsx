import SignInForm from "../components/SignInForm";
import { useNavigate } from "react-router-dom/"
import { useEffect, useContext, useState } from "react"
import { SiteContext } from '../contexts/SiteContext'
import mappings from "../mappings";

const SignInView = () => {
    const ctx = useContext(SiteContext);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (ctx.sessionData.isLoggedIn)
            return navigate(mappings.dashboardPath);
    }, [ctx.sessionData.isLoggedIn]);

    const onSubmitHandler = (submittedForm) => {
        setIsLoading(true);
        setErrorMessage('');
        ctx.onLogInHandler(submittedForm.pernum)
        .catch(err => {
            setErrorMessage(err.message);
        })
        .finally(() => {
            setIsLoading(false);
        });

    };

    const props = {
        onSubmitHandler,
        isLoading,
        errorMessage
    };
    
    return <SignInForm {...props}/>

};

export default SignInView;