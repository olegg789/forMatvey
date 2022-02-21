import React from 'react';

import {
    List,
    ModalPage, 
    ModalPageHeader, 
    PanelHeaderButton, 
    withPlatform, 
    IOS
} from "@vkontakte/vkui";
import { Icon24Dismiss, Icon24Cancel,} from '@vkontakte/icons'

function BotsListModal({id, platform, router}) {
    return (
        <ModalPage
            id={id}
            header={
                <ModalPageHeader
                    left={platform !== IOS && 
                        <PanelHeaderButton onClick={() => router.toBack()}>
                            <Icon24Cancel/>
                        </PanelHeaderButton>
                    }

                    right={platform === IOS && 
                        <PanelHeaderButton onClick={() => router.toBack()}>
                            <Icon24Dismiss/>
                        </PanelHeaderButton>
                    }
                >
                    Сообщества
                </ModalPageHeader>
            }
            onClose={() => router.toBack()}
            settlingHeight={100}
        >
            <List>
                jopa
            </List>
        </ModalPage>
    );
}

export default withPlatform(BotsListModal);