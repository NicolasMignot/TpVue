<!-- CSS -->
<style lang="stylus" src="./PostsListItem.styl"></style>

<!-- HTML -->
<template>

  <li class="posts-list-item">
    <router-link :to="{ name: 'post_component', params: { postId: proppost.id,
                                                          postName: proppost.name,
                                                          postImg: proppost.thumbnail.image_url,
                                                          postVote: proppost.votes_count,
                                                          postTag: proppost.tagline,
                                                          postMakers: proppost.makers,
                                                          postTopics: proppost.topics }}">

    <span><img :src="proppost.thumbnail.image_url" :alt="proppost.name"></span>
    <h3>{{ proppost.name }}</h3>
    <span>{{proppost.votes_count}} upvotes</span>
    <span>{{ proppost.tagline }}</span>
    </router-link>
  </li>

</template>

<!-- JS -->
<script>

  export default {

    props: ['proppost']

  }

</script>
