import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {Link} from 'react-router-dom';
import {db} from '../firebase/FirebaseConfig.js'
import {lobbyId} from "./Landing.js"
import {useState, useEffect} from 'react'

var currentGameInformation;
let lobbyRoomNumber = 0;

function UserInfo() {
    const [userName, setUserName] = useState("")
    let selectedDuck = getRandomInt(4);
    const userArray = {
        name: userName,
        pfp: selectedDuck
    };
    const [fields, setFields] = useState([]);
    const gamesCollectionRef = collection(db, "rooms");
    // const gamesCollectionRef = doc(db, "rooms", lobbyId);
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const addUser  = async () => {
        // write into the lobby id

        const docRef = doc(db, 'rooms', lobbyId);

        const len = Object.keys(currentGameInformation.users).length
        currentGameInformation.users[`user${len}`] = userArray

        await updateDoc(docRef, {
            users: currentGameInformation.users
        })
    }

    useEffect(() => {
        const getFields = async () => {
            const data = await getDocs(gamesCollectionRef);
            setFields(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getFields()
        // await getFields();
    }, []);

    const selectProfilePicture = (selected) => {
        selectedDuck = selected;
        console.log(selected)
    }
    
    for(let i = 0; i < fields.length; i++){
        if (fields[i].id == lobbyId) {
            currentGameInformation = fields[i]
            lobbyRoomNumber = i
        }
    }

    return (
        <div>
            {/* <form> */}
                <button onClick={() => {selectProfilePicture(0)}}>0</button>
                <button onClick={() => {selectProfilePicture(1)}}>1</button>
                <button onClick={() => {selectProfilePicture(2)}}>2</button>
                <button onClick={() => {selectProfilePicture(3)}}>3</button>
                <form value={userName} onChange={e=>setUserName(e.target.value)}>
                    <input></input>
                </form>
                <button onClick={addUser}>submit</button>

            {/* </form> */}
        </div>
    )
}

export {UserInfo, lobbyRoomNumber};