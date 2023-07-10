"use client";
import React, { FC, ReactElement, useCallback, useContext, useMemo } from 'react';
//@ts-ignore
import Chat, { Bubble, FileCard, List, ListItem, Video } from 'chatui';
import "chatui/dist/index.css";
import { map } from 'lodash';
import moment from 'moment';
import styles from './index.module.css';
import Image from 'next/image';
import { AppContext } from '@/context';
import { User } from '@/types';
import { getMsgType } from '@/utils/get-msg-type';
import config from './config.json';

export const StarredChatList: FC<{ user: User }> = ({ user }) => {
    const context = useContext(AppContext);

    const msgs = useMemo(
        () =>
        // @ts-ignore
            context?.starredMsgs?.[user?.id]?.map((msg: any) => ({
                type: getMsgType(msg),
                content: { text: msg?.text, data: { ...msg } },
                position: msg?.position ?? config.DEFAULT_POSITION
            })),
        [context?.starredMsgs, user?.id]
    );

    const getLists = useCallback(
        ({ choices, isDisabled }: { choices: any; isDisabled: boolean }) => (
            <List className={`${styles.list}`}>
                {map(choices ?? [], (choice, index) => (
                    <ListItem
                        className={`${styles.onHover} ${styles.listItem}`}
                        children={<span style={{ fontSize: config.listItemFontSize }}>{choice.text || choice.key}</span>}
                    />
                ))}
            </List>
        ),
        []
    );

    function renderMessageContent(msg: { type: string; content: any }): ReactElement {
        const { type, content } = msg;
        switch (type) {
            case config.bubbleTypeText:
                return (
                    <>
                        {content?.data?.position === 'left' && (
                            <div style={{ width: config.divWidth, marginRight: config.divMarginRight, textAlign: config.divTextAlign as 'left' | 'right' | 'center'  }}>
                                <Image alt={config.botImageAlt} src={config.botImage} style={{ borderRadius: '50%' }} />
                            </div>
                        )}
                        <Bubble type={config.bubbleTypeText}>
                            <p style={{ fontSize: config.pFontSize }}>{content.text}</p>
                            <span style={{ color: config.spanColor, fontSize: config.spanFontSize }}>
                                {moment
                                    .utc(content?.data?.sentTimestamp || content?.data?.receivedTimeStamp)
                                    .local()
                                    .format('DD/MM/YYYY : hh:mm')}
                            </span>
                        </Bubble>
                    </>
                );
            case config.bubbleTypeImage:
                const url = content?.data?.payload?.media?.url || content?.data?.imageUrl;
                return (
                    <Bubble type={config.bubbleTypeImage}>
                        <div style={{ padding: config.divPadding }}>
                            <Image src={url} width={config.imageWidth} height={config.imageHeight} alt={config.imageAlt} />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: config.spanColor, fontSize: config.spanFontSize }}>
                                    {moment
                                        .utc(content?.data?.sentTimestamp || content?.data?.receivedTimeStamp)
                                        .local()
                                        .format('DD/MM/YYYY : hh:mm')}
                                </span>
                            </div>
                        </div>
                    </Bubble>
                );
            case config.bubbleTypeVideo:
                const vidUrl = content?.data?.payload?.media?.url || content?.data?.videoUrl;
                return (
                    <Bubble type={config.bubbleTypeVideo}>
                        <div style={{ padding: config.divPadding }}>
                            <Video cover={config.videoCover} src={vidUrl} />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'self-end'
                                }}
                            >
                                <span style={{ color: config.spanColor, fontSize: config.spanFontSize }}>
                                    {moment
                                        .utc(content?.data?.sentTimestamp || content?.data?.receivedTimeStamp)
                                        .local()
                                        .format('DD/MM/YYYY : hh:mm')}
                                </span>
                            </div>
                        </div>
                    </Bubble>
                );
            case config.bubbleTypeFile:
                return (
                    <FileCard
                        // @ts-ignore
                        file={{
                            name: config.fileCardName,
                            size: config.fileCardSize
                        }}
                        extension={config.fileCardExtension}
                    >
                        <a
                            target="_blank"
                            href={config.fileCardLink}
                            rel="noreferrer"
                        >
                            {config.fileCardLinkText}
                        </a>
                    </FileCard>
                );
            case config.bubbleTypeOptions:
                return getLists(content?.data?.payload);
            default:
                return <></>;
        }
    }

    return (
        <Chat
            className={styles.chat}
            messages={msgs}
            renderMessageContent={renderMessageContent}
        />
    );
};

export default StarredChatList;

