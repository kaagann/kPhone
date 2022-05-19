import Bank from "../compoments/Pages/Bank/Bank";
import ContactProfile from "../compoments/Pages/Contacts/ContactProfile";
import Contacts from "../compoments/Pages/Contacts/Contacts";
import LastCalls from "../compoments/Pages/Contacts/LastCalls";
import NewContact from "../compoments/Pages/Contacts/NewContact";
import PhoneKeyboard from "../compoments/Pages/Contacts/PhoneKeyboard";
import Gallery from "../compoments/Pages/Gallery/Gallery";
import Mail from "../compoments/Pages/Mail/Mail";
import MailDetails from "../compoments/Pages/Mail/MailDetails";
import MessageDetails from "../compoments/Pages/Messages/MessageDetails";
import MessageHome from "../compoments/Pages/Messages/MessageHome";
import News from "../compoments/Pages/News/News";
import NewsDetails from "../compoments/Pages/News/NewsDetails";
import Settings from "../compoments/Pages/Settings/Settings";
import SettingsBackgrounds from "../compoments/Pages/Settings/SettingsBackgrounds";
import SettingsProfileDetails from "../compoments/Pages/Settings/SettingsProfileDetails";
import Tinder from "../compoments/Pages/Tinder/Tinder";
import TinderMatch from "../compoments/Pages/Tinder/TinderMatch";
import TinderProfile from "../compoments/Pages/Tinder/TinderProfile";
import TinderRegister from "../compoments/Pages/Tinder/TinderRegister";
import Twitter from "../compoments/Pages/Twitter/Twitter";
import TwitterProfile from "../compoments/Pages/Twitter/TwitterProfile";
import WorkStation from "../compoments/Pages/WorkStation/WorkStation";
import YellowPage from "../compoments/Pages/YellowPages/YellowPage";
import { REDIRECT_PATH } from "./constants";
import { IRoute, IRouteResult } from "./interfaces";



const routes: IRoute[] = [
    {
        component: Twitter,
        path: REDIRECT_PATH.twitter,
        initializePlayerData: true,
        initializePhoneSettings: true,
        children: [
            {
                component: TwitterProfile,
                path: REDIRECT_PATH.twitterprfile,
                initializePlayerData: true,
            }
        ]

    },
    {
        component: YellowPage,
        path: REDIRECT_PATH.yellowPage,
        initializeNotification: true,
        initializePlayerData: true,
    },
    {
        component: Contacts,
        path: REDIRECT_PATH.contacts,
        initializeContacts: true,
        initializeNotification: true,
        initializeMessages: true,
        children: [
            {
                component: LastCalls,
                path: REDIRECT_PATH.lastcalls,
                initializeContacts: true
            },
            {
                component: NewContact,
                path: REDIRECT_PATH.newcontact,
                initializeContacts: true,
                initializePlayerData: true
            },
            {
                component: ContactProfile,
                path: REDIRECT_PATH.contactProfile,
                initializeContacts: true,
            },
            {
                component: PhoneKeyboard,
                path: REDIRECT_PATH.contactKeyboard,
                initializeContacts: true,
            }
        ]
    },
    {
        component: Bank,
        path: REDIRECT_PATH.bank,
        initializeAlert: true,
        initializePlayerData: true,
    },
    {
        component: MessageHome,
        path: REDIRECT_PATH.messages,
        initializeContacts: true,
        initializeMessages: true,
        initializePlayerData: true,
        initializePhoneSettings: true,
        children: [
            {
                component: MessageDetails,
                path: REDIRECT_PATH.messageDetails,
                initializePlayerData: true,
                initializeMessages: true,
                initializeContacts: true,
                initializePhoneSettings: true,
            }
        ]
    },
    {
        component: Settings,
        path: REDIRECT_PATH.settings,
        initializePlayerData: true,
        children: [
            {
                component: SettingsBackgrounds,
                path: REDIRECT_PATH.settingsBackgrounds,
                initializePlayerData: true,
                initializeAlert: true
            },
            {
                component: SettingsProfileDetails,
                path: REDIRECT_PATH.settingsProfileDetails,
                initializePlayerData: true,
                initializeAlert: true
            }
        ]
    },
    {
        component: Mail,
        path: REDIRECT_PATH.mail,
        initializePlayerData: true,
        children: [
            {
                component: MailDetails,
                initializePlayerData: true,
                path: REDIRECT_PATH.mailDetails,
            }
        ]
    },
    {
        component: Tinder,
        path: REDIRECT_PATH.tinder,
        initializePlayerData: true,
        children: [
            {
                component: TinderProfile,
                path: REDIRECT_PATH.tinderProfile,
                initializePlayerData: true
            },
            {
                component: TinderMatch,
                path: REDIRECT_PATH.tinderMatch,
                initializePlayerData: true
            },
            {
                component: TinderRegister,
                path: REDIRECT_PATH.tinderRegister,
                initializePlayerData: true
            }
        ]
    },
    {
        component: Gallery,
        path: REDIRECT_PATH.gallery,
        initializePlayerData: true,
    },
    {
        component: WorkStation,
        path: REDIRECT_PATH.workstation,
        initializePlayerData: true
    },
    {
        component: News,
        path: REDIRECT_PATH.news,
        initializePlayerData: true,
        children: [
            {
                component: NewsDetails,
                path: REDIRECT_PATH.newsDetails,
                initializePlayerData: true,
            }
        ]
    }
];

export function getRouteResults(): IRouteResult[] {
    const results: IRouteResult[] = [];
    routes.forEach(route => getRouteResult(route).forEach(result => results.push(result)));
    return results;
}

function getRouteResult(route: IRoute): IRouteResult[] {
    const results: IRouteResult[] = [];
    results.push({ path: route.path, route: route });
    if (Array.isArray(route.children) && route.children.length) route.children.forEach(child => {
        const resultFromChild = getRouteResult(child);
        resultFromChild.forEach(result => results.push({ path: route.path + result.path, route: result.route }));
    });
    return results;
}

export default routes;