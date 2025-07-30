import type { Meta, StoryObj } from '@storybook/react'
import SakebinaTop from './index'

const meta: Meta<typeof SakebinaTop> = {
    component: SakebinaTop,
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
