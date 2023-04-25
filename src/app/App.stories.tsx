import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import App from "./App";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {BrowserRouterDecorator} from "./BrouserRouterDecorator";

export default {
    title: 'Example/app',
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = () => <App demo={true}/>

export const AppWithReduxExample = Template.bind({});

