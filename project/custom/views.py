from django.shortcuts import render

from custom.utils import round_down
from instagallery.models import Image


def homepage(request):
    instagram_images = Image.objects.order_by('-instagram_id')[:100]
    rounded_down = round_down(instagram_images.count(), 10)
    instagram_images = instagram_images[:rounded_down + 1]
    return render(request, 'homepage.html', {'instagram_images': instagram_images})
