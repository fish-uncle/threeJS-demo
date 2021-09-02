<template lang="pug">
.content
	.nav.fn-flex.flex-row
		a(:class="{active:index===active}" @click="click(index)" v-for="(item,index) in list") {{item.label}}
	component(:is="state.componentId")
</template>
<script lang="ts">
import { ref, reactive, toRefs, shallowRef, defineComponent } from 'vue'
import face from '@/components/face/index.vue'
import webrtc from '@/components/webrtc/index.vue'

export default defineComponent({
	name: 'home',
	setup() {
		const list = [
			{ label: '纯JS人脸识别', component: face },
			{ label: 'webrtc', component: webrtc },
		]
		const state2 = reactive({ active: -1 })
		const state = shallowRef({ componentId: null })
		const click = index => {
			state2.active = index
			state.value = { componentId: list[index].component }
		}
		return {
			state,
			list: ref(list),
			...toRefs(state2),
			click,
		}
	},
})
</script>
<style lang="scss" scoped>
.content {
	padding: 20px;
	.nav {
		border-bottom: 1px solid #ddd;
		margin-bottom: 20px;
		padding-bottom: 10px;
		a {
			font-size: 16px;
			margin-right: 20px;
			color: #999;
			&.active {
				color: #333;
			}
			&:hover {
				opacity: 0.6;
			}
		}
	}
}
</style>
