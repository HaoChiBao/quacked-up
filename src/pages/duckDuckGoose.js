import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {Link} from 'react-router-dom';
import {db} from '../firebase/FirebaseConfig.js'
import {lobbyId} from "./Landing.js"
// import { userID } from "./UserInfo.js";
import {useState, useEffect} from 'react'

const PROMPTS = ["prompt0", "prompt1", "prompt2", "prompt3"]
let userInfo = JSON.parse(localStorage.getItem('userInformation'))

function DDG(){
    const [answer, setPrompt] = useState([])
    const [fields, setFields] = useState([]);
    const gamesCollectionRef = collection(db, "rooms");

    useEffect(() => {
        const getFields = async () => {
            const data = await getDocs(gamesCollectionRef);
            setFields(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getFields()
        // await getFields();
    }, []);

    const sayhibrah = () => {
        console.log(userInfo['name'])

    }

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