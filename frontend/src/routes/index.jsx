import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import RootLayout from "../layouts/RootLayout.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import RequiredAuth from "../components/RequiredAuth.jsx";
import QuizzesPage from "../pages/QuizzesPage.jsx";
import AdminQuizzesPage from "../pages/admin/QuizzesPage.jsx";
import QuizPage from "../pages/QuizPage.jsx";
import LeaderboardPage from "../pages/LeaderboardPage.jsx";
import AdminRootLayout from "../layouts/admin/AdminRootLayout.jsx";
import DashboardPage from "../pages/admin/DashboardPage.jsx";
import UserPage from "../pages/admin/UserPage.jsx";
import TopicsPage from "../pages/admin/TopicsPage.jsx";
import EditQuizPage from "../pages/admin/EditQuizPage.jsx";
import CreateQuizPage from "../pages/admin/CreateQuizPage.jsx";
import AdminLoginPage from "../pages/admin/LoginPage.jsx";
import RequiredAdminAuth from "../components/RequiredAdminAuth.jsx";
import CreateTopicPage from "../pages/admin/CreateTopicPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            /** Client Routes **/
            {
                path: "/",
                element:
                    <RequiredAuth>
                        <HomePage/>
                    </RequiredAuth>
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/register",
                element: <RegisterPage/>
            },
            {
                path: "/profile",
                element:
                    <RequiredAuth>
                        <ProfilePage/>
                    </RequiredAuth>
            },
            {
                path: "/quizzes/:topicId",
                element:
                    <RequiredAuth>
                        <QuizzesPage/>
                    </RequiredAuth>
            },
            {
                path: "/quizzes/:quizId/start",
                element:
                    <RequiredAuth>
                        <QuizPage/>
                    </RequiredAuth>
            },
            {
                path: "/leaderboard",
                element:
                    <RequiredAuth>
                        <LeaderboardPage/>
                    </RequiredAuth>
            },
        ]
    },

    // admin routes
    {
        path: "/admin",
        element: <AdminRootLayout />,
        children: [
            {
                path: "login",
                element:
                    <RequiredAdminAuth>
                        <AdminLoginPage />
                    </RequiredAdminAuth>
            },
            {
                path: "dashboard",
                element:
                    <RequiredAdminAuth>
                        <DashboardPage />
                    </RequiredAdminAuth>
            },
            {
                path: "users",
                element:
                    <RequiredAdminAuth>
                        <UserPage />
                    </RequiredAdminAuth>
            },
            {
                path: "quizzes",
                element:
                    <RequiredAdminAuth>
                        <AdminQuizzesPage />
                    </RequiredAdminAuth>
            },
            {
                path: "quizzes/create",
                element:
                    <RequiredAdminAuth>
                        <CreateQuizPage />
                    </RequiredAdminAuth>
            },
            {
                path: "quizzes/:quizId/edit",
                element:
                    <RequiredAdminAuth>
                        <EditQuizPage />
                    </RequiredAdminAuth>
            },
            {
                path: "topics",
                element:
                    <RequiredAdminAuth>
                        <TopicsPage />
                    </RequiredAdminAuth>
            },
            {
                path: "topics/create",
                element:
                    <RequiredAdminAuth>
                        <CreateTopicPage />
                    </RequiredAdminAuth>
            },
        ]
    }
]);


export default router;
