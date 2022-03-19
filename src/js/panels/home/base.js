import React, { useState } from 'react';

import {
    Div,
    Group,
    Button,
    PanelHeader,
    ScreenSpinner,
    Header,
    PullToRefresh,
    Placeholder,
    Snackbar,
    Alert,
    Tabs,
    TabsItem,
    HorizontalScroll,
    PanelHeaderButton,
} from '@vkontakte/vkui'
import {
    Icon28AddOutline,
    Icon28DeleteOutline,
    Icon28SettingsOutline,
} from '@vkontakte/icons'

import AllNotes from './allNotes';
import MinorNotes from './minorNotes';
import MiddleNotes from './middleNotes';
import MajorNotes from './majorNotes';
import CriticalNotes from './criticalNotes';

function HomePanelBase(
    {
        router,
        minorNotes,
        allNotes,
        isDesktop,
        editNote,
        openSnackbar,
        sortNotes,
        middleNotes,
        majorNotes,
        criticalNotes,
        setCriticalNotes,
        getNotes
    }) {

    // eslint-disable-next-line
    const [snackbarDel, setSnackbarDel] = useState(null)
    const [activeTab, setActiveTab] = useState('all')
    // eslint-disable-next-line
    async function openSpinner() {
        router.toPopout(<ScreenSpinner/>)
        await new Promise(resolve => setTimeout(resolve, 2000))
        router.toPopout()
    }

    async function addNote() {
        router.toPanel('add');
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

    // eslint-disable-next-line
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
                    action: () => {deleteNote(id); openSnackbarDel()}
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
            let response = await fetch(
                'https://sab.wan-group.ru/notes',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(params)
                }
            )
            // eslint-disable-next-line
            let responseJSON = await response.json()
            console.log(response)
            getNotes()
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <PullToRefresh onRefresh={() => {openSpinner(); getNotes('', true)}}>
            <PanelHeader
                left={
                    <PanelHeaderButton
                        onClick={() => router.toPanel('settings')}
                    >
                        <Icon28SettingsOutline fill='#EC49E7'/>
                    </PanelHeaderButton>
                }
                separator
            >
                Заметки
            </PanelHeader>
            <Group>
                <Div>
                    <Button
                        stretched
                        size='l'
                        before={<Icon28AddOutline/>}
                        onClick={() => {addNote(); setActiveTab('all')}}
                    >
                        Создать заметку
                    </Button>
                </Div>
            </Group>
            <Group
                separator='hide'
                header={
                    <Header
                        mode='secondary'
                    >
                        Мои заметки
                    </Header>
                }
            >
                {allNotes.count !== 0 ?
                    <>
                        <Div>
                            <Group>
                                <Tabs mode="buttons">
                                    <HorizontalScroll>
                                        <TabsItem
                                            className='all'
                                            selected={activeTab === 'all'}
                                            onClick={() => setActiveTab('all')}
                                        >
                                            Все
                                        </TabsItem>
                                        <TabsItem
                                            onClick={() => setActiveTab('critical')}
                                            selected={activeTab === 'critical'}
                                        >
                                            Критический
                                        </TabsItem>
                                        <TabsItem
                                            onClick={() => setActiveTab('major')}
                                            selected={activeTab === 'major'}
                                        >
                                            Высокий
                                        </TabsItem>
                                        <TabsItem
                                            onClick={() => setActiveTab('middle')}
                                            selected={activeTab === 'middle'}
                                        >
                                            Средний
                                        </TabsItem>
                                        <TabsItem
                                            onClick={() => setActiveTab('minor')}
                                            selected={activeTab === 'minor'}
                                        >
                                            Низкий
                                        </TabsItem>
                                    </HorizontalScroll>
                                </Tabs>
                            </Group>
                        </Div>
                        {activeTab === 'all' &&
                            <AllNotes 
                                allNotes={allNotes} 
                                getNotes={(value, isFetch) => getNotes(value, isFetch)}
                                router={router} 
                                editNote={editNote}
                                deleteNote={(id) => deleteNote(id)}
                            />
                        }
                        {activeTab === 'minor' &&
                            <MinorNotes  
                                allNotes={allNotes}
                                getNotes={(value, isFetch) => getNotes(value, isFetch)}
                                minorNotes={minorNotes} 
                                router={router} 
                                editNote={editNote}
                                deleteNote={(id) => deleteNote(id)}
                            />
                        }
                        {activeTab === 'middle' &&
                            <MiddleNotes 
                                allNotes={allNotes}
                                getNotes={(value, isFetch) => getNotes(value, isFetch)}
                                middleNotes={middleNotes} 
                                router={router}
                                editNote={editNote}
                                deleteNote={(id) => deleteNote(id)}
                            />
                        }
                        {activeTab === 'major' &&
                            <MajorNotes 
                                allNotes={allNotes}
                                getNotes={(value, isFetch) => getNotes(value, isFetch)}
                                majorNotes={majorNotes} 
                                router={router}
                                editNote={editNote}
                                deleteNote={(id) => deleteNote(id)}
                            />
                        }
                        {activeTab === 'critical' &&
                            <CriticalNotes 
                                allNotes={allNotes}
                                getNotes={(value, isFetch) => getNotes(value, isFetch)}
                                criticalNotes={criticalNotes} 
                                router={router}
                                editNote={editNote}
                                setCriticalNotes={(value) => setCriticalNotes(value)}
                                deleteNote={(id) => deleteNote(id)}
                            />
                        }

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