import React, { useEffect, useState } from 'react'
import { ContactButton } from '../ContactButton/ContactButton'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import OptionsIcon from '../icons/OptionsIcon';

const Nav:React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const pageViewMode = useSelector((state: RootState) => state.view.viewSize);
  const pageName = useSelector((state: RootState) => state.page.pageName);

  const handleTouch = (item: string) => {
    setActiveItem(item);
    setTimeout(()=> {
      setActiveItem(null);
    }, 300);
  };

  console.log('pageViewMode',pageViewMode)
  
  const moveBackground = (
    padding: number, 
    gap: number, 
    liWidth: number, 
    index: number
  ) => {
    const translateValue = padding + (index) * liWidth + (index * gap);
    console.log('translateValue',translateValue);
    document.documentElement.style.setProperty('--nav-translate-distance', `${translateValue}px`);
  };

  const indexFromPage = (page: string) => {
    if (page === 'feed') return 0;
    if (page === 'subreddits') return 1;
    if (page === 'account') return 2;
    if (page === 'contact') return 3;
    return 0;
  };

  useEffect(() => {
    const index = indexFromPage(pageName);
    const root = document.documentElement;
    const mobilePadding = parseInt(getComputedStyle(root).getPropertyValue('--mobile-padding'));
    console.log('test',mobilePadding)
    const navLiWidth = parseInt(getComputedStyle(root).getPropertyValue('--nav-li-width'));
    const navGap = (window.innerWidth - (navLiWidth * 4) - (mobilePadding * 2)) / 3;
    moveBackground(mobilePadding, navGap, navLiWidth, index);
  },[pageName]);

  return (
    <>
      <nav>
        <div className={`nav-slide-container ${pageViewMode === 2 ? 'mobile-bg' : ''}`}>
          <div 
            className={
              `nav-slide-background 
              ${pageViewMode === 2 ? 'mobile-bg' : ''}
              ${pageName}-bg`
              }>
            <ul>
              <li>
                <Link className={
                  `${pageViewMode !== 2 ? 'full-nav-li' : 'mobile-nav-li'} 
                  ${activeItem === 'feed' ? 'touch-hover' : ''}
                  ${pageName === 'feed' ? 'current-page' : ''}`.trim()
                  } 
                  to="/feed"
                  onTouchStart={()=> handleTouch('feed')}
                >
                  {pageViewMode === 2 ? <OptionsIcon /> : 'Feed'}
                </Link>
              </li>
              
              <li>
                <Link className={
                  `${pageViewMode !== 2 ? 'full-nav-li' : 'mobile-nav-li'} 
                  ${activeItem === 'subreddits' ? 'touch-hover' : ''}
                  ${pageName === 'subreddits' ? 'current-page' : ''}`.trim()
                  } 
                  to="/subreddits"
                  onTouchStart={()=> handleTouch('subreddits')}
                >
                  {pageViewMode === 2 ? <OptionsIcon /> : 'Subreddits'}
                </Link>
              </li>
              
              <li>
                <Link className={
                  `${pageViewMode !== 2 ? 'full-nav-li' : 'mobile-nav-li'} 
                  ${activeItem === 'account' ? 'touch-hover' : ''}
                  ${pageName === 'account' ? 'current-page' : ''}`.trim()
                  } 
                  to="/account"
                  onTouchStart={()=> handleTouch('account')}
                >
                  {pageViewMode === 2 ? <OptionsIcon /> : 'ACCOUNT'}
                </Link>
              </li>
              {pageViewMode === 2 ? 
              <li>
                <Link className={
                  `${pageViewMode !== 2 ? 'full-nav-li' : 'mobile-nav-li'} 
                  ${activeItem === 'contact' ? 'touch-hover' : ''}
                  ${pageName === 'contact' ? 'current-page' : ''}`.trim()
                  } 
                  to="/contact"
                  onTouchStart={()=> handleTouch('contact')}
                >
                  {pageViewMode === 2 ? <OptionsIcon /> : 'CONTACT'}
                </Link>
              </li>
              :
              null}
            </ul>
          </div>
        </div>
      </nav>
      {pageViewMode === 2 ? null :
      <ContactButton text={'contact'} />}
    </>
  )
}

export default Nav;