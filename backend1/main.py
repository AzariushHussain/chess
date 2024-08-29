# #!/usr/bin/env python
# import asyncio
# from websockets.sync.client import connect
# import json

# def hello():
#     with connect("ws://localhost:8765") as websocket:
#         websocket.send(json.dumps({
#             "message": "Hello world!",
#             "type": "init_game"
#         }))
#         message = websocket.recv()
#         print(f"Received: {message}")

# hello()

# import chess

# board = chess.Board()
# print(f"board:\n{board}")


# print(f"leagal moves: {board.legal_moves}")
# move = board.push_san("g1f3")
# print(f"moves:\n{len(board.move_stack)}")


