import type { CardDTO, Tag } from '@/pages/index/types/card'
import styles from './DetailDialog.module.scss'
import { useEffect, useState } from 'react'
import toast, { toastConfig } from 'react-simple-toasts'
import 'react-simple-toasts/dist/theme/dark.css'


toastConfig({theme: 'dark'})

interface Props {
  data: CardDTO
  setOpen: (isOpen: boolean) => void
}

function DetailDialog({data, setOpen}: Props) {

  const closeDialog = (event: any) => {
    //event.stopPropagation();
    //event.preventDefault();
    //const isDialog = event.target.closest('.dialog-inner-wrap');
    //console.log('closeDialog 함수호출', isDialog, event);
    setOpen(false);
    
    

  }

  const [bookmark, setBookmark] = useState(false);
  //북마크 추가이벤트
  const addBookmark = (selected: CardDTO) => {
    setBookmark(true);

    const getLocalStorage = JSON.parse(localStorage.getItem('bookmark'));
    console.log('getLocalStorage >>>', getLocalStorage)
    //1.로컬스토리지에 bookmark라는 데이터가 없을 경우
    if(!getLocalStorage || getLocalStorage === null) {console.log('해당 이미지를 북마크에 저장하였습니다!!.')
      localStorage.setItem('bookmark', JSON.stringify([selected]))
      toast('해당 이미지를 북마크에 저장하였습니다!!.')

    } else {
      console.log('getLocalStorage', getLocalStorage, selected.id, getLocalStorage.findIndex((item: CardDTO) => item.id === selected.id))
      //해당 이미지가 이미 로컬 스토리지 bookmark에 데이터 저장이 되어 있는 경우
      if(getLocalStorage.findIndex((item: CardDTO) => item.id === selected.id) > -1) {
        console.log('해당 이미지는 이미 북마크에 추가된 상태입니다.')
        toast('해당 이미지는 이미 북마크에 추가된 상태입니다.❌')
      } else {console.log('bookmark 추가')
        //해당 이미지가 로컬스토리지 bookmark에 저장되어 있지 않는경우
        const res = [...getLocalStorage]
        res.push(selected)
        localStorage.setItem('bookmark', JSON.stringify(res))
        toast('해당 이미지를 북마크에 저장하였습니다.!!😊')
        
      }
    }
  }
  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('bookmark'));
    if(getLocalStorage && getLocalStorage.findIndex((item: CardDTO) => item.id === data.id) > -1) {
      setBookmark(true);
    } else if(!getLocalStorage) return

    //ESC 키를 눌렀을때 다이얼로그 창 닫기
    const escKeyDownCloseDialog = (event: KeyboardEvent) => {
      console.log('escKeyDownCloseDialog 함수호출', event);

      if(event.key === 'Escape') {
        closeDialog(event);
      }
      
    }

    //위에 만들어놓은 escKeyDownCloseDialog를 키다운 했을 때 이벤트로 등록 및 해지
    document.addEventListener('keydown', escKeyDownCloseDialog);
    return () => document.removeEventListener('keydown', escKeyDownCloseDialog);

  }, [])

  return (
    <div className={styles.container} onClick={closeDialog}>
      <div className={styles.container__dialog } onClick={(event) => {event.stopPropagation()}}>
        <div className={styles.container__dialog_header}>
          <div className={styles.close}>
            <button className={styles.close__button} onClick={() => setOpen(false)}>
              {/* 구글이미지 아이콘 사용 */}
                <span className="material-symbols-outlined" style={{fontSize: 28 + 'px' }}>
                  Close
                </span>
              </button>
              <img src={data.user.profile_image.small} alt="사진작가 프로필 사진" className={styles.close__authorImage}></img>
              <span className={styles.close__authorName}>{data.user.name}</span>
          </div>
          <div className={styles.bookmark}>
            <button className={styles.bookmark__button} onClick={() => {addBookmark(data)}}>
              {/* 구글 아이콘을 사용 */}
              {bookmark === false ? (
                <span className="material-symbols-outlined" style={{fontSize: 16 + 'px' }}>
                  Favorite
                </span>
              ) : (
                <span className="material-symbols-outlined" style={{fontSize: 16 + 'px', color: 'red' }}>
                  Favorite
                </span>
              )}
              북마크
            </button>
            <button className={styles.bookmark__button}>다운로드</button>
          </div>
        </div>
        <div className={styles.container__dialog_body}>
          <img src={data.urls.small} alt="상세이미지" className={styles.image}></img>
        </div>
        <div className={styles.container__dialog_footer}>
          <div className={styles.infoBox}>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>이미지 크기</span>
              <span className={styles.infoBox__item_value}>{data.width} X {data.height}</span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>업로드</span>
              <span className={styles.infoBox__item_value}>{data.created_at.split('T')[0]}</span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>마지막 업데이트</span>
              <span className={styles.infoBox__item_value}>{data.updated_at.split('T')[0]}</span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>다운로드</span>
              <span className={styles.infoBox__item_value}>{data.likes}</span>
            </div>
          </div>
          <div className={styles.tabBox}>
              {data.tags && data.tags.map((tag: Tag) => {
                return (
                <div className={styles.tabBox__tag} key={tag.title}>{tag.title}</div>
                  )
                })
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailDialog