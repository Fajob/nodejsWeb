<template>
	<div class="friend-container">
    <div class="search">
      <input v-model="searchText" />
      <i class="mintui mintui-search"></i>
    </div>
    <!-- 好友列表 -->
    <mt-cell v-for="(item, index) in searchResult" :key="index" :title="item.username" @click.native="goChat(item)"></mt-cell>
  </div>
</template>

<script>
	export default {
    props: {
      users: Array
    },
		data() {
			return {
        searchText: "",
        searchResult: []
			}
		},
    watch: {
      searchText(newV, oldV) {
        this.searchResult = []
        this.users.forEach(item => {
          if(item.username.indexOf(newV) > -1){
            this.searchResult.push(item)
          }
        })
      }
    },
		methods: {
      goChat(item) {
        this.$router.push({
          path: '/chatting',
          query: {
            user: item
          }
        })
      }
		},
		mounted() {
      this.searchResult = this.users
      if(!this.users.length){
        this.$http.post(`/chat/users/get?adminId=${this.$store.state.adminInfo.id}`).then(res => {
          if(res.data.code){
            this.$store.state.users = res.data.data
            this.searchResult = res.data.data
          }
        }).catch(e => {
          console.log("chat users get --", e)
        })
      }
		}
	}
</script>

<style scoped="scoped" lang="scss">
  .friend-container{
    .search{
      height: 40px;
      display: flex;
      align-items: center;
      background: rgb(38,162,255);
      color: #999;
      input{
        flex: auto;
        border: none;
        outline: none;
        height: 30px;
        margin: 0 10px;
        padding: 0 5px 0 20px;
      }
      i{
        position: absolute;
        left: 15px;
      }
    }
  }
</style>
