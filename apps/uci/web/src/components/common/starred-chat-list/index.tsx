"use client";
import React, { FC, ReactElement, useCallback, useContext, useMemo } from 'react';
//@ts-ignore
import Chat, { Bubble, FileCard, List, ListItem, Video } from 'chatui';
import "chatui/dist/index.css";
import { map } from 'lodash';
import moment from 'moment';
import styles from './index.module.css';
import { botImage } from '@/assets';
import Image from 'next/image';
import { AppContext } from '@/context';
import { User } from '@/types';
import { getMsgType } from '@/utils';
import { theme, config } from '@/config';
import styled from 'styled-components';

const ImageDiv = styled.div`
  width: ${theme.width.small};
  margin-right: ${theme.margin.small};
  text-align: center;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
`;

const StyledBubble = styled(Bubble)`
  p {
    font-size: ${theme.textStyles.medium.fontSize};
  }
  span {
    color: var(--grey);
    font-size: ${theme.textStyles.small.fontSize};
  }
`;

const StyledBubbleImage = styled(Bubble)`
  div {
    padding: ${theme.padding.medium};
  }
  span {
    color: var(--grey);
    font-size: ${theme.textStyles.small.fontSize};
  }
`;

const StyledBubbleOptions = styled(Bubble)`
  div {
    display: flex;
  }
  span {
    font-size: ${theme.textStyles.medium.fontSize};
  }
  div:nth-child(3) {
    margin-top: ${theme.margin.medium};
  }
  span:last-child {
    color: var(--grey);
    font-size: ${theme.textStyles.small.fontSize};
  }
`;

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
            <List className={`${styles.list}`}>
                {map(choices ?? [], (choice, index) => (
                    <ListItem
                        className={`${styles.onHover} ${styles.listItem}`}
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
                            <ImageDiv>
                                <StyledImage alt="botIcon" src={botImage} />
                            </ImageDiv>
                        )}
                        <StyledBubble type="text">
                            <p>{content.text}</p>
                            <span>
                                {moment
                                    .utc(content?.data?.sentTimestamp || content?.data?.receivedTimeStamp)
                                    .local()
                                    .format('DD/MM/YYYY : hh:mm')}
                            </span>
                        </StyledBubble>
                    </>
                );
            case 'image':
                const url = content?.data?.payload?.media?.url || content?.data?.imageUrl;
                return (
                    <StyledBubbleImage type="image">
                        <div>
                            <Image src={url} width="299" height="200" alt="image" />
                            <div>
                                <span>
                                    {moment
                                        .utc(content?.data?.sentTimestamp || content?.data?.receivedTimeStamp)
                                        .local()
                                        .format('DD/MM/YYYY : hh:mm')}
                                </span>
                            </div>
                        </div>
                    </StyledBubbleImage>
                );
            case 'video': {
                const vidUrl = content?.data?.payload?.media?.url || content?.data?.videoUrl;
                return (
                    <StyledBubbleImage type="image">
                        <div>
                            <Video
                                cover={config.chat.video_cover}
                                src={vidUrl}
                            />
                            <div>
                                <span>
                                    {moment
                                        .utc(content?.data?.sentTimestamp || content?.data?.receivedTimeStamp)
                                        .local()
                                        .format('DD/MM/YYYY : hh:mm')}
                                </span>
                            </div>
                        </div>
                    </StyledBubbleImage>
                );
            }

            case 'file':
                return (
                    <FileCard
                        file={{
                            name: 'sample',
                            size: 12345,
                        }}
                        extension="pdf" >
                        <a target="_blank"
                            href={content?.data?.payload?.media?.url || content?.data?.fileUrl}
                            style={{ textDecoration: 'none' }}>
                            Download
                        </a>
                    </FileCard>
                );
            case 'options':
                return (
                    <StyledBubbleOptions type="options">
                        <div>
                            <span>{content.text}</span>
                        </div>
                        {getLists(content.data)}
                        <div>
                            <span>
                                {moment
                                    .utc(content?.data?.sentTimestamp || content?.data?.receivedTimeStamp)
                                    .local()
                                    .format('DD/MM/YYYY : hh:mm')}
                            </span>
                        </div>
                    </StyledBubbleOptions>
                );
            default:
                return <></>;
        }
    }

    return (
        <Chat
            className={styles.chat}
            navbar={{ title: 'Starred Messages' }}
            messages={msgs}
            renderMessageContent={renderMessageContent}
        />
    );
};