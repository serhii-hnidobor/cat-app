import { NavItemType } from "@/app/common/enums"
import { NavItem } from "./nav-item";

const navItemTypes = [NavItemType.BREEDS, NavItemType.VOTING, NavItemType.GALLERY];

const Nav = () => {
    return <div>
        <header className="flex flex-col gap-[10px] mb-[60px]">
            <h1 className="text-[44px] font-medium leading-[58px] not-italic">Hi!👋</h1>
            <h2 className="text-[20px] font-normal not-italic text-[#8C8C8C]">Welcome to MacPaw Bootcamp 2023</h2>
        </header>
        <p className="mb-[20px] text-[20px] font-medium not-italic text-black leading-normal"><strong>Lets start using The Cat API</strong></p>
        <nav className="flex gap-4">
            {navItemTypes.map((navItemType, index) => <NavItem key={`${navItemType}-${index}`} navItemType={navItemType} />)}
        </nav>
    </div>
}

export { Nav as default };