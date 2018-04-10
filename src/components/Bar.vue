<template>
	<div>
		Just a Bar page.
		<div>
			<router-link to="/">Home</router-link>
		</div>
		<div><span>{{count}}</span></div>
		<div><button @click="count++">+1</button></div>
		<input v-model="message" placeholder="edit me">
		<p>Message is: {{ message }}</p>
		<baz></baz>
	</div>
</template>
<script>
import Baz from './Baz.vue'
export default {
		data () {
			return {
				count: 2,
				message: ''
			}
		},
		components: {Baz}
}
</script>

