import { useState } from 'react'
import styles from './index.module.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import addDays from 'date-fns/addDays'

function Component() {
    return (
        <div className={styles.component}>
            <Calendar
                //tileDisabled={({activeStartDate, date, view }) => date.getDay() === 0}
                tileDisabled={({activeStartDate, date, view }) => {console.log(date); return false}}
                //tileContent={({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null}
                //minDetail="month"
                //activeStartDate={addDays(new Date(), 1)}
                minDate={addDays(new Date(), 1)}
                maxDate={addDays(new Date(), 10)}
                locale="es-PE"
            />

        </div>
    )
}

export default Component
