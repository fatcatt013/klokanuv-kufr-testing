import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView';
import CompleteTask from '../../../screens/CompleteTask';

storiesOf('CompleteTask', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Card with recent activity', () => (
    <CompleteTask onPress={action('clicked-text')}/>
  ));
