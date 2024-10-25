import * as React from 'react';
import 'react-native-gesture-handler';
import Main from "../layout/Main";
import {PaperProvider} from "react-native-paper";

function index() {
    return (
        <PaperProvider>
            <Main />
        </PaperProvider>
    );
}
export default index
