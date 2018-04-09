<template>
	<div><h3>{{item}}</h3></div>
</template>

<script>
//为什么这么写？带有逻辑配置的组件
export default {
	name: 'baz',
	methods: {
		pluralize: n => n + (n === 1 ? ' reply' : ' replies')
	},
	asyncDate({store, route}) { //自定义静态函数，在组件实例化之前调用，无法访问this
		return store.dispatch('increment');
	},
	computed: {
		//从store中获取item
		item() {
			return this.$store.state.count;
		}
	}
}
</script>