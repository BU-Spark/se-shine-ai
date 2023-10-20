'use client'

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {

  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <div className={styles.mainContainer}>
    <p>HI, {user?.email}. You are loggin as {user?.displayName}</p>
    <button onClick={logout} style={{border: '5px solid black', width: "90%"}}>LOGOUT</button>
    </div>
  )
}
