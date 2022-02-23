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
    FormLayout,
    IconButton,
} from '@vkontakte/vkui'
import {
    Icon28AddOutline, Icon28DeleteOutline, Icon28EditOutline,
    Icon28SettingsOutline
} from '@vkontakte/icons'

function HomePanelBase({router}) {
    const [notes, setNotes] = useState(null)

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

    async function getNotes() {
        try {
            let token = window.location.search.slice(1).replace(/&/gi, '/');
            let response = await fetch(`https://sab.wan-group.ru/notes?method=notes.getMyNotes&access_token=${token}`)
            let responseJSON = await response.json()
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
                    >
                        Создать заметку
                    </Button>
                </Div>
            </Group>
            <Group
                header={<Header mode='secondary'>Мои заметки </Header>}
            >
                {notes !== null ?
                    <>
                    {notes.items.map((el) => {
                            return(
                                <Div>
                                    <Card mode='outline'>
                                        <FormLayout>
                                            <FormItem top={el.name} bottom={statuses[el.status]}>
                                                {el.value}
                                            </FormItem>
                                            <FormItem>
                                                <Button className='btnNote'>
                                                    <Icon28EditOutline/>
                                                </Button>
                                                <Button className='btnNote'>
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
        </>
    );
}

export default HomePanelBase;