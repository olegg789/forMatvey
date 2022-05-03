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


function HomePanelPlaceholder({
      isDesktop,
      router,
      openSnackbar,
      getNotes,
      openAlertAll,
      snackbar,
      allNotes,
      setSnackbar
}) {
    const [platform, setPlatform] = useState('aboba')
    const [favorite, setFavorite] = useState(1)

    async function getPlat() {
        let check = await bridge.send("VKWebAppGetLaunchParams")
        setPlatform(check.vk_platform)
        console.log(check)
    }

    useEffect(
        () => {
            getPlat();
            setSnackbar(null);
            checkFavorite()
            }, []
    )

    async function checkFavorite() {
        const favorite = await bridge.send("VKWebAppGetLaunchParams")
        setFavorite(favorite.vk_is_favorite)
    }

    return(
        <>
            <PanelHeader 
                separator
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
                    {favorite === 0 &&
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
                        onClick={() => {
                            bridge.send("VKWebAppAddToFavorites").then(
                                (data) => {data.result === true && setFavorite(1)}
                            )
                        }}
                    >
                        Добавить в избранное
                    </SimpleCell>}

                    {platform !== 'desktop_web' && platform !== 'mobile_web' && platform !== 'mobile_ios' &&
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