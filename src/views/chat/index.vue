<template>
	<div class="chat-container">
    <!-- 用户列表 -->
    <friend :users="users"></friend>
  </div>
</template>

<script>
  import chat from "./chatting.vue"
  import friend from "./friend.vue"
	export default {
    components: {
      chat,
      friend
    },
		data() {
			return {

			}
		},
    computed: {
      users() {
        return this.$store.state.users
      }
    },
		methods: {
			// 获取用户列表
      getUsers() {
        this.$http.post(`/chat/users/get?adminId=${this.$store.state.adminInfo.id}`).then(res => {
          if(res.data.code){
            this.$store.state.users = res.data.data
          }
        }).catch(e => {
          console.log("chat users get --", e)
        })
      }
		},
		mounted() {
      if(!this.$store.state.users.length){
        this.getUsers()
      }
		}
	}
</script>

<style scoped="scoped">
</style>
