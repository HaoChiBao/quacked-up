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
    // const [duckPfp, setDuckPfp] = useState(0)
    
    let selectedDuck = getRandomInt(4);
    userArray = {
        name: userName,
        pfp: selectedDuck,
        index: 0,
        lobbyRoomNumber: 0
    };
    const [fields, setFields] = useState([]);
    const gamesCollectionRef = collection(db, "rooms");
    const lobbyID = localStorage.getItem('lobbyID')
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
        console.log(userArray)
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
        const headImage = document.getElementById("selected-duck-container")
        headImage.src = imageList[selected]
        userArray.pfp = selected
        // selectedDuck = selected;
        // console.log(selected)
        
        // localStorage.setItem('selectedDuck', selected)
        // setDuckPfp(localStorage.setItem('selectedDuck', selected))
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
                    <div className="header1-container">
                        <div className="title-text">
                            <div className="enter-quackid">enter quackid</div>
                            <form value={userName} onChange={e=>setUserName(e.target.value)} className='form-container'>
                                <input className='input2-code' placeholder='your name'></input>
                            </form>
                            <div className="code-container">
                                <div className="room-code">your lobby code: {lobbyID}</div>

                            </div>
                        </div>
                    </div>
                        <div className="profile-wrapper">
                            <div className="profile-container">
                                <img id = "selected-duck-container"src={imageList[localStorage.getItem('selectedDuck')]} alt='' className="current-duck-image"></img>
                            </div>
                            <div className="duck-name">{userName}</div>
                        </div>
                </div>
                <div className="body-container">
                    
                    
                    <div className="pick-duck">pick your debug duck</div>
                    <div className="duck-button">
                        <div className="label-button">
                            <button id = "btn1" className = 'james' onClick={() => {selectProfilePicture(0)}}> <img src={James}  alt=''/></button>
                            <div>james</div>
                        </div>
                        {/* <label for="James">James</label> */}
                        <div className="label-button">
                            <button id = "btn2" className = 'judy' onClick={() => {selectProfilePicture(1)}}><img src={Judy} alt=''/></button>
                            <div>judy</div>
                        </div>
                        <div className="label-button">
                            <button id = "btn3" className = 'stephen'onClick={() => {selectProfilePicture(2)}}><img src={Stephen} alt=''/></button>
                            <div>stephen</div>
                        </div>
                        <div className="label-button">
                            <button id = "btn4" className = 'sarina' onClick={() => {selectProfilePicture(3)}}><img src={Sarina} alt = ''/></button>
                            <div>sarina</div>
                        </div>
                    
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