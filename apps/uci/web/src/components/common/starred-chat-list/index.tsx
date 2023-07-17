"use client";
import React, { FC, ReactElement, useCallback, useContext, useMemo } from 'react';
//@ts-ignore
import Chat, { Bubble, FileCard, List, ListItem, Video } from 'chatui';
import "chatui/dist/index.css";
import { map } from 'lodash';
import moment from 'moment';
import styles from './index.module.css';
import {botImage} from '@/assets';
import Image from 'next/image';
import { AppContext } from '@/context';
import { User } from '@/types';
import { getMsgType } from '@/utils';
import {theme,config} from '@/config';

export const StarredChatList: FC<{ user: User }> = ({ user }) => {
    const context = useContext(AppContext);

    const msgs = useMemo(
        () =>
            // @ts-ignore
            context?.starredMsgs?.[user?.id]?.map((msg: any) => ({
                type: getMsgType(msg),
                content: { text: msg?.text, data: { ...msg } },
                position: msg?.position ?? 'right'
            })),
        [context?.starredMsgs, user?.id]
    );

    const getLists = useCallback(
        ({ choices, isDisabled }: { choices: any; isDisabled: boolean }) => (

            // @ts-ignore
            <List className={`${styles.list}`}>
                {map(choices ?? [], (choice, index) => (
                    <ListItem
                        className={`${styles.onHover} ${styles.listItem}`}
                        // @ts-ignore
                        // eslint-disable-next-line react/no-children-prop
                        children={<span style={{ fontSize: theme.textStyles.small.fontSize }}>{choice.text || choice.key}</span>}
                    />
                ))}
            </List>
        ),
        []
    );

    function renderMessageContent(msg: { type: string; content: any }): ReactElement {
        const { type, content } = msg;
        switch (type) {
            case 'text':
                return (
                    <>
                        {content?.data?.position === 'left' && (
                            <div style={{ width: theme.width.small, marginRight: theme.margin.small, textAlign: 'center' }}>
                                <Image alt="botIcon" src={botImage} style={{ borderRadius: '50%' }} />
                            </div>
                        )}
                        <Bubble type="text">
                            <p style={{ fontSize: theme.textStyles.medium.fontSize }}>{content.text}</p>
                            <span style={{ color: 'var(--grey)', fontSize: theme.textStyles.small.fontSize }}>
                                {moment
                                    .utc(content?.data?.sentTimestamp || content?.data?.receivedTimeStamp)
                                    .local()
                                    .format('DD/MM/YYYY : hh:mm')}
                            </span>
                        </Bubble>
                    </>
                );
            case 'image':
                // eslint-disable-next-line no-case-declarations
                const url = content?.data?.payload?.media?.url || content?.data?.imageUrl;
                return (
                    <Bubble type="image">
                        <div style={{ padding: theme.padding.medium }}>
                            <Image src={url} width="299" height="200" alt="image" />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--grey)', fontSize: theme.textStyles.small.fontSize }}>
                                    {moment
                                        .utc(content?.data?.sentTimestamp || content?.data?.receivedTimeStamp)
                                        .local()
                                        .format('DD/MM/YYYY : hh:mm')}
                                </span>
                            </div>
                        </div>
                    </Bubble>
                );
            case 'video': {
                const vidUrl = content?.data?.payload?.media?.url || content?.data?.videoUrl;
                return (
                    <Bubble type="image">
                        <div style={{ padding: theme.padding.medium }}>
                            <Video
                                cover={config.Starred_Chat.video_cover}
                                src={vidUrl}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'self-end'
                                }}
                            >
                                <span style={{ color: 'var(--grey)', fontSize: theme.textStyles.small.fontSize }}>
                                    {moment
                                        .utc(content?.data?.sentTimestamp || content?.data?.receivedTimeStamp)
                                        .local()
                                        .format('DD/MM/YYYY : hh:mm')}
                                </span>
                            </div>
                        </div>
                    </Bubble>
                );
            }

            case 'file':
                return (
                    <FileCard
                        // @ts-ignore
                        file={{
                            name: config.Starred_Chat.file_name,
                            size:config.Starred_Chat.size
                        }}
                        extension="pdf" >
                        <a target="_blank"
                            href="https://www.africau.edu/images/default/sample.pdf"
                            rel="noreferrer" >
                            Sample
                        </a>
                    </FileCard>
                );
            case 'options': {
                return (
                    <>
                        <div style={{ width: theme.width.medium, marginRight: theme.margin.small, textAlign: 'center' }}>
                            <Image alt="botIcon" src={botImage} style={{ borderRadius: '50%' }} />
                        </div>
                        <Bubble type="text">
                            <div style={{ display: 'flex' }}>
                                <span style={{ fontSize: theme.textStyles.medium.fontSize }}>{content.text}</span>
                            </div>
                            <div style={{ marginTop: theme.margin.medium }} />
                            {getLists({
                                choices: content?.data?.payload?.buttonChoices ?? content?.data?.choices,
                                isDisabled: content?.data?.disabled
                            })}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'self-end'
                                }}
                            >
                                <span style={{ color: 'var(--grey)', fontSize: theme.textStyles.small.fontSize }}>
                                    {moment
                                        .utc(content?.data?.sentTimestamp || content?.data?.receivedTimeStamp)
                                        .local()
                                        .format('DD/MM/YYYY : hh:mm')}
                                </span>
                            </div>
                        </Bubble>
                    </>
                );
            }
            default:
                return <></>;
        }
    }

    return (
        <Chat
            messages={msgs}
            renderMessageContent={renderMessageContent}
            onSend={(): null => null}
            locale="en-US"
            disableSend
            placeholder={config.Starred_Chat.placeholder}
        />
    );
};


