<!-- css -->
<style lang="stylus" src="./Post.styl"></style>


<!-- html -->
<template>
  <div class="post-in">
    <img :src="this.$route.params.postImg ">

    <h3 class="title">{{ this.$route.params.postName }}</h3>
    </br>
    <span class="tagline">{{ this.$route.params.postTag }}</span>

    <div class="group-up">
      <div class="group-down">
        <h4 class="subti">Topics</h4>
        <ul v-for="topic in this.$route.params.postTopics">
          <li>{{ topic.name }}</li>
        </ul>
      </div>

      <div class="group-down">

        <h4 class="subti">Makers</h4>

        <ul v-for="maker in this.$route.params.postMakers">
          <li>{{ maker.name }}</li>
        </ul>
      </div>
    </div>

    <div class="vote">
      <span>{{ this.$route.params.postVote }} Votes</span>
      <button v-on:click="vote">Vote</button>
    </div>

    <div class="group-comm">
       <h4>Discussion</h4>
       <ul v-for="comment in comments" class="comm">
        <li class="user">{{ comment.user.name }} :</li>
        <li class="content">{{ comment.body }}</li>
      </ul>
    </div>

  </div>
</template>


<!-- js -->
<script>
import axios from 'axios'

export default {
created() {
  this.getComments()
},
methods: {
  vote: function (event) {
      axios.post('/posts/'+this.$route.params.postId+'/vote',{
        post_id: this.$route.params.postId})
      .then(function (response) {
        console.log(response);
        })
      .catch(function (error) {
        console.log(error);
      })
  },
  getComments() {
  console.log('comments')
  axios.get('/comments', {post_id: this.$route.params.postId})
    .then((response) => {
      console.log(response)
      this.comments = response.data.comments
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}

}
</script>
