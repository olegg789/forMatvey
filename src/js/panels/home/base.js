import React, {useState} from 'react';

import {
    Div,
    Group,
    Button,
    PanelHeader,
    ScreenSpinner,
    Header,
    Card,
    FormItem,
    PullToRefresh,
    Footer,
    Placeholder,
    FormLayout,
    Snackbar,
    Alert,
} from '@vkontakte/vkui'
import {
    Icon28AddOutline,
    Icon28DeleteOutline,
    Icon28EditOutline,
    Icon56NotePenOutline
} from '@vkontakte/icons'

function HomePanelBase({router, allNotes, getNotes, isDesktop, editNote}) {
    const [snackbarDel, setSnackbarDel] = useState(null)
    // eslint-disable-next-line
    async function openSpinner() {
        router.toPopout(<ScreenSpinner/>)
        await new Promise(resolve => setTimeout(resolve, 2000))
        router.toPopout()
    }


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
                className={!isDesktop && 'snack'}
                layout='vertical'
                onClose={() => setSnackbarDel(null)}
                before={<Icon28DeleteOutline/>}
            >
                Заметка удалена!
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
                    action: () => {deleteNote(id); openSnackbar(); getNotes()}
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

    return (
        <>
            <PullToRefresh onRefresh={() => {openSpinner(); getNotes()}}>
            <PanelHeader
                left={
                    <Div>
                        <Icon56NotePenOutline width={32} height={32} fill='#EC49E7'/>
                    </Div>
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
                        aside={
                            <Button
                                mode='outline'
                                appearance='negative'
                        >
                                Удалить все
                            </Button>
                        }
                    >
                        Мои заметки
                    </Header>
                }
            >
                {allNotes !== '' ?
                    <>
                    {
                        allNotes.items.map((el) => {
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
                        <Footer>{`Всего заметок: ${allNotes.count}`}</Footer>
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