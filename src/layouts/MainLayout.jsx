import styles from './MainLayout.module.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import ContentLayout from './ContentLayout';
import Sidebar from './Sidebar';
import { getRouteConfig } from '../router/routeConfig';

export default function MainLayout() {
    const location = useLocation();

    const config = getRouteConfig(location.pathname);

    return (
        <div className={styles.layout}>
            <Sidebar className={styles.sidebar} />

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
