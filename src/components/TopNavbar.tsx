'use client'

import { useState } from 'react';
import './TopNavbar.css';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

export default function TopNavbar() {
    const { user, logout } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const handleModalClose = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.className === "modal") {
            setShowModal(false);
        }
    }

    return (
        <div className="navbar-fixed">
            <Image 
                src="/profile-logo.svg"
                alt="profile-logo"
                width={0}
                height={0}
                sizes="100vw"
                priority
                className="profile-logo"
                onClick={() => setShowModal(true)}
            />
            <nav className="navbar">
                <div className="navbar-container">
                    <Image 
                        src="/main-logo-transparent.svg"
                        alt="shine-ai"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority
                        className="main-logo-transparent"
                    />
                </div>
            </nav>
            <div className="trophy-container">
                <Image 
                    src="/trophy.svg"
                    alt="trophy"
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority
                    className="trophy-logo"
                />
                <p>0</p>
            </div>
            
            {showModal && 
                <div className="modal" onClick={handleModalClose}>
                    <div className="modal-content">
                        <h2>Hi! {user?.displayName}</h2>
                        <br />
                        <h2>Menu</h2>
                        <button onClick={logout} className="signout-btn">Sign Out</button>
                    </div>
                </div>
            }
        </div>
    );
}