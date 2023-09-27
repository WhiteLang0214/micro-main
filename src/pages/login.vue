<template>
  <div id="login">
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
          用户中心登录
        </el-button>
        <el-button type="default" @click="oldSubmitForm(ruleFormRef)">
          老异常登陆
        </el-button>
        <button></button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ucLogin, oldLogin } from "@/api";
import { homePath } from "@/router";

const router = useRouter();
const store = useStore();

const ruleFormRef = ref("");
const formSize = ref("default");

const ruleForm = reactive({
  name: "13116060177",
  pwd: "123456",
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
    pwd,
  })
    .then(() => {
      // 有当前激活路由，则跳转激活路由。反之跳首页
      const currentActive = store.getters.getActiveMenu;
      if (currentActive) {
        router.replace(JSON.parse(currentActive).microFullPath);
      } else {
        router.replace(homePath.microFullPath);
        store.commit("SAVE_CURRENTACTIVEMENU", JSON.stringify(homePath));
      }
    })
    .catch(() => {});
};

const oldLoginFun = () => {
  const name = ruleForm.name,
    pwd = ruleForm.pwd;
    oldLogin({
      phone: name,
      oldpwd: pwd,
      loginType: "1"
    })
    .then((res) => {
      console.log("res---", res)
      // 有当前激活路由，则跳转激活路由。反之跳首页
      // const currentActive = store.getters.getActiveMenu;
      // if (currentActive) {
      //   router.replace(JSON.parse(currentActive).microFullPath);
      // } else {
        router.replace(homePath.microFullPath);
        store.commit("SAVE_CURRENTACTIVEMENU", JSON.stringify(homePath));
      // }
    })
    .catch(() => {});
};

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      login();
    }
  });
};

const oldSubmitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      oldLoginFun();
    }
  });
}

</script>