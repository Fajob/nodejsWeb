<template>
	<div class="chatting-container">
    <mt-header :title="user.username+' 聊天室'" fixed>
      <router-link to="/index" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <!-- 信息框 -->
    <div class="messages" ref="msgbody">
      <div class="item" v-for="(item, index) in msgs" :key="index" :style="{'justify-content': !item.type?'flex-end':''}">
        <div v-if="!item.type" class="words">
          <div style="text-align: right;">{{item.time}}</div>
          <div>{{item.msg}}</div>
        </div>
        <img class="avatar" :src="item.type?require('../../assets/local.jpg'):require('../../assets/remote.jpg')" />
        <div v-if="item.type" class="words">
          <div>{{item.time}}</div>
          <div>{{item.msg}}</div>
        </div>
      </div>
    </div>
    <!-- 输入框 -->
    <div class="inputing">
      <input v-model="sendMsg" />
      <mt-button @click="send" type="primary" size="small">发送</mt-button>
    </div>
  </div>
</template>

<script>
  import {MessageBox, Toast} from 'mint-ui'
	export default {
		data() {
			return {
        sendMsg: "",
        source: null,
        msgs: []
			}
		},
    computed: {
      user() {
        return this.$route.query.user
      }
    },
		methods: {
      send() {
        if(!this.sendMsg){
          Toast("发送消息不能为空")
        }else{
          let date = Date.parse(new Date())/1000
          let data = {
            fromAdminId: this.$store.state.adminInfo.id,
            toAdminId: this.user.id,
            msg: this.sendMsg,
            time: date
          }
          this.$http.post("/chat/chatting/send", this.qs.stringify(data))
            .then(res => {
              if(res.data.code){
                // 发送成功
                let item = {
                  time: this.timestampToTime(date),
                  msg: this.sendMsg,
                  type: 1
                }
                this.msgs.push(item)
                this.sendMsg = ""
                setTimeout(() => {
                  this.$refs.msgbody.scrollTop = this.$refs.msgbody.scrollHeight
                }, 0)
              }
            }).catch(e => {
              console.log("chat chatting send --", e)
            })
        }
      }
		},
    beforeCreate() {

    },
		mounted() {
      // 获取消息sse长连接
      let that = this
      this.source = new EventSource('http://localhost:8060/chat/chatting/get?fromAdminId='+this.user.id)
      this.source.onopen = function(event) {
        console.log("onopen --", event)
      }
      this.source.onmessage = function(event) {
        // console.log("onmessage --", event)
        if(event.data != "暂无新消息"){
          let data = JSON.parse(event.data)
          // 发送成功
          let item = {
            time: that.timestampToTime(data.time),
            msg: data.msg,
            type: 0
          }
          that.msgs.push(item)
          setTimeout(() => {
            that.$refs.msgbody.scrollTop = that.$refs.msgbody.scrollHeight
          }, 500)
        }
      }
      this.source.onerror = function(error) {
        console.log("onerror --", error)
      }
		},
    beforeDestroy() {
      this.$store.state.indexSelected = "tab1"
      if(this.source)
        this.source.close()
    }
	}
</script>

<style scoped="scoped" lang="scss">
  .chatting-container{
    .messages{
      padding-top: 40px;
      background-color: #f3f3f3;
      height: calc(100vh - 100px);
      overflow-y: auto;
      .item{
        display: flex;
        padding: 20px 10px;
        .avatar{
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }
        .words{
          padding: 0 10px;
          div:first-child{
            font-size: 12px;
            color: #999999;
            padding: 4px;
          }
          div:last-child{
            background-color: #FFFFFF;
            padding: 4px;
          }
        }
      }
    }
    .inputing{
      position: fixed;
      bottom: 0;
      width: calc(100vw - 20px);
      display: flex;
      align-items: center;
      background: #e3e3e3;
      padding: 10px;
      textarea, input{
        flex: auto;
        border: none;
        outline: none;
        height: 40px;
        padding: 0 5px;
        margin-right: 10px;
        border-radius: 5px;
      }
    }
  }
</style>
