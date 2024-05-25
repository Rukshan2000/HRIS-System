import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const [auth, setAuth] = useState({ token: undefined });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get('http://localhost:8081/checkauth', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res);
                    if (res.data.success) {
                        setAuth({ token: true });
                    } else {
                        console.log('one');
                        setAuth({ token: false });
                    }
                })
                .catch(err => {
                    console.log(err);
                    setAuth({ token: false });
                });
        } else {
            console.log('two');
            setAuth({ token: false });
        }
    }, []);

    if (auth.token === undefined) {
        // While authentication check is in progress, render a loading indicator or nothing
        return <div>Loading...</div>;
    }

    return (
        auth.token ? <Outlet /> : <Navigate to="/adminlogin" />
    );
};

export default PrivateRoutes;
