from django.db import models
from django.utils import timezone

REVIEW_MARK_NEGATIVE = 'negative'
REVIEW_MARK_POSITIVE = 'positive'
REVIEW_MARK_NEUTRAL  = 'neutral'

REVIEW_MARK_CHOISES = [
    (REVIEW_MARK_NEGATIVE, 'Negative'),
    (REVIEW_MARK_POSITIVE, 'Positive'),
    (REVIEW_MARK_NEUTRAL, 'Neutral'),
]


class Review(models.Model):
    title = models.CharField(verbose_name='Title', max_length=255, default='')
    author_name = models.CharField(verbose_name='Author Name', max_length=255, default='')
    review_text = models.TextField(verbose_name='Review Text', default='')
    review_mark = models.CharField(
        verbose_name='Review Mark',
        max_length=8,
        choices=REVIEW_MARK_CHOISES,
        default=REVIEW_MARK_NEUTRAL,
    )
    pub_date = models.DateTimeField(verbose_name='Created at', auto_now_add=timezone.now)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'
        ordering = ['-pub_date', 'title']
        indexes = [
            models.Index(fields=['title'], name='title_idx'),
            models.Index(fields=['author_name'], name='author_name_idx'),
            models.Index(fields=['pub_date'], name='pub_date_idx'),
        ]