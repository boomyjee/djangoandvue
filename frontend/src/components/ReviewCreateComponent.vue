<template>
  <div>
    <h1 class="page-header text-center mb-4 display-4">Add Review</h1>

    <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
      <p>Your review has been created!</p>

      <p><router-link :to="{ name: 'reviews' }">Go back to reviews</router-link></p>
    </div>

    <div v-if="reviewCreateState.connectionError" class="alert alert-danger" role="alert">
      Please check your connection and try again later
    </div>

    <form @submit="submitForm" v-if="!showSuccessMessage">
      <div class="form-group">
        <label for="reviewInputAuthorName">Author Name</label>
        <input required type="text" class="form-control" id="reviewInputAuthorName" placeholder="Enter author name" v-model="review.author_name">
      </div>

      <div class="form-group">
        <label for="reviewInputTitle">Review Title</label>
        <input required type="text" class="form-control" id="reviewInputTitle" placeholder="Enter title" v-model="review.title">
      </div>

      <div class="form-group">
        <label for="reviewInputText">Review Text</label>
        <textarea required type="text" class="form-control textarea" id="reviewInputText" placeholder="Enter your review here" v-model="review.text"></textarea>
      </div>

      <div class="form-group">
        <label for="reviewInputMark">Review Mark</label>

        <select v-model="review.mark" id="reviewInputMark" class="form-control" required>
          <option :value="mark.id" :key="mark.id" v-for="mark in marks">{{ mark.value }}</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

let MARK_POSITIVE = 'positive'
let MARK_NEUTRAL  = 'neutral'
let MARK_NEGATIVE = 'negative'

export default {
  name: 'ReviewCreateComponent',

  data() {
    return {
      review: {
        author_name : "",
        title : "",
        text : "",
        mark: MARK_POSITIVE,
      },
      showSuccessMessage: false,
      marks: [
        { id: MARK_POSITIVE, value: "Positive" },
        { id: MARK_NEUTRAL, value: "Neutral" },
        { id: MARK_NEGATIVE, value: "Negative" }
      ]
    }
  },

  computed: {
    reviewCreateState: function() {
      return this.$store.state.reviews.create
    }
  },

  methods: {
    ...mapActions({
      create: 'reviews/createReview',
      clearState: 'reviews/clearCreateState'
    }),

    submitForm: function (e) {
      e.preventDefault()

      this.create({
        author_name: this.review.author_name,
        title: this.review.title,
        text: this.review.text,
        mark: this.review.mark
      }).then(() => {
        if (this.reviewCreateState.createdSuccessfully) {
          this.clearState()
          this.showSuccessMessage = true
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.textarea {
  height: 200px;
}  
</style>
