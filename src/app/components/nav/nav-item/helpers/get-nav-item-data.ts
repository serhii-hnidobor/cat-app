import { NavItemType } from "@/app/common/enums";

function getNavItemData(navItemType: NavItemType){
   switch (navItemType){
    case NavItemType.BREEDS: {
        return {
            imgSrc: '/images/pet-breeds.webp',
            background: '#97EAB9',
            alt: 'pet breeds illustration',
            width: 117,
            height: 163,
            name: 'voting',
        }
    }
    case NavItemType.VOTING: {
        return {
            imgSrc: '/images/vote-table.webp',
            background: '#B4B7FF',
            alt: 'vote table illustration',
            width: 100,
            height: 125,
            name: 'breeds'
        }
    }
    case NavItemType.GALLERY: {
        return {
            imgSrc: '/images/search.webp',
            background: '#FFD280',
            alt: 'search illustrations',
            width: 112,
            height: 190,
            name: 'gallery'
        }
    }

    default: {
        const check: never = navItemType;

        throw check;
    }
   }
}

export { getNavItemData as default };