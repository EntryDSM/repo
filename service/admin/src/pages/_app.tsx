import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastClassName, ToastContainer, TypeOptions} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "@/components/dev";

const client = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
    return (
        <div className=" [&_*]:font-['Pretendard-Regular'] [&_*]:leading-tight">
            <QueryClientProvider client={client}>
                <DevSupport ComponentPreviews={ComponentPreviews}
                            useInitialHook={useInitial}
                >
                    <Component {...pageProps} />
                </DevSupport>
                <ToastContainer/>
            </QueryClientProvider>
        </div>
    );
}
