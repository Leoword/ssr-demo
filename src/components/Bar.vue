<template>
  <div>
    Just a test page.
    <div>
      <router-link to="/">Home</router-link>
    </div>
    <div><span>{{count}}</span></div>
    <div><button @click="count++">+1</button></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        count: 2
      }
    }
  }
</script>

