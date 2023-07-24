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
import { reactive, ref } from 'vue'
// import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

const ruleFormRef = ref("");
const formSize = ref("default");

const ruleForm = reactive({
  name: "",
  pwd: ""
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

const submitForm = async (formEl) => {
  if (!formEl) return;
  router.replace("/home")
  // await formEl.validate((valid) => {
  //   if (valid) {
  //     console.log("submit");
  //     router.replace("/microMain/home")
  //   } else {
  //     ElMessage.error("请输入正确的用户名和密码");
  //   }
  // })
}
</script>