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
    Icon28DeleteOutline,
    Icon28EditOutline
} from "@vkontakte/icons";
import declOfNum from '../../functions/delcOfNum';

function MiddleNotes({middleNotes, router, isDesktop, editNote, openSnackbar, allNotes, getNotes}) {
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

    function openAlert(id) {
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
            let token = window.location.search.slice(1).replace(/&/gi, '/');
            await fetch(`https://sab.wan-group.ru/notes?method=notes.deleteNote&noteId=${id}&access_token=${token}`)

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
        }
        catch (err) {
            console.log(err)
        }
    }

    function openSnackbarDel() {
        setSnackbarDel(
            <Snackbar
                className={!isDesktop && 'snack'}
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
            {middleNotes.items.map((el) => {
                return (
                    <Div>
                        <Card mode='outline'>
                            <FormLayout>
                                <FormItem
                                    top={
                                        <Headline style={{whiteSpace: 'pre-line'}}>{el.name}</Headline>
                                    }
                                    bottom={
                                        <>
                                            Статус: {statuses[el.status]},
                                            приоритет: <span className={el.priority === 3 && 'critical'}>{priorites[el.priority]}</span>
                                        </>
                                    }
                                >
                                    {el.value}
                                </FormItem>
                                <FormItem>
                                    <Button
                                        className='btnNote'
                                        mode='outline'
                                        onClick={() => {editNote(el.noteId, el.name, el.value, el.status, el.priority); getNotes()}}
                                        sizeY='regular'
                                    >
                                        <Icon28EditOutline/>
                                    </Button>
                                    <Button
                                        className='btnNote'
                                        mode='outline'
                                        appearance='negative'
                                        sizeY='regular'
                                        onClick={() => openAlert(el.noteId)}
                                    >
                                        <Icon28DeleteOutline/>
                                    </Button>
                                </FormItem>
                            </FormLayout>
                        </Card>
                    </Div>
                )
            })}
            <Footer>Всего {allNotes.count} {declOfNum(allNotes.count, ['заметка', 'заметки', 'заметок'])}</Footer>
            {snackbarDel}
        </>
    )
};

export default MiddleNotes;
