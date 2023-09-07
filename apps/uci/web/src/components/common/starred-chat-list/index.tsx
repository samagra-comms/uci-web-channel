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
import { botImage, profilePic } from '@/assets';
import { map } from 'lodash';
import moment from 'moment';
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
import {
    MainFlex,
    ChatHour,
    StyledChatItem,
    InnerRing,
    AvatarImage,
    ChatName,
} from '../message-item/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex } from '@chakra-ui/react';
import toast from 'react-hot-toast';

export const StarredChatList: FC<{ user: User }> = ({ user }) => {
    const context = useContext(AppContext);
    const [feedback, setFeedback] = React.useState(null);
    const [hasGivenFeedback, setHasGivenFeedback] = React.useState(false);
    const [userImage, setBotImage] = React.useState(profilePic);

    React.useEffect(() => {
        if (context?.currentUser?.botImage) {
            fetch(context?.currentUser?.botImage)
                .then(res => {
                    if (res.status === 403) {
                        setBotImage(profilePic);
                    } else {
                        setBotImage(context?.currentUser?.botImage);
                    }
                })
                .catch(err => {
                    setBotImage(profilePic);
                });
        } else {
            setBotImage(profilePic);
        }
    }, [context?.currentUser?.botImage]);

    const handleFeedback = feedbackType => {
        if (!hasGivenFeedback) {
            setFeedback(feedbackType);
            setHasGivenFeedback(true);

            // You can send the feedback data to your backend or handle it as needed
            // Example: sendFeedbackToServer(msg, feedbackType);

            // Optionally, provide some feedback to the user about their feedback
            if (feedbackType === 'thumbsUp') {
                toast.success('Thank you for your positive feedback!');
            } else {
                toast.error('Thank you for your feedback. We will improve!');
            }
        }
    };

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
                            //     <ImageDiv>
                            //         <StyledImage alt="botIcon" src={botImage} />
                            //     </ImageDiv>
                            // )}
                            // <StyledBubble type="text">
                            //     <p>{content?.text}</p>
                            //     <span>
                            //         {moment
                            //             .utc(
                            //                 content?.data?.sentTimestamp ||
                            //                 content?.data?.receivedTimeStamp,
                            //             )
                            //             .local()
                            //             .format('DD/MM/YYYY : hh:mm')}
                            //     </span>
                            // </StyledBubble>
                            <Flex>
                                <StyledChatItem
                                    className="chat-left"
                                    style={{ margin: '1vw' }}
                                >
                                    <div className="chat-avatar chat-avatar-left">
                                        <InnerRing>
                                            <AvatarImage
                                                src={userImage}
                                                alt="botImage"
                                                height={150}
                                                width={150}
                                            ></AvatarImage>
                                        </InnerRing>
                                        <ChatName>
                                            {config?.message?.botMsg?.text}
                                        </ChatName>
                                    </div>
                                    <MainFlex>
                                        {content?.text! == null ? (
                                            <div className="chat-text">
                                                {content?.text}
                                            </div>
                                        ) : (
                                            <Flex
                                                flexDirection={'column'}
                                                gap={'1vw'}
                                            >
                                                <div className="chat-text">
                                                    No response recieved from
                                                    Bot!
                                                </div>
                                                <Flex>
                                                    {feedback === null &&
                                                        !hasGivenFeedback && (
                                                            <Flex
                                                                gap={[
                                                                    '4vw',
                                                                    '1vw',
                                                                ]}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        config
                                                                            ?.message
                                                                            ?.feedback
                                                                            ?.successIcon
                                                                    }
                                                                    onClick={() =>
                                                                        handleFeedback(
                                                                            'thumbsUp',
                                                                        )
                                                                    }
                                                                    color="green"
                                                                />
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        config
                                                                            ?.message
                                                                            ?.feedback
                                                                            ?.failureIcon
                                                                    }
                                                                    onClick={() =>
                                                                        handleFeedback(
                                                                            'thumbsDown',
                                                                        )
                                                                    }
                                                                    color="red"
                                                                />
                                                            </Flex>
                                                        )}
                                                </Flex>
                                            </Flex>
                                        )}
                                        <ChatHour>
                                            {moment
                                                .utc(
                                                    content?.data
                                                        ?.sentTimestamp ||
                                                        content?.data
                                                            ?.repliedTimestamp,
                                                )
                                                .local()
                                                .format('hh:mm')}
                                            <span className="fa fa-check-circle"></span>
                                        </ChatHour>
                                    </MainFlex>
                                </StyledChatItem>
                            </Flex>
                        )}
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
