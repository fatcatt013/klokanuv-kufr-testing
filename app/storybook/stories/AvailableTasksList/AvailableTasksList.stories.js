import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView';
import AvailableTasksList from '../../../screens/AvailableTasksList';

storiesOf('AvailableTasksList', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Available Tasks List', () => (
    <AvailableTasksList onPress={action('clicked-text')}/>
  ));
