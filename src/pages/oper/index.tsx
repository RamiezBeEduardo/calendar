import {useEffect, useState, Suspense} from 'react'
import styles from './index.module.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {addDays, addMinutes, format} from 'date-fns'
//import oData from './data.json'
import 'antd/dist/reset.css';
import {Typography, Table, Tag, Col, Row, Input, Modal, Space, Button} from "antd";
import axios from 'axios'

const Schedule = (props: any) => {
    const cellClick = (e: any, c: any) => {
        console.log('cellClick')
        console.log(e)
        props.onChangeData(e, c)
    }

    console.log('yyy')

    let today = format(new Date, 'yyyy-MM-dd')
    let now = format(addMinutes(new Date, 15),  'HH:mm')
    console.log(today)
    console.log(props.day)

    let cdata = []
    for (let i = 0; i < props?.items?.length; i++) {
        //columns.push({title: props.items[i].hInicio + " - " + props.items[i].hFin, index: "estado"}
        let element


        if (props.day == today && props.items[i].hInicio <= now) {
            console.log("I:" + props.items[i].hInicio)
            console.log("N:" + now)
            props.items[i].estado = 'xxx'
        }

        switch (props.items[i].estado) {
            case 'libre':
                element =
                    <Col span={12} >
                        <div
                            style={{
                                outline: '.5px rgba(0, 0, 0, 0.16) solid',
                                color: 'green',
                                fontWeight: 'bold',
                                backgroundColor: 'rgba(255,255,255,0.58)', cursor: 'pointer'}}
                            className={styles.item}
                            onClick={() => {cellClick(props.items[i].hInicio)}}
                        >
                            {props.items[i].estado}
                            {props.items[i].hInicio + " - " + props.items[i].hFin}
                        </div>
                    </Col>
                break;
            case 'cita':
                element =
                    <Col span={12}>
                        <div style={{
                            outline: '.5px rgba(0, 0, 0, 0.16) solid',
                            color: 'blue',
                            fontWeight: 'bold',
                            backgroundColor: 'rgba(255,255,255,0.58)',
                            opacity: '1'
                        }} className={styles.item} >
                            <div style={{fontSize: '1rem', paddingTop: '6px'}}>{props.items[i].hInicio + " - " + props.items[i].hFin}</div>
                            <div style={{fontSize: '1.2rem', fontStyle: 'italic', textTransform: 'uppercase', padding: '6px'}}>
                                {props.items[i].usuario}
                            </div>
                            <div>
                                {props.items[i].usuario &&
                                    <Space wrap>
                                        <Tag color='#f50'>
                                            <a
                                                style={{fontSize: '.6rem', fontStyle: 'italic', textTransform: 'uppercase'}}
                                                // onClick={() => {cellClick('cita')}}
                                            >
                                                Cita realizada
                                            </a>
                                        </Tag>
                                        <Tag color='#87d068'>
                                            <a
                                                style={{fontSize: '.6rem', fontStyle: 'italic', textTransform: 'uppercase'}}
                                                // onClick={() => {cellClick('cita')}}
                                            >
                                                Cita no realizada
                                            </a>
                                        </Tag>
                                    </Space>
                                }
                            </div>

                        </div>
                    </Col>
                break;

            case 'Ocupado':
                element =
                    <Col span={12}>
                        <div style={{
                            outline: '.5px rgba(0, 0, 0, 0.16) solid',
                            color: 'gray',
                            fontWeight: 'bold',
                            backgroundColor: 'rgba(238,238,238,0.58)',
                            opacity: '1'
                        }} className={styles.item} >
                            <div>{props.items[i].hInicio + " - " + props.items[i].hFin}</div>
                            <div style={{fontSize: '.6rem', fontStyle: 'italic', textTransform: 'uppercase'}}>
                                {props.items[i].usuario}
                            </div>
                            <div>
                                {props.items[i].usuario &&
                                    <Space wrap>
                                        {props.items[i].estado}
                                        <a
                                            style={{fontSize: '.6rem', fontStyle: 'italic', textTransform: 'uppercase'}}
                                            onClick={() => {cellClick(props.items[i].hInicio, 'cita')}}
                                        >
                                            Registrar cita
                                        </a>
                                    </Space>
                                }
                            </div>

                        </div>
                    </Col>
                break;
        }

        cdata.push(element)
    }


    // return (
    //     <div style={{marginBottom: "20px", marginTop: "20px", fontFamily: "Arial, Helvetica"}}>
    //         <Table bordered columns={columns} dataSource={cdata} size="small"
    //         />
    //     </div>
    // )

    return (
        <Row gutter={16} className={styles.grid}>
            {cdata}
        </Row>
    )
}

