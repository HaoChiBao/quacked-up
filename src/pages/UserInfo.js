import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {Link} from 'react-router-dom';
import {db} from '../firebase/FirebaseConfig.js'
import {lobbyId} from "./Landing.js"
import {useState, useEffect} from 'react'
import '../css/userinfo.css'
import James from '../assets/James.png'
import Judy from '../assets/Judy.png'
import Stephen from '../assets/Stephen.png'
import Sarina from '../assets/Sarina.png'

var currentGameInformation;
// var userID;
var userArray = {};

function UserInfo() {
    const imageList = [James, Judy, Stephen, Sarina]
    const [userName, setUserName] = useState("")
    let selectedDuck = getRandomInt(4);
    userArray = {
        name: userName,
        pfp: selectedDuck,
        index: 0,
        lobbyRoomNumber: 0
    };
    const [fields, setFields] = useState([]);
    const gamesCollectionRef = collection(db, "rooms");
    // const gamesCollectionRef = doc(db, "rooms", lobbyId);
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const addUser = async () => {

        const docRef = doc(db, 'rooms', lobbyId);

        const len = Object.keys(currentGameInformation.users).length
        userArray.index = len
        currentGameInformation.users[`user${len}`] = userArray
        // userID = `user${len}`
        localStorage.setItem('userInformation', JSON.stringify(userArray))

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
        localStorage.setItem('selectedDuck', selected)
    }
    
    for(let i = 0; i < fields.length; i++){
        if (fields[i].id == lobbyId) {
            currentGameInformation = fields[i]
            userArray.lobbyRoomNumber =  i
        }
    }

    return (
        <div className="left-align">
            <div className="display-container">
                <div className="header-wrapper">
                    <div className="header-container">
                        <div className="title-text">
                            <div className="enter-quackid">Enter QuackID</div>
                            <form value={userName} onChange={e=>setUserName(e.target.value)}>
                                <input className='input2-code' placeholder='your name'></input>
                            </form>
                        </div>
                    </div>
                        <div>image</div>
                </div>
                <div className="body-container">
                    
                    
                    <div className="pick-duck">Pick your Debug Duck</div>
                    <div className="duck-button">
                        <button onClick={() => {selectProfilePicture(0)}}> <img src={James} /></button>
                        <button onClick={() => {selectProfilePicture(1)}}><img src={Sarina} /></button>
                        <button onClick={() => {selectProfilePicture(2)}}><img src={Stephen} /></button>
                        <button onClick={() => {selectProfilePicture(3)}}><img src={Judy} /></button>
                    </div>
                </div>
                    <Link to = '/lobby'>
                        <button className="join-ducks" onClick={(addUser)}>Join</button>
                    </Link>
            </div>
            
        </div>

    )

}

export {UserInfo};