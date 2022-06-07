import FormInput from "../../Components/FormInput";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-location';
import { getUser, login } from "./LoginData";
import Loading from '../Loading';

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    async function onLogin() {
        if (password === "" || username === "") {
            setShowError(true);
        }
        else {
            setLoading(true)
            setShowError(false)
            const res = await login(username, password)
            const status = res.status
            setLoginError(status === 401)
            window.location.reload()
            setLoading(false)
        }
    }

    const load = async () => {
        const r = await getUser()
        const s = await r.status
        if(s === 200) nav({to: "../../"})
    }
    useEffect(() => { load() }, []);

    if (loading) return (<Loading />)
    return (
        <div className="flex flex-row justify-center">
            <div>
                <form>
                    <FormInput label="Tên đăng nhập" placeholder="" type="text"
                        value={username}
                        onChange={setUsername}
                        isError={showError && username === ""}
                        errorText="Hãy nhập tên đăng nhập"
                    />
                    <FormInput label="Mật khẩu" placeholder="*****" type="password"
                        value={password}
                        onChange={setPassword}
                        isError={showError && password === ""}
                        errorText="Hãy nhập mật khẩu"
                    />
                </form>
                <div className="text-error">{loginError ? "Đăng nhập sai, xin đăng nhập lại" : ""}</div>
                <button type="button" className="!ml-auto" onClick={onLogin}>
                    Đăng nhập
                </button>
            </div>
        </div>
    )
}
