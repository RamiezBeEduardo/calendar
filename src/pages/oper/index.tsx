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
        props.onChangeData(e, c)
    }

    let today = format(new Date, 'yyyy-MM-dd')
    let now = format(addMinutes(new Date, 15), 'HH:mm')
    let cdata = []
    for (let i = 0; i < props?.items?.length; i++) {
        //columns.push({title: props.items[i].hInicio + " - " + props.items[i].hFin, index: "estado"}
        let element
        if (props.day == today && props.items[i].hInicio <= now) {
            props.items[i].estado = 'xxx'
        }

        switch (props.items[i].estado) {
            case 'cita':
                element =
                    <Col span={24}>
                        <div style={{
                            outline: '.5px rgba(0, 0, 0, 0.16) solid',
                            color: 'gray',
                            fontWeight: 'bold',
                            backgroundColor: 'rgba(238,238,238,0.58)',
                            opacity: '1',
                            paddingBottom: '7px'
                        }} className={styles.item}>
                            <div style={{fontFamily: 'Roboto Condensed', color: '#03498f', fontSize: '1.3rem', fontWeight: 'bold', textTransform: 'uppercase'}}>
                                {props.items[i].hInicio + " - " + props.items[i].hFin}
                            </div>
                            <div style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                //textTransform: 'uppercase',
                                letterSpacing: '-.3px',
                                color: 'black',
                                fontFamily: 'Roboto Condensed',
                            }}>
                                {props.items[i].usuario}
                            </div>
                            <div style={{
                                fontSize: '0.9rem',
                                //textTransform: 'uppercase',
                                letterSpacing: '-.3px',
                                color: '#03498f',
                                fontFamily: 'Roboto Condensed',
                            }}>
                                {props.items[i].email}
                            </div>
                            <div style={{
                                fontSize: '0.9rem',
                                //textTransform: 'uppercase',
                                fontWeight: 500,
                                letterSpacing: '-.6px',
                                color: '#03498f',
                                fontFamily: 'Roboto Condensed',
                                textDecoration: 'underline',
                                marginTop: '4px',
                                cursor: 'pointer'
                            }}>
                                {props.items[i].enlace}
                            </div>
                            <div style={{
                                fontSize: '0.9rem',
                                //textTransform: 'uppercase',
                                fontStyle: 'italic',
                                fontWeight: 500,
                                letterSpacing: '-.3px',
                                color: '#505252',
                                fontFamily: 'Roboto Condensed',
                                marginTop: '4px'
                            }}>
                                {props.items[i].comment}
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
                    <Col span={24}>
                        <div style={{
                            outline: '.5px rgba(0, 0, 0, 0.16) solid',
                            color: 'white',
                            fontWeight: 'bold',
                            backgroundColor: 'rgb(59,105,11)',
                            opacity: '1'
                        }} className={styles.item}>
                            <div style={{fontFamily: 'Roboto Condensed', color: '#03498f', fontSize: '1.3rem', fontWeight: 'bold', textTransform: 'uppercase'}}>
                                {props.items[i].hInicio + " - " + props.items[i].hFin}
                            </div>
                            <div style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                //textTransform: 'uppercase',
                                letterSpacing: '-.3px',
                                color: 'black',
                                fontFamily: 'Roboto Condensed',
                            }}>
                                {props.items[i].usuario}
                            </div>
                            <div style={{
                                fontSize: '0.9rem',
                                //textTransform: 'uppercase',
                                letterSpacing: '-.3px',
                                color: '#03498f',
                                fontFamily: 'Roboto Condensed',
                            }}>
                                {props.items[i].email}
                            </div>
                            <div style={{
                                fontSize: '0.9rem',
                                //textTransform: 'uppercase',
                                fontStyle: 'italic',
                                fontWeight: 500,
                                letterSpacing: '-.3px',
                                color: '#505252',
                                fontFamily: 'Roboto Condensed',
                                marginTop: '4px'
                            }}>
                                {props.items[i].comment}
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
                            <div style={{
                                fontSize: '.7rem',
                                textTransform: 'uppercase',
                                fontStyle: 'italic',
                                letterSpacing: '-.3px'
                            }}>
                                {props.items[i].enlace}
                            </div>
                        </div>
                    </Col>
                break;
            case 'dont':
                element =
                    <Col span={24}>
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
                            <div style={{
                                fontSize: '.7rem',
                                textTransform: 'uppercase',
                                fontStyle: 'italic',
                                letterSpacing: '-.3px'
                            }}>
                                {props.items[i].enlace}
                            </div>
                        </div>
                    </Col>
                break;
            case 'Ocupado':
                element =
                    <Col span={24}>
                        <div style={{
                            outline: '.5px rgba(0, 0, 0, 0.16) solid',
                            color: 'gray',
                            fontWeight: 'bold',
                            backgroundColor: 'rgba(238,238,238,0.58)',
                            opacity: '1',
                            paddingBottom: '7px'
                        }} className={styles.item}>
                            <div style={{fontFamily: 'Roboto Condensed', color: '#03498f', fontSize: '1.3rem', fontWeight: 'bold', textTransform: 'uppercase'}}>
                                {props.items[i].hInicio + " - " + props.items[i].hFin}
                            </div>
                            <div style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                //textTransform: 'uppercase',
                                letterSpacing: '-.3px',
                                color: 'black',
                                fontFamily: 'Roboto Condensed',
                            }}>
                                {props.items[i].usuario}
                            </div>
                            <div style={{
                                fontSize: '0.9rem',
                                //textTransform: 'uppercase',
                                letterSpacing: '-.3px',
                                color: '#03498f',
                                fontFamily: 'Roboto Condensed',
                            }}>
                                {props.items[i].email}
                            </div>
                            <div style={{
                                fontSize: '0.9rem',
                                //textTransform: 'uppercase',
                                fontStyle: 'italic',
                                fontWeight: 500,
                                letterSpacing: '-.3px',
                                color: '#505252',
                                fontFamily: 'Roboto Condensed',
                                marginTop: '4px'
                            }}>
                                {props.items[i].comment}
                            </div>
                            <div>
                                {props.items[i].code}
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
    const [isModalOpen, setIsModalOpen] = useState({state: false, type: null, data: null})
    const [chunkValue, setChunkValue] = useState()

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
        changeData(isModalOpen.type, isModalOpen.data)
        setIsModalOpen({state: false, type: null, data: null})
    }

    const handleCancel = () => {
        setIsModalOpen({state: false, type: null, data: null})
    }

    const _changeData = async (e: any, c: any) => {
        setIsModalOpen({state: true, type: e, data: c})
    }
    const changeData = async (e: any, c: any) => {
        let items = {...data};

        // @ts-ignore
        let l = (items["Piura"].fechas[currentDay].length)
        // @ts-ignore
        for (let i = 0; i < items["Piura"].fechas[currentDay].length; i++) {
            // @ts-ignore
            if (items["Piura"].fechas[currentDay][i]?.hInicio == e.substring(0, 5)) {
                items["Piura"].fechas[currentDay][i].estado = c
                items["Piura"].fechas[currentDay][i].enlace = chunkValue
            }
        }

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
        setCode(e.target.value)
    }

    const changeChunk = (e: any) => {
        setChunkValue(e.target.value)
    }
    return (
        <div className={styles.component}>
            <h2 style={{color: '#003659', marginBottom: '30px', marginTop: '20px', textTransform: "uppercase"}}>Gestión
                de Citas</h2>
            <h3 style={{color: '#003659', marginBottom: '5px', marginTop: '30px', textTransform: "uppercase"}}>
                1. Seleccione una fecha en el calendario
            </h3>
            <Calendar
                maxDate={addDays(new Date(), 1)}
                locale="es-PE"
                onClickDay={clickDay}
            />
            <h3 style={{color: '#003659', marginBottom: '0px', marginTop: '30px', textTransform: "uppercase"}}>
                2. Seleccione un horario libre de la lista
            </h3>
            {data && <Schedule items={data["Piura"].fechas[currentDay]} day={currentDay} onChangeData={_changeData}/>}
            <Modal title="Actualice información" open={isModalOpen.state} onOk={handleOk} onCancel={handleCancel}>
                <Input value={chunkValue} onChange={changeChunk}/>
            </Modal>
        </div>
    )
}

export default Component
