import { Route, ReactLocation } from "react-location";
import AddDistrict from "./Menu/DisplayPage/DistrictPage/AddDistrict";
import AddShop from "./Menu/DisplayPage/ShopPage/AddShop";
import AddWard from "./Menu/DisplayPage/WardPage/AddWard";
import ShopPage from './Menu/DisplayPage/ShopPage';
import DistrictPage from "./Menu/DisplayPage/DistrictPage";
import WardPage from "./Menu/DisplayPage/WardPage";
import LoginPage from "./Menu/DisplayPage/UserPage/LoginPage";
import EditShopPage from "./Menu/DisplayPage/ShopPage/EditShopPage";
import AddCertificate from "./Menu/DisplayPage/ShopPage/AddCertificate";
import EditShop from './Menu/DisplayPage/ShopPage/EditShop';
import EditDistrct from "./Menu/DisplayPage/DistrictPage/EditDistrict";
import PlanPage from "./Menu/DisplayPage/PlanPage";
import EditPlan from "./Menu/DisplayPage/PlanPage/EditPlan";
import UserPage from './Menu/DisplayPage/UserPage/UserPage';
import EditUser from "./Menu/DisplayPage/UserPage/EditUser";
import AddUser from "./Menu/DisplayPage/UserPage/AddUser";
import EditWard from "./Menu/DisplayPage/WardPage/EditWard";

const loginRoutes: Route = {
    path: "login",
    element: <LoginPage />
}

const userRoutes: Route = {
    path: "user",
    children: [
        {
            path: '/',
            element: <UserPage />
        },
        {
            path: 'edit',
            children: [
                {
                    path: ':id',
                    element: <EditUser />
                }
            ]
        },
        {
            path: 'add',
            element: <AddUser />
        }
    ]
}

const shopRoutes: Route = {
    path: "shops",
    children: [
        {
            path: '/',
            element: <ShopPage />,
        },
        {
            path: "add",
            element: <AddShop onCancel={() => { }} onConfirm={() => { }} />
        },
        {
            path: ":id",
            children: [
                {
                    path: "/",
                    element: <EditShopPage />
                },
                {
                    path: "add_certificate",
                    element: <AddCertificate />
                },
                {
                    path: "edit",
                    element: <EditShop />
                }
            ]
        }
    ]
}

const districtRoutes: Route = {
    path: "districts",
    children: [
        {
            path: '/',
            element: <DistrictPage />,
        },
        {
            path: ":id",
            element: <EditDistrct />
        },
        {
            path: "add",
            element: <AddDistrict />
        }
    ]
}

const wardRoutes: Route = {
    path: "wards",
    children: [
        {
            path: '/',
            element: <WardPage />,
        },
        {
            path: ":id",
            element: <EditWard/>
        },
        {
            path: "add",
            element: <AddWard />
        }
    ]
}

const planRoutes: Route = {
    path: "plans",
    children: [
        {
            path: "/",
            element: <PlanPage />
        },
        {
            path: ":id",
            element: <EditPlan />
        }
    ]
}


export const routes: Route[] = [
    {
        path: "/",
        element: <ShopPage />,
    },
    shopRoutes, districtRoutes, wardRoutes, loginRoutes, planRoutes, userRoutes
]

export const location = new ReactLocation();