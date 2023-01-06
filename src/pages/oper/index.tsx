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
    let now = format(addMinutes(new Date, 15), 'HH:mm')
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
            // case 'libre':
            //     element =
            //         <Col span={12} >
            //             <div
            //                 style={{
            //                     outline: '.5px rgba(0, 0, 0, 0.16) solid',
            //                     color: 'green',
            //                     fontWeight: 'bold',
            //                     backgroundColor: 'rgba(255,255,255,0.58)', cursor: 'pointer'}}
            //                 className={styles.item}
            //                 onClick={() => {cellClick(props.items[i].hInicio)}}
            //             >
            //                 {props.items[i].estado}
            //                 {props.items[i].hInicio + " - " + props.items[i].hFin}
            //             </div>
            //         </Col>
            //     break;
            case 'cita':
                element =
                    <Col span={12}>
                        <div style={{
                            outline: '.5px rgba(0, 0, 0, 0.16) solid',
                            color: 'gray',
                            fontWeight: 'bold',
                            backgroundColor: 'rgba(238,238,238,0.58)',
                            opacity: '1'
                        }} className={styles.item}>
                            <div style={{fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase'}}>
                                {props.items[i].hInicio + " - " + props.items[i].hFin}
                            </div>
                            <div style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '-.3px'
                            }}>
                                {props.items[i].usuario}
                            </div>
                            <div>
                                {props.items[i].usuario &&
                                    <Space wrap>
                                        <div style={{paddingTop: '10px'}}>
                                            <Tag color='#f50'>
                                                <a
                                                    style={{
                                                        fontSize: '.6rem',
                                                        fontStyle: 'italic',
                                                        textTransform: 'uppercase'
                                                    }}
                                                    onClick={() => {
                                                        cellClick(props.items[i].hInicio, 'dont')
                                                    }}
                                                >
                                                    Cita no realizada
                                                </a>
                                            </Tag>
                                            <Tag color='#87d068'>
                                                <a
                                                    style={{
                                                        fontSize: '.6rem',
                                                        fontStyle: 'italic',
                                                        textTransform: 'uppercase'
                                                    }}
                                                    onClick={() => {
                                                        cellClick(props.items[i].hInicio, 'did')
                                                    }}
                                                >
                                                    Cita realizada
                                                </a>
                                            </Tag>
                                        </div>
                                    </Space>
                                }
                            </div>

                        </div>
                    </Col>
                break;
            case 'did':
                element =
                    <Col span={12}>
                        <div style={{
                            outline: '.5px rgba(0, 0, 0, 0.16) solid',
                            color: 'white',
                            fontWeight: 'bold',
                            backgroundColor: 'rgb(59,105,11)',
                            opacity: '1'
                        }} className={styles.item}>
                            <div style={{fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase'}}>
                                {props.items[i].hInicio + " - " + props.items[i].hFin}
                            </div>
                            <div style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '-.3px'
                            }}>
                                {props.items[i].usuario}
                            </div>
                            <div>
                                {props.items[i].usuario &&
                                    <Space wrap>
                                        <div style={{paddingTop: '10px'}}>
                                            Cita efectuada exitosamente
                                        </div>
                                    </Space>
                                }
                            </div>

                        </div>
                    </Col>
                break;
            case 'dont':
                element =
                    <Col span={12}>
                        <div style={{
                            outline: '.5px rgba(0, 0, 0, 0.16) solid',
                            color: 'white',
                            fontWeight: 'bold',
                            backgroundColor: 'rgb(154,0,0)',
                            opacity: '1'
                        }} className={styles.item}>
                            <div style={{fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase'}}>
                                {props.items[i].hInicio + " - " + props.items[i].hFin}
                            </div>
                            <div style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '-.3px'
                            }}>
                                {props.items[i].usuario}
                            </div>
                            <div>
                                {props.items[i].usuario &&
                                    <Space wrap>
                                        <div style={{paddingTop: '10px'}}>
                                            Cita no realizada
                                        </div>
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
                        }} className={styles.item}>
                            <div style={{fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase'}}>
                                {props.items[i].hInicio + " - " + props.items[i].hFin}
                            </div>
                            <div style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '-.3px'
                            }}>
                                {props.items[i].usuario}
                            </div>
                            <div>
                                {props.items[i].usuario &&
                                    <Space wrap>

                                        <div style={{paddingTop: '10px'}}>
                                            <Tag color='#0B93CBFF'>
                                                <a
                                                    style={{
                                                        fontSize: '.6rem',
                                                        fontStyle: 'italic',
                                                        textTransform: 'uppercase'
                                                    }}
                                                    onClick={() => {
                                                        cellClick(props.items[i].hInicio, 'cita')
                                                    }}
                                                >
                                                    Registrar cita
                                                </a>
                                            </Tag>

                                        </div>
                                    </Space>
                                }
                            </div>
                        </div>
                    </Col>
                break;
        }

        cdata.push(element)
    }


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

        let n = await axios.put('http://127.0.0.1:5984/citas/' + "f30b185afaa3de5ad3f41f5d54001c1c",
            {
                "_rev": "2-3cabd9766a035ddd7395f42fbb86520b",
                ...items
            }, {
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            })
        console.log("n:" + JSON.stringify(n))

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
            <Input value={code} onChange={changeCode}/>
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
            {data && <Schedule items={data["Piura"].fechas[currentDay]} day={currentDay} onChangeData={changeData}/>}
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk}>
                Usuario {code}, Ud. ya tiene una cita
            </Modal>
        </div>
    )
}

export default Component
