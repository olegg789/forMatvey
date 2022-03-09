import React, {lazy, Suspense, useEffect, useState} from 'react';
import { withRouter } from 'react-router-vkminiapps';

import {
    ConfigProvider,
    AppRoot,
    SplitLayout,
    PanelHeader,
    SplitCol,
    Epic,
    View,
    Panel,
    ModalRoot,
    ScreenSpinner,
    usePlatform,
    VKCOM,
    withAdaptivity,
    Snackbar, Alert,
} from "@vkontakte/vkui";

import HomeBotsListModal from './js/components/modals/HomeBotsListModal';
import HomeBotInfoModal from './js/components/modals/HomeBotInfoModal';
import bridge from "@vkontakte/vk-bridge";
import {Icon28CheckCircleOutline, Icon28ErrorCircleOutline} from "@vkontakte/icons";

const HomePanelBase = lazy(() => import('./js/panels/home/base'));
const AddNote = lazy(() => import('./js/panels/home/add'));
const EditNote = lazy(() => import('./js/panels/home/edit'));
const HomePanelPlaceholder = lazy(() => import('./js/panels/home/placeholder'));
const ProfilePanelBase = lazy(() => import('./js/panels/profile/base'));

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
                    action: () => deleteAll()
                }]}
                onClose={() => router.toPopout()}
                header='Подтверждение'
                text='Вы точно хотите удалить все замтеки? Отменить это действие невозможно.'
            />
        )
    }

    async function deleteAll() {
        try {
            let token = window.location.search.slice(1).replace(/&/gi, '/');
            await fetch(`https://sab.wan-group.ru/notes?method=notes.deleteAllNotes&access_token=${token}`)
            openSnackbar('Все заметки удалены!', <Icon28CheckCircleOutline/>)

            getNotes({ count: 0, items: [] })
        }
        catch (err) {
            openSnackbar('Произошла ошибка :(', <Icon28ErrorCircleOutline/>)
        }
    }

    useEffect(() => {
        getAppScheme(platform); 

        getNotes(); 
    }, [])

    async function getNotes(value, isFetch) {
        if (!isFetchApi || isFetch) {
            try {
                let token = window.location.search.slice(1).replace(/&/gi, '/');
                let response = await fetch(`https://sab.wan-group.ru/notes?method=notes.getMyNotes&access_token=${token}`)
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
    }

    async function getMinorNotes(value) {
        const result = value.items.filter(note => note.priority === 0);
        console.log(value)
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

    async function getAppScheme(platform) {
        if (platform === 'vkcom') {
            setScheme('vkcom_light')
        } else {
            bridge.subscribe((e) => {
                if (e.detail.type === 'VKWebAppUpdateConfig') {
                    let data = e.detail.data.scheme
                    setScheme(data)
                }
            })
            let appScheme = await bridge.send("VKWebAppGetConfig")
            setScheme(appScheme.scheme)
        }
    }

    async function openSnackbar(text, icon) {
        setSnackbar(
            <Snackbar
                className={!isDesktop && 'snack'}
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

    const modals = (
        <ModalRoot activeModal={router.modal}>
            <HomeBotsListModal
                id="addNote"
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
            />

            <HomeBotInfoModal
                openSnackbar = {(text, icon) => openSnackbar(text, icon)}
                onClose={() => router.toBack()}
                getNotes={() => getNotes('', true)}
                id="editNote"
                getMinorNotes={() => getMinorNotes()}
                getMiddleNotes={() => getMiddleNotes()}
                getMajorNotes={() => getMajorNotes()}
                getCriticalNotes={() => getCriticalNotes()}
                noteId={noteId}
                noteName={noteName}
                noteValue={noteValue}
                noteStatus={noteStatus}
                notePriority={notePriority}
                platform={platform}
                router={router}
            />
        </ModalRoot>
    );

    return(
        <ConfigProvider platform={platform} isWebView scheme={scheme}>
            <AppRoot>
                <SplitLayout
                    header={hasHeader && <PanelHeader separator={false} />}
                    style={{ justifyContent: "center" }}
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
                            modal={modals}
                        >
                            <Panel id='base'>
                                <Suspense fallback={<ScreenSpinner/>}>
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
                                    />
                                </Suspense>
                                {snackbar}
                            </Panel>

                    <Panel id='add'>
                      <Suspense fallback={<ScreenSpinner/>}>
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
                          />
                      </Suspense>
                    </Panel>
                    <Panel id='edit'>
                        <Suspense fallback={<ScreenSpinner/>}>
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
                            />
                        </Suspense>
                    </Panel>
                    <Panel id='settings'>
                        <Suspense fallback={<ScreenSpinner/>}>
                            <HomePanelPlaceholder
                                router={router}
                                platform={platform}
                                openSnackbar={(text, icon) => openSnackbar(text, icon)}
                                getNotes={() => getNotes()}
                                deleteAll={() => deleteAll()}
                                openAlertAll={() => openAlertAll()}
                                snackbar={snackbar}
                                allNotes={notes}
                            />
                        </Suspense>
                    </Panel>
                  </View>

                  <View
                    id="profile"
                    activePanel={router.activePanel}
                    popout={router.popout}
                    modal={modals}
                  >
                    <Panel id='base'>
                      <Suspense fallback={<ScreenSpinner/>}>
                        <ProfilePanelBase
                          router={router}
                          isDesktop={isDesktop}
                        />
                      </Suspense>
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