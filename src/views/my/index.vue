<template>
	<div class="my-container">
    <!-- head -->
    <div class="head">
      <img class="avatar" src="../../assets/avatar.jpg" />
      <span class="name">{{adminInfo.username}}</span>
    </div>
    <!-- menu -->
    <div class="menu">
      <mt-cell title="个人信息" is-link>
        <i slot="icon" class="iconfont icon-gerenxinxi"></i>
      </mt-cell>
      <mt-cell title="联系客服" is-link>
        <i slot="icon" class="iconfont icon-lianxikefu"></i>
      </mt-cell>
      <mt-cell title="设置" is-link>
        <i slot="icon" class="iconfont icon-shezhi"></i>
      </mt-cell>
    </div>
    <!-- log out -->
    <div class="footer">
      <mt-button type="danger" @click="logout">退出登录</mt-button>
    </div>
  </div>
</template>

<script>
  import {MessageBox, Toast} from 'mint-ui'
	export default {
		data() {
			return {

			}
		},
    computed: {
      adminInfo() {
        return this.$store.state.adminInfo
      }
    },
		methods: {
      logout() {
        MessageBox.confirm("确认退出？").then(action => {
          // 还原本地数据
          localStorage.removeItem("moqiAdmin")
          this.$store.state.adminInfo = ""
          this.$store.state.users = []
          
          this.$router.push('/')
        }).catch(e => {
          // cancel
        })
      }
		},
		mounted() {

		}
	}
</script>

<style scoped="scoped" lang="scss">
  .my-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 5vh;
    .head{
      margin-top: 5vh;
      width: 80vw;
      height: 20vh;
      padding: 4px 8px;
      border-radius: 5px;
      background: url(../../assets/my-head-bg1.jpg) no-repeat;
      background-size: 100% 100%;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.32);
      display: flex;
      align-items: center;
      .avatar{
        width: 75px;
        height: 75px;
        border-radius: 50%;
      }
      .name{
        font-size: 18px;
        color: #FFFFFF;
        margin: -5vh 0 0 5vw;
      }
    }
    .menu{
      margin-top: 5vh;
      width: 80vw;
      padding: 4px 8px;
      border-radius: 5px;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.32);
    }
    .footer{
      margin-top: 5vh;
    }
  }
</style>
