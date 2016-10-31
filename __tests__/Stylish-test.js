import 'react-native';
import React from 'react';
import Stylish from '../index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Stylish.View />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
