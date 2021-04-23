import React from 'react';
import { Left, GallThumb, CurrGallThumb, NoScrollBar, GalleryScroll, GallThumbContainer} from './../../Styles';

class Gallery extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      position: 0,
      numImgs: 0,
      scrollTop: 0,
      scrollBtm: false,
    };
    this.scroll = this.scroll.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    let scrollTop = document.getElementById("galleryscroll").scrollTop;
    let scrollHeight = document.getElementById("galleryscroll").scrollHeight;
    let clientHeight = document.getElementById("galleryscroll").clientHeight;
    let scrollBtm = (scrollHeight - scrollTop === clientHeight);
    this.setState({
      scrollTop: scrollTop,
      scrollBtm: scrollBtm
    });
  }

  scroll(direction) {
    let pos = this.state.position;
    let dist = 8.25;
    console.log('scroll', direction, 'clicked');
    if (direction === 'up') {
      document.getElementById("galleryscroll").scrollBy({
        top: '-100',
        left: 0,
        behavior: 'smooth'
      });
      // pos += dist;
      // if (pos > 0) {
      //   pos = 0;
      // }
    } else if (direction === 'down') {
      document.getElementById("galleryscroll").scrollBy({
        top: '100',
        left: 0,
        behavior: 'smooth'
      });
      // pos -= dist;
      // if (pos < (this.state.numImgs - 7) * -dist) {
      //   pos = (this.state.numImgs - 7) * -dist;
      // }
    }
    this.setState({
      position: pos,
    });
  }

  render() {
    const changeImg = this.props.changeImg;
    const styles = this.props.styles;
    const currImg = this.props.currImg;
    const galImg = {
      objectFit: 'cover',
      objectPosition: '50% 50%',
      width: '100%',
      height: '100%'
    };
    // const gallerythumbs = {
    //   whiteSpace: 'wrap',
    //   display: 'grid',
    //   gridTemplateColumns: '100%',
    //   gridTemplateRows: 'auto',
    //   scrollSnapType: 'y mandatory',
    //   overflowY: 'auto',
    //   cursor: 'all-scroll',
    //   -ms-overflow-style: 'none',
    // };
    const position = {
      transform: `translateY(${this.state.position}vh)`
      ,
    }
    const container = {
      display: 'grid',
      height: '56.5vh',
      margin: '4.75vh 1vw',
      justifyItems: 'center',
      background: 'none',
    };
    const bg = {
      opacity: '0.5',
    };
    const thumb = {
      objectFit: 'cover',
      objectPosition: '50% 50%',
      width: '6vh',
      height: '6vh',
      scrollSnapAlign: 'center',
    }
    const buttonContainer = {
      display: 'flex',
      flexDirection: 'column',
      background: 'none',
      justifyContent: 'space-between',
      alignContent: 'space-between',
    }

    return (
      <Left style={{alignContent: 'center', minWidth: '400px'}}>
        <div id="gallery" style={{height: '66vh'}}>
          <img
            style={galImg}
            src={styles[currImg[0]].photos[currImg[1]].url}/>
          <GallThumbContainer style={bg}></GallThumbContainer>
          <GallThumbContainer style={buttonContainer}>
            {this.state.scrollTop > 0 ? <GalleryScroll onClick={() => this.scroll('up')}>
              <i className="lni lni-chevron-up-circle"></i>
              </GalleryScroll> : <GalleryScroll></GalleryScroll>}
            {this.state.scrollBtm ? <GalleryScroll>
            </GalleryScroll>: <GalleryScroll onClick={() => this.scroll('down')}>
            <i className="lni lni-chevron-down-circle"></i>
            </GalleryScroll>}
          </GallThumbContainer>
          <GallThumbContainer style={container}>
            <NoScrollBar
              id="galleryscroll"
              style={position}
              onScroll={this.handleScroll}>
                {styles.map((style, sIndex) => {
                  return style.photos.map((photo, pIndex) => {
                    this.state.numImgs++;
                    if ((sIndex === currImg[0]) &&
                        (pIndex === currImg[1])) {
                        return <CurrGallThumb
                          style={thumb}
                          key={[sIndex, pIndex]}
                          src={photo.thumbnail_url} />
                    } else {
                      return <GallThumb
                        style={thumb}
                        key={[sIndex, pIndex]}
                        src={photo.thumbnail_url}
                        onClick={() => {changeImg(sIndex, pIndex)}} />
                    }
                  })
                })}
            </NoScrollBar>
          </GallThumbContainer>
        </div>
      </Left>
    );
  }
}

export default Gallery;