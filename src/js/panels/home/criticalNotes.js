import React, { useState } from "react";
import {
    Alert,
    Button,
    Card,
    Div,
    Footer,
    FormItem,
    FormLayout, Headline,
    Snackbar
} from "@vkontakte/vkui";
import {
    Icon28CheckCircleOutline, Icon28CopyOutline,
    Icon28DeleteOutline,
    Icon28EditOutline
} from "@vkontakte/icons";
import declOfNum from '../../functions/delcOfNum';
import bridge from "@vkontakte/vk-bridge";

function CriticalNotes({criticalNotes, router, isDesktop, editNote, openSnackbar, allNotes, getNotes}) {
    const [snackbarDel, setSnackbarDel] = useState(null)

    const statuses = [
        'Открыт',
        'В работе',
        'Завершен',
        'На рассмотрении',
    ]

    const priorites = [
        'Низкий',
        "Средний",
        "Высокий",
        "Критический"
    ]

    function openAlert(id, index) {
        router.toPopout(
            <Alert
                actions={[{
                    title: 'Нет',
                    autoclose: true,
                    mode: 'cancel',
                }, {
                    title: 'Да',
                    autoclose: true,
                    mode: 'destructive',
                    action: () => deleteNote(id)
                }]}
                onClose={() => router.toPopout()}
                header='Подтверждение'
                text='Вы точно хотите удалить эту заметку?'
            />
        )
    }

    async function deleteNote(id) {
        try {
            let token = window.location.search.slice(1)
            let params = {
                access_token: token,
                method: 'notes.deleteNote',
                noteId: Number(id),
            }
            await fetch(
                'https://sab.wan-group.ru/notes',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(params)
                }
            )

            allNotes.items.forEach((el, index) => {
                if (el.noteId === id) {
                    let arr = allNotes
                    arr.items.splice(index, 1);
                    arr.count -= 1
                    getNotes(arr, false)

                    openSnackbarDel()
                    return
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    function openSnackbarDel() {
        setSnackbarDel(
            <Snackbar
                className='snack'
                layout='vertical'
                onClose={() => setSnackbarDel(null)}
                before={<Icon28DeleteOutline/>}
            >
                Заметка удалена!
            </Snackbar>
        )
    }

    return (
        <>
            {criticalNotes.items.map((el, index) => {
                return (
                    <Div>
                        <Card mode='outline'>
                            <FormLayout>
                                <FormItem
                                    style={{whiteSpace: 'pre-line'}}
                                    top={
                                        <Headline style={{whiteSpace: 'pre-line'}}>{el.name}</Headline>
                                    }
                                    bottom={
                                        <>
                                            Статус: {statuses[el.status]}, <br/>
                                            Приоритет: <span className={el.priority === 3 && 'critical'}>{priorites[el.priority]}</span> <br/>
                                            Создано: {el.time} <br/>
                                            Отредактировано: {el.timeEdit}
                                        </>
                                    }
                                >
                                    {el.value}
                                </FormItem>
                                <FormItem>
                                    <Button
                                        className='btnNote'
                                        mode='outline'
                                        onClick={() => editNote(el.noteId, el.name, el.value, el.status, el.priority)}
                                        sizeY='regular'
                                    >
                                        <Icon28EditOutline/>
                                    </Button>
                                    <Button
                                        className='btnNote'
                                        mode='outline'
                                        onClick={() => {
                                            bridge.send(
                                                "VKWebAppCopyText",
                                                {
                                                    text: `${el.name}\n\n${el.value}\n\nСтатус: ${statuses[el.status]}\n\nПриоритет: ${priorites[el.priority]}`});
                                            openSnackbar('Заметка скопирована!', <Icon28CheckCircleOutline/>)
                                        }}
                                        sizeY='regular'
                                    >
                                        <Icon28CopyOutline/>
                                    </Button>
                                    <Button
                                        className='btnNote'
                                        mode='outline'
                                        appearance='negative'
                                        sizeY='regular'
                                        onClick={() => openAlert(el.noteId, index)}
                                    >
                                        <Icon28DeleteOutline/>
                                    </Button>
                                </FormItem>
                            </FormLayout>
                        </Card>
                    </Div>
                )
            })}
            <Footer>Всего {criticalNotes.count} {declOfNum(criticalNotes.count, ['заметка', 'заметки', 'заметок'])}</Footer>

            {snackbarDel}
        </>
    )
};

export default CriticalNotes;
