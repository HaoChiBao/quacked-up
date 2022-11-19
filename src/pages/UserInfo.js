import { async } from "@firebase/util";
import {addDoc, collection, doc, getDocs} from "firebase/firestore";
import {Link} from 'react-router-dom';
import {db} from '../firebase/FirebaseConfig.js'
import {lobbyId} from "./Landing.js"
import {useState, useEffect} from 'react'

function UserInfo() {
    var selectedDuck = getRandomInt(4);
    const [fields, setFields] = useState([]);
    const gamesCollectionRef = collection(db, "rooms");
    // const gamesCollectionRef = doc(db, "rooms", lobbyId);
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const addUser  = async () => {
        console.log(gamesCollectionRef)
        // const sfRef = db.collection('cities').doc('SF');
        // const collections = await sfRef.listCollections();
        // collections.forEach(collection => {
        //   console.log('Found subcollection with id:', collection.id);
        // });

        // let test = await getDocs(gamesCollectionRef.doc(lobbyId))
        // console.log(test)
        

    }

    useEffect(() => {
        const getFields = async () => {
            const data = await getDocs(gamesCollectionRef);
            setFields(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getFields();
        console.log(fields)
    }, []);

    const selectProfilePicture = (selected) => {
        selectedDuck = selected;
    }

    return (
        <div>
            {/* <form> */}
                <button onClick={() => {selectProfilePicture(0)}}>0</button>
                <button onClick={() => {selectProfilePicture(1)}}>1</button>
                <button onClick={() => {selectProfilePicture(2)}}>2</button>
                <button onClick={() => {selectProfilePicture(3)}}>3</button>
                <input placeholder="name"></input>
                {/* <Link to = "/TBD"> */}
                <button onClick={addUser}>submit</button>
                {/* </Link>     */}
            {/* </form> */}
        </div>
    )
}

export default UserInfo;