import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Form.css"
import { motion, AnimatePresence } from 'framer-motion';

function SignUp({ OnchangeSignup, OnchangeLogin }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            const userEmail = userCredential.user.email;
            await axios.post("http://localhost:8080/auth/signup",
                { name, email: userEmail },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
        } catch (err) {
            console.error(err.code);
            switch (err.code) {
                case "auth/email-already-in-use":
                    setError("Email already in use. Try logging in!");
                    break;
                case "auth/weak-password":
                    setError("Password should be at least 6 characters long!");
                    break;
                default:
                    setError("Something went wrong. Please try again.");
            }
        }
    };

    const signupRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (signupRef.current && !signupRef.current.contains(event.target)) {
                OnchangeSignup(false);
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
            ref={signupRef}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <h1 className="title">Sign Up</h1>
            <form onSubmit={handleSignUp} className="formCon">
                <input
                    className="textBox"
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="textBox"
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="textBox"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="submitBt">Sign Up</button>
                {error && <p style={{ color: "red", marginTop: "-10px" }}>{error}</p>}
            </form>
            <p className="otherOps" style={{ marginTop: "1.5em" }}>Already have an account?
                <a onClick={() => { OnchangeSignup(false); OnchangeLogin(true) }}>Login</a></p>
        </motion.div>
    );
}

export default SignUp;