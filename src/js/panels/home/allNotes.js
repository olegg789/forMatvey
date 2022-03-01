import {
    Alert,
    Button,
    Card,
    Div,
    Footer,
    FormItem,
    FormLayout, Snackbar, Header
} from "@vkontakte/vkui";

import {
    Icon28DeleteOutline,
    Icon28EditOutline
} from "@vkontakte/icons";
import React, {useEffect, useState} from "react";

function AllNotes({router, allNotes, isDesktop, editNote, openSnackbar, getNotes}) {

    // eslint-disable-next-line
    const [snackbarDel, setSnackbarDel] = useState(null)

    useEffect(
        () => {getNotes()}, []
    )


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
                    action: () => {deleteNote(id); openSnackbarDel(); getNotes()}
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
            let response = await fetch(`https://sab.wan-group.ru/notes?method=notes.deleteNote&noteId=${id}&access_token=${token}`)
            // eslint-disable-next-line
            let responseJSON = await response.json()
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
            {allNotes.items.map((el) => {
                return (
                    <Div>
                        <Card mode='outline'>
                            <FormLayout>
                                <FormItem
                                    top={
                                        el.name
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
                                        onClick={() => editNote(el.noteId, el.name, el.value, el.status, el.priority)}
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
            <Footer>Всего заметок {allNotes.count}</Footer>
        </>
    )
};

export default AllNotes;
