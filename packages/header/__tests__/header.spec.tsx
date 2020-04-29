import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Header } from '../lib/index'
 
Enzyme.configure({ adapter: new Adapter() });
test('CheckboxWithLabel changes the text after click', () => {
  const checkbox = Enzyme.shallow(<Header aaa={1} />);
  expect(checkbox.text()).toEqual('Hello Tgu 1');
});
