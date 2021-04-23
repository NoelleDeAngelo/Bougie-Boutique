import styled from 'styled-components';

export const StyleThumbs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const ThumbImg = styled.img`
  & {
    object-fit: cover;
    object-position: 50% 50%;
    width: 10vh;
    height: 10vh;
    min-width: 80px;
    min-height: 80px;
    border: 1.25vh solid transparent;
    opacity: 50%;
    transition: opacity 0.5s;
  }
  &: hover {
    opacity: 100%;
  }
`;

export const CurrThumb = styled.img`
  object-fit: cover;
  object-position: 50% 50%;
  width: 10vh;
  height: 10vh;
  min-width: 80px;
  min-height: 80px;
  margin: 0.75vh;
  border: 0.5vh solid ${props => props.theme.border};
  outline: 0.75vh solid ${props => props.theme.outline};
`;

export const GallThumb = styled.img`
& {
  border: 0.75vh solid transparent;
  opacity: 50%;
  transition: opacity 0.5s;
}
&: hover {
  opacity: 100%;
}
`;

export const CurrGallThumb = styled.img`
  margin: 0.5vh;
  border: 0.25vh solid ${props => props.theme.border};
  outline: 0.5vh solid ${props => props.theme.outline};
`;

export const NoScrollBar = styled.div`
  &{
    overflow-x: hidden;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    -ms-overflow-style: none;
    transition: transform 0.5s;
    position: relative;
    width: 7.5vh;
  }
  &:: -webkit-scrollbar {
    display: none
  }
`;

export const GalleryScroll = styled.button`
&{
  margin: 0.5vh;
  font-size: 2.5vh;
  text-align: center;
  transition: opacity 0.5s;
  color: ${props => props.theme.text};
  border: none;
  background: none;
  outline: none;
  opacity: 50%;
}
&:hover {
  opacity: 100%
}`;

export const GallThumbContainer = styled.div`
  overflow: hidden;
  position: absolute;
  top: 100px;
  left: 20px;
  width: 7.5vh;
  background: ${props => props.theme.bg};
  height: 56.5vh;
  margin: 4.75vh 1vw;
`;