function Component() {
    const [currentDay, setCurrentDay] = useState(format(new Date, 'yyyy-MM-dd'))
    const [data, setData] = useState(null);
    const [code, setCode] = useState(202001)
    const [isModalOpen, setIsModalOpen] = useState(false)

    console.log('data')
    console.log(data)

    useEffect(() => {
        (async () => {
            const d = await axios.get('http://127.0.0.1:5984/citas/_all_docs?include_docs=true', {
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            })
            setData(d.data.rows[0].doc)
        })()
    }, []);





    const handleOk = () => {
        setIsModalOpen(false)
    }
    const changeData = async (e: any, c: any) => {
        console.log('xxx')
        console.log(e)
        let items = {...data};

        // let c = 0
        // for (const fecha in items["Piura"].fechas) {
        //     console.log(fecha)
        //     let list = items["Piura"].fechas[fecha].filter((it: any) => { return it.usuario == code});
        //     console.log('list')
        //     console.log(list)
        //     c = c + list.length
        // }
        // console.log('C: ' + c);
        // if (c) {
        //     setIsModalOpen(true)
        //     return
        // }

        // @ts-ignore
        let l = (items["Piura"].fechas[currentDay].length)
        // @ts-ignore
        for (let i = 0; i < items["Piura"].fechas[currentDay].length; i++) {
            // @ts-ignore
            
            console.log(i)
            console.log(items["Piura"].fechas[currentDay][i]?.hInicio)
            console.log(e.substring(0, 5))
            if (items["Piura"].fechas[currentDay][i]?.hInicio == e.substring(0, 5)) {
                console.log('rrrr')
                console.log(c)
                items["Piura"].fechas[currentDay][i].estado = c
            }
        }

        console.log('items')
        console.log(items)

        await axios.put('http://127.0.0.1:5984/citas/' +   "e32885688ef99ddfc19c80ddd9000af3",
            {
                "_rev": "2-3cabd9766a035ddd7395f42fbb86520b",
                ...items
            }, {
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            })


        setData(items)
    }
    const tile = (date: Date) => {
        let fdate = format(date, 'yyyy-MM-dd')
        // @ts-ignore
        if (data && data["Piura"]?.fechas[fdate]) {
            // @ts-ignore
            let _empty = data["Piura"].fechas[fdate].filter((d: any) => {
                return d.estado == "libre"
            })
            console.log(fdate)
            console.log(_empty.length != 0)
            return (_empty.length == 0)
        } else {
            return true
        }
    }

    const clickDay = (day: any) => {
        setCurrentDay(format(day, 'yyyy-MM-dd'))
    }

    // @ts-ignore

    const changeCode = (e: any) => {
        console.log(e)
        setCode(e.target.value)
    }

    return (
        <div className={styles.component}>
            <h2 style={{color: '#003659', marginBottom: '30px', marginTop: '20px', textTransform: "uppercase"}}>Gestión
                de Citas</h2>
            <h3 style={{color: '#003659', marginBottom: '5px', marginTop: '30px', textTransform: "uppercase"}}>
                0. Ingrese código de usuario
            </h3>
            <Input value={code} onChange={changeCode} />
            <h3 style={{color: '#003659', marginBottom: '5px', marginTop: '30px', textTransform: "uppercase"}}>
            1. Seleccione una fecha libre en el calendario
            </h3>
            <Calendar
                //tileDisabled={({activeStartDate, date, view }) => date.getDay() === 0}
                //tileDisabled={({activeStartDate, date, view }) => {tile(date); return false}}
                // tileDisabled={({activeStartDate, date, view}) => {
                //     return tile(date)
                // }}
                //tileContent={({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null}
                //minDetail="month"
                //activeStartDate={addDays(new Date(), 1)}
                //minDate={addDays(new Date(), 0)}
                maxDate={addDays(new Date(), 1)}
                locale="es-PE"
                onClickDay={clickDay}
            />
            <h3 style={{color: '#003659', marginBottom: '0px', marginTop: '30px', textTransform: "uppercase"}}>
                2. Seleccione un horario libre de la lista
            </h3>
            {data && <Schedule items={data["Piura"].fechas[currentDay]} day={currentDay} onChangeData={changeData}/> }
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} >
                Usuario {code}, Ud. ya tiene una cita
            </Modal>
        </div>
    )
}

export default Component
