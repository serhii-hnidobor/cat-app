'use client';

import { NavItemType } from "@/app/common/enums"
import { NavItem } from "./nav-item";

const navItemTypes = [NavItemType.BREEDS, NavItemType.VOTING, NavItemType.GALLERY];

const Nav = () => {
    return <div className="flex gap-4">
        {navItemTypes.map((navItemType, index) => <NavItem key={`${navItemType}-${index}`} navItemType={navItemType} />)}
    </div>
}

export { Nav as default };