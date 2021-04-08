<template>
  <div class="login-container">
    <!-- 注册 -->
    <div class="register">
      <span @click="doRegister">{{registerState?"返回":"注册"}}</span>
    </div>
    <!-- 标题 -->
    <div class="title">
      {{registerState?"欢迎注册":"欢迎登录"}}
    </div>
    <!-- 登录 -->
    <div class="form">
      <div class="field">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd"></mt-field>
        <mt-field v-if="registerState" label="确认密码" placeholder="请输入密码" type="password" v-model="confirmPwd"></mt-field>
        <!-- <mt-field label="邮箱" placeholder="请输入邮箱" type="email"></mt-field>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel"></mt-field>
        <mt-field label="网站" placeholder="请输入网址" type="url"></mt-field>
        <mt-field label="数字" placeholder="请输入数字" type="number"></mt-field>
        <mt-field label="生日" placeholder="请输入生日" type="date"></mt-field>
        <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4"></mt-field> -->
      </div>
      <div class="login">
        <mt-button v-if="!registerState" type="primary" @click="confirmLogin">登录</mt-button>
        <mt-button v-else type="primary" @click="confirmRegister">注册</mt-button>
      </div>
      <div v-show="!registerState" class="other">
        <span @click="forgetPwd">忘记密码？</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    MessageBox,
    Toast
  } from 'mint-ui'
  export default {
    data() {
      return {
        registerState: false,
        username: '',
        pwd: '',
        confirmPwd: ''
      }
    },
    methods: {
      confirmLogin() {
        if (this.username && this.pwd) {
          let data = {
            username: this.username,
            pwd: this.pwd
          }
          this.$http.post('/login/l', this.qs.stringify(data))
            .then(res => {
              if (res.data.code) {
                // 登录成功
                this.$store.state.adminInfo = res.data.data
                localStorage.setItem("moqiAdmin", JSON.stringify(res.data.data))
                this.$store.state.indexSelected = "tab3"
                this.$router.push('/index')
              } else {
                Toast(res.data.msg)
              }
            }).catch(e => {
              console.log('login --', e)
            })
        } else {
          Toast('请输入用户名、密码')
        }
      },
      doRegister() {
        this.registerState = !this.registerState
      },
      confirmRegister() {
        if (this.username && this.pwd && this.confirmPwd) {
          if (this.pwd !== this.confirmPwd) {
            Toast('密码与确认密码不一致')
            return
          }
          let data = {
            username: this.username,
            pwd: this.pwd
          }
          this.$http.post('/register/r', this.qs.stringify(data))
            .then(res => {
              if (res.data.code) {
                Toast({
                  message: res.data.msg,
                  iconClass: "mintui mintui-success"
                })
                this.registerState = false
              } else {
                Toast({
                  message: res.data.msg,
                  iconClass: "mintui mintui-field-warning"
                })
              }
            }).catch(e => {
              console.log('login --', e)
            })
        } else {
          Toast('请输入用户名、密码、确认密码')
        }
      },
      forgetPwd() {
        MessageBox.alert('确认重置密码？').then(action => {
          MessageBox.alert('还是重新注册一个吧！')
        })
      }
    },
    mounted() {

    }
  }
</script>

<style scoped="scoped" lang="scss">
  .login-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 0 5vw;

    .register {
      padding: 5vh 0;
      font-weight: bold;
      text-align: right;
    }

    .title {
      font-size: 32px;
      padding: 5vh 0;
      font-weight: bold;
    }

    .form {
      padding: 5vh 0;

      .login {
        text-align: center;
        padding: 5vh 0;

        button {
          width: 30vw;
        }
      }
    }
  }
</style>
