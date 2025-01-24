import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { Link } from "@inertiajs/react";

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model = [
        {
            label: 'Home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: route('dashboard') },
                { label: 'Users', icon: 'pi pi-fw pi-id-card', to: route('users.index') },
                { label: 'Tasks', icon: 'pi pi-fw pi-id-card', to: route('tasks.index') },
                { label: 'Projects', icon: 'pi pi-fw pi-id-card', to: route('projects.index') },
                { label: 'Chat', icon: 'pi pi-fw pi-id-card', to: route('chat.index') },
            ]
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}


            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
