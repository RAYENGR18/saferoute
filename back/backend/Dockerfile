FROM python:3.11-slim

WORKDIR /app

# Installer dépendances
COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install "psycopg[pool]
# Copier TOUT le projet (pour avoir manage.py)
COPY . /app/

# Exposer le port Django
EXPOSE 8000

# Commande de lancement
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
