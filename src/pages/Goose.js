import '../css/goose.css'
import goose from '../assets/Goose.png';
import {useState, useEffect} from 'react'
import {db} from '../firebase/FirebaseConfig.js'
import {collection, doc, getDocs, updateDoc, setDoc} from "firebase/firestore";


function Goose() {
    const [fields, setFields] = useState([]);
    const gamesCollectionRef = collection(db, "rooms");
    const lobbyRoomNumber = JSON.parse(localStorage.getItem('userInformation')).lobbyRoomNumber
    const goosePrompt = ''
    useEffect(() => {
        const getFields = async () => {
            const data = await getDocs(gamesCollectionRef);
            setFields(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            await setGoosePrompt()
        };
        getFields()
        // generate the index of goose, push into database
    }, []);

    const setGoosePrompt = () =>{
        console.log(fields)
        goosePrompt = fields[lobbyRoomNumber].games.promptGoose
    }


    return (
        <div className='wrapper-container'>
            <div className='goose-display'>
                <div>you are the goose</div>
                <div className='goose-img-container'>
                    <img src={goose} alt=''></img>
                </div>
                <div className='prompt-text'>{goosePrompt}</div>
            </div>

        </div>

    )
}

export default Goose;