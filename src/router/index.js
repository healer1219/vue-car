import Vue from "vue";
import VueRouter from "vue-router";
import carList from "@/components/carList/carList"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/index/index"),
    children: [
      {
        path: "/user",
        name: "User",
        component: () => import("@/views/users/index")
      },
      {
        path: "/safe",
        name: "Safe",
        component: () => import("@/views/safe/index")
      },
      {
        path: "/password",
        name: "Password",
        component: () => import("@/views/safe/password")
      },
      {
        path: "/carItem",
        name: "carItem",
        component: () => import("@/components/carList/carItem")
      },
      {
        path: "/register",
        name: "register",
        component: () => import("@/views/users/register")
      },
      {
        path: "/carList/:id",
        name: "carList",
        component: carList
      },
      {
        path: "/item/:carId",
        name: "item",
        component: () => import("@/components/item/item")
      },

    ]
  },
  {
    path: "/carList/:id",
    name: "carList",
    component: carList
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/login/login")
  },
  {
    path: "/realName",
    name: "realName",
    component: () => import("@/components/RealName/realName")
  },
  {
    path: "/pay",
    name: "pay",
    component: () => import("@/components/pay/pay")
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/components/order/order")
  }

];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

// Avoided redundant navigation to current location 解决路由重复报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router;
