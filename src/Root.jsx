import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import { Layout } from "antd";
import Home from "./pages/home/Home";
import Administrators from "./pages/administration/Admins";
import Migration from "./pages/migration/Migration";
import Dai from "./pages/dai/Dai";
import Languages from "./pages/languages/Languages";
import Addresses from "./pages/addresses/Addresses";
import ExecutorGroups from "./pages/executor-groups/ExecutorGroups";
import Executors from "./pages/executors/Executors";
import MobileReferences from "./pages/mobile-references/MobileReferences";
import OperatorGroups from "./pages/operator-groups/OperatorGroups";
import Operators from "./pages/operators/Operators";
import Organizations from "./pages/organizations/Organizations";
import References from "./pages/references/References";
import Regions from "./pages/regions/Regions";
import Reprisals from "./pages/reprisals/Reprisals";
import Resolutions from "./pages/resolutions/Resolutions";
import ResponseLetters from "./pages/response-letters/ResponseLetters";
import Results from "./pages/results/Results";
import Roles from "./pages/roles/Roles";
import Sources from "./pages/sources/Sources";
import Subjects from "./pages/subjects/Subjects";
import TicketTypes from "./pages/ticket-types/TicketTypes";
import Users from "./pages/users/Users";
import Shapes from "./pages/shapes/Shapes";

const MainLayout = () => (
    <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
    </Layout>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "dashboard", element: <Home /> },
            { path: "administrators", element: <Administrators /> },
            { path: "uzkomnazorats", element: <Dai /> },
            { path: "migrations", element: <Migration /> },
            { path: "regions", element: <Regions /> },
            { path: "roles", element: <Roles /> },
            { path: "sources", element: <Sources /> },
            { path: "subjects", element: <Subjects /> },
            { path: "organizations", element: <Organizations /> },
            { path: "resolutions", element: <Resolutions /> },
            { path: "response-letters", element: <ResponseLetters /> },
            { path: "ticket-types", element: <TicketTypes /> },
            { path: "shapes", element: <Shapes /> },
            { path: "results", element: <Results /> },
            { path: "reprisals", element: <Reprisals /> },
            { path: "references", element: <References /> },
            { path: "references_mobile", element: <MobileReferences /> },
            { path: "operators", element: <Operators /> },
            { path: "operator-groups", element: <OperatorGroups /> },
            { path: "executors", element: <Executors /> },
            { path: "executor-groups", element: <ExecutorGroups /> },
            { path: "addresses", element: <Addresses /> },
            { path: "users", element: <Users /> },
            { path: "languages", element: <Languages /> }
        ],
    },
]);

const Root = () => <RouterProvider router={router} />;

export default Root;