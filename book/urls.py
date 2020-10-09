from rest_framework import routers
from .viewSets import BookViewSet,AuthorViewSet
router=routers.SimpleRouter()
router.register("books",BookViewSet)
router.register("author",AuthorViewSet)
urlpatterns=router.urls