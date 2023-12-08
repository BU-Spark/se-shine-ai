'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './TopNavbar.module.css';

export default function TopNavbar() {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const handleModalClose = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    }

    return (
        <div className={styles.navbarFixed}>
            <Image 
                src="/profile-logo.svg"
                alt="profile-logo"
                width={0}
                height={0}
                sizes="100vw"
                priority
                className={styles.profileLogo}
                onClick={() => setShowModal(true)}
            />
            <nav className={styles.navbar}>
                <div className={styles.navbarContainer}>
                    <Image 
                        src="/main-logo-transparent.svg"
                        alt="shine-ai"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority
                        className={styles.mainLogoTransparent}
                    />
                </div>
            </nav>
            <div className={styles.trophyContainer}>
                <Image 
                    src="/trophy.svg"
                    alt="trophy"
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority
                    className={styles.trophyLogo}
                />
                <p>0</p>
            </div>
            
            {showModal && 
                <div className={styles.modal} onClick={handleModalClose}>
                    <div className={styles.modalContent}>
                        <h2>Hi! {user?.displayName}</h2>
                        <br />
                        <h2>Menu</h2>
                        <button onClick={logout} className={styles.signoutBtn}>Sign Out</button>
                        <button onClick={()=>router.push("/assessment")} className={styles.signoutBtn}>Assessment1</button>
                    </div>
                </div>
            }
        </div>
    );
}