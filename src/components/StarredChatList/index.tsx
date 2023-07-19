import React, { FC, ReactElement, useCallback, useContext, useMemo } from 'react';
import { Bubble, FileCard, Image, List, ListItem, Video } from 'samagra-chatui';
import { Chat } from 'samagra-chatui/lib/components/Chat';
import { map } from 'lodash';
import moment from 'moment';
import { User } from '../../types';
import { AppContext } from '../../utils/app-context';
import { getMsgType } from '../../utils/get-msg-type';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './index.module.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import botImage from '../../assets/images/bot_icon_2.png';

const StarredChatList: FC<{ user: User }> = ({ user }) => {
	const context = useContext(AppContext);

	const msgs = useMemo(
		() =>
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			context?.starredMsgs?.[user?.id]?.map((msg: any) => ({
				type: getMsgType(msg),
				content: { text: msg?.text, data: { ...msg } },
				position: msg?.position ?? 'right',
				user: { avatar: msg?.position === 'left' ? context?.currentUser?.botImage || botImage :""},
			})),
		[context?.currentUser?.botImage, context?.starredMsgs, user?.id]
	);

	const getLists = useCallback(
		({ choices, isDisabled }: { choices: any; isDisabled: boolean }) => (
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			<List className={`${styles.list}`}>
				{map(choices ?? [], (choice, index) => (
					<ListItem
						className={`${styles.onHover} ${styles.listItem}`}
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						// eslint-disable-next-line react/no-children-prop
						children={<span style={{ fontSize: '16px' }}>{choice.text || choice.key}</span>}
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
						<Bubble type="text">
							<p style={{ fontSize: '16px' }}>{content.text}</p>
							<span style={{ color: 'var(--grey)', fontSize: '10px' }}>
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
						<div style={{ padding: '7px' }}>
							<Image src={url} width="299" height="200" alt="image" lazy fluid />
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<span style={{ color: 'var(--grey)', fontSize: '10px' }}>
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
					<>
					<Bubble type="image">
						
						<div style={{ padding: '7px' }}>
							
							<Video
								cover="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAeFBMVEUyMjL///8vLy/Q0NBJSUlAQEA8Oz85OD0tLS0qKio1Nzs5OTz6+vo5OTnZ2dkzMzPw8PBkZGRGRkaAgIDo6OioqKgkJCR6enqurq5SUlLMzMyFhYXh4eHW1ta7u7tHR0dcXFybm5twcHC/v7+UlJRXWFeVlZVsbGwZSzceAAAD0UlEQVR4nO3ca3OiMBiGYYOoPUQNihVBrQfc/v9/uEntslRBwmFk3jfPNbOf2tlyT0oCgTp4m0wm75Mb46tRkfH40Vf/f7nczQ97L/aW0d8xLfxJ1+N+n4wnFcejvzH//+l/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgOfw+j6AfswXcxfLvcUqnb70fRTP5/lDebx8ODfkuluI3Xrg2pB/dwu137y4NeTXbjPkI6eG/F+3CKPPj74P5omybiGGiefO73quW6jo8Nr38TxLvlvI3dJz5Cz/1a2H/Oi7sZbfdAsxWzpx+XbXrSd2F9by+24h4yX/ib2g20zs01fm5YXdQsQJ87O8pFuo1YH15VtZt17LT6+Mh7y02ww544n9Qbdey08jruEPu8U2+mK6pD3uFnK2HLC8V6no1uX7A8et5spuIXapz2/ILbr15duG3Vlu0y3kMJkzG3KrbnOWB7zOcstuPbEnrNZy225zXx4w2oqx79aXb4z22Ot0C7UPuDw8rdWtJ/Z0xGNir9fN5yatbrc+y9Mpg/D63fryjcFZ3qBbyF1CfmJv0m3WcuqPVZp165u0ZEF6yJt267Wc9H15425zkzalu5Y37zZr+YXsWt6mW4htQnUtb9ctwlVAcyumZbdey9dzihN7225z+XYhOOTtu82LUAtyE3sX3WbDldpa3km3eUWC2GOVbrq/330jdZZ31W2epC3mfdfY66xbX8Ss3ezebwj9onfWHdPaZO6oOzwHtN786qY7PC36Dqmpi24VnWgN9qCLbrlNPFrXLEbrbhldKN6Dt+0eHmm+BNKuW54X5M7sq1bdwyXNwR606g7PJ7Lbii26VTLt++BbaNqtjgHdwR407ZbbP4SfGRjNuvcHimt2XpPuYeqT/h036nereEP8GbBRu3u2pLS9UKpmtzqfSG0flqrXHSb032y5qtMtjwH1aTxj3y1nK+Jrdp5995n8mp1n222e/THKtuxWMad3sA2r7nDp932cXbPoVvs1+cvSO9V/PxamBLdLK1V1y4jPmp1X0b1b+aym8czj7pjfH8z9eNS9S8hul1Yq71aUt0srlXarZETo9YXaSrpVxOQ+u0xhtwyPjG69ChV273mu2XkF3bPjhueanXfXLYfU/2TGym33LNlQei2psd/dKl478oF7v7pVSvkRZy25brn6Yj+NZ7JuuY24r9l5Wfc5YPX5DVV+umepA2t23ne3ir9cWLPzTHeYbPo+jKfz/HPszIfk5nifJ24fQWRn6s6aDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbPwFoto0lZUp3cEAAAAASUVORK5CYII="
								src={vidUrl}
							/>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'self-end'
								}}
							>
								<span style={{ color: 'var(--grey)', fontSize: '10px' }}>
									{moment
										.utc(content?.data?.sentTimestamp || content?.data?.receivedTimeStamp)
										.local()
										.format('DD/MM/YYYY : hh:mm')}
								</span>
							</div>
						</div>
					</Bubble>
					</>
				);
			}

			case 'file':
				return (
					<FileCard
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						file={{
							name: 'sample',
							size: 12345
						}}
						extension="pdf"
					>
						<a
							target="_blank"
							href="https://www.africau.edu/images/default/sample.pdf"
							rel="noreferrer"
						>
							Sample
						</a>
					</FileCard>
				);
			case 'options': {
				return (
					<>
						<Bubble type="text">
							<div style={{ display: 'flex' }}>
								<span style={{ fontSize: '16px' }}>{content.text}</span>
							</div>
							<div style={{ marginTop: '10px' }} />
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
								<span style={{ color: 'var(--grey)', fontSize: '10px' }}>
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
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			renderMessageContent={renderMessageContent}
			onSend={(): null => null}
			locale="en-US"
			placeholder="Ask Your Question"
		/>
	);
};

export default StarredChatList;
