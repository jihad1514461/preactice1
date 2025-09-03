import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, PlayerAuthProvider } from './features';
import { ThemeProvider,LoginPage,AuthGuard,LandingController,AdminLayout } from '@/MainIndex';


function App() {
  return (
    <AuthProvider>
      <PlayerAuthProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 -z-10">
                  <LandingController />
                </div>
              } />
              <Route path="/admin/login" element={
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 -z-10">
                  <LoginPage />
                </div>
              } />
              <Route
                path="/admin/*"
                element={
                  <div className="h-screen">
                    <AuthGuard>
                      <AdminLayout />
                    </AuthGuard>
                  </div>
                }
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </PlayerAuthProvider>
    </AuthProvider>
  );
}

export default App;
