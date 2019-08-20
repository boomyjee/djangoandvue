<template>
    <div>
      <h1 class="page-header text-center mb-4 display-4">Reviews</h1>

      <div class="row">
        <div class="col-sm-5 col-md-4 mb-4">
          <input class="form-control form-control-sm" type="text" placeholder="Search by author and title"
                 :value="filtering.search_string" @input="updateSearchString">
        </div>

        <div class="col-sm-7 col-md-8 mb-4">
          <div class="text-right">
            <span>Sort by: </span>
            <div class="btn-group btn-group-sm">
              <span class="btn btn-outline-success"
                    @click="setSortOrder('title')"
                    :class="filtering.ordering === 'title' ? 'active' : ''">Title</span>

              <span class="btn btn-outline-success"
                    @click="setSortOrder('latest')"
                    :class="filtering.ordering === 'latest' ? 'active' : ''">Latest</span>

              <span class="btn btn-outline-success"
                    @click="setSortOrder('author')"
                    :class="filtering.ordering === 'author' ? 'active' : ''">Author</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="reviews">
        <div class="review-item" v-for="review in reviews" v-bind:key="review.id">
          <review-item :review=review></review-item>
        </div>
      </div>

      <div class="overflow-auto">
        <b-pagination-nav
          align="center"
          :link-gen="linkGen"
          :number-of-pages="filtering.total_pages ? filtering.total_pages : 1"
          :value="filtering.current_page"
          @input="updatePage"
          :use-router=false></b-pagination-nav>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import _ from 'lodash'
import ReviewItem from './ReviewItem.vue'

export default {
  name: 'ReviewsComponent',

  components: {
  	ReviewItem
  },

  props: {
    initialSearchString: String,
    initialOrdering: String,
    initialPage: Number
  },

  computed: {
    reviews: function() {
      return this.$store.state.reviews.reviews
    },
    filtering: function() {
      return this.$store.state.reviews.filtering
    }
  },

  created () {
    this.setFilteringParams({
      search_string: this.initialSearchString,
      ordering: this.initialOrdering ? this.initialOrdering : 'title',
      current_page: this.initialPage ? this.initialPage : 1,
    })
  },

  methods: {
    ...mapActions({
      setFilteringParams: 'reviews/setFilteringParams',
      setSearchString: 'reviews/setSearchString',
      setPage: 'reviews/setPage',
      setOrdering: 'reviews/setOrdering'
    }),

    updateSearchString (e) {
      this.setSearchStringDebounced(e.target.value)
    },

    setSearchStringDebounced: _.debounce(function(searchString) {
      this.setSearchString(searchString).then(() => this.updateUrlParams())
    }, 250),

    setSortOrder: function(val) {
      this.setOrdering(val).then(() => this.updateUrlParams())
    },

    updatePage: function(val) {
      // don't need to call updateUrlParams() here because b-pagination-nav changes url by itself
      this.setPage(val)
    },

    updateUrlParams: function() {
      this.$router.push({
        name: 'reviews',
        query: {
          q: this.filtering.search_string,
          sort: this.filtering.ordering,
          p: this.filtering.current_page,
        }
      })
    },

    linkGen(pageNum) {
      return {
        name: 'reviews',
        query: { q: this.filtering.search_string, sort: this.filtering.ordering, p: pageNum }
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .review-item {
    margin-bottom: 1.5em;
  }

  .btn:not(.active) {
    cursor: pointer;
  }
</style>
