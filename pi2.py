import requests

from bs4 import BeautifulSoup
import re

def escanear_url_detallado(url):
    """Realiza una petición HTTP y analiza la respuesta."""
    try:
        # Petición GET con un tiempo de espera
        response = requests.get(url, timeout=10)
        
        # Analiza los encabezados
        print(f"\n--- Escaneando: {url} ---")
        print(f"Estado: {response.status_code} {response.reason}")
        print("\nEncabezados:")
        for header, value in response.headers.items():
            print(f"  {header}: {value}")
        
        # Analiza el contenido HTML para el título y metadatos
        if 'text/html' in response.headers.get('Content-Type', ''):
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Buscar el título de la página
            title = soup.title.string if soup.title else "No encontrado"
            print(f"\nTítulo de la página: {title}")
            
            # Buscar metadatos
            print("Metadatos:")
            description = soup.find('meta', attrs={'name': 'description'})
            keywords = soup.find('meta', attrs={'name': 'keywords'})
            
            if description:
                print(f"  Descripción: {description.get('content')}")
            if keywords:
                print(f"  Palabras clave: {keywords.get('content')}")
        
        # Muestra el contenido de la respuesta
        print("\nContenido (primeros 500 caracteres):")
        if len(response.text) > 500:
            print(response.text[:500] + "...")
        else:
            print(response.text)
            
    except requests.exceptions.RequestException as e:
        print(f"\nError al escanear {url}: {e}")

# URLs a escanear
urls_a_escanear = [
    "http://vor.dgac.gob.bo:8081",
    "http://vor.dgac.gob.bo:8085"
]

# Ejecutar el escaneo
for url in urls_a_escanear:
    escanear_url_detallado(url)
