import { useEffect, useState } from "react"
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { Chess } from 'chess.js'



export const INIT_GAME = "init_game"
export const MOVE = "move"
export const GAME_OVER = "game_over"

export const Game = () => {

    const socket = useSocket()
    const [chess, setChess] = useState(new Chess())
    const [board, setBoard] = useState(chess.board())
    const [started, setStarted] = useState(false)
    const [buttonname, setButtonName] = useState("Play")
    const [isDisabled, setIsDisabled] = useState(false);
    const [moves, setMoves] = useState([]);


    useEffect(() => {
        if (!socket){
            return
        }
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            console.log(message)
            switch (message.type){
                case INIT_GAME:
                    setBoard(chess.board())
                    console.log("Game initialized")
                    setStarted(true)
                    break
                case MOVE:
                    const move = message.payload
                    chess.move(move)
                    setBoard(chess.board())
                    setMoves([...moves, { Piece: chess.get(move.slice(2,4)).type, color: chess.get(move.slice(2,4)).color, From:move.slice(0,2) , To: move.slice(2,4) }])
                    console.log(`Moves array after receiving message: ${moves}`)
                    break
                case GAME_OVER:
                    console.log("Game over")
                    break
            }
        }

    }, [socket])

    if (!socket) return <div>Connecting...</div>

    return <div className="justify-centre flex">
        <div className="pt-8 w-screen">
            <div className="grid grid-cols-6 gap-4">
                <div className="col-span-4 w-full flex justify-center">
                    <ChessBoard chess={chess} setBoard = {setBoard}  board = {board} socket = {socket} moves = {moves}  setMoves = {setMoves}/>
                </div>
                <div className="col-span-2 bg-slate-900 flex justify-center">
                    <div className="h-16 mt-8 w-500px  text-2xl bg-green-500
    hover:bg-green-700 text-white
    font-bold rounded flex justify-center">
                        {!started && <button className="w-40" onClick={()=>{
                            socket.send(JSON.stringify({
                                type: INIT_GAME
                            }))
                            setButtonName('Waiting...');
                            setIsDisabled(true);
                        }} disabled={isDisabled}>
                            {buttonname}
                        </button>}
                    </div>
                    {started && <div className="bg-slate-800 max-h-96  w-60 rounded">
                        <table className="table-auto border border-black border-collapse">
                            <thead>
                                <tr>
                                    <th className="border border-black w-screen text-white">Piece</th>
                                    <th className="border border-black w-screen text-white">From</th>
                                    <th className="border border-black w-screen text-white">To</th>
                                </tr>
                            </thead>
                                <tbody className="max-h-64 overflow-y-scroll scrollbar-hide">
                                {moves.map((move, index) => (
                                    <tr key={index}>
                                        <td className="border border-black  flex justify-center"> <img 
                                            src={`/${move.color === "b" ? move.Piece: `${move.Piece?.toUpperCase()} copy`}.png`}
                                        /></td>
                                        <td className="border border-black w-screen text-white">{move.From}</td>
                                        <td className="border border-black w-screen text-white">{move.To}</td>
                                    </tr>
                                ))}
                                </tbody>
                        </table>
                        </div>}
                </div>
            </div>
        </div>
    </div>
}