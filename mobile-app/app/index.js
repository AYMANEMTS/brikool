import * as React from 'react';
import 'react-native-gesture-handler';
import Main from "../layout/Main";
import {PaperProvider} from "react-native-paper";
import {QueryClient, QueryClientProvider} from "react-query";
import UserContext from "../context/UserContext";

const queryClient = new QueryClient()


function index() {
    return (
        <PaperProvider>
            <QueryClientProvider client={queryClient}>
                <UserContext>
                    <Main />
                </UserContext>
            </QueryClientProvider>
        </PaperProvider>
    );
}
export default index