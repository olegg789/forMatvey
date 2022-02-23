import React, {useEffect, useState} from 'react';

import {
    Div,
    Group,
    Button,
    PanelHeader,
    ScreenSpinner,
    PanelHeaderButton,
    Header,
    Card,
    FormItem,
    PullToRefresh,
    Footer,
    Placeholder,
    FormLayout, Snackbar,
    Alert,

} from '@vkontakte/vkui'
import {
    Icon24CheckCircleOutline,
    Icon28AddOutline, Icon28DeleteOutline, Icon28EditOutline,
    Icon28SettingsOutline
} from '@vkontakte/icons'

function HomePanelBase({router}) {
    const [notes, setNotes] = useState(null)
    const [snackbarDel, setSnackbarDel] = useState(null)
    // eslint-disable-next-line
    async function openSpinner() {
        router.toPopout(<ScreenSpinner/>)
        await new Promise(resolve => setTimeout(resolve, 2000))
        router.toPopout()
    }

    useEffect(
        () => {getNotes()}, []
    )

    /*статусы
    0 - открыт
    1 - в работе
    2 - завершен
    3 - на рассмотрении
     */
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

    async function addNote() {
        router.toModal('addNote');
    }

    function openSnackbar() {
        setSnackbarDel(
            <Snackbar
                layout='vertical'
                onClose={() => setSnackbarDel(null)}
                before={<Icon28DeleteOutline/>}
            >
                Заметка удалена! Обнови страницу!
            </Snackbar>
        )
    }

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
                    action: () => {deleteNote(id); openSnackbar()}
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
            let responseJSON = await response.json()
        }
        catch (err) {
            console.log(err)
        }
    }

    async function getNotes() {
        try {
            let token = window.location.search.slice(1).replace(/&/gi, '/');
            let response = await fetch(`https://sab.wan-group.ru/notes?method=notes.getMyNotes&access_token=${token}`)
            let responseJSON = await response.json()
            responseJSON.items.reverse()
            setNotes(responseJSON)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <PullToRefresh onRefresh={() => {openSpinner(); getNotes()}}>
            <PanelHeader
                left={
                    <PanelHeaderButton
                        onClick={() => router.toPanel('placeholder')}
                    >
                        <Icon28SettingsOutline/>
                    </PanelHeaderButton>
                }
                separator={false}
            >
                Заметки
            </PanelHeader>
            <Group>
                <Div>
                    <Button
                        stretched
                        size='l'
                        before={<Icon28AddOutline/>}
                        onClick={() => addNote()}
                    >
                        Создать заметку
                    </Button>
                </Div>
            </Group>
            <Group
                header={
                    <Header
                        mode='secondary'
                    >
                        Мои заметки
                    </Header>
                }
            >
                {notes.items.length !== 0 ?
                    <>
                    {
                        notes.items.map((el) => {
                            return(
                                <Div>
                                    <Card mode='outline'>
                                        <FormLayout>
                                            <FormItem
                                                top={
                                                    el.name
                                                }
                                                bottom={
                                                    `Статус: ${statuses[el.status]}, приоритет: ${priorites[el.priority]}`
                                                }
                                            >
                                                {el.value}
                                            </FormItem>
                                            <FormItem>
                                                <Button
                                                    className='btnNote'
                                                    mode='outline'
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
                        <Footer>{`Всего заметок: ${notes.count}`}</Footer>
                    </>
                    : <Placeholder>У вас еще нет заметок</Placeholder>
                }
            </Group>
            </PullToRefresh>
            {snackbarDel}
        </>
    );
}

export default HomePanelBase;