<template>
	<div class="game-container">
    <mt-header title="我的游戏" fixed></mt-header>
    <!-- 游戏列表 -->
    <mt-cell v-for="(item, index) in games" :key="index" :title="item.name" @click.native="goPlay"></mt-cell>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				games: [
          {
            name: "Gobang"
          }
        ]
			}
		},
		methods: {
			goPlay(){
        this.$router.push({
          path: '/gobang'
        })
      }
		},
		mounted() {

		}
	}
</script>

<style scoped="scoped" lang="scss">
  .game-container{
    .mint-cell{
      margin-top: 40px;
    }
  }
</style>
