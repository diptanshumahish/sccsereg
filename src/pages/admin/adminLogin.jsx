import Head from "next/head";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initFirebase } from "@/config";
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
            <div>
                <div id="loginForm">
                    <div className="heads">
                        Email
                    </div>
                    <input type="email" name="" id="scEmail" onChange={() => {
                        changeLogEmail(document.getElementById('scEmail').value)

                    }} />
                    <div className="heads">Password</div>
                    <input type="text" id="scPass" onChange={() => {
                        changeLogPass(document.getElementById('scPass').value)
                    }} />
                    <button type="submit" onClick={() => {
                        signInWithEmailAndPassword(auth, logEmail, logPass).then(async (user) => {
                            await Cookies.set("jwt", auth.currentUser.email, { expires: 0.5 });
                            router.push('/admin/adminDas');

                        });
                    }}>
                        Login
                    </button>
                </div>
            </div>

        </>
    )


}