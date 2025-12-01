# server.py
import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Sirviendo en el puerto {PORT}")
    print(f"Abre http://localhost:{PORT}")
    httpd.serve_forever()

# Para ejecutar: Abre tu terminal en la carpeta del proyecto y ejecuta: python server.py