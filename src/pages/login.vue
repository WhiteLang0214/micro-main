<template>
  <div id="login">
    <el-color-picker v-model="color" @change="changeColor" />
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="ruleForm.pwd" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
        <button></button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
// import { useStore } from "vuex";
import { ucLogin } from "@/api/login";
// import actions from "@/qiankun/actions";

const router = useRouter();
// const store = useStore();

const ruleFormRef = ref("");
const formSize = ref("default");
const color = ref("#3b9ce0");

const ruleForm = reactive({
  name: "13116060177",
  pwd: "654321",
});

const rules = reactive({
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const login = () => {
  const name = ruleForm.name,
    pwd = ruleForm.pwd;
    ucLogin({
      name,
      pwd
    }).then(() => {
      setTimeout(() => {
        router.replace("/microMain/home");
      }, 1000)
    }).catch(() => {})
  // post(`/serve/doLogin?name=${name}&pwd=${pwd}`, {
  //   name,
  //   pwd,
  // }).then(() => {
  //   saveLoginInfo();
  //   router.replace("/microMain/home");
  // });
};

// 单点登录获取用户登录信息

// 向vuex存储登录信息
// const saveLoginInfo = () => {
//   const loginInfo = {
//     username: "lx",
//     phone: "13116060177",
//   };
//   store.commit("SAVE_TOKEN", "token");
//   store.commit("SAVE_LOGIN_INFO", loginInfo);
//   sessionStorage.setItem("token", "token");
//   sessionStorage.setItem("loginInfo", JSON.stringify(loginInfo));
//   // 更新全局状态，为了给微应用使用
//   actions.setGlobalState({
//     token: "token",
//     loginInfo,
//   });
// };

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      login();
    }
  });
};

const changeColor = (val) => {
  console.log("val---", val);
};
</script>