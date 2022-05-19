export interface IRoute {
    component: ((props: any) => JSX.Element) | null;
    path: string;
    props?: object;
    children?: IRoute[];
    initializeNotification?: boolean;
    initializeAlert?: boolean;
    initializeContacts?: boolean;
    initializeMessages?: boolean;
    initializePlayerData? :boolean;
    initializePhoneSettings? :boolean;
}

export interface IRouteResult {
    path: string;
    route: IRoute;
}

export interface NotificationInterface {
    name: String;
    color: String;
    icon: JSX.Element;
    message: String;
    date: Date;
    id: any,
    display: boolean
}

export interface phoneData {
    firstname: String;
    lastname: String;
    phoneNumber: Number;
    bank: number;
    iban: string;
    profilePicture: string | undefined | null;
    phoneTheme: string;
    tinderAccount?: tinderAccount;
    notifications: boolean;
    airplanemode: boolean;
    citizenid: string;
    gallery: string[];
}

export interface IContacts {
    name: String;
    phoneNumber: Number;
    profilePicture: string | null;
}


export interface ICallData {
    number: string;
    type: string;
    isAnswerd: boolean
}

export interface IMessages {
    contactNumber: number,
    messages: IMessagesData[]
}

export interface tinderAccount {
    username : string;
    profilePicture : string;
    phoneNumber : Number;
    bio: string;
    matchUsers: matchedUsers[],
    likedUserCount: number,
    showedUsers: Number[],
}

export interface matchedUsers {
    username : string;
    profilePicture : string;
    phoneNumber : Number;
    bio: string;
}

export interface IMessagesData {
    receiver: number;
    message: string | undefined;
    date: Date;
    isRead: boolean;
    img?: string | null;
    audio?: any
}

export interface INews {
    title: string;
    description: string;
    date: Date;
    img: string;
}

export interface IBills {
    billId: number,
    amount: number,
    society: string
}

export interface IMailData {
    sender: string;
    title: string;
    message: string;
    img: null | undefined | string;
}


export interface ITwit {
    username: String;
    twit: String;
    date: Date;
    img: any;
    mentionedTwitIndex?: string;
    likes: String[];
    citizenid: string;
}

export interface IModalInputData {
    name: string,
    id: string,
}


export interface ads { name: String; phoneNumber: Number; desc: String; date: Date, img: any | undefined | null}
