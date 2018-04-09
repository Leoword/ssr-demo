<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
      <router-link to="/test">Test</router-link>
    </ul>
	<p>{{item}}</p>
	<button @click="mount++">click</button>
  </div>
</template>

<script>



export default {
	asyncDate({store, route}) { //自定义静态函数，在组件实例化之前调用，无法访问this
		return store.dispatch('increment');
	},
  	name: 'Foo',
	data () {
		return {
			msg: 'Welcome to Your Vue.js App',
			mount: 1
		}
	},
	methods: {
		increment() {
			return this.$store.commit('increment');
		}
	},
	computed: {
		//从store中获取item
		item() {
			return this.$store.state.count;
		}
	}
}
</script>