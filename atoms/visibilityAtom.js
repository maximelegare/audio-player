import { atom } from "recoil";

export const searchSectionVisibilityState = atom({
    key:"searchSectionVisibilityState",
    default:false
}) 

export const selectedSideBarProvider = atom({
    key:"selectedSideBarProvider",
    default:"hodei"
})

export const sideBarPage = atom({
    key:"sideBarPage",
    default:"default"
})
