import CommonHeader from '@/components/common/header/CommonHeader'
import styles from './styles/index.module.scss'
import { useEffect, useState } from 'react';
import Card from './components/Card';
import type { CardDTO } from '../index/types/card';

function index() {

    const [data, setData] = useState<CardDTO[]>([]);
    const getData = () => {
        const getLocalStorage = JSON.parse(localStorage.getItem('bookmark'));

        if(getLocalStorage || getLocalStorage !== null) {
            setData(getLocalStorage);
        } else {
            setData([]);
        }
    }

    useEffect(() => {
        getData();
    }, [])
    
  return (
    <div className={styles.page}>
        {/* 공통 헤더 UI 부분 */}
        <CommonHeader/>
        <main className={styles.page__contents}>
            {/* bookmakr 데이터가 존재하지 않는경우 */}
            {
            data.length === 0 ? 
            (<div className={styles.page__noData}>조회 가능한 데이터가 없습니다.</div>)
            :
            (
                data.map((item: CardDTO)=> {
                    return <Card prop={item} key={item.id} />
                })
            )
            }
            
        </main>

    </div>
  )
}

export default index