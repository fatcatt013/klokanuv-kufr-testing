import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import RecentActivityCard from '../../../components/RecentActivityCard';
import CenterView from '../CenterView';

storiesOf('RecentActivityCard', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Card with recent activity', () => (
    <RecentActivityCard onPress={action('clicked-text')}/>
  ));
