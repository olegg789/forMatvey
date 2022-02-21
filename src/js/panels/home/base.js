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
    Placeholder
} from '@vkontakte/vkui'
import {
    Icon28AddOutline,
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

    async function getNotes() {
        await setNotes(
            {
                count: 3,
                items:[
                    {
                        id:1,
                        name: 'Моя первая заметка',
                        value: 'Это крутая заметка',
                        status: 'В работе'
                    },
                    {
                        id:2,
                        name: 'Вторя заметочка',
                        value: 'Эта тоже крутая',
                        status: 'Исправлен'
                    },
                    {
                        id:3,
                        name: 'Ну и третья',
                        value: 'Всем привет',
                        status: ''
                    }]
            }
            )
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
                                        <FormItem top={el.name} bottom={el.status}>
                                            {el.value}
                                        </FormItem>
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