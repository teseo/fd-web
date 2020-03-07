import React from 'react';
import PlayerCard from './../../PlayerCard';
import { shallow } from 'enzyme';
import { PlayerImage, TextName } from "../StyledComponents";


describe("<PlayerCard />", () => {
  it('Renders Image correctly', () => {
    const handlePlayerClick = jest.fn();
    const wrapper = shallow(<PlayerCard
      firstName="John"
      lastName="Smith"
      imageSource="test"
      ffpg={23}
      showResult={true}
      handlePlayerClick={handlePlayerClick}
    />);
    expect(wrapper.find(PlayerImage)).toHaveLength(1)
  });
  it("Renders Name correctly", () => {
    const handlePlayerClick = jest.fn();
    const wrapper = shallow(<PlayerCard
      firstName="John"
      lastName="Smith"
      imageSource="test"
      ffpg={23}
      showResult={true}
      handlePlayerClick={handlePlayerClick}
    />);
    expect(wrapper.find(TextName).first().contains("John Smith")).toBeTruthy();

  });
  it("Renders ffpg correctly", () => {
    const handlePlayerClick = jest.fn();

    const wrapper = shallow(<PlayerCard
      firstName="John"
      lastName="Smith"
      imageSource="test"
      ffpg={23}
      showResult={true}
      handlePlayerClick={handlePlayerClick}
    />);
    expect(wrapper.find(TextName).at(1).contains("23.00000000")).toBeTruthy();
  });
  it("Renders hides ffpg correctly", () => {
    const handlePlayerClick = jest.fn();

    const wrapper = shallow(<PlayerCard
      firstName="John"
      lastName="Smith"
      imageSource="test"
      ffpg={23}
      showResult={false}
      handlePlayerClick={handlePlayerClick}
    />);
    expect(wrapper.find(TextName).at(1).contains("23.00000000")).toBeFalsy();
  });


});
