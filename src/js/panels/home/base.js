import React, {useEffect} from 'react';

import {
    Div,
    Group,
    Button,
    PanelHeader,
    Header,
    PullToRefresh,
    Placeholder,
    Tabs,
    TabsItem,
    HorizontalScroll,
    PanelHeaderButton,
    Link
} from '@vkontakte/vkui'
import {
    Icon28SearchOutline,
    Icon28AddOutline,
    Icon28SettingsOutline,
} from '@vkontakte/icons'

import AllNotes from './allNotes';
import MinorNotes from './minorNotes';
import MiddleNotes from './middleNotes';
import MajorNotes from './majorNotes';
import CriticalNotes from './criticalNotes';
import bridge from "@vkontakte/vk-bridge";

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
        getNotes,
        setSnackbar,
        scheme,
        changeTab,
        activeTab,
        setActiveTab,
        setPopout,
        platform
    }) {

    useEffect(() => {getLastTab()}, [])

    async function getLastTab() {
        if (activeTab !== 'all') {
            const res = await bridge.send("VKWebAppStorageGet", {keys: ['tab']})
            const tab = res.keys[0].value
            setActiveTab(tab)
        }
    }

    async function addNote() {
        router.toPanel('add');
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
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
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
            <PullToRefresh onRefresh={() => {getNotes('', true)}}>
            <Group>
                <Div>
                    <Button
                        stretched
                        size='l'
                        before={allNotes.count < 200 && <Icon28AddOutline/>}
                        onClick={() => {addNote(); setActiveTab('all')}}
                        disabled={allNotes.count >= 200}
                    >
                        {allNotes.count >= 200 ? 'Лимит заметок' : 'Создать заметку'}
                    </Button>
                </Div>
            </Group>
            <Group
                separator='hide'
                header={
                    <Header
                        mode='primary'
                        aside={allNotes.count !== 0 &&
                            <Link
                                className={scheme === 'space_gray' || scheme === 'vkcom_dark' ? 'search_blck' : 'search_wht'}
                                onClick={() => router.toPanel('search')}
                            >
                                <Icon28SearchOutline/>
                            </Link>
                        }
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
                                            onClick={() => changeTab('all')}
                                        >
                                            Все
                                        </TabsItem>
                                        <TabsItem
                                            onClick={() => changeTab('critical')}
                                            selected={activeTab === 'critical'}
                                        >
                                            Критический
                                        </TabsItem>
                                        <TabsItem
                                            onClick={() => changeTab('major')}
                                            selected={activeTab === 'major'}
                                        >
                                            Высокий
                                        </TabsItem>
                                        <TabsItem
                                            onClick={() => changeTab('middle')}
                                            selected={activeTab === 'middle'}
                                        >
                                            Средний
                                        </TabsItem>
                                        <TabsItem
                                            onClick={() => changeTab('minor')}
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
                                openSnackbar={(text, icon) => openSnackbar(text, icon)}
                                scheme={scheme}
                                setPopout={(value) => setPopout(value)}
                                platform={platform}
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
                                openSnackbar={(text, icon) => openSnackbar(text, icon)}
                                scheme={scheme}
                                setPopout={(value) => setPopout(value)}
                                platform={platform}
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
                                openSnackbar={(text, icon) => openSnackbar(text, icon)}
                                scheme={scheme}
                                setPopout={(value) => setPopout(value)}
                                platform={platform}
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
                                openSnackbar={(text, icon) => openSnackbar(text, icon)}
                                scheme={scheme}
                                setPopout={(value) => setPopout(value)}
                                platform={platform}
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
                                openSnackbar={(text, icon) => openSnackbar(text, icon)}
                                scheme={scheme}
                                setPopout={(value) => setPopout(value)}
                                platform={platform}
                            />
                        }

                    </>
                    : <Placeholder>У вас еще нет заметок</Placeholder>
                }
            </Group>
            </PullToRefresh>
        </>
    );
}

export default HomePanelBase;