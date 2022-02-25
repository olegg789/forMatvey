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
    Snackbar,
} from "@vkontakte/vkui";

import HomeBotsListModal from './js/components/modals/HomeBotsListModal';
import HomeBotInfoModal from './js/components/modals/HomeBotInfoModal';
import bridge from "@vkontakte/vk-bridge";

const HomePanelBase = lazy(() => import('./js/panels/home/base'));
const HomePanelPlaceholder = lazy(() => import('./js/panels/home/placeholder'));
const ProfilePanelBase = lazy(() => import('./js/panels/profile/base'));

const App = withAdaptivity(({ viewWidth, router }) => {
  // eslint-disable-next-line
  const setActiveView = (e) => router.toView(e.currentTarget.dataset.id)

    const [notes, setNotes] = useState('')
    const [noteId, setNoteId] = useState(null)
    const [noteName, setNoteName] = useState(null)
    const [noteValue, setNoteValue] = useState(null)
    const [noteStatus, setNoteStatus] = useState(null)
    const [notePriority, setNotePriority] = useState(null)
    const [scheme, setScheme] = useState('light')
  const [snackbar, setSnackbar] = useState(null)

  const isDesktop = viewWidth >= 3
  const platform = isDesktop ? VKCOM : usePlatform()
  const hasHeader = isDesktop !== true

    async function getAppScheme(platform) {
      if (platform === 'vkcom') {
          setScheme('vkcom_light')
      }
      else {
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

  useEffect(
      () => {getNotes(); getAppScheme(platform)}, []
  )

    async function getNotes() {
        try {
            let token = window.location.search.slice(1).replace(/&/gi, '/');
            let response = await fetch(`https://sab.wan-group.ru/notes?method=notes.getMyNotes&access_token=${token}`)
            let responseJSON = await response.json()
            await responseJSON.items.reverse()
            await setNotes(responseJSON)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function editNote(noteId, noteName, noteValue, noteStatus, notePriority) {
      setNoteId(noteId);
      setNoteName(noteName);
      setNoteValue(noteValue);
      setNoteStatus(noteStatus);
      setNotePriority(notePriority);
      router.toModal('editNote')
    }

  const modals = (
    <ModalRoot activeModal={router.modal}>
      <HomeBotsListModal
        id="addNote"
        openSnackbar = {(text, icon) => openSnackbar(text, icon)}
        platform={platform}
        onClose={() => router.toBack()}
        router={router}
        getNotes = {() => getNotes()}
      />

      <HomeBotInfoModal
          openSnackbar = {(text, icon) => openSnackbar(text, icon)}
          onClose={() => router.toBack()}
          getNotes = {() => getNotes()}
          id="editNote"
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
            width={isDesktop ? '560px' : '100%'}
            maxWidth={isDesktop ? '560px' : '100%'}
          >   
            <Epic 
              activeStory={router.activeView}
            >
              <View 
                id='home'
                activePanel={router.activePanel}
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
                        allNotes={notes}
                        getNotes={() => getNotes()}
                        router={router}
                        isDesktop={isDesktop}
                    />
                  </Suspense>
                  {snackbar}
                </Panel>

                <Panel id='placeholder'>
                  <Suspense fallback={<ScreenSpinner/>}>
                    <HomePanelPlaceholder router={router} platform={platform}/>
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