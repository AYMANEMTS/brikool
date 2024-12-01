import './App.css';
import {router} from "./routes";
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import { SnackbarProvider,closeSnackbar  } from 'notistack';
import {LoadingProvider} from "./context/LoadingProvider";
import Spinner from "./utils/Spinner";
import {AdminProvider} from "./context/AdminProvider";

const queryClient = new QueryClient()

function App() {
    return (
          <AdminProvider>
              <LoadingProvider>
                  <QueryClientProvider client={queryClient}>
                      <SnackbarProvider anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                      }} action={(snackbarId) => (
                          <button onClick={() => closeSnackbar(snackbarId)}>
                              X
                          </button>
                      )}>
                          <RouterProvider router={router} />
                          <Spinner />
                      </SnackbarProvider>
                  </QueryClientProvider>
              </LoadingProvider>
          </AdminProvider>
  );
}

export default App;
