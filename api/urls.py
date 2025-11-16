from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import DangerZoneViewSet, ReportViewSet, register_user
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



router = DefaultRouter()
router.register(r'dangerzones', DangerZoneViewSet, basename='dangerzone')
router.register(r'reports', ReportViewSet, basename='report')

urlpatterns = router.urls + [
    path('register/', register_user, name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]

