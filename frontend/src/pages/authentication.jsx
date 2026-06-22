import * as React from 'react';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './authentication.css';

export default function Authentication() {

    const [username, setUsername]   = React.useState('');
    const [password, setPassword]   = React.useState('');
    const [name, setName]           = React.useState('');
    const [error, setError]         = React.useState('');
    const [message, setMessage]     = React.useState('');
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen]           = React.useState(false);
    const [showPass, setShowPass]   = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);
    const navigate = useNavigate();

   React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token  = params.get('token');
    const uname  = params.get('name');
    const err    = params.get('error');

    console.log('URL params:', window.location.search);
    console.log('Token found:', token);

    if (token) {
        localStorage.setItem('token', token);
        if (uname) localStorage.setItem('name', decodeURIComponent(uname));
        console.log('Token saved to localStorage:', localStorage.getItem('token'));
        window.location.href = '/home';
    }

    if (err === 'google_failed') {
        setError('Google sign-in failed. Please try again.');
    }
}, []);

    const handleAuth = async () => {
        setError('');
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            } else {
                const result = await handleRegister(name, username, password);
                setMessage(result);
                setOpen(true);
                setUsername('');
                setPassword('');
                setName('');
                setFormState(0);
            }
        } catch (err) {
            const msg = err?.response?.data?.message || 'Something went wrong';
            setError(msg);
        }
    };

    const switchTab = (idx) => {
        setFormState(idx);
        setError('');
        setUsername('');
        setPassword('');
        setName('');
    };

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
    };

    return (
        <div className='auth-root'>

            {/* ── Left panel ── */}
            <div className='auth-left'>
                <div className='auth-left-content'>
                    <div className='auth-brand'>
                        <div className='auth-brand-icon'>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7"/>
                                <rect x="1" y="5" width="15" height="14" rx="2"/>
                            </svg>
                        </div>
                        <span className='auth-brand-name'>ConnectX</span>
                    </div>

                    <div className='auth-left-body'>
                        <h2 className='auth-left-title'>
                            Connect with anyone,<br />anywhere.
                        </h2>
                        <p className='auth-left-sub'>
                            HD video calls, real-time chat, and meeting history — all in your browser.
                        </p>
                        <div className='auth-features'>
                            <div className='auth-feature-item'>
                                <div className='auth-feature-dot'></div>
                                <span>End-to-end encrypted WebRTC</span>
                            </div>
                            <div className='auth-feature-item'>
                                <div className='auth-feature-dot'></div>
                                <span>No downloads required</span>
                            </div>
                            <div className='auth-feature-item'>
                                <div className='auth-feature-dot'></div>
                                <span>Meeting history &amp; rejoin</span>
                            </div>
                        </div>
                    </div>

                    <div className='auth-testimonial'>
                        <div className='auth-stars'>★★★★★</div>
                        <p className='auth-testimonial-text'>
                            "Incredibly smooth video quality. Best browser-based meeting tool I've used."
                        </p>
                        <div className='auth-testimonial-author'>
                            <div className='auth-tav'>RK</div>
                            <div>
                                <p className='auth-tname'>Rahul Kumar</p>
                                <p className='auth-trole'>Software Engineer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Right panel ── */}
            <div className='auth-right'>
                <div className='auth-form-box'>

                    <div className='auth-mobile-brand'>
                        <div className='auth-brand-icon' style={{ background: '#4f46e5' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7"/>
                                <rect x="1" y="5" width="15" height="14" rx="2"/>
                            </svg>
                        </div>
                        <span className='auth-brand-name' style={{ color: '#111' }}>ConnectX</span>
                    </div>

                    <h1 className='auth-form-title'>
                        {formState === 0 ? 'Welcome back' : 'Create account'}
                    </h1>
                    <p className='auth-form-sub'>
                        {formState === 0
                            ? 'Sign in to your ConnectX account'
                            : 'Join thousands of users on ConnectX'}
                    </p>

                    <button className='auth-google-btn' onClick={handleGoogleLogin}>
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                    </button>

                    <div className='auth-divider'>
                        <div className='auth-divider-line'></div>
                        <span>or</span>
                        <div className='auth-divider-line'></div>
                    </div>

                    <div className='auth-tabs'>
                        <button className={`auth-tab ${formState === 0 ? 'auth-tab-active' : ''}`} onClick={() => switchTab(0)}>Sign In</button>
                        <button className={`auth-tab ${formState === 1 ? 'auth-tab-active' : ''}`} onClick={() => switchTab(1)}>Sign Up</button>
                    </div>

                    <form className='auth-fields' onSubmit={(e) => { e.preventDefault(); handleAuth(); }}>

                        {formState === 1 && (
                            <div className='auth-field-group'>
                                <label className='auth-label'>Full Name</label>
                                <input className='auth-input' type='text' placeholder='Rahul Kumar'
                                    value={name} onChange={(e) => setName(e.target.value)} autoFocus />
                            </div>
                        )}

                        <div className='auth-field-group'>
                            <label className='auth-label'>Username</label>
                            <input className='auth-input' type='text' placeholder='yourname'
                                value={username} onChange={(e) => setUsername(e.target.value)}
                                autoFocus={formState === 0} />
                        </div>

                        <div className='auth-field-group'>
                            <div className='auth-label-row'>
                                <label className='auth-label'>Password</label>
                                {formState === 0 && <span className='auth-forgot'>Forgot password?</span>}
                            </div>
                            <div className='auth-input-wrap'>
                                <input className='auth-input' type={showPass ? 'text' : 'password'}
                                    placeholder='••••••••' value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                <button className='auth-eye' onClick={() => setShowPass(!showPass)} tabIndex={-1} type='button'>
                                    {showPass ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                            <line x1="1" y1="1" x2="23" y2="23"/>
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className='auth-error'>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="12" y1="8" x2="12" y2="12"/>
                                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                                </svg>
                                {error}
                            </div>
                        )}

                        <button className='auth-submit' type='submit'>
                            {formState === 0 ? 'Sign In' : 'Create Account'}
                        </button>

                    </form>

                    <p className='auth-switch'>
                        {formState === 0 ? "Don't have an account? " : "Already have an account? "}
                        <button className='auth-switch-btn' onClick={() => switchTab(formState === 0 ? 1 : 0)}>
                            {formState === 0 ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>

                </div>
            </div>

            <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)} message={message} />
        </div>
    );
}