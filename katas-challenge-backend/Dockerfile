# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copiamos los requerimientos primero para aprovechar la caché de capas de Docker
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el resto del código
COPY . .

EXPOSE 8000

# Comando por defecto para correr FastAPI
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]