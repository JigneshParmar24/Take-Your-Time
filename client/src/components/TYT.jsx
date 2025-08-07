import { useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import "./TYT.css";
import { auth } from "../firebase";

const TYT = ({ OnchangeLogin, logout, OnchangeLogout }) => {
    const [hatClick, setHatClick] = useState(false);

    const logoControls = useAnimationControls();
    const hatControls = useAnimationControls();

    const handleHatClick = async () => {
        await hatControls.start({ rotateY: 0, transition: { duration: 0.0001 } });
        hatControls.start({
            rotateY: 360,
            transition: { duration: 0.5, ease: "easeInOut" },
        });
    };

    const handleLogoClick = async () => {
        await logoControls.start({ rotateY: 0, transition: { duration: 0.0001 } });
        await logoControls.start({
            rotateY: 360,
            transition: { duration: 0.5, ease: "easeInOut" },
        });
    };

    return (
        <div className="tytdiv">
            <AnimatePresence>
                {hatClick && (
                    <motion.div
                        key="login-box"
                        className="loginfo-container"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >

                        {logout
                            ? <a
                                className="log"
                                onClick={() => auth.signOut()}
                            >Logout</a>
                            : <a
                                className="log"
                                onClick={() => { setHatClick(false); OnchangeLogin(true); }}
                            >Login</a>}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.img
                src="/hat.png"
                className='pfp'
                animate={hatControls}
                onClick={() => { setHatClick(!hatClick); handleHatClick(); }}
                whileHover={{ scale: 1.05, rotate: -3, cursor: "url('/k32.cur'), pointer" }}
                whileTap={{ scale: 0.95 }}
            />

            <motion.img
                src='/tyt2.png'
                className='tyt'
                alt="Take Your Time Logo"
                animate={logoControls}
                onClick={handleLogoClick}
                whileHover={{ scale: 1.05, rotate: 5, cursor: "url('/k32.cur'), pointer" }}
                whileTap={{ scale: 0.95 }}
            />
        </div>
    );
};

export default TYT;