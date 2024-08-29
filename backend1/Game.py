from simple_websocket_server import WebSocket
from typing import List
from datetime import datetime
import chess
from constants import Constants
import json

class Game:
    __player1: WebSocket
    __player2: WebSocket
    __board: chess.Board
    # __moves: List[str]
    # __startTime: datetime


    def __init__(self, player1: WebSocket, player2: WebSocket):
        print(f"initializing game\nplayer1: {player1}\nplayer2: {player2}")
        self.__player1 = player1
        self.__player2 = player2
        self.__board = chess.Board()
        # self.__moves = []
        # self.__startTime = datetime()
        try:
            self.__player1.send_message(json.dumps({
                "type": Constants.INIT_GAME,
                "payload": {
                    "color": "white"
                }
            }))
        except Exception as e:
            print(f"Error sending message to player1: {e}")

        try:
            self.__player2.send_message(json.dumps({
                "type": Constants.INIT_GAME,
                "payload": {
                    "color": "black"
                }
            }))
        except Exception as e:
            print(f"Error sending message to player2: {e}")

    # P1 and P2 getters
    @property
    def player1(self):
        return self.__player1
    
    @property
    def player2(self):
        return self.__player2
    
    
    def makeMove(self, socket: WebSocket, move: str):
        # format of move (g1f3)
        # vlidation here
        # check if this is the active user's move
        # check if the move is valid
        print(f"socket: {socket}\nmove stack: {self.__board.move_stack}")
        print(f"inside make move function , move: {move}")
        if len(self.__board.move_stack) % 2 == 0 and socket != self.__player1 :
            print("inside if to return when not player 1")
            return
        if len(self.__board.move_stack) % 2 == 1 and socket != self.__player2 :
            print("inside if to return when not player 2")
            return
        try:
            print(f"pushing move in the move stack {self.__board.push_san(move) }")
        except Exception as e:
            print(e)
            return
        print("move pushed")
        # if self.__board.is_game_over(self):
        #     self.__player1.send_message(json.dumps({
        #         "type": Constants.GAME_OVER,
        #         "payload": {
        #             "winner": "black" if self.__board.turn == "w" else "white"
        #         }
        #     }))
        #     self.__player2.send_message(json.dumps({
        #         "type": Constants.GAME_OVER,
        #         "payload": {
        #             "winner": "black" if self.__board.turn == "w" else "white"
        #         }
        #     }))
        
        if len(self.__board.move_stack) % 2 != 0:
            self.__player2.send_message(json.dumps({
                "type": Constants.MOVE,
                "payload" : move
            }))
        else:
            self.__player1.send_message(json.dumps({
                "type": Constants.MOVE,
                "payload": move
            }))
        

