import http.server
import socketserver
from search import chatbot_query

PORT = 8000
DIRECTORY = 'public'

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)


    def do_POST(self):
        print('self',self)
        status=self.send_response(200)
        print('status', status)
        content_length = int(self.headers['Content-Length'])
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "x-api-key,Content-Type")
        post_body = self.rfile.read(content_length)
        self.end_headers()
        print('user query', post_body)
        search_chatbot_reply = chatbot_query(post_body)
        self.wfile.write(str.encode(search_chatbot_reply))

with socketserver.TCPServer(('', PORT), Handler) as httpd:
    print('serving at port', PORT)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
