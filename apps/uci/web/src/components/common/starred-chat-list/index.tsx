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
                                cover="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAeFBMVEUyMjL///8vLy/Q0NBJSUlAQEA8Oz85OD0tLS0qKio1Nzs5OTz6+vo5OTnZ2dkzMzPw8PBkZGRGRkaAgIDo6OioqKgkJCR6enqurq5SUlLMzMyFhYXh4eHW1ta7u7tHR0dcXFybm5twcHC/v7+UlJRXWFeVlZVsbGwZSzceAAAD0UlEQVR4nO3ca3OiMBiGYYOoPUQNihVBrQfc/v9/uEntslRBwmFk3jfPNbOf2tlyT0oCgTp4m0wm75Mb46tRkfH40Vf/f7nczQ97L/aW0d8xLfxJ1+N+n4wnFcejvzH//+l/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgOfw+j6AfswXcxfLvcUqnb70fRTP5/lDebx8ODfkuluI3Xrg2pB/dwu137y4NeTXbjPkI6eG/F+3CKPPj74P5omybiGGiefO73quW6jo8Nr38TxLvlvI3dJz5Cz/1a2H/Oi7sZbfdAsxWzpx+XbXrSd2F9by+24h4yX/ib2g20zs01fm5YXdQsQJ87O8pFuo1YH15VtZt17LT6+Mh7y02ww544n9Qbdey08jruEPu8U2+mK6pD3uFnK2HLC8V6no1uX7A8et5spuIXapz2/ILbr15duG3Vlu0y3kMJkzG3KrbnOWB7zOcstuPbEnrNZy225zXx4w2oqx79aXb4z22Ot0C7UPuDw8rdWtJ/Z0xGNir9fN5yatbrc+y9Mpg/D63fryjcFZ3qBbyF1CfmJv0m3WcuqPVZp165u0ZEF6yJt267Wc9H15425zkzalu5Y37zZr+YXsWt6mW4htQnUtb9ctwlVAcyumZbdey9dzihN7225z+XYhOOTtu82LUAtyE3sX3WbDldpa3km3eUWC2GOVbrq/330jdZZ31W2epC3mfdfY66xbX8Ss3ezebwj9onfWHdPaZO6oOzwHtN786qY7PC36Dqmpi24VnWgN9qCLbrlNPFrXLEbrbhldKN6Dt+0eHmm+BNKuW54X5M7sq1bdwyXNwR606g7PJ7Lbii26VTLt++BbaNqtjgHdwR407ZbbP4SfGRjNuvcHimt2XpPuYeqT/h036nereEP8GbBRu3u2pLS9UKpmtzqfSG0flqrXHSb032y5qtMtjwH1aTxj3y1nK+Jrdp5995n8mp1n222e/THKtuxWMad3sA2r7nDp932cXbPoVvs1+cvSO9V/PxamBLdLK1V1y4jPmp1X0b1b+aym8czj7pjfH8z9eNS9S8hul1Yq71aUt0srlXarZETo9YXaSrpVxOQ+u0xhtwyPjG69ChV273mu2XkF3bPjhueanXfXLYfU/2TGym33LNlQei2psd/dKl478oF7v7pVSvkRZy25brn6Yj+NZ7JuuY24r9l5Wfc5YPX5DVV+umepA2t23ne3ir9cWLPzTHeYbPo+jKfz/HPszIfk5nifJ24fQWRn6s6aDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbPwFoto0lZUp3cEAAAAASUVORK5CYII="
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