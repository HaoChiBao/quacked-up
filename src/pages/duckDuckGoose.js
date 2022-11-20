import {collection, doc, getDocs, updateDoc, setDoc} from "firebase/firestore";
import {Link} from 'react-router-dom';
import {db} from '../firebase/FirebaseConfig.js'
// import { userID } from "./UserInfo.js";
import {useState, useEffect} from 'react'
// import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { async } from "@firebase/util";


const PROMPTS = ["prompt0", "prompt1", "prompt2", "prompt3", "prompt4"]
const userInfo = JSON.parse(localStorage.getItem('userInformation'))
const gamesCollectionRef = collection(db, "rooms");
const lobbyID = JSON.parse(localStorage.getItem('lobbyID'))
const lobbyRoomNumber = JSON.parse(localStorage.getItem('userInformation')).lobbyRoomNumber
const docRef= doc(db, "rooms", lobbyID)

let beginGame = false

let instantiated = false

let gameData = {
    gooseIndex: "",
    promptDuck: "",
    promptGoose: "",
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function refreshData(fields){
    const users = fields[lobbyRoomNumber].users
    const usersLength = Object.keys(users).length

    const usersReady = Object.values(users).filter(user => user.gameReady == true).length

    if (usersReady == usersLength){
        beginGame = true
    }

}

function DDG(){
    const minutes_ms = 1000
    const [fields, setFields] = useState([]);
    useEffect(() => {
        const interval = setInterval(() => {
            const getFields = async () => {
                const data = await getDocs(gamesCollectionRef);
                setFields(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            };
            getFields()
        }, minutes_ms)
    }, []);
    

    if(typeof fields[lobbyRoomNumber] !== 'undefined'){
        refreshData(fields)
    }
    if(!instantiated){
        if(typeof fields[lobbyRoomNumber] !== 'undefined'){
            instantiated = true
            
            gameData = fields[lobbyRoomNumber].games
            console.log(gameData)

            const users = fields[lobbyRoomNumber].users
            const thisUser = userInfo.index
            console.log(thisUser)
            
            users[`user${thisUser}`].gameReady = true

            const readyUp = async ()=>{
                await updateDoc(docRef, {
                    users: users
                })
            }
            readyUp()

            const hostParse = async () =>{
                // console.log(userInfo)
                if(userInfo.index == 0){
                    const numOfPlayers = Object.keys(fields[lobbyRoomNumber].users).length
                    const duck = PROMPTS[getRandomInt(PROMPTS.length)]
                    let goose = PROMPTS[getRandomInt(PROMPTS.length)]
                    while (duck == goose) {
                        goose = PROMPTS[getRandomInt(PROMPTS.length)]
                    }
                    // console.log(duck, goose)
                    // console.log(lobbyID)
                    
                    await updateDoc(docRef, {
                        games: {
                            gooseIndex: getRandomInt(numOfPlayers),
                            promptDuck: duck,
                            promptGoose: goose,
                        }
                    })
                }
            }
            hostParse()
        }
    }
    
    if(beginGame){
        let title = ""
        if(userInfo.index == gameData.gooseIndex){
            title = "You are the Goose!"
        } else {
            title = "You are a Duck!"
        }
        return (
            <div>
                <h1>{title}</h1>
                <p>Here is your prompt</p>
                <div>{gameData.promptDuck}</div>
                <input type="text" placeholder="Enter your response here"></input>
            </div>
        )
    }

}

export default DDG