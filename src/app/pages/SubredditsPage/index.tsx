import React, { useState, useEffect, useMemo } from 'react';
import { useGetPopularSubredditsQuery, useSearchSubredditsQuery } from '../../store/middleware/subredditsAPI';
import { parseSearchData } from '../../../utils/parseResponseData';
import { ResponseData, Subreddit } from '../../../types/api';
import { Search } from './Search/Search';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { showPopular, searchValue, setSubredditsResults } from '../../store/slices/searchSlice';
import { RootState } from '../../store/store';
import { setPage } from '../../store/slices/pageSlice';
import SubredditSelector from './SubredditSelector';
import SubredditSelectedList from './SubredditSelectedList';
import SearchSelectedSwitch from './SearchSelectedSwitch';
import '../../../styles/SubredditsPage.scss'

const SubredditsPage: React.FC = () => {
  const [searchSwitch, setSearchSwitch] = useState<boolean>(false);
  const pageViewMode = useSelector((state: RootState) => state.view.viewSize);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(setPage('subreddits'));
  },[dispatch]);

  const handleSearch = () => {
    setSearchSwitch(!searchSwitch);
    console.log(searchSwitch);
  };
  
  const isShowPopular = useSelector(showPopular, shallowEqual);
  const updatedSearchVal = useSelector(searchValue, shallowEqual);

  const { data: popularData, error: popularError, isLoading: popularIsLoading } = useGetPopularSubredditsQuery(undefined,
    {skip: !isShowPopular}
  );
  const { data: searchData, error: searcHError, isLoading: searchIsLoading } = useSearchSubredditsQuery(updatedSearchVal,
    {skip: isShowPopular || !updatedSearchVal}
  );

  const data = isShowPopular ? popularData : searchData;
  const error = isShowPopular ? popularError : searcHError;
  const isLoading = isShowPopular ? popularIsLoading : searchIsLoading;

  console.log('Data:', data)
  console.log('Error:', error)

  const parsedData: Subreddit[] = useMemo(() => 
    (data ? parseSearchData(data as ResponseData): []), [data]);

  useEffect(()=> {
    dispatch(setSubredditsResults(parsedData));
  },[dispatch, parsedData]);

  const subredditsArray = useSelector((state: RootState) => state.subreddits.selected);
  console.log('Selected: ', subredditsArray);

  return (
    <div className='subreddits-container'>
      {pageViewMode === 2 ? 
      <SearchSelectedSwitch
        searchSwitch={searchSwitch}
        handleSearch={handleSearch}
      /> : null}
      <div className={`subreddits-select-container 
        ${pageViewMode === 2 ? searchSwitch 
        ? 'hide' : '' : ''}`}>
        <Search />
        {
          error ? (<p>Error loading subreddits!</p>) 
          :
          isLoading ? (<p>Loading...</p>) 
          :
          <SubredditSelector />
        }
      </div>
        <div className={`subreddits-selected-container 
          ${
            pageViewMode === 2 ? 
            !searchSwitch ? 'hide' : 'grid-layout' 
            : 'grid-layout tab-full'
          } 
        `}>
          <div className='selected-title'>
            <h1>Selected</h1>
          </div>
          <SubredditSelectedList />
        </div>
      </div>
  )
}

export default SubredditsPage;
