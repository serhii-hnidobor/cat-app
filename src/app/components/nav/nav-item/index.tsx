'use client';

import { NavItemType } from "@/app/common/enums";
import getNavItemData from "./helpers/get-nav-item-data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from "clsx";

interface Props {
    navItemType: NavItemType;
}

const NavItem = ({ navItemType }: Props) => {
    const { background, imgSrc, alt, width, height, name, route } =
        getNavItemData(navItemType);

    const pathname = usePathname();

    const isActive = pathname === route;

    return (
        <div className="w-[138px] flex flex-col gap-[10px] group">
            <Link href={route}>
                <span
                    className={clsx({
                        "group-hover:border-white rounded-[20px] border-solid border-4 flex justify-center items-center h-[198px] cursor-pointer":
                            true,
                        "border-white/60": !isActive,
                        "border-[#FBE0DC]/60": isActive,
                    })}
                    style={{ background: background }}
                >
                    <Image src={imgSrc} alt={alt} width={width} height={height} />
                </span>
            </Link>
            <Link href={route}
                className={clsx({
                    "w-full h-9 flex justify-center items-center rounded-[10px] uppercase py-2.5 group-hover:bg-[#FBE0DC] group-hover:text-[#FF868E] cursor-pointer":
                        true,
                    "bg-white text-[#FF868E]": !isActive,
                    "bg-[#FF868E] text-white": isActive,
                })}
            >
                <span>{name}</span>
            </Link>
        </div>
    );
};

export { NavItem, type Props as NavItemProps };
