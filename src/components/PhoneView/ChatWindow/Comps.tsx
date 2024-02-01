import {
  Bubble,
  Image,
  ScrollView,
  List,
  ListItem,
  Video,
  Typing,
} from "samagra-chatui";
import { faStar, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { includes, map, find, filter, omit } from "lodash";
import moment from "moment";
import React, {
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { AppContext } from "../../../utils/app-context";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./Comps.module.css";
import {
  logToAndroid,
  sendEventToAndroid,
  triggerEventInAndroid,
} from "../../../utils/android-events";
import FileCard from "../../file-card";

export const RenderComp: FC<any> = ({
  currentUser,
  msg,
  chatUIMsg,
  onSend,
}) => {
  const context = useContext(AppContext);

  const [isInLocal, setIsInLocal] = useState(false);
  const [msgToStarred, setMsgToStarred] = useState<{
    botUuid?: string;
    messageId?: string;
  }>({});
  const [starredFromLocal] = useLocalStorage("starredChats", null, true);

  useEffect(() => {
    if (starredFromLocal) {
      if (
        Object.keys(starredFromLocal)?.includes(msg?.content?.data?.botUuid)
      ) {
        const starred = find(starredFromLocal?.[msg?.content?.data?.botUuid], {
          messageId: msg?.content?.data?.messageId,
        });

        if (starred) {
          setMsgToStarred(msg?.content?.data);
          setIsInLocal(true);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starredFromLocal]);

  const isStarred = useMemo(
    () =>
      Object.keys(msgToStarred)?.length > 0
        ? !!chatUIMsg?.find(
            (item: any) =>
              item?.content?.data?.botUuid === msgToStarred?.botUuid
          ) && isInLocal
        : false,
    [msgToStarred, chatUIMsg, isInLocal]
  );

  const onLongPress = useCallback(
    (content: any) => {
      if (msgToStarred?.botUuid) {
        const prevStarredMsgs = { ...context?.starredMsgs };
        const newStarredMsgs = {
          ...prevStarredMsgs,
          [msgToStarred?.botUuid]: filter(
            prevStarredMsgs?.[msgToStarred?.botUuid],
            (item) => item?.messageId !== msgToStarred?.messageId
          ),
        };

        if (newStarredMsgs[msgToStarred?.botUuid]?.length === 0) {
          const t = omit(newStarredMsgs, [msgToStarred?.botUuid]);
          context?.setStarredMsgs(t);
          localStorage.setItem("starredChats", JSON.stringify(t));
          try {
            triggerEventInAndroid("onMsgSaveUpdate", JSON.stringify(t));
            sendEventToAndroid(
              "nl-chatbotscreen-starmessage",
              JSON.stringify({
                starred: false,
                botid: msgToStarred?.botUuid,
                messageid: msgToStarred?.messageId,
                timestamp: moment().valueOf(),
              })
            );
            logToAndroid(
              `nl-chatbotscreen-starmessage event:,
                ${JSON.stringify({
                  starred: false,
                  botid: msgToStarred?.botUuid,
                  messageid: msgToStarred?.messageId,
                  timestamp: moment().valueOf(),
                })}
              `
            );
            logToAndroid(`new starred : ${JSON.stringify(t)}`);
          } catch (err) {
            logToAndroid(
              `error in onMsgSaveUpdate func:${JSON.stringify(err)}`
            );
          }
        } else {
          context?.setStarredMsgs(newStarredMsgs);
          localStorage.setItem("starredChats", JSON.stringify(newStarredMsgs));
          try {
            triggerEventInAndroid(
              "onMsgSaveUpdate",
              JSON.stringify(newStarredMsgs)
            );
            sendEventToAndroid(
              "nl-chatbotscreen-starmessage",
              JSON.stringify({
                starred: true,
                botid: msgToStarred?.botUuid,
                messageid: msgToStarred?.messageId,
                timestamp: moment().valueOf(),
              })
            );
            logToAndroid(
              `nl-chatbotscreen-starmessage event:,
                ${JSON.stringify({
                  starred: true,
                  botid: msgToStarred?.botUuid,
                  messageid: msgToStarred?.messageId,
                  timestamp: moment().valueOf(),
                })}
              `
            );
            logToAndroid(`new starred : ${JSON.stringify(newStarredMsgs)}`);
          } catch (err) {
            logToAndroid(
              `error in onMsgSaveUpdate func:${JSON.stringify(err)}`
            );
          }
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
          } else
            valueToReturn = {
              ...prev,
              [content?.data?.botUuid]: [content?.data],
            };

          localStorage.setItem("starredChats", JSON.stringify(valueToReturn));
          try {
            triggerEventInAndroid(
              "onMsgSaveUpdate",
              JSON.stringify(valueToReturn)
            );

            logToAndroid(`new starred : ${JSON.stringify(valueToReturn)}`);
          } catch (err) {
            logToAndroid(
              `error in onMsgSaveUpdate func:${JSON.stringify(err)}`
            );
          }
          return valueToReturn;
        });
      }
    },
    [context, msgToStarred]
  );

  const handleSend = useCallback(
    (type: string, val: any) => {
      if (type === "text" && val.trim()) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onSend(val, null, true, currentUser);
      }
    },
    [onSend, currentUser]
  );

  const getLists = useCallback(
    ({ choices, isDisabled }: { choices: any; isDisabled: boolean }) => {
      return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <List className={`${styles.list}`}>
          {map(choices ?? [], (choice, index) => (
            <ListItem
              key={`${index}_${choice?.key}`}
              className={`${styles.onHover} ${styles.listItem}`}
              onClick={(e): void => {
                e.preventDefault();
                if (isDisabled) {
                  toast.error("Cannot answer again");
                } else {
                  handleSend("text", choice.key);
                }
              }}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line react/no-children-prop
              children={
                <div>
                  <span className="onHover">
                    {choice.key} {choice.text}
                  </span>
                </div>
              }
            />
          ))}
        </List>
      );
    },
    [handleSend]
  );



  const { content, type } = msg;
  
  switch (type) {
    case "loader":
      return <Typing />;
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
              <span>
                {content?.data?.position === "left" && (
                  <FontAwesomeIcon
                    icon={faStar}
                    onClick={(): void => onLongPress(content)}
                    color={isStarred ? "var(--primaryyellow)" : "var(--grey)"}
                  />
                )}
              </span>
            </div>
          </Bubble>
        </>
      );

    case "image": {
      const url = content?.data?.payload?.media?.url || content?.data?.imageUrl;

      return (
        <>
          <Bubble type="image">
            <div style={{ padding: "7px" }} className="">
              <FileCard
                url={url}
                type="image"
                user={currentUser}
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
                <span>
                  {content?.data?.position === "left" && (
                    <FontAwesomeIcon
                      icon={faStar}
                      onClick={(): void => onLongPress(content)}
                      color={isStarred ? "var(--primaryyellow)" : "var(--grey)"}
                    />
                  )}
                
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
                user={currentUser}
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
                <span>
                  {content?.data?.position === "left" && (
                    <FontAwesomeIcon
                      icon={faStar}
                      onClick={(): void => onLongPress(content)}
                      color={isStarred ? "var(--primaryyellow)" : "var(--grey)"}
                    />
                  )}
                  {/* <FontAwesomeIcon
                    icon={faDownload}
                    onClick={(): void => onPdfDownload(url)}
                    style={{ marginLeft: "10px" }}
                    color={"var(--grey)"}
                  /> */}
                </span>
              </div>
            </div>
          </Bubble>
        </>
      );
    }

    case "video": {
      const url = content?.data?.payload?.media?.url || content?.data?.videoUrl;
      return (
        <>
          <Bubble type="image">
            <div style={{ padding: "7px" }}>
              <FileCard
                url={url}
                type="video"
                user={currentUser}
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
                <span>
                  {content?.data?.position === "left" && (
                    <FontAwesomeIcon
                      icon={faStar}
                      onClick={(): void => onLongPress(content)}
                      color={isStarred ? "var(--primaryyellow)" : "var(--grey)"}
                    />
                  )}
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
              <span
                style={{ fontSize: "16px" }}
                dangerouslySetInnerHTML={{ __html: `${content.text}` }}
              ></span>
            </div>
            <div style={{ marginTop: "10px" }} />
            {getLists({
              choices:
                content?.data?.payload?.buttonChoices ?? content?.data?.choices,
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
                      content?.data?.repliedTimestamp
                  )
                  .local()
                  .format("DD/MM/YYYY : hh:mm")}
              </span>
              <span>
                {content?.data?.position === "left" && (
                  <FontAwesomeIcon
                    icon={faStar}
                    onClick={(): void => onLongPress(content)}
                    color={isStarred ? "var(--primaryyellow)" : "var(--grey)"}
                  />
                )}
              </span>
            </div>
          </Bubble>
        </>
      );
    }
    default:
      return (
        <ScrollView
          data={[]}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          renderItem={(item): ReactElement => <Button label={item.text} />}
        />
      );
  }
};
