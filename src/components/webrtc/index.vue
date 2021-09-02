<template lang="pug">
select(v-model="quality")
	option(value="480") 480p
	option(value="720") 720p
	option(value="1080") 1080p
button(@click="obtainMedia" v-if="!ready") 获取摄像头
button(@click="changeMediaProperties" v-if="ready") 改变分辨率
p#settings {{info}}
video#localvideo(autoplay :ref="el=>dom['localvideo']=el" :srcObject="stream")
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
	name: 'webrtc',
	setup() {
		const state = reactive({ dom: {}, info: '', quality: '480', stream: null, ready: false })
		const obtainMedia = async () => {
			state.ready = true
			state.stream = await navigator.mediaDevices.getUserMedia({
				video: {
					height: { exact: parseInt(state.quality) },
				},
			})
			state.info = JSON.stringify(state.stream.getVideoTracks()[0].getConstraints())
		}
		const changeMediaProperties = async () => {
			const videoTrack = state.stream.getVideoTracks()[0]
			const constraints = videoTrack.getConstraints()
			constraints.height = parseInt(state.quality)
			await videoTrack.applyConstraints(constraints)
			state.info = JSON.stringify(state.stream.getVideoTracks()[0].getConstraints())
		}
		return {
			...toRefs(state),
			obtainMedia,
			changeMediaProperties,
		}
	},
})
</script>
