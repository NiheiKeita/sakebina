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
            // Inertia.jsのモック設定
            ; (window as any).Inertia = {
                visit: () => { },
                get: () => { },
                post: () => { },
                put: () => { },
                patch: () => { },
                delete: () => { },
                reload: () => { },
            }

            return React.createElement(Story)
        }
    ],
}

global.route = (name, params, absolute) => {
    return `/${name}`
}

export default preview
