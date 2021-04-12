<template>
  <div class="login">
    <div class="login-wrap">
      <h1 class="login-title">您好，欢迎登录</h1>
      <van-form class="login-form">
        <van-field
          v-model.trim="form.username"
          label-width="0"
          name="手机号"
          clearable
          maxlength="11"
          placeholder="请输入手机号"
        ></van-field>
        <van-field
          v-model.trim="form.password"
          class="password"
          label-width="0"
          type="password"
          clearable
          maxlength="20"
          name="密码"
          placeholder="请输入密码"
        ></van-field>
        <div class="btn-wrap">
          <van-button
            block
            :color="activeBtnColor"
            type="primary"
            class="login-btn"
            @click="handleSubmit"
          >登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import color from '@/styles/color.scss'
import { Toast } from 'vant'
import { login, getUserInfo } from '@/api/login'
import * as local from '@/utils/local'
/* 这是以前的写法
import store from '@/store'
import router from '@/router'
*/
// vue3的写法
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useInstance } from '@/hooks/useInstance'
export default {
  name: 'Login',
  setup(props, context) {
    /* eslint-disable */
    const {self } = useInstance()
    console.log("self", self);
    const router = useRouter()
    const store = useStore()
    // 清除页面所有缓存数据
    local.clear()
    // 初始化表单
    const form = reactive({
      username: '',
      password: ''
    })
    const btnColor = reactive(color)
    const validateForm = () => {
      return new Promise((resolve, reject) => {
        if (form.username === '') {
          reject('手机号不能为空')
        }
        const reg = /^1[3-9][0-9]{9}/
        if (!reg.test(form.username)) {
          reject('手机号不符合规范')
        }
        if (form.password === '') {
          reject('密码不能为空')
        }
        resolve(true)
      })
    }
    // 提交
    const handleSubmit = () => {
      // 校验
      validateForm().then(async(valid) => {
        console.log('this.form', form)
        if (valid) {
          const res = await login({
            ...form,
            grant_type: 'password'
          })
          if (res.success) {
            const token = res.data
            local.set('token', token)
            try {
            // 获取用户信息
              const userRes = await getUserInfo()
              if (userRes.success) {
                const userInfo = userRes.data
                store.commit('SET_USER_INFO', userInfo)
                router.push({
                  path: '/home'
                })
              }
            } catch (error) {
            // 清除token
              local.remove('token')
            }
          }
        }
      }).catch(err => {
        Toast(err)
      })
    }
    const activeBtnColor = computed(() => {
      if (form.username || form.password) {
        return btnColor.activeBtnColor
      }
      return ''
    })
    return {
      form,
      activeBtnColor,
      handleSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background-image: url('https://yyx-mall.oss-cn-chengdu.aliyuncs.com/mp-icons/customer_login_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 560px;
  overflow: hidden;
  .login-wrap {
    margin-top: 488px;
    background: #FFFFFF;
    border-radius: 64px 64px 0px 0px;
    overflow: hidden;
    .login-title{
      padding: 66px 48px 40px;
      font-size: 48px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #292929;
      line-height: 66px;
    }
    // :v-deep以前的写法
    /*
     ::v-deep .van-cell{
      padding: 36px 40px 32px;
      font-size: 32px;
      line-height: 44px;
    }
    */
    ::v-deep(.van-cell){
      padding: 36px 40px 32px;
      font-size: 32px;
      line-height: 44px;
    }
    .password {
      &:before {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        right: 40px;
        bottom: 0;
        left: 40px;
        border-bottom: 1px solid #ebedf0;
        transform: scaleY(.5);
      }
    }
    .btn-wrap{
      margin: 106px 24px;
    }
    .login-btn{
      height: 88px;
      background: #E4E6E6;
      border-radius: 44px;
      border: none;
      font-size: 36px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #999;
      line-height: 88px;
    }
  }
}
</style>
