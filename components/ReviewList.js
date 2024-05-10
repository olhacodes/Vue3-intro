app.component('review-list', {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  template:
    /*html*/
    `
        <div class="review-container">
            <h3>Reviews:</h3>
            <ul>
                <li v-for="(review, index) in reviews" :key="index">
                    <p>{{ review.name }} gave this {{ review.rating }}</p>
                    <br/>
                    <p>{{ review.review }}</p>
                </li>
            </ul>
    `,
});
