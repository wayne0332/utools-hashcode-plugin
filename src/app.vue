<template>
  <div id="app">
    <span
        style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);font-weight: bold;">{{content}}</span>
  </div>
</template>

<script>

  export default {
    name: "app",
    data() {
      return {
        content: "",
      };
    },
    created: function () {
    },
    mounted: function () {
      var self = this;
      utools.onPluginEnter(({ code, type, payload }) => {
        utools.setSubInput(({ text }) => {
          utools.setExpendHeight(48);
          self.executeCommand(text);
        }, "输入要计算的字符串");
      });

      utools.onPluginOut(() => {
        if (self.process) {
          self.process.kill();
          self.content = "";
        }
      });
    },
    methods: {
      executeCommand: function (text) {
        console.log("calculate text: " + text);
        // 如果命令为空的话不做任何操作
        if (text === "") {
          return "";
        }
        this.content = this.hashCode(text);
      },
      isNull: function (str) {
        return str == null || str.value == "";
      },
      /**
       * java String hashCode 的实现
       */
      hashCode: function (strKey) {
        var hash = 0;
        if (!this.isNull(strKey)) {
          for (var i = 0; i < strKey.length; i++) {
            hash = hash * 31 + strKey.charCodeAt(i);
            hash = this.intValue(hash);
          }
        }
        return hash;
      },
      /**
       * 将js页面的number类型转换为java的int类型
       */
      intValue: function (num) {
        var MAX_VALUE = 0x7fffffff;
        var MIN_VALUE = -0x80000000;
        if (num > MAX_VALUE || num < MIN_VALUE) {
          return num &= 0xFFFFFFFF;
        }
        return num;
      },
    }
  };
</script>
