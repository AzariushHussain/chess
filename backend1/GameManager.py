from simple_websocket_server import WebSocket

from Game import Game
from typing import List, Optional


class GameManager:
    __games: List[Game] = [] 
    __pendinguser: Optional[WebSocket] = None
    __users = []

    @property
    def games(self):
        print("inside games getter function")
        return self.__games
    
    @games.setter
    def games(self, value):
        if isinstance(value, Game):
            self.__games.append(value)
            print(f"received game: {value}\ngames: {self.__games}")

        else:
            raise ValueError("value must be a Game object")

    @property
    def pendinguser(self) -> Optional[WebSocket]:
        return self.__pendinguser
    
    @pendinguser.setter
    def pendinguser(self, value):
        print(f"updating value of pendinguser to :{value}")
        if isinstance(value, Optional[WebSocket]):
            self.__pendinguser = value
            print(f"added user 1 as pending user: {self.__pendinguser}")
        else:
            print(f"[ERROR] user sent if of type {type(value)}")
            raise ValueError("pendinguser must be a websocket object")
    


    def __init__(self):
        self.game = []

    def adduser(self, socket: WebSocket):
        self.__users.append(socket)


    def removeUser(self, socket: WebSocket):
        self.__users.remove(socket)

    
    def __handleMessage():
        pass


