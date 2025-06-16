import { useState } from 'react'
import { SeatMap } from '@/components/features'
import { createPortal } from 'react-dom'
import styles from './styles.module.scss'

interface Props {
  name: string
  seatCode: string
}

export const FindSeatButton: React.FC<Props> = ({ name, seatCode }) => {
  const [showSeatMap, setShowSeatMap] = useState(false)

  const openSeatMap = () => setShowSeatMap(true)
  const closeSeatMap = () => setShowSeatMap(false)

  return (
    <>
      <button onClick={openSeatMap} className={styles.findSeatButton}>
        {name}
      </button>

      {showSeatMap &&
        createPortal(
          <SeatMap
            closeSeatMap={closeSeatMap}
            isEditable={false}
            seatCode={seatCode}
          />,
          document.body
        )}
    </>
  )
}
