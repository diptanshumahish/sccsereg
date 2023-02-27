import Head from "next/head";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { collection, getFirestore, query, orderBy, onSnapshot } from "firebase/firestore";
import { initFirebase } from "@/config";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import Cookies from "js-cookie";




export default function AdminDashBoard() {
    const [dataTables, setDataTable] = useState([]);
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
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div>
                <button type="submit" onClick={() => {
                    getCSV();
                }}>Submit</button> <br />
                <CSVLink data={dataTables} filename={`${Date.now()}`}>Download CSV</CSVLink> <br />
                <button type="submit" onClick={() => {
                    auth.signOut().then(() => {
                        Cookies.remove('jwt');
                        router.push('/')
                    })
                }}>Sign out</button>
            </div>
        </>
    )
}