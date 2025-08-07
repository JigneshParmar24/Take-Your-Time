import { useState, useRef, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Form.css"
import { motion, AnimatePresence } from 'framer-motion';

function Login({ OnchangeSignup, OnchangeLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err.code);
            switch (err.code) {
                case "auth/invalid-credential":
                    setError("Invalid-Credential. Please try again!");
                    break;
                default:
                    setError("Something went wrong. Please try again.");
            }
        }
    };

    const loginRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (loginRef.current && !loginRef.current.contains(event.target)) {
                OnchangeLogin(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [OnchangeSignup]);

    return (
        <motion.div
            className="container"
            ref={loginRef}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <h2 className="title">Login</h2>
            <form onSubmit={handleLogin} className="formCon">
                <input
                    className="textBox"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="textBox"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="submitBt">Login</button>
                <div className="error">
                    {error && <p style={{ color: "red", marginTop: "-10px" }}>{error}</p>}
                </div>
            </form>
            <p className="otherOp" >Need an account?
                <a onClick={() => { OnchangeSignup(true); OnchangeLogin(false) }}>Signup</a></p>
        </motion.div>
    );
}

export default Login;