<template>
	<div class="container">
    <!-- body -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="tab1">
        <chat></chat>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab2">
        <game></game>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab3">
        <my></my>
      </mt-tab-container-item>
    </mt-tab-container>
    <!-- tabbar -->
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="tab1">
        <i class="iconfont icon-chat"></i><br>
        聊天
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <i class="iconfont icon-Game"></i><br>
        游戏
      </mt-tab-item>
      <mt-tab-item id="tab3">
        <i class="iconfont icon-my"></i><br>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import my from "../my/index.vue"
  import game from "../game/index.vue"
  import chat from "../chat/index.vue"
	export default {
    components: {
      my,
      game,
      chat
    },
		data() {
			return {

			}
		},
    computed: {
      selected: {
        // getter
        get() {
          return this.$store.state.indexSelected
        },
        // setter
        set(newValue) {
          this.$store.state.indexSelected = newValue
        }
      }
    },
		methods: {

		},
    beforeCreate() {

    },
		mounted() {
      if(!this.$store.state.adminInfo){
        this.$store.state.adminInfo = localStorage.getItem("moqiAdmin")?JSON.parse(localStorage.getItem("moqiAdmin")):""
      }
		}
	}
</script>

<style scoped="scoped" lang="scss">
  .iconfont{
    font-size: 22px;
  }
</style>
