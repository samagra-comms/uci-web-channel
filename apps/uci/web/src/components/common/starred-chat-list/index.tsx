'use client';
import React, {
    FC,
    ReactElement,
    useCallback,
    useContext,
    useMemo,
} from 'react';
//@ts-ignore
import Chat, { FileCard, List, ListItem, Video } from 'chatui';
import 'chatui/dist/index.css';
import { map } from 'lodash';
import moment from 'moment';
import { botImage } from '@/assets';
import Image from 'next/image';
import { AppContext } from '@/context';
import { User } from '@/types';
import { getMsgType } from '@/utils';
import { config } from '@/config';
import {
    StyledBubble,
    StyledBubbleImage,
    StyledBubbleOptions,
    StyledImage,
    ImageDiv,
    Span,
} from './styled';

export const StarredChatList: FC<{ user: User }> = ({ user }) => {
    const context = useContext(AppContext);

    const msgs = useMemo(
        () =>
            // @ts-ignore
            context?.starredMsgs?.[user?.id]?.map((msg: any) => ({
                type: getMsgType(msg),
                content: { text: msg?.text, data: { ...msg } },
                position: msg?.position ?? 'right',
            })),
        [context?.starredMsgs, user?.id],
    );

    const getLists = useCallback(
        ({ choices, isDisabled }: { choices: any; isDisabled: boolean }) => (
            <List>
                {map(choices ?? [], (choice, index) => (
                    <ListItem
                        children={<Span>{choice.text || choice.key}</Span>}
                    />
                ))}
            </List>
        ),
        [],
    );

    function renderMessageContent(msg: {
        type: string;
        content: any;
    }): ReactElement {
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
                                    .utc(
                                        content?.data?.sentTimestamp ||
                                            content?.data?.receivedTimeStamp,
                                    )
                                    .local()
                                    .format('DD/MM/YYYY : hh:mm')}
                            </span>
                        </StyledBubble>
                    </>
                );
            case 'image':
                const url =
                    content?.data?.payload?.media?.url ||
                    content?.data?.imageUrl;
                return (
                    <StyledBubbleImage type="image">
                        <div>
                            <Image
                                src={url}
                                width="299"
                                height="200"
                                alt="image"
                            />
                            <div>
                                <span>
                                    {moment
                                        .utc(
                                            content?.data?.sentTimestamp ||
                                                content?.data
                                                    ?.receivedTimeStamp,
                                        )
                                        .local()
                                        .format('DD/MM/YYYY : hh:mm')}
                                </span>
                            </div>
                        </div>
                    </StyledBubbleImage>
                );
            case 'video': {
                const vidUrl =
                    content?.data?.payload?.media?.url ||
                    content?.data?.videoUrl;
                return (
                    <StyledBubbleImage type="image">
                        <div>
                            <Video
                                cover={config?.starredlist?.video_cover}
                                src={vidUrl}
                            />
                            <div>
                                <span>
                                    {moment
                                        .utc(
                                            content?.data?.sentTimestamp ||
                                                content?.data
                                                    ?.receivedTimeStamp,
                                        )
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
                        extension="pdf"
                    >
                        <a
                            target="_blank"
                            href={
                                content?.data?.payload?.media?.url ||
                                content?.data?.fileUrl
                            }
                            download
                        >
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
                                    .utc(
                                        content?.data?.sentTimestamp ||
                                            content?.data?.receivedTimeStamp,
                                    )
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
    return <Chat messages={msgs} renderMessageContent={renderMessageContent} />;
};
