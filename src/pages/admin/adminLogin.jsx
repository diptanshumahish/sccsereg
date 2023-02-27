import Head from "next/head";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initFirebase } from "@/config";
import s from '@/styles/adminLogin.module.css';
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Login() {
    const app = initFirebase();
    const auth = getAuth();
    const router = useRouter();

    const [logEmail, changeLogEmail] = useState('');
    const [logPass, changeLogPass] = useState('');
    return (
        <>
            <Head>
                <title>Login </title>
            </Head>
            <main id={s.main}>
                <div id={s.loginForm}>
                    <div id={s.formHead}>ADMIN LOGIN</div>
                    <div className={s.heads}>
                        Email
                    </div>
                    <input type="email" name="" className={s.inp} id="scEmail" onChange={() => {
                        changeLogEmail(document.getElementById('scEmail').value)

                    }} />
                    <div className={s.heads}>Password</div>
                    <input type="password" id="scPass" className={s.inp} onChange={() => {
                        changeLogPass(document.getElementById('scPass').value)
                    }} />
                    <button type="submit" id={s.logButton}onClick={() => {
                        signInWithEmailAndPassword(auth, logEmail, logPass).then(async (user) => {
                            await Cookies.set("jwt", auth.currentUser.email, { expires: 0.5 });
                            router.push('/admin/adminDas');

                        });
                    }}>
                        Login
                    </button>
                </div>
            </main>

        </>
    )


}