<template lang="pug">
input#file-selector.fn-block(type="file", accept="image/*")
ul
	li.fn-flex.flex-row
		label 图片加载时间：
		span {{  loadTime===0?'计算中...':loadTime  }}
		i ms
	li.fn-flex.flex-row
		label 识别时间：
		span {{  detectionTime===0?'计算中...':detectionTime  }}
		i ms
	li.fn-flex.flex-row
		label 识别脸数量：
		span {{  faceNum  }}
		i 个
	li.fn-flex.flex-row
		label 图片大小：
		span {{  imgSize  }}
		i px
canvas#output.fn-block
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, defineComponent } from 'vue'
export default defineComponent({
	setup() {
		const state = reactive({ loadTime: 0, detectionTime: 0, faceNum: 0, imgSize: '0x0' })

		const getImageDim = (image: HTMLElement): { width?: number; height?: number } => {
			const result = {}
			document.body.appendChild(image)
			result['width'] = image.offsetWidth
			result['height'] = image.offsetHeight
			document.body.removeChild(image)
			return result
		}

		const detectNewImage = src => {
			state.imgSize = '计算中...'
			let elapsed_time = +new Date()
			const image = new Image()
			const canvas: any = document.getElementById('output')
			const ctx = (canvas as HTMLCanvasElement).getContext('2d')
			image.onload = function () {
				state.loadTime = +new Date() - elapsed_time
				const dim = getImageDim(image)
				state.imgSize = dim.width + 'x' + dim.height
				const boundingWidth = 400
				let newWidth,
					newHeight,
					scale = 1
				newWidth = boundingWidth
				newHeight = (boundingWidth * dim.height) / dim.width
				scale = newWidth / dim.width
				canvas.width = newWidth
				canvas.style.width = newWidth + 'px'
				canvas.height = newHeight
				canvas.style.height = newHeight + 'px'
				ctx.drawImage(image, 0, 0, newWidth, newHeight)
				elapsed_time = +new Date()

				function post(comp) {
					state.faceNum = comp.length
					state.detectionTime = +new Date() - elapsed_time
					ctx.lineWidth = 2
					ctx.strokeStyle = 'rgba(230,87,0,0.8)'
					for (let i = 0; i < comp.length; i++) {
						ctx.beginPath()
						ctx.arc(
							(comp[i].x + comp[i].width * 0.5) * scale,
							(comp[i].y + comp[i].height * 0.5) * scale,
							(comp[i].width + comp[i].height) * 0.25 * scale * 1.2,
							0,
							Math.PI * 2,
						)
						ctx.stroke()
					}
				}

				const comp = window.ccv.detect_objects({
					canvas: window.ccv.grayscale(window.ccv.pre(image)),
					cascade: window.cascade,
					interval: 5,
					min_neighbors: 1,
				})
				post(comp)
			}
			image.src = src
		}

		const handleLocalFile = file => {
			if (file.type.match(/image.*/)) {
				const reader = new FileReader()
				reader.onload = function (e) {
					detectNewImage(e.target.result)
				}
				reader.readAsDataURL(file)
			}
		}

		onMounted(() => {
			document.getElementById('file-selector').addEventListener('change', function () {
				const files = (this as any).files
				if (files.length) handleLocalFile(files[0])
			})
		})

		return {
			...toRefs(state),
		}
	},
})
</script>
<style lang="scss" scoped>
ul {
	margin: 20px 0;
	width: 400px;
	label {
		margin-right: 10px;
		width: 100px;
	}

	i {
		font-style: normal;
		margin-left: auto;
	}
}
</style>
