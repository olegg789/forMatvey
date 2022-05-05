import React, {useEffect, useState} from 'react';
import { withRouter } from '@reyzitwo/react-router-vkminiapps';

import {
    ConfigProvider,
    AppRoot,
    SplitLayout,
    PanelHeader,
    SplitCol,
    Epic,
    View,
    Panel,
    usePlatform,
    VKCOM,
    withAdaptivity,
    Snackbar, Alert, ScreenSpinner,
} from "@vkontakte/vkui";

import bridge from "@vkontakte/vk-bridge";
import {
    Icon28CheckCircleOutline,
    Icon28ErrorCircleOutline,
    Icon28MessageCrossOutline,
    Icon28MessageOutline
} from "@vkontakte/icons";

import HomePanelBase from './js/panels/home/base';
import AddNote from './js/panels/home/add';
import EditNote from './js/panels/home/edit';
import HomePanelPlaceholder from './js/panels/home/placeholder';
import SearchNotes from './js/panels/home/search'

let isFetchApi = false

const App = withAdaptivity(({ viewWidth, router }) => {
    // eslint-disable-next-line
    const setActiveView = (e) => router.toView(e.currentTarget.dataset.id)

    const [notes, setNotes] = useState({count: 0, items: []})
    const [noteId, setNoteId] = useState(null)
    const [noteName, setNoteName] = useState(null)
    const [noteValue, setNoteValue] = useState(null)
    const [noteStatus, setNoteStatus] = useState(null)
    const [notePriority, setNotePriority] = useState(null)
    const [scheme, setScheme] = useState('light')
    const [snackbar, setSnackbar] = useState(null)
    const [minorNotes, setMinorNotes] = useState({count: 0, items: []})
    const [middleNotes, setMiddleNotes] = useState({count: 0, items: []})
    const [majorNotes, setMajorNotes] = useState({count: 0, items: []})
    const [criticalNotes, setCriticalNotes] = useState({count: 0, items: []})
    const [activeTab, setActiveTab] = useState('all')
    const [popout, setPopout] = useState(null)
    const [plat, setPlat] = useState('mobile_android')
    const [offline, setOffline] = useState(false)
    const [favorite, setFavorite] = useState(1)

    function getPlat() {
        let aboba = window.location.search.slice(1).split('&')[6].split('=')[1]
        setPlat(aboba)
    }

    function checkFav() {
        let aboba = window.location.search.slice(1).split('&')[4].split('=')[1]
        setFavorite(Number(aboba))
    }

    function openAlertAll() {
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
                    action: () => {deleteAll(); router.toBack()}
                }]}
                onClose={() => router.toPopout()}
                header='Подтверждение'
                text='Вы точно хотите удалить все заметки? Отменить это действие невозможно.'
            />
        )
    }

    window.addEventListener('offline', () => {openSnackbar('Интернет пропал', <Icon28MessageCrossOutline/>); setOffline(true)})

    window.addEventListener('online', () => {openSnackbar('Интернет появился', <Icon28MessageOutline/>); setOffline(false)})

    async function deleteAll() {
        try {
            router.toPopout(<ScreenSpinner/>)
            let token = window.location.search.slice(1);
            let params = {
                access_token: token,
                method: 'notes.deleteAllNotes'
            }
            await fetch(
                `https://sab.wan-group.ru/notes`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(params)
                }
                )

            router.toBack()
            openSnackbar('Все заметки удалены!', <Icon28CheckCircleOutline/>)

            getNotes({ count: 0, items: [] })
        }
        catch (err) {
            openSnackbar('Произошла ошибка :(', <Icon28ErrorCircleOutline/>)
        }
    }

    async function changeTab(value) {
        await bridge.send("VKWebAppStorageSet", {key: 'tab', value: value})
        setActiveTab(value)
    }

    useEffect(() => {
        getAppScheme();
        getNotes();
        changeTab('all');
        getPlat();
        checkFav()
    }, [])

    async function getNotes(value, isFetch) {
        router.toPopout(<ScreenSpinner/>)
        if (!isFetchApi || isFetch) {
            try {
                let token = window.location.search.slice(1);
                let params = {
                    access_token: token,
                    method: 'notes.getMyNotes'
                }
                let response = await fetch(
                    `https://sab.wan-group.ru/notes`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(params)
                    }
                )
                let responseJSON = await response.json()
                responseJSON.items.reverse()
                await setNotes(responseJSON)

                isFetchApi = true
                getMinorNotes(responseJSON);
            } catch (err) {
                console.log(err)
            }
        } else {
            setNotes(value)
            getMinorNotes(value);
        }
        router.toBack()
    }

    async function getMinorNotes(value) {
        const result = value.items.filter(note => note.priority === 0);
        setMinorNotes({ count: result.length, items: result })

        getMiddleNotes(value);
    }

    async function getMiddleNotes(value) {
        const result = value.items.filter(note => note.priority === 1);
        setMiddleNotes({ count: result.length, items: result })

        getMajorNotes(value); 
    }

    async function getMajorNotes(value) {
        const result = value.items.filter(note => note.priority === 2);
        setMajorNotes({ count: result.length, items: result })

        getCriticalNotes(value)
    }

    async function getCriticalNotes(value) {
        const result = value.items.filter(note => note.priority === 3);
        setCriticalNotes({ count: result.length, items: result })
    }

    async function getAppScheme() {
        bridge.subscribe((e) => {
            if (e.detail.type === 'VKWebAppUpdateConfig') {
                let data = e.detail.data.scheme
                setScheme(data)
            }
            })
            let appScheme = await bridge.send("VKWebAppGetConfig")
            setScheme(appScheme.scheme)
    }

    async function openSnackbar(text, icon) {
        setSnackbar(
            <Snackbar
                className='snack'
                layout='vertical'
                onClose={() => setSnackbar(null)}
                before={icon}
            >
              {text}
            </Snackbar>
        )
    }

    async function editNote(noteId, noteName, noteValue, noteStatus, notePriority) {
      setNoteId(noteId);
      setNoteName(noteName);
      setNoteValue(noteValue);
      setNoteStatus(noteStatus);
      setNotePriority(notePriority);
      router.toPanel('edit')
    }

    const isDesktop = viewWidth >= 3
    const platform = isDesktop ? VKCOM : usePlatform()
    const hasHeader = isDesktop !== true

    return(
        <ConfigProvider platform={platform} isWebView scheme={scheme}>
            <AppRoot>
                <SplitLayout
                    header={hasHeader && <PanelHeader separator={false} />}
                    style={{ justifyContent: "center" }}
                    popout={popout}
                >
                    <SplitCol
                        animate={!isDesktop}
                        spaced={isDesktop}
                        width={isDesktop ? '700px' : '100%'}
                        maxWidth={isDesktop ? '700px' : '100%'}
                    >
                    <Epic
                        activeStory={router.activeView}
                    >
                        <View
                            id='home'
                            activePanel={router.activePanel === 'route_modal' ? 'base' : router.activePanel}
                            popout={router.popout}
                        >
                            <Panel id='base'>
                                <HomePanelBase
                                    openSnackbar={(text, icon) => openSnackbar(text, icon)}
                                    editNote={
                                        (noteId,
                                         noteName,
                                         noteValue,
                                         noteStatus,
                                         notePriority
                                        ) => editNote(
                                            noteId,
                                            noteName,
                                            noteValue,
                                            noteStatus,
                                            notePriority
                                        )
                                    }
                                    minorNotes={minorNotes}
                                    middleNotes={middleNotes}
                                    majorNotes={majorNotes}
                                    criticalNotes={criticalNotes}
                                    setCriticalNotes={(value) => setCriticalNotes(value)}
                                    allNotes={notes}
                                    getNotes={(value, isFetch) => getNotes(value, isFetch)}
                                    router={router}
                                    isDesktop={isDesktop}
                                    setSnackbar={(value) => setSnackbar(value)}
                                    scheme={scheme}
                                    changeTab={(value) => changeTab(value)}
                                    activeTab={activeTab}
                                    setActiveTab={(value) => setActiveTab(value)}
                                    setPopout={(value) => setPopout(value)}
                                    platform={plat}
                                    offline={offline}
                                />
                                {snackbar}
                            </Panel>

                    <Panel id='add'>
                      <AddNote
                          openSnackbar = {(text, icon) => openSnackbar(text, icon)}
                          getNotes={(value) => getNotes(value)}
                          platform={platform}
                          onClose={() => router.toBack()}
                          router={router}
                          notes={notes}
                          setMinorNotes={(value) => setMinorNotes(value)}
                          setMiddleNotes={(value) => setMiddleNotes(value)}
                          setMajorNotes={(value) => setMajorNotes(value)}
                          setCriticalNotes={(value) => setCriticalNotes(value)}
                          setSnackbar={(value) => setSnackbar(value)}
                      />
                        {snackbar}
                    </Panel>
                    <Panel id='edit'>
                        <EditNote
                            router={router}
                            platform={platform}
                            getNotes={() => getNotes('', true)}
                            getMinorNotes={() => getMinorNotes()}
                            getMiddleNotes={() => getMiddleNotes()}
                            getMajorNotes={() => getMajorNotes()}
                            getCriticalNotes={() => getCriticalNotes()}
                            noteId={noteId}
                            noteName={noteName}
                            noteValue={noteValue}
                            noteStatus={noteStatus}
                            notePriority={notePriority}
                            openSnackbar={(text, icon) => openSnackbar(text, icon)}
                            scheme={scheme}
                            setSnackbar={(value) => setSnackbar(value)}
                        />
                        {snackbar}
                    </Panel>
                    <Panel id='settings'>
                        <HomePanelPlaceholder
                            router={router}
                            openSnackbar={(text, icon) => openSnackbar(text, icon)}
                            getNotes={() => getNotes()}
                            deleteAll={() => deleteAll()}
                            openAlertAll={() => openAlertAll()}
                            snackbar={snackbar}
                            allNotes={notes}
                            setSnackbar={(value) => setSnackbar(value)}
                            platform={plat}
                            favorite={favorite}
                            setFavorite={(value) => setFavorite(value)}
                        />
                        {snackbar}
                    </Panel>
                    <Panel id='search'>
                        <SearchNotes
                            router={router}
                            allNotes={notes}
                            openSnackbar={(text, icon) => openSnackbar(text, icon)}
                            getNotes={(value, isFetch) => getNotes(value, isFetch)}
                            editNote={
                                (noteId,
                                 noteName,
                                 noteValue,
                                 noteStatus,
                                 notePriority
                                ) => editNote(
                                    noteId,
                                    noteName,
                                    noteValue,
                                    noteStatus,
                                    notePriority
                                )
                            }
                            setSnackbar={(value) => setSnackbar(value)}
                            scheme={scheme}
                            setPopout={(value) => setPopout(value)}
                            platform={plat}
                            offline={offline}
                        />
                        {snackbar}
                    </Panel>
                  </View>
                </Epic>
                    </SplitCol>
                </SplitLayout>
            </AppRoot>
        </ConfigProvider>
    )
}, { viewWidth: true })

export default withRouter(App);