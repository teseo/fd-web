import styled from "styled-components";
import { LOGO_URL } from "../../constants";
import WinnerImageSrc from "../../../assets/winner.jpg";
import TryAgainSrc from "../../../assets/tryagain.jpg";

export const GameContainer = styled.div`
  padding: 10px 30px;
  margin: 0 auto;
  max-width: 1441px;
  background-color: #152a47;
  flex-direction: column;
`;
export const GlobalHeader = styled.div`
  padding-bottom: 19px;
  text-align: center;
`;
export const TopLogoImage = styled.img.attrs({
  src: LOGO_URL,
})`
  height: 28px;
`;
export const WinnerImage = styled.img.attrs({
  src: WinnerImageSrc,
})`
  height: 192px;
  margin-top: 5px;
`;
export const TryAgainImage = styled.img.attrs({
  src: TryAgainSrc,
})`
  height: 192px;
  margin-top: 5px;
`;
export const TopLogoLink = styled.a``;
export const HeaderContainer = styled.div`
  align-items: center;
  background: radial-gradient(ellipse, #0facfd 16%, #1493ff 100%);
  color: #ffff;
  justify-content: center;
  margin: 0 5px 5px 0;
  padding: 5px;
  border-radius: 16px;
`;
export const HeaderText = styled.span`
  margin: 0 5px 0 5px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BottomContainer = styled.div`
  display: flex;
  height: 25px;
  background: radial-gradient(ellipse, #0facfd 16%, #1493ff 100%);
  justify-content: center;
  align-items: center;
  margin: 0 5px 5px 0;
  border-radius: 16px;
  padding: 5px;
`;
export const RestartButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1493ff;
  justify-content: center;
  align-items: center;
  margin: 0 5px 5px 0;
  padding: 5px;
  border-radius: 16px;
`;
export const ContinueButtonContainer = styled.button`
  background-color: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 12px;
  padding: 5px;
  margin-left: 5px;
`;
export const BottomText = styled.p`
  color: #ffff;
`;
export const ButtonText = styled.p`
  color: #1493ff;
  background: #fff;
`;
export const PlayersCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-bottom: 5px;
  border-radius: 12px;
`;
