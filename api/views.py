from rest_framework import viewsets, permissions
from .models import DangerZone
from .serializers import DangerZoneSerializer
from .models import Report
from .serializers import ReportSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.utils.dateparse import parse_date
from .models import Profile


class DangerZoneViewSet(viewsets.ModelViewSet):
    queryset = DangerZone.objects.all().order_by('-created_at')
    serializer_class = DangerZoneSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = DangerZone.objects.all().order_by('-created_at')

        # --- Filtres dynamiques ---
        user = self.request.query_params.get('user')
        start_date = self.request.query_params.get('start')
        end_date = self.request.query_params.get('end')

        if user:
            queryset = queryset.filter(created_by__username=user)

        if start_date:
            queryset = queryset.filter(created_at__date__gte=parse_date(start_date))
        if end_date:
            queryset = queryset.filter(created_at__date__lte=parse_date(end_date))

        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all().order_by('-created_at')
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    country = request.data.get('country', '')
    city = request.data.get('city', '')
    phone = request.data.get('phone', '')

    if not username or not password:
        return Response({'error': 'Username et mot de passe requis'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Utilisateur déjà existant'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)

    # Attendre que le signal ait créé le profil
    profile, created = Profile.objects.get_or_create(user=user)
    profile.country = country
    profile.city = city
    profile.phone = phone
    profile.save()

    return Response({'message': 'Utilisateur créé avec succès'}, status=status.HTTP_201_CREATED)
