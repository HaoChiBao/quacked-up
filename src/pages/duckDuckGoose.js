import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {Link} from 'react-router-dom';
import {db} from '../firebase/FirebaseConfig.js'
import {lobbyId} from "./Landing.js"
import { userID } from "./UserInfo.js";
import {useState, useEffect} from 'react'

const PROMPTS = ["prompt0", "prompt1", "prompt2"]

function DDG(){
    const [answer, setPrompt] = useState([])

    const sayhibrah = () => {
        console.log(userID)
    }

    let prompt = "Hi"
    return (
        <div>
            <form>
                <div>{prompt}</div>
                <input placeholder = "answer"></input>
            </form>
            <button onClick={sayhibrah}>heyy</button>
        </div>
    )
}

export default DDG