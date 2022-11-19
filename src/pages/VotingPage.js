import {db} from '../firebase/FirebaseConfig.js'
import {useState, useEffect} from 'react'
import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import { useHistory } from "react-router-dom";
// import {lobbyId} from "./Landing.js"

localStorage.setItem("status", JSON.stringify(false))

function VotingPage() {

    const lobbyID = JSON.parse(localStorage.getItem("lobbyID"))
    const [fields, setFields] = useState([]);
    const gamesCollectionRef = collection(db, "rooms");
    const lobbyRoomNumber = JSON.parse(localStorage.getItem("userInformation")).lobbyRoomNumber
    // const lobbyRoomNumber = localStorage.getItem("userInformation")
    const history = useHistory();
    // let vote = fields[lobbyRoomNumber].voting
    // let vote;

    useEffect(() => {
        const duration = 1000
        const getFields = async () => {
            const data = await getDocs(gamesCollectionRef)
            setFields(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        const setLoop = setInterval(() => {
            
            getFields()

        }, duration)

    return () => clearInterval(setLoop)
    }, []);
    

    const checkChange = () =>{
        if(fields[lobbyRoomNumber] != undefined){
            const userLength = Object.keys(fields[lobbyRoomNumber].users).length
            const vote = fields[lobbyRoomNumber].voting
            const status = JSON.parse(localStorage.getItem("status"))

            // console.log(vote.totalVotes, userLength)
            if (vote.totalVotes >= userLength){
                // if(vote)

                vote['DDG'] = 0
                vote['DIG'] = 0
                vote['QAT'] = 0
                vote['totalVotes'] = 0

                history.push("/ddg")
            }
            // console.log(fields[lobbyRoomNumber].users)

        }
    }

    checkChange()

    const docRef = doc(db, 'rooms', lobbyID);

    const increment = async (gameName) => {

        const status = JSON.parse(localStorage.getItem("status"))

        if(!status && fields[lobbyRoomNumber] != undefined){
            localStorage.setItem('status', JSON.stringify(true))
            // console.log(vote)
            
            // if(fields[lobbyRoomNumber] != undefined){
            const userLength = Object.keys(fields[lobbyRoomNumber].users).length
            const vote = fields[lobbyRoomNumber].voting
            
            vote[gameName]++
            vote.totalVotes ++ 
    
            // const userLength = Object.keys(fields[lobbyRoomNumber].users).length
            // if (vote.totalVotes >= userLength){
            //     vote['DDG'] = 0
            //     vote['DIG'] = 0
            //     vote['QAT'] = 0
            //     vote['totalVotes'] = 0
            //     history.push("/ddg")
            // }
    
            await updateDoc(docRef, {
                voting: vote
            })
    
            console.log(vote)
        } else {
            console.log(-1)
            
        }

    }


    // const interval
    
    // const incrementDDG = () => {
    //     console.log('voted for ddg')
    // }

    // const incrementDIG = () => {
    //     console.log('voted for dig')
    // }

    // const incrementQAT = () => {
    //     console.log('voted for qat')
    // }


    

    return (
        <div>
            <button onClick={() => {increment('DDG')}}>ddg</button>
            <button onClick={() => {increment('DIG')}}>dig</button>
            <button onClick={() => {increment('QAT')}}>qat</button>
        </div>
    )
}

export default VotingPage;