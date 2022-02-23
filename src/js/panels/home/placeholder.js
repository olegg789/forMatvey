import React, {useEffect, useState} from 'react';

import {
    PanelHeader,
    PanelHeaderBack,
    Group,
    SimpleCell,
    Avatar,
    ScreenSpinner,
    Title,
    Gradient,
    Text,
    Header,
    ANDROID,
    VKCOM,
    usePlatform,
} from "@vkontakte/vkui";
import ThemeControllers from "../../components/navigation/themeControllers";
import {
    Icon28SmartphoneOutline,
    Icon28MessagesOutline,
    Icon28ShareOutline,
    Icon28FavoriteOutline,
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";

let isInfoUser = false
let infoUser = ['Загрузка...']

function HomePanelPlaceholder({isDesktop, router}) {
    const [infoUsers, setInfoUser] = useState(infoUser)
    const platform = isDesktop ? VKCOM : usePlatform()
    const frazes = [
        'Приветик',
        'Зачем ты сюда зашел',
        'Привет от Олега',
        'Привет от Матвея',
        'Как дела?)'
    ]

    useEffect(() => {
        if (!isInfoUser) {
            getInfoUser()
        }
    })

    async function getInfoUser() {
        router.toPopout(<ScreenSpinner/>)

        let user_info = await bridge.send('VKWebAppGetUserInfo');
        infoUser[0] = user_info.first_name + ' ' + user_info.last_name
        infoUser.push(user_info.photo_200)
        infoUser.push(user_info.id)

        setInfoUser(infoUser)
        isInfoUser = true

        router.toPopout()
    }

    return(
        <>
            <PanelHeader 
                separator={false}
                left={<PanelHeaderBack onClick={() => router.toBack()}/>}
            >
                Настройки
            </PanelHeader>

            <Group>
                <Gradient className={isDesktop ? 'ProfileUserWeb' : 'ProfileUserMobail'}>
                    <Avatar size={96} src={infoUsers[1]}/>

                    <Title
                        className='NameUser'
                        level="2"
                        weight="2"
                    >
                        {infoUsers[0]}
                    </Title>

                    <Text className='SubheaderUser'>
                        {frazes[Math.random()]}
                    </Text>
                </Gradient>
            </Group>
                <Group header={<Header mode="secondary">Прочее</Header>}>
                    {isDesktop &&
                        <ThemeControllers/>
                    }
                    <SimpleCell
                        className='btn_settings'
                        before={
                            <Avatar
                                shadow={false}
                                size={43}
                            >
                                <Icon28FavoriteOutline/>
                            </Avatar>
                        }
                        onClick={() => bridge.send("VKWebAppAddToFavorites")}
                    >
                        Добавить в избранное
                    </SimpleCell>

                    {platform === ANDROID &&
                        <SimpleCell
                            className='btn_settings'
                            before={
                                <Avatar
                                    shadow={false}
                                    size={43}
                                >
                                    <Icon28SmartphoneOutline/>
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
                                <Icon28MessagesOutline/>
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
                                <Icon28ShareOutline/>
                            </Avatar>
                        }
                        onClick={() => bridge.send("VKWebAppShare", {link: "https://vk.com/app8084045"})}
                    >
                        Поделиться приложением
                    </SimpleCell>
            </Group>
        </>
    )
}

export default HomePanelPlaceholder;