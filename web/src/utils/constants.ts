import { useEffect } from 'react';
import { IContacts, NotificationInterface } from './interfaces';
import { RiMessage2Fill } from 'react-icons/ri';
import { useState } from 'react';
import { rotateIn } from 'react-animations';

export const REDIRECT_PATH = {
    home: "/",

    twitter: "/twitter",
    twitterprfile: "/profile",

    contacts: "/contacts",
    lastcalls: "/lastcalls",
    newcontact: "/newcontact",
    contactProfile: "/contactprofile",
    contactKeyboard: "/contactKeyboard",

    messages: "/message",
    messageDetails: "/messagedetails",
    mailDetails: "/maildetails",
    
    settings: "/settings",
    settingsBackgrounds: "/backgrounds",
    settingsProfileDetails: "/settingsProfileDetails",

    bank: "/bank",
    transfer: "/transfer",
    bills: "/bills",

    tinder: "/tinder",
    tinderProfile: "/tinderprofile",
    tinderMatch: "/tindermatch",
    tinderRegister: "/tinderregister",
    
    gallery: "/gallery",
    workstation: "/workstation",
    news: "/news",
    newsDetails: "/newsdetails",

    mail: "/mail",
    yellowPage: "/yellow",
}

export function displayNotification(setNotifs: React.Dispatch<React.SetStateAction<NotificationInterface[]>>, id: string, notif: NotificationInterface[]) {
    if (id === "") return
    notif.splice(notif.findIndex(x => x.id == id), 1)
    setNotifs(notif)
}

export const getRandomNumber = () => {
    return Math.random().toString().substring(2, 8);
}

interface ISettings {
    name: String,
    color: String, 
}


export function formatMoney(amount: any){
    if (amount == undefined || amount == null || amount == "" ) return 0;
    return  "$" + (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}

export const Settings: ISettings[] = [
    {name: "mesage", color: "bg-green-500"}
]


export function useDarkMode() {
    const [theme, setTheme] = useState("dark");
    const colorTheme = theme === "dark" ? "light" : "dark";
    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove(colorTheme)
        root.classList.add(theme)
    }, [colorTheme, theme])

    return [colorTheme, setTheme]
}

export const keys = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "Ğ",
    "H",
    "I",
    "İ",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "Ö",
    "P",
    "R",
    "S",
    "Ş",
    "T",
    "U",
    "Ü",
    "V",
    "Y",
    "Z",
];

export const CopyClipboard = (number: any) => {return 0}

