'use client';

import { NavItemType } from "@/app/common/enums";
import getNavItemData from "./helpers/get-nav-item-data";
import Image from 'next/image'

interface Props {
    navItemType: NavItemType
}

const NavItem = ({ navItemType }: Props) => {
    const { background, imgSrc, alt, width, height, name } = getNavItemData(navItemType);

    return <div className="w-[138px] flex flex-col gap-[10px] group">
        <div className="group-hover:border-white rounded-[20px] border-solid border-4 border-white/60 flex justify-center items-center h-[198px] cursor-pointer" style={{ background: background }}>
            <Image src={imgSrc} alt={alt} width={width} height={height} />
        </div>
        <button className="w-full h-9 flex justify-center items-center rounded-[10px] uppercase py-2.5 group-hover:bg-[#FBE0DC] group-hover:text-[#FF868E] bg-white text-[#FF868E] cursor-pointer">
            <span>{name}</span>
        </button>
    </div>
}

export { NavItem, type Props as NavItemProps };