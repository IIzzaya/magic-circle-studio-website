const DEBUG = true;

let server = "120.78.145.36";

if (DEBUG) {
  server = "localhost";
}

const config = {
  apiUrl: `http://${server}:4000/api`,
  orderStatus: [
    "未被处理(0)",
    "预约成功(1)",
    "货物送达(2)",
    "货物回仓(3)",
    "退还货物(4)",
    "预约失败(-1)",
    "用户取消下单(-2)",
    "用户排队(-3)",
    "用户取消订单(-4)",
    "排队超时(-5)"
  ],
  editOrderStatus: ["未被处理(0)", "预约成功(1)", "货物送达(2)", "货物回仓(3)", "预约失败(-1)"],
  regiStatus: [
    "未申请(0)",
    "待处理(1)",
    "通过(2)",
    "驳回：缺少必要图片(-1)",
    "驳回：身份证不清晰(-2)",
    "驳回：校园卡不清晰(-3)"
  ],
  regiResults: ["通过(2)", "驳回：缺少必要图片(-1)", "驳回：身份证不清晰(-2)", "驳回：校园卡不清晰(-3)"]
};

// status 订单记录的状态码
// 0 未被处理（客户成功发起订单，但后台仍然未处理）
// 1 预约成功（已发货， 前端显示“寄送中”）
// 2 货物已送达（客户已收到货物，前端显示“在使用”）
// 3 货物已回收（租包事件的结束，前端显示“已完成”），打上 timestamp_end
// 4 用户发起还包请求（客户发起，前端显示“待退还”）
// -1 预约失败，打上 timestamp_end
// -2 用户取消订单，在下订单时，打上 timestamp_end
// -3 用户通过占位发起订单，有效时间五分钟
// -4 占位失效，打上 timestamp_end

// 未完成的订单记录：0 1 2 4 -3
// 完成的订单记录：3 -1 -2 -4

export default config;
