import requests

def obtener_detalles_web(url):
    """Obtiene y muestra detalles de una URL."""
    try:
        # Realiza una petición GET al URL
        respuesta = requests.get(url, timeout=5)
        
        print(f"\n--- Detalles para: {url} ---")
        
        # Muestra el código de estado
        print(f"Código de estado: {respuesta.status_code} ({respuesta.reason})")
        
        # Muestra los encabezados de la respuesta
        print("\nEncabezados de la respuesta:")
        for clave, valor in respuesta.headers.items():
            print(f"  {clave}: {valor}")
            
        # Muestra el contenido de la respuesta
        print("\nContenido de la página (primeros 200 caracteres):")
        # El .text convierte la respuesta a una cadena, útil para HTML
        contenido = respuesta.text
        if len(contenido) > 200:
            print(contenido[:200] + "...")
        else:
            print(contenido)

    except requests.exceptions.RequestException as e:
        print(f"Error al conectar con {url}: {e}")

# Escanea los puertos 8081 y 8085
urls_a_escanear = [
    "http://vor.dgac.gob.bo:8081",
    "http://vor.dgac.gob.bo:8085"
]

for url in urls_a_escanear:
    obtener_detalles_web(url)
