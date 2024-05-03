import Styles from './Signup.module.scss';
import GoogleLogo from '../assets/images/icons8-google.svg';
import { auth } from '../Firebase';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';



export default function Login() {
    const prodiver = new GoogleAuthProvider();
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const[loading,setLoading] = useState(false);

    const handleSubmit=()=>{
        setLoading(true);
        console.log("email",email);
        console.log("password",password);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            setError('');
            setLoading(false)
            setEmail('')
            setPassword('')
            navigate('/');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
            setLoading(false)
            // ..
        });
    }

    const handleGoogleSubmit=()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
            setLoading(true)
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            setLoading(false);
            setError('');
            navigate('/');
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            setLoading(false);
            console.log(error)
            const errorMessage = error.message;
            setError(errorMessage);
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    return(
        <div className={Styles.container}>
            <div className={Styles.wrapper}>
                <div className={Styles.headings}>
                    <h2 className={Styles.headingPrimary}>
                        Welcome back
                    </h2>
                    <h3 className={Styles.headingSecondary}>
                        Enter the information you entered while registering
                    </h3>
                    <p className={Styles.error}>
                        {error}
                    </p>
                </div>
                <div className={Styles.inputFields}>
                    <div className={Styles.inputField}>
                            <p>Email</p>
                            <input type="email"name='email' placeholder='Enter your email'
                                onChange={(e)=>{
                                    setEmail(val=>e.target.value)
                                }}
                                value={email}
                            />
                    </div>
                    <div className={Styles.inputField}>
                            <p>Password</p>
                            <input type="password"name='password'placeholder='Enter a password'
                                onChange={(e)=>{
                                    setPassword(val=>e.target.value)
                                }}
                                value={password}
                            />
                    </div>
                </div>
                <div className={Styles.actionsPrimary}>
                {loading?<div className={Styles.btn} style={{opacity:0.5}}>Login</div>:
                    (<div className={Styles.btn} onClick={handleSubmit}>Login</div>)}
                    <div className={Styles.or}>or</div>
                    {loading?(<div className={Styles.btn2} style={{opacity:0.5}}>
                        <img src={GoogleLogo} alt="Google" />
                       <span> Sign in with Google</span>
                    </div>):(<div className={Styles.btn2} onClick={handleGoogleSubmit}>
                        <img src={GoogleLogo} alt="Google" />
                       <span> Sign in with Google</span>
                    </div>)}
                </div>
                <div className={Styles.actionsSecondary}>
                    <span>Don't have an account?</span>
                    <span onClick={()=>{navigate('/signup')}}>Sign up for free</span>
                </div>
            </div>
        </div>
    )
}