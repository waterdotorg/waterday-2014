from django.db import models

from custom_user.models import AbstractEmailUser


class User(AbstractEmailUser):
    """
    EmailUser with custom fields
    """
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
