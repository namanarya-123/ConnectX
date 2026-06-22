import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const router = useNavigate();
        const [checked, setChecked] = useState(false);

        useEffect(() => {
            // First check URL for a token (covers Google OAuth redirect race condition)
            const params = new URLSearchParams(window.location.search);
            const urlToken = params.get('token');
            const urlName  = params.get('name');

            if (urlToken) {
                localStorage.setItem('token', urlToken);
                if (urlName) localStorage.setItem('name', decodeURIComponent(urlName));

                // Clean the URL so token doesn't stay visible/shareable
                window.history.replaceState({}, document.title, window.location.pathname);
            }

            const token = localStorage.getItem("token");

            if (!token) {
                router("/auth");
            }

            setChecked(true);
        }, [])

        // Avoid rendering the protected component until the check is done
        if (!checked) return null;

        return <WrappedComponent {...props} />
    }

    return AuthComponent;
}

export default withAuth;