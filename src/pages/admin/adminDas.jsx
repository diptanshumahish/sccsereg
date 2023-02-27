import Head from "next/head";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { collection, getFirestore, query, orderBy, onSnapshot } from "firebase/firestore";
import { initFirebase } from "@/config";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import s from '@/styles/adminDas.module.css';
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function AdminDashBoard() {
    const [dataTables, setDataTable] = useState([]);
    const [allow, setAlow] = useState(false);
    const app = initFirebase();
    const auth = getAuth();
    const authCookie = Cookies.get('jwt')
    const db = getFirestore();
    const router = new useRouter();
    useEffect(() => {
        console.log(authCookie);
        if (authCookie == null) {
            router.push('/');
        }
    })

    async function getCSV() {

        var temp = [];
        var idArray = [];
        const colRef = collection(db, "Registrations");
        const q = query(colRef, orderBy("submittedTime", "asc"));
        onSnapshot(q, async (snapshot) => {
            await snapshot.docs.forEach((doc) => {
                temp.push(doc.data());

            });
            await snapshot.docs.forEach((doc) => {
                idArray.push(doc.id);
            });
            await temp.forEach(function (element, index) {
                element['id'] = index + 1;
                element['unique'] = idArray[index];
            });
            setDataTable(temp);
        })
    }
    return (

        <>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <Head>
                <title>Admin Dashboard</title>
            </Head>

            <main >
                <nav>
                    <div id="navLeft">
                        Admin Dashboard
                    </div>
                    <div id="navRight" onClick={() => {
                        auth.signOut().then(() => {
                            Cookies.remove('jwt');
                            router.push('/')
                        })
                    }}>
                        Sign out
                    </div>
                </nav>
                <section className={s.area} >

                    <div className={s.areInner}>
                        <div id={s.areaTop}>
                            <div id={s.hepText}>
                                <div class={s.areaHead}>
                                    Download Registration CSV
                                </div>
                                <div className={s.areaSub}>
                                    First generate the UptoDate CSV and then download the CSV file
                                </div>
                            </div>
                            <div id={s.helpIcon}>
                                <Image src='/assets/download.png' width={30} height={30} />
                            </div>
                        </div>
                        <div id={s.buttonsArea}>
                            <div id={s.genCSV} className={s.btn} onClick={() => {
                                getCSV().then(() => {
                                    toast.success('CSV generated Successfully. you can download now', {
                                        position: "top-left",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                    setAlow(true);
                                })

                            }}>
                                Generate CSV
                            </div>
                            <CSVLink className={s.btn} data={dataTables} onClick={() => {
                                if (allow == false) {
                                    toast.error('Generate CSV at first, downloading now will give an empty table', {
                                        position: "top-left",
                                        autoClose: 4000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                } else {
                                    setAlow(false);
                                }
                            }} filename={`${Date.now()}`}>Download CSV</CSVLink>
                        </div>
                    </div>
                </section>
            </main>
            <div>

                <br />

            </div>
        </>
    )
}