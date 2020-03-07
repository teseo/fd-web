/**
 * @format
 */
import 'jsdom-global/register';
import 'react-native';
import React from 'react';
import PlayerCard from '../PlayerCard.component';
// Note: test renderer must be required after react-native.
import {mount, shallow} from "enzyme";


describe("<PlayerCard />", () => {
  it('Renders Image correctly', () => {
    const handelPlayerPress = jest.fn();
    const wrapper = mount(<PlayerCard
      firstName="John"
      lastName="Smith"
      imageSource="test"
      isWinner={true}
      ffpg={23}
      showResult={true}
      guessRight={3}
      handelPlayerPress={handelPlayerPress}
    />);
    expect(
      wrapper
        .find("Image").exists()
    ).toEqual(true);
  });
  it("Renders Name correctly", () => {
    const handelPlayerPress = jest.fn();

    const wrapper = shallow(<PlayerCard
      firstName="John"
      lastName="Smith"
      imageSource="test"
      isWinner={true}
      ffpg={23}
      showResult={true}
      guessRight={3}
      handelPlayerPress={handelPlayerPress}
    />).dive();

    expect(
      wrapper.find("Styled(Text)").first().contains("John Smith")
    ).toBeTruthy();
  });
  it("Renders ffpg correctly", () => {
    const handelPlayerPress = jest.fn();

    const wrapper = shallow(<PlayerCard
      firstName="John"
      lastName="Smith"
      imageSource="test"
      isWinner={true}
      ffpg={23}
      showResult={true}
      guessRight={3}
      handelPlayerPress={handelPlayerPress}
    />).dive();

    expect(
      wrapper.find("Styled(Text)").at(1).contains("23.00000000")
    ).toBeTruthy();
  });
  it("Renders hides ffpg correctly", () => {
    const handelPlayerPress = jest.fn();

    const wrapper = shallow(<PlayerCard
      firstName="John"
      lastName="Smith"
      imageSource="test"
      isWinner={true}
      ffpg={23}
      showResult={false}
      guessRight={3}
      handelPlayerPress={handelPlayerPress}
    />).dive();

    expect(
      wrapper.find("Styled(Text)").at(1).contains("23.00000000")
    ).toBeFalsy();
  });


});
