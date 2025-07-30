import type { Meta, StoryObj } from '@storybook/react'
import LandingPage from './index'

const meta: Meta<typeof LandingPage> = {
    component: LandingPage,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
}
