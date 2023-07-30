import { userLogIn } from '../api/database';

const SignInView = () => {
    userLogIn(2979).then(res => console.log(res));
};

export default SignInView;