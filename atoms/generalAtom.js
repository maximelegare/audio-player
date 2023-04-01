import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const searchSectionVisibilityState = atom({
    key:"searchSectionVisibilityState",
    default:false
}) 

export const selectedSideBarProvider = atom({
    key:"selectedSideBarProvider",
    default:"hodei",
    // effects_UNSTABLE: [persistAtom],
})

export const sideBarPage = atom({
    key:"sideBarPage",
    default:"default"
})

export const currentRouteInfosAtom = atom({
    key:"currentRouteInfosAtom",
    default:{}
})
