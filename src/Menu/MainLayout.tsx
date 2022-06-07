import { Router, Outlet } from 'react-location';
import { routes, location } from "../router";
import MenuBar from './MenuBar';
import { useState } from 'react';
import { getUser } from './DisplayPage/UserPage/LoginData';

export default function MainLayout() {
    const [loggedIn, setLoggedIn] = useState(false)
    
    const load = async () => {
        const s = await getUser().then(r => r.status);
        if(s === 200) setLoggedIn(true)
    }

    if (loggedIn) return (
        <div className='title-font'>Đăng nhập để sử dụng chức năng</div>
    )
    else return (
        <Router routes={routes} location={location}>
            <MenuBar />
            <Outlet />
        </Router>
    )
}
