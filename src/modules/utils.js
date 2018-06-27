import Vue from "vue";
import inflector from "i";
import {
  AUTHENTICATION_ERROR,
  READ_DOCUMENT_ERROR,
  ADD_DOCUMENT_ERROR,
  UPDATE_DOCUMENT_ERROR,
  DELETE_DOCUMENT_ERROR,
  CHANGE_SHOWARR_ERROR,
  INVALID_ARGUMENTS,
  ADD_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_SUCCESS,
  CHANGE_SHOWARR_SUCCESS,
  DELETE_DOCUMENT_SUCCESS
} from "./statusCode";

const storage = window.localStorage;
let utils = {};

utils.i = inflector();

utils.localStorageManager = {
  set(key, value) {
    storage.setItem(key, JSON.stringify(value));
  },
  get(key, defaultValue) {
    let value = storage.getItem(key);
    if (value === null || value === "undefined" || value === "") {
      value = defaultValue;
    } else {
      value = JSON.parse(value);
    }
    return value;
  },
  clear() {
    storage.clear();
  }
};

utils.store = (key, value) => {
  if (arguments.length < 2) {
    return utils.localStorageManager.get(key);
  }
  return utils.localStorageManager.set(key, value);
};

utils.dateArithmetic = {
  toLocal(utcString) {
    let date;
    if (arguments.length === 0) {
      date = new Date();
    } else {
      date = new Date(utcString);
    }
    return date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getDate();
  },
  between(begin, end) {
    let beginDate = new Date(begin);
    let endDate = new Date(end);
    return parseInt(endDate - beginDate) / 1000 / 60 / 60 / 24;
  }
};

utils.postHandler = function(response, ctx) {
  let toastMessage = {
    show: true
  };

  if (response.code < 2000) {
    toastMessage.success = false;
  } else {
    toastMessage.success = true;
  }

  switch (response.code) {
    case AUTHENTICATION_ERROR:
      global.store.dispatch("clearAuth");
      return;
    case READ_DOCUMENT_ERROR:
    case ADD_DOCUMENT_ERROR:
    case UPDATE_DOCUMENT_ERROR:
    case DELETE_DOCUMENT_ERROR:
    case CHANGE_SHOWARR_ERROR:
      toastMessage.body = "请与管理员联系";
      break;
    case INVALID_ARGUMENTS:
      toastMessage.body = "上传参数不合法";
      break;
    case ADD_DOCUMENT_SUCCESS:
      toastMessage.body = "成功添加";
      break;
    case UPDATE_DOCUMENT_SUCCESS:
      toastMessage.body = "成功更新";
      break;
    case CHANGE_SHOWARR_SUCCESS:
      toastMessage.body = "成功更改";
      break;
    case DELETE_DOCUMENT_SUCCESS:
      toastMessage.body = "成功删除";
      break;
  }

  if (ctx) {
    ctx.list = response;
    ctx.showArray = [];
    for (let i in ctx.list) {
      if (ctx.list[i].isShow) {
        ctx.showArray.push(ctx.list[i].id);
      }
    }
    global.store.dispatch("setCallbackFlag", false);
    global.store.dispatch("setInitShowArr", ctx.showArray);
  } else {
    global.store.dispatch("setDialogMessageOff");
    global.store.dispatch("setToastMessage", toastMessage);
    global.store.dispatch("setCallbackFlag", true);
  }
};

utils.orderStatus2String = function(status) {
  switch (status) {
    case 0:
      return "未被处理(0)";
      break;
    case 1:
      return "预约成功(1)";
      break;
    case 2:
      return "货物送达(2)";
      break;
    case 3:
      return "货物回仓(3)";
      break;
    case 4:
      return "退还货物(4)";
      break;
    case -1:
      return "预约失败(-1)";
      break;
    case -2:
      return "用户取消下单(-2)";
      break;
    case -3:
      return "用户排队(-3)";
      break;
    case -4:
      return "用户取消订单(-4)";
      break;
    case -5:
      return "排队超时(-5)";
      break;
    default:
      return null;
      break;
  }
};

utils.orderString2Status = function(str) {
  switch (str) {
    case "未被处理(0)":
      return 0;
      break;
    case "预约成功(1)":
      return 1;
      break;
    case "货物送达(2)":
      return 2;
      break;
    case "货物回仓(3)":
      return 3;
      break;
    case "退还货物(4)":
      return 4;
      break;
    case "预约失败(-1)":
      return -1;
      break;
    case "用户取消下单(-2)":
      return -2;
      break;
    case "用户排队(-3)":
      return -3;
      break;
    case "用户取消订单(-4)":
      return -4;
      break;
    case "排队超时(-5)":
      return -5;
      break;
    default:
      break;
  }
};

utils.regiStatus2String = function(status) {
  switch (status) {
    case 0:
      return "未申请(0)";
      break;
    case 1:
      return "待处理(1)";
      break;
    case 2:
      return "通过(2)";
      break;
    case -1:
      return "驳回：缺少必要图片(-1)";
      break;
    case -2:
      return "驳回：身份证不清晰(-2)";
      break;
    case -3:
      return "驳回：校园卡不清晰(-3)";
      break;
    default:
      return null;
      break;
  }
};

utils.regiString2Status = function(str) {
  switch (str) {
    case "未申请(0)":
      return 0;
      break;
    case "待处理(1)":
      return 1;
      break;
    case "通过(2)":
      return 2;
      break;
    case "驳回：缺少必要图片(-1)":
      return -1;
      break;
    case "驳回：身份证不清晰(-2)":
      return -2;
      break;
    case "驳回：校园卡不清晰(-3)":
      return -3;
      break;
    default:
      break;
  }
};

utils.getYMDDate = function(dateString) {
  if (dateString == null) {
    return null;
  }
  return dateString.split("T")[0];
};

Vue.directive("back", (el, binding) => {
  el.onclick = () => window.history.go(-1);
});

export default utils;
