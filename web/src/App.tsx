import React, { useEffect, useState } from 'react';
import Header from './compoments/Header/Header';
import phoneBorder from "./resources/background.png";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getRouteResults } from "./utils/routes";
import { IBills, ICallData, IContacts, IMailData, IMessages, INews, IRoute, ITwit, NotificationInterface, phoneData } from './utils/interfaces';
import Home from './compoments/Pages/Home/Home';
import { FaMoneyCheck, FaRegCircle } from 'react-icons/fa';
import { AiFillCamera, AiFillPhone, AiOutlineCamera, AiOutlineTags, AiOutlineTwitter, AiOutlineUser } from 'react-icons/ai';
import { IoNotificationsSharp } from 'react-icons/io5';
import Notification from './compoments/Notification';
import { useHistory } from "react-router-dom";
import { displayNotification, REDIRECT_PATH, Settings, getRandomNumber } from './utils/constants';
import { useNuiEvent } from './utils/useNuiEvent';
import { fetchNui } from './utils/fetchNui';
import CallNotification from './compoments/CallNotification';
import { RiContactsBookLine, RiMessage2Fill } from 'react-icons/ri';

import { animated, useTransition } from 'react-spring';


function App() {
  const [notif, setNotifs] = useState<NotificationInterface[]>([
    // {
    //   color: "bg-blue-500",
    //   icon: <FaMoneyCheck />,
    //   message: "Hesap bakiyeniz artış yapılmıştır.",
    //   date: new Date(),
    //   id: "1",
    //   display: true,
    //   name: "nynner"
    // }
  ])

  const [phoneData, setPhoneData] = useState<phoneData>({
    bank: 1502,
    firstname: "Kagan",
    lastname: "Baba",
    iban: "kk-3122",
    phoneNumber: 18621,
    phoneTheme: "light",
    citizenid: "123456789",
    notifications: true,
    airplanemode: false,
    tinderAccount: {
      bio: "kagan baba",
      likedUserCount: 0,
      matchUsers: [],
      phoneNumber: 18621,
      showedUsers: [],
      username: "kagan cengiz",
      profilePicture: "https://media.discordapp.net/attachments/936398395306803250/941786572393709618/Screenshot_298.jpg?width=1066&height=671",
    },
    gallery: [
      "https://media.discordapp.net/attachments/936398395306803250/945607323613794355/unknown.png?width=1184&height=553"
    ],
    profilePicture: "https://media.discordapp.net/attachments/936398395306803250/941786572393709618/Screenshot_298.jpg?width=1066&height=671",
  })

  const [contacts, setContacts] = useState<IContacts[]>([
    {
      name: "Talha",
      phoneNumber: 18621,
      profilePicture: null,
    },
    {
      name: "burak",
      phoneNumber: 181,
      profilePicture: "https://media.discordapp.net/attachments/936398395306803250/945607323613794355/unknown.png?width=1184&height=553",
    }
  ]);
  const [lastCalls, setLastCalls] = useState<ICallData[]>([
    {
      isAnswerd: false,
      number: "133",
      type: "gelen",
    }
  ]);
  const [visible, setVisible] = useState(true)
  const [inCall, setInCall] = useState<ICallData>()
  const [details, setDetails] = useState<IMessages | undefined>()
  const [messages, setMessages] = useState<IMessages[]>([
    {
      contactNumber: 181,
      messages: [
        {
          date: new Date(),
          isRead: false,
          message: "merhaba",
          receiver: 18621,
          audio: null,
          img: null,
        }
      ]
    }
  ])
  const [twits, setTwits] = useState<ITwit[]>([])

  const [mails, setMails] = useState<IMailData[]>([
    {
      sender: "tkocadede",
      message: "Merhaba, nasılsın?",
      title: "Merhaba",
      img: "https://media.discordapp.net/attachments/819204223266455563/940637357374320690/unknown.png?width=1182&height=671"
    },
  ])
  const [bills, setBills] = useState<IBills[]>([])
  const [fullOpen, setFullOpen] = useState(true)
  const [footerColor, setFooterColor] = useState<string>("");

  const [news, setNews] = useState<INews[]>([
    {
      title: "Merhaba",
      date: new Date(),
      description: "test 313131",
      img: "https://media.discordapp.net/attachments/936398395306803250/945743031062106122/unknown.png?width=306&height=558"
    }
  ]);

  const initializeProps = (route: IRoute): JSX.Element => {
    const prop = route.props ? { ...route.props } : {};
    if (route.initializeNotification) Object.assign(prop, { ...prop, notif, setNotifs });
    if (route.initializePlayerData) Object.assign(prop, { ...prop, phoneData, setPhoneData });
    if (route.initializePlayerData) Object.assign(prop, { ...prop, bills, setBills });
    if (route.initializePlayerData) Object.assign(prop, { ...prop, twits, setTwits });

    if (route.initializePlayerData) Object.assign(prop, { ...prop, news, setNews });

    if (route.initializePlayerData) Object.assign(prop, { ...prop, mails, setMails });

    if (route.initializeContacts) Object.assign(prop, { ...prop, contacts, setContacts });
    if (route.initializeContacts) Object.assign(prop, { ...prop, inCall, setInCall });
    if (route.initializeContacts) Object.assign(prop, { ...prop, lastCalls, setLastCalls });


    if (route.initializeMessages) Object.assign(prop, { ...prop, details, setDetails });
    if (route.initializeMessages) Object.assign(prop, { ...prop, messages, setMessages });

    if (route.initializePhoneSettings) Object.assign(prop, { ...prop, footerColor, setFooterColor });


    return (route.component as (props: any) => JSX.Element)(prop);
  };

  const [onAnim, setAnim] = useState(false)
  useNuiEvent<boolean>('setVisible', (data) => {

    setVisible(data)
    if (data == true) {
      setFullOpen(true)
      setAnim(false)
    } else {
      setFullOpen(false)
    }
  })


  useNuiEvent("setPhoneData", (data) => {
    {/* @ts-ignore */ }
    setPhoneData({
      firstname: data.charinfo.firstname,
      lastname: data.charinfo.lastname,
      phoneNumber: parseInt(data.charinfo.phone),
      bank: data.money.bank,
      iban: data.charinfo.account,
      gallery: data.metadata.gallery,
      citizenid: data.citizenid,
      profilePicture: data.metadata.profilepic,
      notifications: true,
      airplanemode: false,
    })
  })
  useNuiEvent<IContacts[]>("setContactData", (data) => setContacts(data))

  useNuiEvent<ICallData>("setCallState", (data) => {
    setInCall(data)
  })

  useNuiEvent("setTweets", (data) => setTwits(data))

  useNuiEvent("setMessagesData", (data) => {
    setMessages(data)
  })

  useNuiEvent("addLastCall", (data) => {
    setLastCalls([...lastCalls, data])
  })

  useNuiEvent("sendMessage", (data) => {
    console.log(data)

    let index = messages.findIndex(x => x.contactNumber == data.number)
    if (index === -1) {
      messages.push({
        contactNumber: data.number,
        messages: []
      })
      index = messages.length - 1
    }
    let g = messages[index]
    g.messages.push(data.data)
    setMessages([...messages.slice(0, index), g, ...messages.slice(index + 1)])

  })

  let testData = false

  useEffect(() => { testData = fullOpen }, [fullOpen]);

  useNuiEvent("sendNotification", (data) => {
    let icon: JSX.Element = <AiOutlineUser />;
    if (data.name == "yellowpage") { icon = <AiOutlineTags /> }
    if (data.name == "message") { icon = <RiMessage2Fill /> }
    if (data.name == "twitter") { icon = <AiOutlineTwitter /> }
    if (data.name == "bank") { icon = <FaMoneyCheck /> }
    if (data.name == "camera") { icon = <AiFillCamera /> }

    const id = getRandomNumber()
    setNotifs([...notif, {
      color: data.color,
      date: new Date(),
      id: id,
      icon: icon,
      message: data.message,
      name: data.label,
      display: true
    }])

    setAnim(true)
    setFullOpen(true)

    setTimeout(() => {
      setAnim(false)
      disableNotification()
      displayNotification(setNotifs, id, notif)
    }, 5000)
  })

  const disableNotification = () => {
    if (testData == false) return console.log("naber")
    setFullOpen(false)
    setAnim(false)
  }

  useNuiEvent("setBills", (data) => {
    setBills(data)
  })

  useEffect(() => {
    // Only attach listener when we are visible
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (["Escape"].includes(e.code)) {
        fetchNui('hideFrame')
      }
    }

    window.addEventListener("keydown", keyHandler)

    return () => window.removeEventListener("keydown", keyHandler)
  }, [visible])

  const getContactName = () => {
    if (inCall) {
      const data = contacts.find(x => x.phoneNumber == parseInt(inCall.number))
      return data ? data.name : inCall.number
    }
    return "Bilinmeyen Numara";
  }

  const transition = useTransition(fullOpen, {
    from: { y: 700, opacity: 0 },
    enter: { y: onAnim ? 500 : 0, opacity: 1 },
    leave: { y: 700, opacity: 0 },
  })




  return (
    <BrowserRouter>
      {transition((style, item) =>
        item ? <animated.div style={style} className="container font-roboto" >
          <img src={phoneBorder} className="phone-frame" />
          <div className="phone-container phone-background">
            <Header footerColor={footerColor} />
            <div className='absolute w-full p-3 pt-6 top-0 flex flex-col-reverse gap-1 justify-center z-40'>
              {inCall ? <CallNotification name={getContactName()} type={inCall.type} bool={inCall.isAnswerd} /> : ""}
              {notif.map((x) => x.display == true ? <Notification name={x.name} color={x.color} icon={x.icon} message={x.message} display={x.display} /> : "")}
            </div>
            <Switch>
              {getRouteResults().filter(result => result.route.component !== null).map((result, id) => (<Route key={id} exact path={result.path} component={() => initializeProps(result.route)} />))}
              <Home phoneData={phoneData} setPhoneData={setPhoneData} />
            </Switch>
            <Footer setFooterColor={setFooterColor} />
          </div>
        </animated.div> : ""
      )}
    </BrowserRouter>
  );
}


function Footer({
  setFooterColor,
}: {
  setFooterColor: React.Dispatch<React.SetStateAction<string>>,
}) {
  const history = useHistory();
  return (
    <div className='absolute bottom-0 w-full text-white bg-opacity-50 p-2 pb-4 flex flex-row justify-center items-center gap-4 text-lg'>
      <div className='w-20 h-1.5 rounded-full bg-black cursor-pointer' onClick={() => { history.push(REDIRECT_PATH.home); setFooterColor("") }}></div>
    </div>
  )
}

export default App;
