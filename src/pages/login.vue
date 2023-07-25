<template>
  <div id="login">
    <el-color-picker
      v-model="color"
      @change="changeColor"
    />
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { post } from "@/axios";

const router = useRouter();

const ruleFormRef = ref("");
const formSize = ref("default");
const color = ref('#3b9ce0');

const ruleForm = reactive({
  name: "13116060177",
  pwd: "111111"
})

const rules = reactive({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 6, message: '密码长度为6位', trigger: 'blur' },
  ]
})

const login = () => {
  const name = ruleForm.name, pwd = ruleForm.pwd;
  post(`/serve/doLogin?name=${name}&pwd=${pwd}`, {
    name,
    pwd
  }).then(() => {
    router.replace("/microMain/home")
  })
}

const submitForm = async (formEl) => {
  if (!formEl) return;
  // router.replace("/microMain/home")
  await formEl.validate((valid) => {
    console.log("valid---", valid)
    if (valid) {
      login()
    } else {
      // ElMessage.error("请输入正确的用户名和密码");
    }
  })
}

const changeColor = (val) => {
  console.log('val---', val)
}
</script>