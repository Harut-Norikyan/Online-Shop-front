import React, { Component } from 'react';
import {
  FacebookIcon, TwitterIcon, TelegramIcon, InstapaperIcon,
  FacebookShareButton, InstapaperShareButton, TelegramShareButton,
  TwitterShareButton,
} from 'react-share';

class ShareIcon extends Component {
  render() {
    const shareIcon = [{ id: 1, button: FacebookShareButton, icon: FacebookIcon },
      { id: 2, button: InstapaperShareButton, icon: InstapaperIcon },
      { id: 3, button: TelegramShareButton, icon: TelegramIcon },
      { id: 4, button: TwitterShareButton, icon: TwitterIcon }];
    return (
      <div>
        {shareIcon.map((i) => (

          <i.button url={window.location.href.split('?')[0]} key={i.id}>
            <div className="icon" key={i.id}>
              <i.icon size={32} round />
            </div>
          </i.button>
        ))}

      </div>
    );
  }
}

export default ShareIcon;
