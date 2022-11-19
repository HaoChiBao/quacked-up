import React, {Component, useState, useRef}  from 'react';
// import { ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";
import {addDoc, collection} from "firebase/firestore";
import {db} from '../firebase/FirebaseConfig.js'
import {Link} from 'react-router-dom';
import '../css/landing.css'

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
                currentGame: "",
                // DDG: {
                //     goose: '0',
                //     promptDuck: '1',
                //     promptGoose: '2',
                    
                // },
            },
            voting: {
                totalVotes: 0,
                DDG: 0,
                DIG: 0, 
                QAT: 0
            }
        })
        lobbyId = docRef.id
        localStorage.setItem('lobbyID', JSON.stringify(lobbyId))
        console.log(lobbyId)
    }
    
    const joinRoom = async (id) => {
        lobbyId = id
        localStorage.setItem('lobbyID', JSON.stringify(lobbyId))
        console.log(lobbyId)
    }

    return (
        <div className ="center">
            <div className='container'>

                <Link to = '/userinfo'>
                    <button onClick={createGameRoom} className='create-button'>create room</button>
                </Link>

                <div className='input-container'>
                    <form value={roomCode} onChange={e=>setRoomCode(e.target.value)} >
                        <input className='input-code' placeholder='enter code here'></input>
                    </form>

                </div>
                {/* <button onClick={() => joinRoom(roomCode)}>join</button> */}
                <Link to = "/userinfo">
                    <button onClick={() => joinRoom(roomCode)} className='join-button'>join</button>
                </Link>
                {/* <div>Hi</div> */}
                
            </div>
        </div>
    );
}

export {LandingPage, lobbyId};