import React from 'react';
import CounterPanel from './../../CounterPanel';
import { shallow } from 'enzyme';

describe('<CounterPanel />', () => {
  it('Renders Counter panel correctly', () => {
    const wrapper = shallow(<CounterPanel score={5} />);
    expect(wrapper.children().first().props()).toEqual({"children": 1, "inputColor": "black"});
    expect(wrapper.children().at(5).props()).toEqual({"children": 6, "inputColor": "grey"});
  });
});
