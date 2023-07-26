import { start } from "qiankun";

export default function () {
  start({
    sandbox: {
      experimentalStyleIsolation: true
    }
  }); //启动qiankun
}