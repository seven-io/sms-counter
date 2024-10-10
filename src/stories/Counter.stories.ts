import type { Meta, StoryObj } from '@storybook/html';

import type { CounterOptions } from '..';
import { createCounter } from './Counter';

const meta = {
  args: { // More on argTypes: https://storybook.js.org/docs/api/argtypes
    initEvent: 'DOMContentLoaded',
    position: 'afterend',
    selector: '*[data-seven-sms]',
    standalone: false,
    stats: true,
  },
  tags: ['autodocs'], // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  parameters: {
    layout: 'fullscreen', // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
  },
  render: (args) => createCounter(args),
} satisfies Meta<CounterOptions>;

export default meta;
type Story = StoryObj<CounterOptions>;

export const Default: Story = {
  args: {
    initEvent: 'DOMContentLoaded',
    position: 'afterend',
    selector: '*[data-seven-sms]',
    standalone: false,
    stats: true,
  },
};

export const Standalone: Story = {
  args: {
    initEvent: 'DOMContentLoaded',
    position: 'afterend',
    selector: '*[data-seven-sms]',
    standalone: true,
    stats: true,
  },
};
