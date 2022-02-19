import React, { lazy, Suspense } from 'react';
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
} from "@vkontakte/vkui";

import HomeBotsListModal from './js/components/modals/HomeBotsListModal';
import HomeBotInfoModal from './js/components/modals/HomeBotInfoModal';

const HomePanelBase = lazy(() => import('./js/panels/home/base'));
const HomePanelPlaceholder = lazy(() => import('./js/panels/home/placeholder'));
const ProfilePanelBase = lazy(() => import('./js/panels/profile/base'));

const App = withAdaptivity(({ viewWidth, router }) => {
  // eslint-disable-next-line
  const setActiveView = (e) => router.toView(e.currentTarget.dataset.id)
  
  const isDesktop = viewWidth >= 3
  const platform = isDesktop ? VKCOM : usePlatform()
  const hasHeader = isDesktop !== true

  const modals = (
    <ModalRoot>
      <HomeBotsListModal
        id="botsList"
        platform={platform}
        router={router}
      />

      <HomeBotInfoModal
        id="botInfo"
        platform={platform}
        router={router}
      />
    </ModalRoot>
  );

  return(
    <ConfigProvider platform={platform} isWebView scheme={!isDesktop ? 'client_dark' : 'bright_light'}>
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
                    <HomePanelBase router={router}/>
                  </Suspense>
                </Panel>

                <Panel id='placeholder'>
                  <Suspense fallback={<ScreenSpinner/>}>
                    <HomePanelPlaceholder router={router}/>
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