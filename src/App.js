import React, { useEffect } from 'react';

// React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Icons
import { FiSettings } from 'react-icons/fi';

// Tooltip
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

// Components
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
} from './pages';

// COntext
import { useStateContext } from './contexts/ContextProvider';

// Pages
import Login from './pages/Login/Login';
import AdminTable from './components/Tables/AdminTable';
import AppVersionTable from './components/Tables/AppVersionTable';
import Category from './components/Tables/CategoryTable';
import UserTable from './components/Tables/UserTable';
import ReportedBugs from './components/Tables/ReportedBugs';
import ReportedContent from './components/Tables/ReportedContent';
import AdminAchievement from './components/Tables/AdminAchievement';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';

// Edit Pages
import EditAdmin from './pages/Edit/EditAdmin';
import EditAppVersion from './pages/Edit/EditAppVersion';
import EditAdminAchievement from './pages/Edit/EditAdminAchievement';

// ADD PAGES
import AddAppVersion from './pages/Add/AddAppVersion';
import AddAdminAchievement from './pages/Add/AddAdminAchievement';

// VIEW PAGES
import AdminDetails from './pages/ViewDetails/AdminDetails';
import UserDetails from './pages/ViewDetails/UserDetails';
import CategoryDetails from './pages/ViewDetails/CategoryDetails';

// Custom CSS
import './App.css';


const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    console.log('1', currentThemeColor);
    const currentThemeMode = localStorage.getItem('themeMode');
    console.log('2', currentThemeMode);

    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <ToastContainer position="top-right" />
      <BrowserRouter>
        {!localStorage.getItem('jwt') ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/resetPassword" element={<ForgetPassword />} />
          </Routes>
        ) : (
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: '50%' }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
            <div
              className={
                activeMenu
                  ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                  : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
              }
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
              <div>
                {themeSettings && <ThemeSettings />}

                <Routes>
                  {/* dashboard  */}

                  {/* <Route path="/dashboard" element={<Ecommerce />} /> */}
                  <Route path="/ecommerce" element={<Ecommerce />} />

                  {/* pages  */}
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/user" element={<UserTable />} />

                  <Route path="/employees" element={<Employees />} />
                  <Route path="/admin" element={<AdminTable />} />
                  <Route path="/appVersion" element={<AppVersionTable />} />
                  <Route path="/category" element={<Category />} />

                  <Route
                    path="/adminAchievement"
                    element={<AdminAchievement />}
                  />

                  <Route path="/customers" element={<Customers />} />

                  {/* apps  */}
                  {/* <Route path="/kanban" element={<Kanban />} /> */}
                  <Route path="/editor" element={<Editor />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/color-picker" element={<ColorPicker />} />

                  {/* charts  */}
                  <Route path="/line" element={<Line />} />
                  <Route path="/area" element={<Area />} />
                  <Route path="/reportedBugs" element={<ReportedBugs />} />

                  <Route
                    path="/reportedContent"
                    element={<ReportedContent />}
                  />

                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/financial" element={<Financial />} />
                  <Route path="/color-mapping" element={<ColorMapping />} />
                  <Route path="/pyramid" element={<Pyramid />} />
                  <Route path="/stacked" element={<Stacked />} />

                  {/* EDIT ROUTES */}

                  <Route path="/editadmin/:id" element={<EditAdmin />} />
                  <Route
                    path="/editAdminAchievement/:id"
                    element={<EditAdminAchievement />}
                  />
                  <Route
                    path="/editappversion/:id"
                    element={<EditAppVersion />}
                  />

                  {/* ADD ROUTES */}
                  <Route path="/addAppVersion" element={<AddAppVersion />} />
                  <Route
                    path="/addAdminAchievement"
                    element={<AddAdminAchievement />}
                  />

                  {/* Views Routes */}
                  <Route path="/admindetails/:id" element={<AdminDetails />} />
                  <Route path='/viewUserDetails/:id' element={<UserDetails/>}/>
                  <Route path='/viewCategory/:id' element={<CategoryDetails/>}/>
                </Routes>
              </div>
              {/* <Footer /> */}
            </div>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
