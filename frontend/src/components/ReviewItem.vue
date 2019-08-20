<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">
        {{ review.title }}

        <span class="float-right">
          <span v-if="review.review_mark == 'positive'" class="badge badge-success">Positive</span>
          <span v-else-if="review.review_mark == 'negative'" class="badge badge-danger">Negative</span>
          <span v-else class="badge badge-secondary">Neutral</span>
        </span>
      </h5>

      <hr>

      <p class="card-text">{{ review.review_text }}</p>

      <hr>

      <p class="card-text text-right">
        <small class="text-muted">Posted by {{ review.author_name }}</small>
        <br>
        <small class="text-muted">Published at {{ review.pub_date | formatDate }}</small>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewItem',

  props: {
    review: Object
  }
}
</script>

<style lang="css" scoped>
</style>
