import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';

export default function BasicDemo() {
    const items = [
        {label: 'M', icon: 'pi pi-fw pi-home'},
        {label: 'RA', icon: 'pi pi-fw pi-calendar'},
        {label: 'FD-CNC', icon: 'pi pi-fw pi-pencil'},
        {label: 'FD', icon: 'pi pi-fw pi-file'}
    ];

    return (
        <div className="card">
            <TabMenu model={items} />
           
        </div>
    )
}