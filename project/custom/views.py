from django.shortcuts import render
from django.views.decorators.cache import cache_page

from custom.utils import round_down
from instagallery.models import Image


cache_page(60 * 5)
def homepage(request):
    instagram_images = Image.objects.order_by('-instagram_id')[:100]
    rounded_down = round_down(instagram_images.count(), 10)
    instagram_images = instagram_images[:rounded_down]
    return render(request, 'homepage.html', {'instagram_images': instagram_images})
