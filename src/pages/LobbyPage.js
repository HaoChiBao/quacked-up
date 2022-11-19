import {useEffect, useState} from 'react'

import { async } from "@firebase/util";
import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {Link} from 'react-router-dom';
import {db} from '../firebase/FirebaseConfig.js'
import {lobbyId} from "./Landing.js"
import { lobbyRoomNumber } from './UserInfo.js';


function LobbyPage() {

    // const MINUTE_MS = 1000;
    const MINUTE_MS = 1000;
    const [fields, setFields] = useState([]);
    const gamesCollectionRef = collection(db, "rooms");

    useEffect(() => {
    const interval = setInterval(() => {
        console.log('Logs every minute');

        const getFields = async () => {
            const data = await getDocs(gamesCollectionRef);
            setFields(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getFields()

    }, MINUTE_MS);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [])
if(typeof fields[lobbyRoomNumber] !== 'undefined') {
        console.log(lobbyRoomNumber)
        const userIndex = Object.keys(fields[lobbyRoomNumber].users)
        const sortedUser = []
        for(let i = 0;i < userIndex.length;i++){
            sortedUser[fields[lobbyRoomNumber].users[userIndex[i]].index] = fields[lobbyRoomNumber].users[userIndex[i]].name
        }
        return (
            <div>
               {sortedUser.map((user) => {
                    // {const username = fields[lobbyRoomNumber].users[user].name;
                    return (
                        <div>
                            {user}
                        </div>
                    );
            //    }
            })}
            </div>
        )
    } else {
        return (
            <div>not defined yet : u</div>
        )
    }
}


export default LobbyPage;