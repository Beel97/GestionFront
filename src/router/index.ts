import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProfesoresView from "@/views/ProfesoresView.vue";
import AlumnosView from "@/views/AlumnosView.vue";
import CalificacionesView from "@/views/CalificacionesView.vue";
import MateriasView from "@/views/MateriasView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/alumnos",
      name: "alumnos",
      component: AlumnosView,
    },
    {
      path: "/calificaciones",
      name: "calificaciones",
      component: CalificacionesView,
    },
    {
      path: "/materias",
      name: "materias",
      component: MateriasView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/profesores",
      name: "profesores",
      component: ProfesoresView,
    },
  ],
});

export default router;
