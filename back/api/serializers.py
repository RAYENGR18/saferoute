from rest_framework import serializers
from .models import DangerZone, Report
from django.contrib.auth.models import User
class DangerZoneSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = DangerZone
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    danger_zone_title = serializers.CharField(source='danger_zone.title', read_only=True)

    class Meta:
        model = Report
        fields = ['id', 'user', 'danger_zone', 'danger_zone_title', 'comment', 'severity', 'created_at']
