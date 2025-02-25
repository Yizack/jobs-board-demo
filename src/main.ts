import "~/assets/main.css";

import devalue from "@nuxt/devalue";
import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
import { MotionPlugin } from "@vueuse/motion";
import App from "~/App.vue";
import { routes } from "~/router";
import { useMotionBinds } from "~/utils/motion";
import jobsMiddleware from "~/middlewares/jobs";

export const createApp = ViteSSG(App,
  // vue-router options
  { routes },
  // function to have custom setups
  ({ app, initialState, router }) => {
    const pinia = createPinia();
    app.use(pinia);
    app.use(MotionPlugin, {
      directives: useMotionBinds()
    });

    if (import.meta.env.SSR) initialState.pinia = pinia.state.value;
    else pinia.state.value = initialState?.pinia || {};

    // Apply middleware to the router
    router.beforeEach(jobsMiddleware);
  },
  {
    transformState: (state) => import.meta.env.SSR ? devalue(state) : state
  }
);
