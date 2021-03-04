import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
}
export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    active?: boolean;
}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    selectedItem: IMenuItem;
    
    constructor() {
    }

    defaultMenu: IMenuItem[] = [
        {   
            name: 'Dashboard',
            description: 'résumer votre activité à l\'aide des indicateurs de performance',
            type: 'dropDown',
            icon: 'i-Bar-Chart',
            sub: [
                { icon: 'i-Clock-3', name: 'Bienvenue', state: '/welcome/v1', type: 'link' },
                { icon: 'i-Clock-4', name: 'Tableau de bord', state: '/welcome/dashboard', type: 'link' },
            ]
        },
        {
            name: 'Accounts',
            description: 'Gestion des comptes E-wallet et Fudiciaire',
            type: 'dropDown',
            icon: 'i-Library',
            sub: [
                { icon: 'i-Bell', name: 'Mon Compte', state: '/accounts/my-account', type: 'link' },
                { icon: 'i-Split-Horizontal-2-Window', name: 'Wallets', state: '/accounts/wallets', type: 'link' },
            ]
        },
        {
            name: 'Ops',
            description: 'Faites vos opérations en toute sécurité',
            type: 'dropDown',
            icon: 'i-Computer-Secure',
            sub: [
                { icon: 'i-Add-File', name: 'Dépot', state: '/ops/buy-sell', type: 'link' },
                { icon: 'i-Speach-Bubble-3', name: 'Opération', state: '/ops/operation', type: 'link' },
                {   icon: 'i-Email', name: 'Ordres', state: '/ops/orders', type: 'link', 
                    sub: [{ icon: 'i-Speach-Bubble-3', name: 'Transactions', state: '/ops/payorder', type: 'link' }]
                },
                { icon: 'i-Speach-Bubble-3', name: 'Transactions', state: '/ops/trans', type: 'link' },
            ]
        },
        {
            name: 'Pages',
            description: 'Gestion application',
            type: 'dropDown',
            icon: 'i-Windows-2',
            sub: [
                { icon: 'i-Male', name: 'User Profile', state: '/pages/profile', type: 'link' },
                { icon: 'i-Male', name: 'KYC Application', state: '/pages/kyc-application', type: 'link' }
            ]
        },
        {
            name: 'Doc',
            type: 'extLink',
            tooltip: 'Documentation',
            icon: 'i-Safe-Box1',
            state: 'http://demos.ui-lib.com/gull-doc'
        }
    ];


    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();

    // You can customize this method to supply different menu for
    // different user type.
    // publishNavigationChange(menuType: string) {
    //   switch (userType) {
    //     case 'admin':
    //       this.menuItems.next(this.adminMenu);
    //       break;
    //     case 'user':
    //       this.menuItems.next(this.userMenu);
    //       break;
    //     default:
    //       this.menuItems.next(this.defaultMenu);
    //   }
    // }
}
