import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView';
import CompletedTasksList from '../../../screens/CompletedTasksList';

storiesOf('CompletedTasksList', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Card with recent activity', () => (
    <CompletedTasksList onPress={action('clicked-text')}/>
  ));
