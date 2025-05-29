import { useRecoilState } from 'recoil';
import styles from './CommonSearchBar.module.scss'
import { useState } from 'react';
import { searchState } from '@/recoil/atoms/searchState';
import { pageState } from '@/recoil/atoms/pageState';

function CommonSearchBar() {
  const [text, setText] = useState("");
  const [search, setSearch] = useRecoilState(searchState)
  const [page, setPage] = useRecoilState(pageState)
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event', event.target.value);
    setText(event.target.value)
  }
  
  const onSearch = () => {
    console.log('onSearch', text);
    if(text === '') {
      setSearch('Korea');
    } else {
      setSearch(text);
    }
    setPage(1);
  }
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    console.log('handleKeyDown', text, event);
    if(event.key === 'Enter') {
      if(text === '') {
        setSearch('Korea');
      } else {
        setSearch(text);
      }
    }
    
  }
  return (
    <div className={styles.searchBar}>
        <div className={styles.searchBar__search}>
            <input type="text" placeholder='찾으실 이미지를 검색하세요.' className={styles.searchBar__search__input} value={text} onChange={onChange} onKeyDown={handleKeyDown}></input>
            <img src="src/assets/icons/icon-search.svg" alt="" onClick={onSearch}></img>
        </div>

    </div>
  )
}

export default CommonSearchBar