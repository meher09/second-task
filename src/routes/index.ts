import { Router } from 'express';
import { UserRoutes } from '../app/modules/user/user.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/',
        route: UserRoutes,

    }
]
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;