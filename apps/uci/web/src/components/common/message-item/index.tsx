//@ts-ignore
import { Bubble, ScrollView, List, ListItem, FileCard, Video } from "chatui";
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

import { toast } from "react-hot-toast";

// @ts-ignore
import styles from "./index.module.css";
import Image from "next/image";
import { AppContext } from "../../../context";
import { useLocalStorage } from "@/hooks";
import { Button } from "@chakra-ui/react";
import configData from "./config.json";

export const MessageItem: FC<any> = ({
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
  //@ts-ignore
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
          // console.log("qwe1:", "yes I exist")
          setMsgToStarred(msg?.content?.data);
          setIsInLocal(true);
        }
      }
    }
  }, [msg?.content?.data, starredFromLocal]);

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
            window &&
              window?.androidInteract?.onMsgSaveUpdate(JSON.stringify(t));
            window &&
              window?.androidInteract?.onEvent(
                "nl-chatbotscreen-starmessage",
                JSON.stringify({
                  starred: false,
                  botid: msgToStarred?.botUuid,
                  messageid: msgToStarred?.messageId,
                  timestamp: moment().valueOf(),
                })
              );
            window &&
              window?.androidInteract?.log(
                "nl-chatbotscreen-starmessage event:",
                JSON.stringify({
                  starred: false,
                  botid: msgToStarred?.botUuid,
                  messageid: msgToStarred?.messageId,
                  timestamp: moment().valueOf(),
                })
              );
            window &&
              window?.androidInteract?.log(
                `new starred : ${JSON.stringify(t)}`
              );
          } catch (err) {
            window &&
              window?.androidInteract?.log(
                `error in onMsgSaveUpdate func:${JSON.stringify(err)}`
              );
          }
        } else {
          context?.setStarredMsgs(newStarredMsgs);
          localStorage.setItem("starredChats", JSON.stringify(newStarredMsgs));
          try {
            window &&
              window?.androidInteract?.onMsgSaveUpdate(
                JSON.stringify(newStarredMsgs)
              );
            window &&
              window?.androidInteract?.onEvent(
                "nl-chatbotscreen-starmessage",
                JSON.stringify({
                  starred: true,
                  botid: msgToStarred?.botUuid,
                  messageid: msgToStarred?.messageId,
                  timestamp: moment().valueOf(),
                })
              );
            window &&
              window?.androidInteract?.log(
                "nl-chatbotscreen-starmessage event:",
                JSON.stringify({
                  starred: true,
                  botid: msgToStarred?.botUuid,
                  messageid: msgToStarred?.messageId,
                  timestamp: moment().valueOf(),
                })
              );
            window &&
              window?.androidInteract?.log(
                `new starred : ${JSON.stringify(newStarredMsgs)}`
              );
          } catch (err) {
            window &&
              window?.androidInteract?.log(
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
          } else {
            valueToReturn = {
              ...prev,
              [content?.data?.botUuid]: [content?.data],
            };
          }

          localStorage.setItem("starredChats", JSON.stringify(valueToReturn));
          try {
            window &&
              window?.androidInteract?.onMsgSaveUpdate(
                JSON.stringify(valueToReturn)
              );
            window &&
              window?.androidInteract?.log(
                `new starred : ${JSON.stringify(valueToReturn)}`
              );
          } catch (err) {
            window &&
              window?.androidInteract?.log(
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
        // @ts-ignore
        onSend(val, null, true, currentUser);
      }
    },
    [onSend, currentUser]
  );

  const getLists = useCallback(
    ({ choices, isDisabled }: { choices: any; isDisabled: boolean }) => (
      <List className={`${styles.list}`}>
        {map(choices ?? [], (choice, index) => (
          <ListItem
            key={`${index}_${choice?.key}`}
            className={`${styles.onHover} ${styles.listItem} ${choice?.active ? styles.active : ""
              }`}
            onClick={(e: any): void => {
              e.preventDefault();
              if (isDisabled) {
                toast.error("Cannot answer again");
              } else {
                handleSend("text", choice.key);
              }
            }}
            children={
              <div>
                <span>
                  {choice.key} {choice.text}
                </span>
              </div>
            }
          />
        ))}
      </List>
    ),
    [handleSend]
  );

  const download = (url: string): void => {
    try {
      window && window?.androidInteract?.onImageDownload(url);
      console.log("onImageDownload function executed");
    } catch (err) {
      console.log("onImageDownload function failed");
      window &&
        window?.androidInteract?.log(
          `error in onImageDownload: ${JSON.stringify(err)}`
        );
    }
  };



  const { content, type } = msg;
  switch (type) {
    case configData.bubbleType.text:
      return (
        <>
          {content?.data?.position === "left" && (
            <div style={{ width: configData.style.width, marginRight: configData.style.marginRight, textAlign: configData.style.textAlign as 'left' | 'right' | 'center' }}>
              <Image
                src={configData.botImage}
                style={{ borderRadius: "50%" }}
                alt="botImage"
              />
            </div>
          )}
          <Bubble type={configData.bubbleType.text}>
            <span className="onHover" style={{ fontSize: configData.style.fontSize }}>
              {content.text}
            </span>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "self-end",
            }}>
              <span style={{ color: configData.style.color, fontSize: "10px" }}>
                {moment
                  .utc(
                    content?.data?.sentTimestamp ||
                    content?.data?.repliedTimestamp
                  )
                  .local()
                  .format(configData.dateFormat)}
              </span>
              <span>
                {content?.data?.position === "left" && (
                  <FontAwesomeIcon
                    icon={faStar}
                    onClick={(): void => onLongPress(content)}
                    color={isStarred ? configData.iconColor.starred : configData.iconColor.default}
                  />
                )}
              </span>
            </div>
          </Bubble>
        </>
      );

    case configData.bubbleType.image: {
      const url = content?.data?.payload?.media?.url || content?.data?.imageUrl;
      return (
        <>
          {content?.data?.position === "left" && (
            <div
              style={{ width: configData.style.width, marginRight: configData.style.marginRight, textAlign: configData.style.textAlign as 'left' | 'right' | 'center' }}
            >
              <Image
                src={configData.botImage}
                style={{ borderRadius: "50%" }}
                alt="botImage"
              />
            </div>
          )}
          <Bubble type={configData.bubbleType.image}>
            <div style={{ padding: configData.style.padding }}>
              <Image
                src={url}
                width={configData.imageSize.width}
                height={configData.imageSize.height}
                style={{ borderRadius: "50%" }}
                alt="botImage"
              />
              ...
            </div>
          </Bubble>
        </>
      );
    }
    case configData.bubbleType.file: {
      const url = content?.data?.payload?.media?.url || content?.data?.fileUrl;
      return (
        <>
          {content?.data?.position === "left" && (
            <div
              style={{ width: configData.style.width, marginRight: configData.style.marginRight, textAlign: configData.style.textAlign as 'left' | 'right' | 'center' }}
            >
              <Image
                src={configData.botImage}
                style={{ borderRadius: "50%" }}
                alt="botImage"
              />
            </div>
          )}
          <Bubble type={configData.bubbleType.file}>
            <div style={{ padding: configData.style.padding }}>
              <FileCard file={url} extension="pdf" />
              ...
            </div>
          </Bubble>
        </>
      );
    }
    default:
      return (
        // @ts-ignore
        <ScrollView
          data={[]}
          //@ts-ignore
          renderItem={(item: any): ReactElement => <Button label={item.text} />}
        />
      );
  }
};
