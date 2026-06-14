import React from 'react'
import { useNavigate } from 'react-router-dom'
import './landing.css'

export default function LandingPage() {
    const navigate = useNavigate()

    return (
        <div className='lp-root'>

            {/* ── Navbar ── */}
            <nav className='lp-nav'>
                <div className='lp-logo'>
                    <div className='lp-logo-icon'>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="23 7 16 12 23 17 23 7"/>
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                        </svg>
                    </div>
                    <span>ConnectX</span>
                </div>
                <div className='lp-nav-links'>
                    <button className='lp-btn-ghost' onClick={() => navigate('/aljk23')}>
                        Join as guest
                    </button>
                    <button className='lp-btn-ghost' onClick={() => navigate('/auth')}>
                        Register
                    </button>
                    <button className='lp-btn-primary' onClick={() => navigate('/auth')}>
                        Login
                    </button>
                </div>
            </nav>

            {/* ── Hero ── */}
            <main className='lp-hero'>

                {/* Left: copy */}
                <div className='lp-hero-left'>
                    <div className='lp-badge'>
                        <span className='lp-badge-dot'></span>
                        WebRTC powered · End-to-end encrypted
                    </div>

                    <h1 className='lp-headline'>
                        Video calls that<br />feel <span className='lp-accent'>truly close</span>.
                    </h1>

                    <p className='lp-sub'>
                        Crystal-clear HD video, real-time chat, and meeting history —
                        all in your browser. No downloads. No friction.
                    </p>

                    <div className='lp-ctas'>
                        <button className='lp-btn-primary lp-btn-lg' onClick={() => navigate('/auth')}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7"/>
                                <rect x="1" y="5" width="15" height="14" rx="2"/>
                            </svg>
                            Start a meeting
                        </button>
                        <button className='lp-btn-outline lp-btn-lg' onClick={() => navigate('/aljk23')}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                            Join as guest
                        </button>
                    </div>

                    <div className='lp-stats'>
                        <div className='lp-stat'>
                            <span className='lp-stat-num'>10k+</span>
                            <span className='lp-stat-lbl'>Active users</span>
                        </div>
                        <div className='lp-stat-divider'></div>
                        <div className='lp-stat'>
                            <span className='lp-stat-num'>99.9%</span>
                            <span className='lp-stat-lbl'>Uptime</span>
                        </div>
                        <div className='lp-stat-divider'></div>
                        <div className='lp-stat'>
                            <span className='lp-stat-num'>HD</span>
                            <span className='lp-stat-lbl'>Video quality</span>
                        </div>
                    </div>
                </div>

                {/* Right: mock video card */}
                <div className='lp-hero-right'>
                    <div className='lp-card'>

                        {/* Card header */}
                        <div className='lp-card-header'>
                            <div>
                                <p className='lp-card-meta'>Meeting · ABC-123-XYZ</p>
                                <p className='lp-card-title'>Team standup</p>
                            </div>
                            <div className='lp-live-badge'>
                                <span className='lp-live-dot'></span>
                                Live
                            </div>
                        </div>

                        {/* Video grid */}
                        <div className='lp-video-grid'>
                            <div className='lp-tile lp-tile-indigo'>
                                <div className='lp-tile-label'>
                                    <div className='lp-avatar lp-av-indigo'>RK</div>
                                    <span className='lp-tile-name lp-tn-indigo'>Rahul K.</span>
                                </div>
                            </div>
                            <div className='lp-tile lp-tile-green'>
                                <div className='lp-tile-label'>
                                    <div className='lp-avatar lp-av-green'>PS</div>
                                    <span className='lp-tile-name lp-tn-green'>Priya S.</span>
                                </div>
                            </div>
                            <div className='lp-tile lp-tile-orange'>
                                <div className='lp-tile-label'>
                                    <div className='lp-avatar lp-av-orange'>AM</div>
                                    <span className='lp-tile-name lp-tn-orange'>Arjun M.</span>
                                </div>
                            </div>
                            <div className='lp-tile lp-tile-empty'>
                                <span className='lp-tile-more'>+3 more</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className='lp-controls'>
                            <button className='lp-ctrl' title='Mic'>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>
                                    <line x1="8" y1="23" x2="16" y2="23"/>
                                </svg>
                            </button>
                            <button className='lp-ctrl' title='Camera'>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="23 7 16 12 23 17 23 7"/>
                                    <rect x="1" y="5" width="15" height="14" rx="2"/>
                                </svg>
                            </button>
                            <button className='lp-ctrl' title='Share screen'>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>
                                    <line x1="12" y1="17" x2="12" y2="21"/>
                                </svg>
                            </button>
                            <button className='lp-ctrl' title='Chat'>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                </svg>
                            </button>
                            <button className='lp-ctrl lp-ctrl-end' title='End call'>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.42 19.42 0 0 1 4.43 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.34 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.34 9.91a16 16 0 0 0 3.34 3.4z"/>
                                    <line x1="23" y1="1" x2="1" y2="23"/>
                                </svg>
                            </button>
                        </div>

                        {/* Feature pills */}
                        <div className='lp-features'>
                            <div className='lp-feat'>
                                <div className='lp-feat-icon lp-fi-indigo'>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className='lp-feat-title'>Encrypted</p>
                                    <p className='lp-feat-sub'>Peer-to-peer WebRTC</p>
                                </div>
                            </div>
                            <div className='lp-feat'>
                                <div className='lp-feat-icon lp-fi-green'>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className='lp-feat-title'>Live chat</p>
                                    <p className='lp-feat-sub'>In-call messaging</p>
                                </div>
                            </div>
                            <div className='lp-feat'>
                                <div className='lp-feat-icon lp-fi-orange'>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="12 8 12 12 14 14"/>
                                        <path d="M3.05 11a9 9 0 1 1 .5 4"/>
                                        <polyline points="3 16 3 11 8 11"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className='lp-feat-title'>History</p>
                                    <p className='lp-feat-sub'>Rejoin past meetings</p>
                                </div>
                            </div>
                        </div>

                        {/* Social proof */}
                        <div className='lp-trust'>
                            <div className='lp-trust-avatars'>
                                <div className='lp-tav lp-tav-1'>RK</div>
                                <div className='lp-tav lp-tav-2'>PS</div>
                                <div className='lp-tav lp-tav-3'>AM</div>
                                <div className='lp-tav lp-tav-4'>VR</div>
                            </div>
                            <p className='lp-trust-text'>
                                Trusted by <strong>10,000+</strong> users worldwide
                            </p>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}