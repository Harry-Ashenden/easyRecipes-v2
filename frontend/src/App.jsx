import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import ProtectedRoutes from './components/ProtectedRoutes';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import MyRecipesPage from './pages/MyRecipesPage';
import AddRecipePage from './pages/AddRecipePage';
import RecipeFeedPage from './pages/RecipeFeedPage';
import RecipePage from './pages/RecipePage';
import EditRecipePage from './pages/EditRecipePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-recipes" element={<MyRecipesPage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/feed" element={<RecipeFeedPage />} />
        <Route path="/recipe/:recipeId" element={<RecipePage />} />
        <Route path="/recipe/:recipeId/edit" element={<EditRecipePage />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

