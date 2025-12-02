from django.db import models
from django.contrib.auth.models import User
class DangerZone(models.Model):
    DANGER_TYPES = [
        ('accident', 'Accident'),
        ('agression', 'Agression'),
        ('route', 'Route non éclairée'),
        ('autre', 'Autre'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    danger_type = models.CharField(max_length=50, choices=DANGER_TYPES)
    latitude = models.FloatField()
    longitude = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    # 👉 Nouveau champ :
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='danger_zones')

    def __str__(self):
        return f"{self.title} ({self.danger_type})"
class Report(models.Model):
    SEVERITY_LEVELS = [
        (1, 'Faible'),
        (2, 'Modérée'),
        (3, 'Grave'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    danger_zone = models.ForeignKey(DangerZone, on_delete=models.CASCADE, related_name='reports')
    comment = models.TextField(blank=True)
    severity = models.IntegerField(choices=SEVERITY_LEVELS, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report by {self.user.username} on {self.danger_zone.title}"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    country = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=30, blank=True)
    
    def __str__(self):
        return f"Profil de {self.user.username}"
