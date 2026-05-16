import styles from './MainLayout.module.css';

import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

import Sidebar from './Sidebar';
import Header from './Header';
import ContentLayout from './ContentLayout';

import { getRouteConfig } from '../router/routeConfig';

export default function MainLayout() {
    const location = useLocation();

    const config = getRouteConfig(location.pathname);

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
        <div
            className={`${styles.layout} ${sidebarOpen ? styles.expanded : styles.collapsed}`}
        >
            <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

            <div className={styles.mainWrapper}>
                <Header
                    title={config.title}
                    placeH={config.placeholder}
                    textButton={config.buttonText}
                    buttonColor={config.buttonColor}
                    logoButtona={config.logoButtona}
                />
                <ContentLayout>
                    <Outlet />
                </ContentLayout>
            </div>
        </div>
    );
}
