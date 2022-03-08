import React, {useEffect, useState} from 'react';

import {
    PanelHeader,
    PanelHeaderBack,
    Group,
    SimpleCell,
    Avatar,
    Footer,
    Link,
    Div,
} from "@vkontakte/vkui";
import {
    Icon28SmartphoneOutline,
    Icon28MessagesOutline,
    Icon28ShareOutline,
    Icon28FavoriteOutline,
    Icon28DeleteOutline,
    Icon16LikeOutline,
    Icon20BugOutline,
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";


function HomePanelPlaceholder({isDesktop, router, openSnackbar, getNotes, openAlertAll, snackbar, allNotes}) {
    const [plat, setPlat] = useState('android')

    function getPlat() {
        let parsedUrl = new URL(window.location.href)
        if (parsedUrl.searchParams.get('vk_platform') === 'desktop_web') {
            setPlat('vkcom')
        }
    }

    useEffect(
        () => {getPlat()}, []
    )


    return(
        <>
            <PanelHeader 
                separator={false}
                left={<PanelHeaderBack onClick={() => router.toBack()}/>}
            >
                Настройки
            </PanelHeader>

                <Group>
                    {allNotes.count !== 0 &&
                        <SimpleCell
                            className='btn_settings'
                            before={
                                <Avatar
                                    shadow={false}
                                    size={43}
                                >
                                    <Icon28DeleteOutline fill='#EC49E7'/>
                                </Avatar>
                            }
                            onClick={() => openAlertAll()}
                        >
                            Удалить все заметки
                        </SimpleCell>}
                    <SimpleCell
                        className='btn_settings'
                        before={
                            <Avatar
                                shadow={false}
                                size={43}
                            >
                                <Icon28FavoriteOutline fill='#EC49E7'/>
                            </Avatar>
                        }
                        onClick={() => bridge.send("VKWebAppAddToFavorites")}
                    >
                        Добавить в избранное
                    </SimpleCell>

                    {plat === 'android' &&
                        <SimpleCell
                            className='btn_settings'
                            before={
                                <Avatar
                                    shadow={false}
                                    size={43}
                                >
                                    <Icon28SmartphoneOutline fill='#EC49E7'/>
                                </Avatar>
                            }
                            onClick={() => bridge.send("VKWebAppAddToHomeScreen")}
                        >
                            Добавить на главный экран
                        </SimpleCell>
                    }

                    <SimpleCell
                        className='btn_settings'
                        before={
                            <Avatar
                                shadow={false}
                                size={43}
                            >
                                <Icon28MessagesOutline fill='#EC49E7'/>
                            </Avatar>
                        }
                        href="https://vk.me/sab_t"
                        target='_blank'
                    >
                        Поддержка
                    </SimpleCell>

                    <SimpleCell
                        before={
                            <Avatar
                                shadow={false}
                                size={43}
                            >
                                <Icon28ShareOutline fill='#EC49E7'/>
                            </Avatar>
                        }
                        onClick={() => bridge.send("VKWebAppShare", {link: "https://vk.com/app8084045"})}
                    >
                        Поделиться приложением
                    </SimpleCell>
            </Group>

            <Footer>
                <Div className="podpis">
                    От <Link href="https://vk.com/olejii" target="_blank">@olejii</Link> и <Link href="https://vk.com/dez.code" target="_blank">@dez.code</Link>
                </Div>
                <Div className="podpis">
                    Сделано с <Icon16LikeOutline width={16} height={16}/> и <Icon20BugOutline width={16} height={16}/>
                </Div>
            </Footer>
            {snackbar}
        </>
    )
}

export default HomePanelPlaceholder;