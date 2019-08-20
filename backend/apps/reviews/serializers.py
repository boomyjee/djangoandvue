from rest_framework import serializers

from django.conf import settings

from apps.reviews.models import Review, REVIEW_MARK_CHOISES, REVIEW_MARK_NEUTRAL


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'title', 'author_name', 'review_text', 'review_mark', 'pub_date')