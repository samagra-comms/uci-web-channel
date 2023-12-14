import React, {
  FC,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { Bubble, Image, List, ListItem, Video } from "samagra-chatui";
import { Chat } from "samagra-chatui/lib/components/Chat";
import { map } from "lodash";
import moment from "moment";
import { User } from "../../types";
import { AppContext } from "../../utils/app-context";
import { getMsgType } from "../../utils/get-msg-type";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./index.module.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import botImage from "../../assets/images/bot_icon_2.png";
import FileCard from "../file-card";

const StarredChatList: FC<{ user: User }> = ({ user }) => {
  const context = useContext(AppContext);

  const msgs = useMemo(
    () =>
      context?.starredMsgs?.[user?.id]?.map((msg: any) => ({
        type: getMsgType(msg),
        content: { text: msg?.text, data: { ...msg } },
        position: msg?.position ?? "right",
        user: {
          avatar:
            msg?.position === "left"
              ? user?.botImageUrl || botImage
              : "",
        },
      })),
    [context?.starredMsgs, user?.botImageUrl, user?.id]
  );

  const getLists = useCallback(
    ({ choices, isDisabled }: { choices: any; isDisabled: boolean }) => (
      <List className={`${styles.list}`}>
        {map(choices ?? [], (choice, index) => (
          <ListItem
            className={`${styles.onHover} ${styles.listItem}`}
            children={
              <span style={{ fontSize: "16px" }}>
                {choice.text || choice.key}
              </span>
            }
          />
        ))}
      </List>
    ),
    []
  );

  function renderMessageContent(msg: {
    type: string;
    content: any;
  }): ReactElement {
    const { type, content } = msg;
    switch (type) {
      case "text":
        return (
          <>
            <Bubble type="text">
              <span
                className="onHover"
                style={{ fontSize: "16px" }}
                contentEditable="false"
                dangerouslySetInnerHTML={{ __html: content.text }}
              />
              <span style={{ color: "var(--grey)", fontSize: "10px" }}>
                {moment
                  .utc(
                    content?.data?.sentTimestamp ||
                      content?.data?.receivedTimeStamp
                  )
                  .local()
                  .format("DD/MM/YYYY : hh:mm")}
              </span>
            </Bubble>
          </>
        );
      case "image":
        // eslint-disable-next-line no-case-declarations
        const url =
          content?.data?.payload?.media?.url || content?.data?.imageUrl;
        return (
          <Bubble type="image">
            <div style={{ padding: "7px" }}>
              {/* <Image src={url} width="299" height="200" alt="image" lazy fluid /> */}
              <FileCard
                url={url}
                type="image"
                user={user}
                messageId={content?.data?.messageId}
              />
              {(content?.data?.caption ||
                content?.data?.payload?.media?.text) && (
                <div
                  contentEditable="false"
                  dangerouslySetInnerHTML={{
                    __html:
                      content?.data?.caption ||
                      content?.data?.payload?.media?.text,
                  }}
                ></div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--grey)", fontSize: "10px" }}>
                  {moment
                    .utc(
                      content?.data?.sentTimestamp ||
                        content?.data?.receivedTimeStamp
                    )
                    .local()
                    .format("DD/MM/YYYY : hh:mm")}
                </span>
              </div>
            </div>
          </Bubble>
        );
      case "video": {
        const vidUrl =
          content?.data?.payload?.media?.url || content?.data?.videoUrl;
        return (
          <>
            <Bubble type="image">
              <div style={{ padding: "7px" }}>
			  <FileCard
                url={vidUrl}
                type="video"
                user={user}
                messageId={content?.data?.messageId}
              />
              {(content?.data?.caption ||
                content?.data?.payload?.media?.text) && (
                <div
                  contentEditable="false"
                  dangerouslySetInnerHTML={{
                    __html:
                      content?.data?.caption ||
                      content?.data?.payload?.media?.text,
                  }}
                ></div>
              )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "self-end",
                  }}
                >
                  <span style={{ color: "var(--grey)", fontSize: "10px" }}>
                    {moment
                      .utc(
                        content?.data?.sentTimestamp ||
                          content?.data?.receivedTimeStamp
                      )
                      .local()
                      .format("DD/MM/YYYY : hh:mm")}
                  </span>
                </div>
              </div>
            </Bubble>
          </>
        );
      }

     
	  case "file": {
		const url = content?.data?.payload?.media?.url || content?.data?.fileUrl;
		return (
		  <>
			<Bubble type="image">
			  <div style={{ padding: "7px" }}>
				<FileCard
				  url={url}
				  user={user}
				  type="file"
				  messageId={content?.data?.messageId}
				/>
				{(content?.data?.caption ||
				  content?.data?.payload?.media?.text) && (
				  <div
					contentEditable="false"
					dangerouslySetInnerHTML={{
					  __html:
						content?.data?.caption ||
						content?.data?.payload?.media?.text,
					}}
				  ></div>
				)}
				<div
				  style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "self-end",
				  }}
				>
				  <span style={{ color: "var(--grey)", fontSize: "10px" }}>
					{moment
					  .utc(
						content?.data?.sentTimestamp ||
						  content?.data?.repliedTimestamp
					  )
					  .local()
					  .format("DD/MM/YYYY : hh:mm")}
				  </span>
				  
				</div>
			  </div>
			</Bubble>
		  </>
		);
	  }
	
      case "options": {
        return (
          <>
            <Bubble type="text">
              <div style={{ display: "flex" }}>
                <span style={{ fontSize: "16px" }}>{content.text}</span>
              </div>
              <div style={{ marginTop: "10px" }} />
              {getLists({
                choices:
                  content?.data?.payload?.buttonChoices ??
                  content?.data?.choices,
                isDisabled: content?.data?.disabled,
              })}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "self-end",
                }}
              >
                <span style={{ color: "var(--grey)", fontSize: "10px" }}>
                  {moment
                    .utc(
                      content?.data?.sentTimestamp ||
                        content?.data?.receivedTimeStamp
                    )
                    .local()
                    .format("DD/MM/YYYY : hh:mm")}
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
