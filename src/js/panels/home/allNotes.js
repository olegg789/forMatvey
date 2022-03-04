import React, { useState } from "react";
import {
    Alert,
    Button,
    Card,
    Div,
    Footer,
    FormItem,
    FormLayout, 
    Snackbar
} from "@vkontakte/vkui";
import {
    Icon28DeleteOutline,
    Icon28EditOutline
} from "@vkontakte/icons";

function AllNotes({router, allNotes, isDesktop, editNote, openSnackbar, getNotes}) {
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
                    action: () => deleteNote(id, index)
                }]}
                onClose={() => router.toPopout()}
                header='Подтверждение'
                text='Вы точно хотите удалить эту заметку?'
            />
        )
    }

    async function deleteNote(id, index) {
        try {
            let token = window.location.search.slice(1).replace(/&/gi, '/');
            await fetch(`https://sab.wan-group.ru/notes?method=notes.deleteNote&noteId=${id}&access_token=${token}`)

            let arr = allNotes
            arr.items.splice(index, 1);
            arr.count -= 1
            getNotes(arr, false)

            openSnackbarDel();
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
            {allNotes.items.map((el, index) => {
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
            <Footer>Всего заметок {allNotes.count}</Footer>
            {snackbarDel}
        </>
    )
};

export default AllNotes;
