import "./App.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthLayout from "./layouts/AuthLayout";
import HomeLayout from "./layouts/HomeLayout";
import { ProtectedRoute, PublicRoute } from "./components/routes/AuthRoute";
import { useAuth } from "./hooks/useAuth";

// Initialize auth state when the app loads
const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();
  
  // You can add any global auth-related side effects here
  useEffect(() => {
    // This ensures the auth state is properly initialized
  }, [currentUser, loading]);
  
  return <>{children}</>;
};

const Loading = lazy(() => import("./pages/common/Loading"));
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Home = lazy(() => import("./pages/home/Home"));
const Saved = lazy(() => import("./pages/home/Saved"));
const Trending = lazy(() => import("./pages/home/Trending"));
const Profile = lazy(() => import("./pages/home/Profile"));
const NotFound = lazy(() => import("./pages/common/NotFound"));

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthInitializer>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public routes - only accessible when not logged in */}
              <Route element={<PublicRoute />}>
                <Route path="/auth" element={<AuthLayout />}>
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                  <Route index element={<Navigate to="login" replace />} />
                </Route>
              </Route>

              {/* Protected routes - only accessible when logged in */}
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<HomeLayout />}>
                  <Route index element={<Home />} />
                  <Route path="saved" element={<Saved />} />
                  <Route path="trending" element={<Trending />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Route>

              {/* Redirect all other paths to home or login based on auth status */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthInitializer>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
