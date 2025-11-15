import os
import sys
import django
import json

sys.path.append(os.path.dirname(os.path.dirname(__file__)))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from api.models import DangerZone
from django.contrib.auth.models import User

# Charger l’utilisateur admin
user = User.objects.filter(username="admin").first()
if not user:
    print("❌ Aucun utilisateur 'admin' trouvé. Crée-le d'abord avec createsuperuser.")
    exit()

# Charger le fichier JSON
file_path = os.path.join(os.path.dirname(__file__), "../data/safe_route_data.json")
with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

for zone in data["danger_zones"]:
    DangerZone.objects.create(
        title=zone["title"],
        description=zone["description"],
        danger_type=zone["danger_type"],
        latitude=zone["latitude"],
        longitude=zone["longitude"],
        created_by=user
    )
    print(f"✔ Zone ajoutée : {zone['title']}")

print("✅ Importation terminée avec succès !")
