import './App.css';
import {router} from "./routes";
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import { SnackbarProvider,closeSnackbar  } from 'notistack';
import {AuthProvider} from "./context/UserProvider";

const queryClient = new QueryClient()

function App() {
    return (
      <AuthProvider>
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
              </SnackbarProvider>
          </QueryClientProvider>
      </AuthProvider>
  );
}

export default App;
