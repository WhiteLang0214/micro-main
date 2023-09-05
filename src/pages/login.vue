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
import { useStore } from "vuex";
import { ucLogin } from "@/api";

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
      const homeRoute = {
        menuPath: "/microMain/home",
        name: "主应用首页",
        id: "",
        currentActivePath: "/microMain/home"
      };
      router.replace(homeRoute.menuPath);
      store.commit("SAVE_CURRENTACTIVEMENU", JSON.stringify(homeRoute));
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

</script>