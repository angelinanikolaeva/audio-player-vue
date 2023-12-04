import { AppRoutes, getRouteMain } from '@/shared/const/router';
import type { AppRoutesProps } from '@/shared/types/router';

const routesConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    component: async () => await import('@/pages/MainPage/MainPage.vue'),
  },
  // IMPORTANT: has to be the last
  [AppRoutes.NOT_FOUND]: {
    path: '/:pathMatch(.*)*',
    component: async () => await import('@/pages/NotFoundPage.vue'),
  },
};

export const routes = Object.values(routesConfig);
