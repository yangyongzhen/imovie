<template>
	<view>
		<button @click="onClick">选图</button>
		<image v-for="(item, index) in images" :key="index"  :src="item"></image>
	</view>
</template>

<script setup>
	import { chooseFile, ChooseFileOption } from '@/uni_modules/lime-choose-file'
	import { ref } from 'vue';
	const images = ref([])
	const onClick = () => {
		chooseFile({
			type: 'image',
			success(res){
				images.value = res.tempFiles.map((item) => item.path)
				console.log('res', res.tempFiles)
			},
			fail(err){
				console.log('err', err)
			}
		})
	}
</script>

<style>

</style>