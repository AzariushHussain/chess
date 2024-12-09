from simple_websocket_server import WebSocketServer, WebSocket
from Game import Game
from GameManager import GameManager
import json
from constants import Constants

gameManager = GameManager()

class WebsocketFunction(WebSocket):
    def handle(self):
        # echo message back to client
        message = json.loads(self.data)
        print(f"message recieved: {message}")
        if message['type'] == Constants.INIT_GAME:
            if gameManager.pendinguser:
                #start the game
                game = Game(gameManager.pendinguser, self)
                gameManager.games = game
                gameManager.pendinguser = None
            else:
                gameManager.pendinguser = self
        if message['type'] == Constants.MOVE:
            valid_game = [game for game in gameManager.games if game.player1 == self or game.player2 == self]
            valid_game = valid_game[0]
            print(f"valid game found: {valid_game}")
            if isinstance(valid_game, Game):
                valid_game.makeMove(self, message['move'])
            else:
                print("valid_game is not an instance of Game")
        self.send_message(f"message received")

    def connected(self):
        gameManager.adduser(WebSocket)
        print(self.address, 'connected')

    def handle_close(self):
        gameManager.removeUser(WebSocket)
        print(self.address, 'closed')


server = WebSocketServer('', 8765, WebsocketFunction)
host, port = server.serversocket.getsockname()
print(f"Server is running on {host}:{port}")
server.serve_forever()