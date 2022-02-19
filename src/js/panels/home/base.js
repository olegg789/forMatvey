import React from 'react';

import {
    Div,
    Group,
    Button,
    PanelHeader,
    ScreenSpinner,
    PanelHeaderButton,
    Header,
    Card,
    FormItem, Checkbox, PullToRefresh,
} from '@vkontakte/vkui'
import {
    Icon28AddOutline,
    Icon28SettingsOutline
} from '@vkontakte/icons'

function HomePanelBase({router}) {

    // eslint-disable-next-line
    async function openSpinner() {
        router.toPopout(<ScreenSpinner/>)
        await new Promise(resolve => setTimeout(resolve, 2000))
        router.toPopout()
    }

    return (
        <>
            <PullToRefresh onRefresh={openSpinner}>
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
                header={<Header mode='secondary'>Мои заметки (2)</Header>}
            >
                <Div>
                    <Card
                        mode='outline'
                    >
                        <FormItem top='Тут было имя заметки' bottom='Создано: сегодня, 17:50'>
                            1. Надо сделать то-то (кикнуть Матвея) <br/>
                            2. Попить чай
                            <Checkbox>Сделано</Checkbox>
                        </FormItem>
                    </Card>
                </Div>
                <Div>
                    <Card
                        mode='outline'
                    >
                        <FormItem top='Олег лох азаза' bottom='Создано: сегодня, 17:48'>
                            1. Слить интерфейс модератора<br/>
                            2. Исправить отчеты (отклонить)<br/>
                            3. Попить чай
                            <Checkbox>Сделано</Checkbox>
                        </FormItem>
                    </Card>
                </Div>
            </Group>
            </PullToRefresh>
        </>
    );
}

export default HomePanelBase;