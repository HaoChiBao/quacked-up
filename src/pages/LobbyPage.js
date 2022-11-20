import {useEffect, useState} from 'react'

import { async } from "@firebase/util";
import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {Link} from 'react-router-dom';
import {db} from '../firebase/FirebaseConfig.js'
import {lobbyId} from "./Landing.js"
import '../css/lobby.css'

import James from '../assets/James.png'
import Judy from '../assets/Judy.png'
import Stephen from '../assets/Stephen.png'
import Sarina from '../assets/Sarina.png'


function LobbyPage() {
    const lobbyRoomNumber = JSON.parse(localStorage.getItem("userInformation")).lobbyRoomNumber
    // const MINUTE_MS = 1000;
    const MINUTE_MS = 1000;
    const [fields, setFields] = useState([]);
    const gamesCollectionRef = collection(db, "rooms");

    const imageList = [James, Judy, Stephen, Sarina]

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
console.log(JSON.parse(localStorage.getItem("userInformation")))

const playerImage = (index) => {
    const image = document.getElementById(`profile-image${index}`)
    if(image != null){
        image.src = imageList[index]
    }
}

if(typeof fields[lobbyRoomNumber] !== 'undefined') {
        // console.log(localStorage.getItem("lobbyRoomNumber"))
        const userIndex = Object.keys(fields[lobbyRoomNumber].users)
        const sortedUser = []
        const userIDs = []
        const userPFP = []

        for(let i = 0;i < userIndex.length;i++){
            userIDs[fields[lobbyRoomNumber].users[userIndex[i]].index] = fields[lobbyRoomNumber].users[userIndex[i]].index
            userPFP[fields[lobbyRoomNumber].users[userIndex[i]].index] = fields[lobbyRoomNumber].users[userIndex[i]].pfp
            sortedUser[fields[lobbyRoomNumber].users[userIndex[i]].index] = fields[lobbyRoomNumber].users[userIndex[i]].name
        }
        return (
            <div className="lobby-container">
                <div className="player-heading"> Players</div>
               {userIDs.map((index) => {
                    // {const username = fields[lobbyRoomNumber].users[user].name;
                    const profileString = `profile-image${index}`
                    return (
                        <div className="img-bs">
                            <div>
                                <img id = {profileString} onLoad={playerImage(userPFP[index])} src="" alt="cum"></img>
                            </div>
                            <div className="player-name">
                            {sortedUser[index]}
                            </div>
                        </div>
                    );
            //    }
            })}
                        <Link to = '/Voting'>
                        <div><button className='lobby-button'>start</button></div>
                        </Link>

            </div>
        )
    } else {
        return (
            <div className="load-play">

            <span class="loader"></span>
            </div>
        )
    }
}


export default LobbyPage;