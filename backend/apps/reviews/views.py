import requests
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.reviews.models import Review, REVIEW_MARK_NEGATIVE, REVIEW_MARK_POSITIVE, REVIEW_MARK_NEUTRAL
from apps.reviews.serializers import ReviewSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    search_fields = ['title', 'author_name']
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    @action(methods=['GET'], detail=False)
    def stats(self, request, format=None):
        positive_review_count = Review.objects.filter(review_mark=REVIEW_MARK_POSITIVE).count()
        negative_review_count = Review.objects.filter(review_mark=REVIEW_MARK_NEGATIVE).count()
        neutral_review_count = Review.objects.filter(review_mark=REVIEW_MARK_NEUTRAL).count()

        content = [
            {
                'mark': REVIEW_MARK_POSITIVE,
                'count': positive_review_count
            },
                        {
                'mark': REVIEW_MARK_NEGATIVE,
                'count': negative_review_count
            },
                        {
                'mark': REVIEW_MARK_NEUTRAL,
                'count': neutral_review_count
            }
        ]
        return Response(content)