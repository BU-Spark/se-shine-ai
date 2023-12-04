'use client'

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './BottomNavbar.module.css';

export default function BottomNavbar() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { url: '/dashboard', label: 'Home', icon: '/home.svg', activeIcon: '/home-color.svg' },
        { url: '/dashboard/learn', label: 'Learn', icon: '/learn.svg', activeIcon: '/learn-color.svg' },
        { url: '/dashboard/community', label: 'Community', icon: '/community.svg', activeIcon: '/community-color.svg' },
        { url: '/dashboard/peersupport', label: 'Peers', icon: '/peersupport.svg', activeIcon: '/peersupport-color.svg' },
        { url: '/dashboard/mindfulness', label: 'Mind', icon: '/mindfulness.svg', activeIcon: '/mindfulness-color.svg' }
    ];
    
    const isActive = (route: string) => {
        return pathname === route;
    };

    return (
        <div className={styles.routerFixed}>
            <nav className={styles.router}>
                <div className={styles.divider}></div>

                {navItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className={styles.navItem} onClick={() => router.push(item.url)}>
                            <Image 
                                src={isActive(item.url) ? item.activeIcon : item.icon}
                                alt={item.label}
                                width={0}
                                height={0}
                                sizes="100vw"
                                priority
                                className={styles.dashboardNavLogo}
                            />
                            <span className={isActive(item.url) ? styles.activeNavLabel : styles.navLabel}>
                                {item.label}
                            </span>
                        </div>
                        <div className={styles.divider}></div>
                    </React.Fragment>
                ))}
            </nav>
        </div>
    );
}