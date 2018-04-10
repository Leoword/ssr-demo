<template>
  <div id="app">
    <h1>来自后端SSR渲染</h1>
	<ol>
		<li v-for="(todo, index) in todos" v-bind:key="index">
			{{ todo.text }}
		</li>
	</ol>
	<div><span>{{count}}</span></div>
    <div><button @click="count++">+1</button></div>
	<router-view></router-view>
  </div>
</template>

<script>
//为什么这么写？带有逻辑配置的组件
export default {
	name: 'app',
	data() {
		return {
			todos: [
				  { text: 'Learn JavaScript' },
				  { text: 'Learn Vue' },
				  { text: 'Build something awesome' }
			],
			count: 1
		};
    }
}
</script>