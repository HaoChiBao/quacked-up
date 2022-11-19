import React, {Component, useState, useRef}  from 'react';
// import { ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";
import {addDoc, collection} from "firebase/firestore";
import {db} from '../firebase/FirebaseConfig.js'
import {Link} from 'react-router-dom';

// function createUID(users, name, pfp){
//     let len = Object.keys(users).length

//     return 
// }


var lobbyId;

function LandingPage() {

    const gamesCollectionRef = collection(db, "rooms");
    const [roomCode, setRoomCode] = useState("");


    const createGameRoom = async () => {
        const docRef = await addDoc(gamesCollectionRef, {
            users: {
            },
            games: {
                currentGame: "DDG",
                DDG: {
                    goose: '0',
                    promptDuck: '1',
                    promptGoose: '2',
                    
                },
            }
        })
        lobbyId = docRef.id
        console.log(lobbyId)
    }
    
    const joinRoom = async (id) => {
        lobbyId = id
        console.log(lobbyId)
    }

    return (
        <div id ="boo">
            <Link to = '/userinfo'>
                <button onClick={createGameRoom}>create</button>
            </Link>
            
            <form value={roomCode} onChange={e=>setRoomCode(e.target.value)}>
                <input></input>
            </form>
            {/* <button onClick={() => joinRoom(roomCode)}>join</button> */}
            <Link to = "/userinfo">
                <button onClick={() => joinRoom(roomCode)}>join</button>
            </Link>
            <div>Hi</div>
        </div>
    );
}

export {LandingPage, lobbyId};