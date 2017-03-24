<!-- CSS -->
<style lang="stylus" src="./PostsList.styl"></style>

<!-- HTML -->
<template>
  <div class="wrapper">

    <div class="posts-list-filters">
      <select v-model="daysAgo" v-on:change="getPosts()">
        <option v-for="day in days" v-bind:value="day">{{ selectDaysLabel(day) }}</option>
      </select>
    </div>

    <ul class="posts-list-stats">
      <li v-for="item in stats">
        <span>{{ item.count }}</span>
        <span>{{ item.label }}</span>
      </li>
    </ul>

    <ul class="posts-list">
      <posts-list-item v-for="post in posts" :key="post.id" :proppost="post"></posts-list-item>
    </ul>

  </div>
</template>

<!-- JS -->
<script>

  // Import de certaines librairies nécessaires dans ce composant
  import axios from 'axios'
  import _ from 'lodash'

  // Import du composant PostsListItem
  import PostsListItem from '../PostsListItem/PostsListItem.vue'

  export default {

    components: {
      'posts-list-item': PostsListItem
    },

    data() {
      return {
        posts: null,
        daysAgo: 0,
        days: _.range(31),
        stats: {
          posts: {
            count: 0,
            label: 'Posts'
          },
          votes: {
            count: 0,
            label: 'Votes'
          },
          comments: {
            count: 0,
            label: 'Comments'
          },
          makers: {
            count: 0,
            label: 'Makers'
          }
        }
      }
    },

    created() {

      this.getPosts()

    },

    methods: {

      getPosts() {
        // Utilisez axios pour récupérer les posts de l'API ProductHunt
        // Variable à modifier : this.posts
        console.log('getPosts...')
        axios.get('/posts?days_ago='+this.daysAgo)
          .then((response) => {
            console.log(response)
            this.posts = response.data.posts
            this.countStats()
          })
          .catch(function (error) {
            console.log(error)
          })
      },

      countStats() {
        // Appeler cette méthode pour calculer les stats à chaque fois qu'on récupère les posts
        console.log('countStats...')
        this.stats.posts.count = 0
        this.stats.votes.count = 0
        this.stats.comments.count = 0
        this.stats.makers.count = 0
        for (var post in this.posts) {
          this.stats.posts.count += 1
          this.stats.votes.count += this.posts[post].votes_count
          this.stats.comments.count += this.posts[post].comments_count
          this.stats.makers.count += this.posts[post].makers.length
        }

      },

      selectDaysLabel(day) {
        // Retourne "Today", "Yesterday", ou "X days ago" en fonction de "day"
        let label
        if (day === 0) label = 'Today'
        else if (day === 1) label = 'Yesterday'
        else label = `${day} days ago`
        return label
      }

    }

  }

</script>
