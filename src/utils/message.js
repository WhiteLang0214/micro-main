import { ElMessage } from "element-plus";

export function msgFun(type, message, single=true) {
  if (single) {
    ElMessage.closeAll()
  }
  ElMessage({
    type,
    message
  })
}