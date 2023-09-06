//@ts-ignore
import { ScrollView, List, ListItem, FileCard, Video } from 'chatui';
import { faStar, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { includes, map, find, filter, omit } from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { botImage, profilePic } from '@/assets';
import Image from 'next/image';
import { AppContext } from '@/context';
import { useLocalStorage } from '@/hooks';
import { Box, Button, Flex } from '@chakra-ui/react';
import { config } from '@/config';
// import './index.css';
import {
    Span,
    BubbleSpan,
    Div,
    BubbleDiv,
    ChatContainer,
    ChatItem,
    ChatAvatar,
    StyledChatItem,
    ChatBox,
    StyledChatContainer,
    InnerRing,
    ChatHour,
    ChatTextRight,
    ChatAvatarDiv,
    ChatName,
    AvatarImage,
    MainFlex,
} from './styled';
import { useTheme } from '@/providers/ThemeProvider';

export const MessageItem: React.FC<any> = ({
    currentUser,
    msg,
    chatUIMsg,
    onSend,
}) => {
    const context = React.useContext(AppContext);

    const [isInLocal, setIsInLocal] = React.useState(false);
    const [userImage, setBotImage] = React.useState(profilePic);
    const { theme } = useTheme();
    const [feedback, setFeedback] = React.useState(null); // 'thumbsUp' or 'thumbsDown'
    const [hasGivenFeedback, setHasGivenFeedback] = React.useState(false);
    const [msgToStarred, setMsgToStarred] = React.useState<{
        botUuid?: string;
        messageId?: string;
    }>({});
    //@ts-ignore
    const [starredFromLocal] = useLocalStorage('starredChats', null, true);

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

    React.useEffect(() => {
        if (starredFromLocal) {
            if (
                Object.keys(starredFromLocal)?.includes(
                    msg?.content?.data?.botUuid,
                )
            ) {
                const starred = find(
                    starredFromLocal?.[msg?.content?.data?.botUuid],
                    {
                        messageId: msg?.content?.data?.messageId,
                    },
                );

                if (starred) {
                    // console.log("qwe1:", "yes I exist")
                    setMsgToStarred(msg?.content?.data);
                    setIsInLocal(true);
                }
            }
        }
    }, [msg?.content?.data, starredFromLocal]);

    const isStarred = React.useMemo(
        () =>
            Object.keys(msgToStarred)?.length > 0
                ? !!chatUIMsg?.find(
                      (item: any) =>
                          item?.content?.data?.botUuid ===
                          msgToStarred?.botUuid,
                  ) && isInLocal
                : false,
        [msgToStarred, chatUIMsg, isInLocal],
    );

    const onLongPress = React.useCallback(
        (content: any) => {
            if (msgToStarred?.botUuid) {
                const prevStarredMsgs = { ...context?.starredMsgs };
                const newStarredMsgs = {
                    ...prevStarredMsgs,
                    [msgToStarred?.botUuid]: filter(
                        prevStarredMsgs?.[msgToStarred?.botUuid],
                        item => item?.messageId !== msgToStarred?.messageId,
                    ),
                };

                if (newStarredMsgs[msgToStarred?.botUuid]?.length === 0) {
                    const t = omit(newStarredMsgs, [msgToStarred?.botUuid]);
                    context?.setStarredMsgs(t);
                    localStorage.setItem('starredChats', JSON.stringify(t));
                } else {
                    context?.setStarredMsgs(newStarredMsgs);
                    localStorage.setItem(
                        'starredChats',
                        JSON.stringify(newStarredMsgs),
                    );
                }
                setMsgToStarred({});
                setIsInLocal(false);
            } else {
                setMsgToStarred(content?.data);
                setIsInLocal(true);
                context?.setStarredMsgs((prev: any) => {
                    let valueToReturn = {};

                    if (includes(Object.keys(prev), content?.data?.botUuid)) {
                        valueToReturn = {
                            ...prev,
                            // eslint-disable-next-line no-unsafe-optional-chaining
                            [content?.data?.botUuid]: [
                                ...prev?.[content?.data?.botUuid],
                                { ...content?.data },
                            ],
                        };
                    } else {
                        valueToReturn = {
                            ...prev,
                            [content?.data?.botUuid]: [content?.data],
                        };
                    }
                    localStorage.setItem(
                        'starredChats',
                        JSON.stringify(valueToReturn),
                    );
                    return valueToReturn;
                });
            }
        },
        [context, msgToStarred],
    );

    const handleSend = React.useCallback(
        (type: string, val: any) => {
            if (type === 'text' && val.trim()) {
                // @ts-ignore
                onSend(val, null, true, currentUser);
            }
        },
        [onSend, currentUser],
    );

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

    const getLists = React.useCallback(
        ({ choices, isDisabled }: { choices: any; isDisabled: boolean }) => (
            <List>
                {map(choices ?? [], (choice, index) => (
                    <ListItem
                        key={`${index}_${choice?.key}`}
                        style={{
                            background: choice?.active
                                ? theme.list
                                : theme.innerBackground,
                        }}
                        onClick={(e: any): void => {
                            e.preventDefault();
                            if (isDisabled) {
                                toast.error('Cannot answer again');
                            } else {
                                handleSend('text', choice.key);
                            }
                        }}
                        children={
                            <div>
                                <span style={{ color: `${theme.color}` }}>
                                    {choice.key} {choice.text}
                                </span>
                            </div>
                        }
                    />
                ))}
            </List>
        ),
        [handleSend],
    );

    const { content, type } = msg;

    switch (type) {
        case 'text':
            return (
                <div>
                    <StyledChatContainer>
                        <ChatBox className="chat-box chatContainerScroll">
                            {content?.data.position === 'left' ? (
                                <>
                                    <StyledChatItem className="chat-left">
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
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                        onClick={() =>
                                                            onLongPress(content)
                                                        }
                                                        color={
                                                            isStarred
                                                                ? config.message
                                                                      .botMsg
                                                                      .starredColor
                                                                : 'var(--grey)'
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                <Flex
                                                    flexDirection={'column'}
                                                    gap={'1vw'}
                                                >
                                                    <div className="chat-text">
                                                        No response recieved
                                                        from Bot!
                                                        <FontAwesomeIcon
                                                            icon={
                                                                config
                                                                    ?.starredlist
                                                                    ?.icon
                                                            }
                                                            onClick={() =>
                                                                onLongPress(
                                                                    content,
                                                                )
                                                            }
                                                            color={
                                                                isStarred
                                                                    ? config
                                                                          .message
                                                                          .botMsg
                                                                          .starredColor
                                                                    : 'var(--grey)'
                                                            }
                                                        />
                                                    </div>
                                                    <Flex>
                                                        {feedback === null &&
                                                            !hasGivenFeedback && (
                                                                <Flex
                                                                    gap={[
                                                                        '4vw',
                                                                        '0.5vw',
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
                                            <ChatHour
                                                style={{ marginLeft: '45vw' }}
                                            >
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
                                </>
                            ) : (
                                <StyledChatItem className="chat-right">
                                    <ChatHour>
                                        {moment
                                            .utc(
                                                content?.data?.sentTimestamp ||
                                                    content?.data
                                                        ?.repliedTimestamp,
                                            )
                                            .local()
                                            .format('hh:mm')}{' '}
                                        <span className="fa fa-check-circle"></span>
                                    </ChatHour>
                                    <ChatTextRight>
                                        {content?.text}
                                    </ChatTextRight>
                                    <ChatAvatarDiv>
                                        <ChatAvatar
                                            src={
                                                config?.message?.userImage
                                                    ?.image
                                            }
                                            alt="User"
                                        />
                                        <ChatName>
                                            {config?.message?.userInput?.name}
                                        </ChatName>
                                    </ChatAvatarDiv>
                                </StyledChatItem>
                            )}
                        </ChatBox>
                    </StyledChatContainer>
                </div>
            );

        case 'image': {
            console.log('alibaba:', { msg });
            const url =
                content?.data?.payload?.media?.url || content?.data?.imageUrl;
            return (
                <>
                    <ChatContainer>
                        <ChatItem className={`chat-${content.data.position}`}>
                            <ChatAvatar>
                                {content?.data?.position ===
                                    config?.message?.userInput?.position && (
                                    <>
                                        <InnerRing>
                                            <Image
                                                src={userImage}
                                                alt="botImage"
                                                height={150}
                                                width={150}
                                            />
                                        </InnerRing>
                                        <div className="chat-name">
                                            {config?.message?.botMsg?.text}
                                        </div>
                                    </>
                                )}
                            </ChatAvatar>
                        </ChatItem>
                    </ChatContainer>
                    {url != null ? (
                        <Box marginLeft="-30px">
                            <Div>
                                <Image
                                    src={url}
                                    width={300}
                                    height={300}
                                    alt="botImage"
                                />
                                <BubbleDiv>
                                    <BubbleSpan>
                                        {moment
                                            .utc(
                                                content?.data?.sentTimestamp ||
                                                    content?.data
                                                        ?.repliedTimestamp,
                                            )
                                            .local()
                                            .format('DD/MM/YYYY : hh:mm')}
                                    </BubbleSpan>
                                    <span>
                                        {content?.data?.position === 'left' && (
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                onClick={(): void =>
                                                    onLongPress(content)
                                                }
                                                color={
                                                    isStarred
                                                        ? config?.message
                                                              ?.botMsg
                                                              ?.starredColor
                                                        : 'grey'
                                                }
                                            />
                                        )}
                                        <FontAwesomeIcon
                                            icon={faDownload}
                                            onClick={(): void => download(url)}
                                            color={'var(--grey)'}
                                        />
                                    </span>
                                </BubbleDiv>
                            </Div>
                            {/* </Bubble> */}
                        </Box>
                    ) : (
                        <div className="chat-text">
                            No response recieved from Bot!
                            <FontAwesomeIcon
                                icon={faStar}
                                onClick={() => onLongPress(content)}
                                color={
                                    isStarred
                                        ? config.message.botMsg.starredColor
                                        : 'var(--grey)'
                                }
                            />
                        </div>
                    )}
                </>
            );
        }

        case 'file': {
            const url =
                content?.data?.payload?.media?.url || content?.data?.fileUrl;
            return (
                <>
                    <ChatContainer>
                        <ChatItem className={`chat-${content.data.position}`}>
                            <ChatAvatar>
                                {content?.data?.position ===
                                    config.message.userInput.position && (
                                    <>
                                        <div>
                                            <Image
                                                src={botImage}
                                                alt="botImage"
                                                height={150}
                                                width={150}
                                            />
                                        </div>
                                        <div className="chat-name">Bot</div>
                                    </>
                                )}
                            </ChatAvatar>
                        </ChatItem>
                    </ChatContainer>
                    <Box
                        background={theme?.background}
                        padding={config?.message?.botMsg?.padding}
                        borderRadius={config?.message?.botMsg?.borderRadius}
                        margin={config?.message?.botMsg?.margin}
                    >
                        <Div>
                            <FileCard file={url} extension="pdf" />
                            <BubbleDiv>
                                <BubbleSpan>
                                    {moment
                                        .utc(
                                            content?.data?.sentTimestamp ||
                                                content?.data?.repliedTimestamp,
                                        )
                                        .local()
                                        .format('DD/MM/YYYY : hh:mm')}
                                </BubbleSpan>
                                <span>
                                    {content?.data?.position === 'left' && (
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            onClick={(): void =>
                                                onLongPress(content)
                                            }
                                            color={
                                                isStarred
                                                    ? config?.message?.botMsg
                                                          ?.starredColor
                                                    : config?.message?.botMsg
                                                          ?.unstarredColor
                                            }
                                        />
                                    )}
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        onClick={(): void => download(url)}
                                        style={{ marginLeft: '10px' }}
                                        color={'var(--grey)'}
                                    />
                                </span>
                            </BubbleDiv>
                        </Div>
                    </Box>
                </>
            );
        }

        case 'video': {
            const url =
                content?.data?.payload?.media?.url || content?.data?.videoUrl;
            return (
                <>
                    <ChatContainer>
                        <ChatItem className={`chat-${content.data.position}`}>
                            <ChatAvatar>
                                {content?.data?.position ===
                                    config.message.userInput.position && (
                                    <>
                                        <div>
                                            <Image
                                                src={botImage}
                                                alt="botImage"
                                                height={150}
                                                width={150}
                                            />
                                        </div>
                                        <div className="chat-name">Bot</div>
                                    </>
                                )}
                            </ChatAvatar>
                        </ChatItem>
                    </ChatContainer>
                    <Box
                        background={theme?.background}
                        padding={config?.message?.botMsg?.padding}
                        borderRadius={config?.message?.botMsg?.borderRadius}
                        margin={config?.message?.botMsg?.margin}
                    >
                        <Div>
                            <Video
                                cover="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAeFBMVEUyMjL///8vLy/Q0NBJSUlAQEA8Oz85OD0tLS0qKio1Nzs5OTz6+vo5OTnZ2dkzMzPw8PBkZGRGRkaAgIDo6OioqKgkJCR6enqurq5SUlLMzMyFhYXh4eHW1ta7u7tHR0dcXFybm5twcHC/v7+UlJRXWFeVlZVsbGwZSzceAAAD0UlEQVR4nO3ca3OiMBiGYYOoPUQNihVBrQfc/v9/uEntslRBwmFk3jfPNbOf2tlyT0oCgTp4m0wm75Mb46tRkfH40Vf/f7nczQ97L/aW0d8xLfxJ1+N+n4wnFcejvzH//+l/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgOfw+j6AfswXcxfLvcUqnb70fRTP5/lDebx8ODfkuluI3Xrg2pB/dwu137y4NeTXbjPkI6eG/F+3CKPPj74P5omybiGGiefO73quW6jo8Nr38TxLvlvI3dJz5Cz/1a2H/Oi7sZbfdAsxWzpx+XbXrSd2F9by+24h4yX/ib2g20zs01fm5YXdQsQJ87O8pFuo1YH15VtZt17LT6+Mh7y02ww544n9Qbdey08jruEPu8U2+mK6pD3uFnK2HLC8V6no1uX7A8et5spuIXapz2/ILbr15duG3Vlu0y3kMJkzG3KrbnOWB7zOcstuPbEnrNZy225zXx4w2oqx79aXb4z22Ot0C7UPuDw8rdWtJ/Z0xGNir9fN5yatbrc+y9Mpg/D63fryjcFZ3qBbyF1CfmJv0m3WcuqPVZp165u0ZEF6yJt267Wc9H15425zkzalu5Y37zZr+YXsWt6mW4htQnUtb9ctwlVAcyumZbdey9dzihN7225z+XYhOOTtu82LUAtyE3sX3WbDldpa3km3eUWC2GOVbrq/330jdZZ31W2epC3mfdfY66xbX8Ss3ezebwj9onfWHdPaZO6oOzwHtN786qY7PC36Dqmpi24VnWgN9qCLbrlNPFrXLEbrbhldKN6Dt+0eHmm+BNKuW54X5M7sq1bdwyXNwR606g7PJ7Lbii26VTLt++BbaNqtjgHdwR407ZbbP4SfGRjNuvcHimt2XpPuYeqT/h036nereEP8GbBRu3u2pLS9UKpmtzqfSG0flqrXHSb032y5qtMtjwH1aTxj3y1nK+Jrdp5995n8mp1n222e/THKtuxWMad3sA2r7nDp932cXbPoVvs1+cvSO9V/PxamBLdLK1V1y4jPmp1X0b1b+aym8czj7pjfH8z9eNS9S8hul1Yq71aUt0srlXarZETo9YXaSrpVxOQ+u0xhtwyPjG69ChV273mu2XkF3bPjhueanXfXLYfU/2TGym33LNlQei2psd/dKl478oF7v7pVSvkRZy25brn6Yj+NZ7JuuY24r9l5Wfc5YPX5DVV+umepA2t23ne3ir9cWLPzTHeYbPo+jKfz/HPszIfk5nifJ24fQWRn6s6aDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbPwFoto0lZUp3cEAAAAASUVORK5CYII="
                                src={url}
                            />
                            <div>
                                <span
                                    style={{
                                        color: 'var(--grey)',
                                    }}
                                >
                                    {moment
                                        .utc(
                                            content?.data?.sentTimestamp ||
                                                content?.data?.repliedTimestamp,
                                        )
                                        .local()
                                        .format('DD/MM/YYYY : hh:mm')}
                                </span>
                                <span>
                                    {content?.data?.position === 'left' && (
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            onClick={(): void =>
                                                onLongPress(content)
                                            }
                                            color={
                                                isStarred
                                                    ? config?.message?.botMsg
                                                          ?.starredColor
                                                    : 'var(--grey)'
                                            }
                                        />
                                    )}
                                </span>
                            </div>
                        </Div>
                    </Box>
                </>
            );
        }
        case 'options': {
            console.log('qwe12:', { content });
            return (
                <>
                    <ChatContainer>
                        <ChatItem className={`chat-${content.data.position}`}>
                            <ChatAvatar>
                                {content?.data?.position ===
                                    config.message.userInput.position && (
                                    <>
                                        <div>
                                            <Image
                                                src={botImage}
                                                alt="botImage"
                                                height={150}
                                                width={150}
                                            />
                                        </div>
                                        <div className="chat-name">Bot</div>
                                    </>
                                )}
                            </ChatAvatar>
                        </ChatItem>
                    </ChatContainer>
                    <Box
                        background={theme?.mainBackground}
                        borderRadius={config?.message?.botMsg?.borderRadius}
                        padding={config?.message?.botMsg?.padding}
                        margin={config?.message?.botMsg?.margin}
                        color={theme?.color}
                    >
                        <Box marginBottom="1vw">
                            <Span>{content.text}</Span>
                        </Box>
                        {getLists({
                            choices:
                                content?.data?.payload?.buttonChoices ??
                                content?.data?.choices,
                            isDisabled: content?.data?.disabled,
                        })}
                        <BubbleDiv>
                            <BubbleSpan>
                                {moment
                                    .utc(
                                        content?.data?.sentTimestamp ||
                                            content?.data?.repliedTimestamp,
                                    )
                                    .local()
                                    .format('DD/MM/YYYY : hh:mm')}
                            </BubbleSpan>
                            <span>
                                {content?.data?.position === 'left' && (
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        onClick={(): void =>
                                            onLongPress(content)
                                        }
                                        color={
                                            isStarred
                                                ? config?.message?.botMsg
                                                      ?.starredColor
                                                : 'var(--grey)'
                                        }
                                    />
                                )}
                            </span>
                        </BubbleDiv>
                    </Box>
                </>
            );
        }
        default:
            return (
                <ScrollView
                    data={[]}
                    //@ts-ignore
                    renderItem={(item: any): ReactElement => (
                        <Button label={item.text} />
                    )}
                />
            );
    }
};
