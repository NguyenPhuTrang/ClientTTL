import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import Layout from './layouts';
import useAuthMiddleware from './routes/authMiddleware';
function App() {

  useAuthMiddleware();

  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
