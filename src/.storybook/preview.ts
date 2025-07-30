import type { Preview } from "@storybook/react"
import React from "react"
import "../resources/css/app.css"
import { initialize, mswLoader } from 'msw-storybook-addon'

initialize()

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    loaders: [mswLoader],
    decorators: [
        (Story: any) => {
            // Inertia.jsの完全なモック設定
            ; (window as any).Inertia = {
                visit: () => { },
                get: () => { },
                post: () => { },
                put: () => { },
                patch: () => { },
                delete: () => { },
                reload: () => { },
                createProvider: () => ({ children }: any) => children,
                Head: ({ children }: any) => children,
            }

                // axiosのモック設定
                ; (window as any).axios = {
                    get: () => Promise.resolve({ data: { data: [] } }),
                    post: () => Promise.resolve({ data: {} }),
                }

            return React.createElement(Story)
        }
    ],
}

global.route = (name, params, absolute) => {
    return `/${name}`
}

export default preview
