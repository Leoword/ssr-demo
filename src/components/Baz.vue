<template>
	<div>
    	Just a Baz page.
    <div>
      <router-link to="/">Home</router-link>
    </div>
    <div><span>{{count}}</span></div>
    <div><button @click="count++">+1</button></div>
	<input v-model="message">
	<p>Message is: {{ message }}</p>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <br>
  <span>Checked names: {{ checkedNames }}</span>
  </div>
</template>

<script>
//为什么这么写？带有逻辑配置的组件
export default {
	name: 'baz',
	data () {
		return {
			count: 3,
			checkedNames: [],
			message: ''
		}
	},
	serverCacheKey: props => props.item.id,
	render(h) {
		return h('div', this.item.id);
	}
}
</script>