import {collection, doc, getDocs, updateDoc, setDoc} from "firebase/firestore";
import {Link} from 'react-router-dom';
import {db} from '../firebase/FirebaseConfig.js'
// import { userID } from "./UserInfo.js";
import {useState, useEffect} from 'react'
// import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import { useHistory } from "react-router-dom";


const PROMPTS = ["prompt0", "prompt1", "prompt2", "prompt3"]
let userInfo = JSON.parse(localStorage.getItem('userInformation'))

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function DDG(){
    const [answer, setPrompt] = useState([])
    const [fields, setFields] = useState([]);
    const gamesCollectionRef = collection(db, "rooms");
    const lobbyID = JSON.parse(localStorage.getItem('lobbyID'))
    const docRef= doc(db, "rooms", lobbyID)
    const lobbyRoomNumber = JSON.parse(localStorage.getItem('userInformation')).lobbyRoomNumber
    
    
    let gooseIndex;
    const duck = PROMPTS[getRandomInt(PROMPTS.length)]
    let goose = PROMPTS[getRandomInt(PROMPTS.length)]
    while (duck == goose) {
        goose = PROMPTS[getRandomInt(PROMPTS.length)]
    }
    
    
    const history = useHistory()

    const userIDIndex = userInfo.index

    const minutes_ms = 1000
    useEffect(() => {
        const interval = setInterval(() => {
            const getFields = async () => {
                const data = await getDocs(gamesCollectionRef);
                setFields(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            };
            getFields()
        }, minutes_ms)
        // generate the index of goose, push into database
    }, []);

    
    if(typeof fields[lobbyRoomNumber] !== 'undefined') {
        const numOfPlayers = Object.keys(fields[lobbyRoomNumber].users).length
        gooseIndex = getRandomInt(numOfPlayers)
        

        const pushGooseIndex = async () => {
            
            await updateDoc(docRef, {
                games: {
                    gooseIndex: gooseIndex,
                    promptDuck: duck,
                    promptGoose: goose,
                }
            })
    
        }
    
        console.log('goose')
        if(userIDIndex == 0){
            pushGooseIndex()
        }
        
        // console.log(userIDIndex)
        // pushGooseIndex()

    }


    
    return (
        <div>
            <form>
                <div>{prompt}</div>
                <input placeholder = "answer"></input>
            </form>
            <button onClick={console.log(1)}>heyy</button>
        </div>
    )
}

export default DDG