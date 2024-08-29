import {Color, PieceSymbol, Square, SQUARES} from "chess.js";
import React, { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({chess, board, socket, setBoard, moves, setMoves}: {
        moves: any
        setMoves: any
        chess: any
        setBoard: any;
        board: ({
            square: Square;
            type: PieceSymbol;
            color: Color;
        } | null)[][];
        socket: WebSocket
}) => {
    type SquareState = {
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null;

    const [from, setFrom] = useState<null | Square>(null)
    const [fromSquare, setFromSquare] = useState<SquareState>(null);

    return <div className="text-white-200"> 
        {
            board.map((row, i) => {
                return <div key={i} className="flex">
                    {
                        row.map((square, j) => {
                            const squareRepresentaion = String.fromCharCode(97 + (j %8))+ ""+(8-i) as Square
                            return <div onClick={() => {
                                if (!from){
                                    setFrom(squareRepresentaion)
                                    setFromSquare(square)
                                    console.log(`From value : ${JSON.stringify(square)}`)
                                    
                                }
                                else{
                                    socket.send(JSON.stringify({
                                        type: MOVE,
                                        move: `${from}`+`${squareRepresentaion}`

                                    }))
                                    
                                    chess.move({
                                        from,
                                        to: squareRepresentaion
                                    })
                                    
                                    setBoard(chess.board())
                                    setMoves([...moves, { Piece: fromSquare?.type, color: fromSquare?.color, From:from , To: squareRepresentaion }])
                                    console.log(`moves array from board page ${moves}`)
                                    setFrom(null)
                                }
                            }} key={j} className={`w-16 h-16 ${(i+j)%2 === 0 ? 'bg-green-500' : 'bg-white'}`}>
                                <div className="w-full justify-center flex h-full">
                                    <div className="h-full justify-center flex flex-col">
                                        {square ? <img className="w-8" src={`/${square?.color === "b" ? square.type: `${square?.type?.toUpperCase()} copy`}.png`} />: null}
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            })
        }
    </div>
}