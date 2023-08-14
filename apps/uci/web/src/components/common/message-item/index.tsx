//@ts-ignore
import { ScrollView, List, ListItem, FileCard, Video } from "chatui";
import { faStar, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { includes, map, find, filter, omit } from "lodash";
import moment from "moment";
import * as React from "react";
import { toast } from "react-hot-toast";
import styles from "./index.module.css";
import { botImage } from "@/assets";
import Image from "next/image";
import { AppContext } from "@/context";
import { useLocalStorage } from "@/hooks";
import { Box, Button } from "@chakra-ui/react";
import { config, theme_styles } from "@/config";
import { Span,BubbleSpan,ContentDiv,Div,BubbleDiv, ContentImage } from './styled'
import { useTheme } from "@/providers/ThemeProvider";

export const MessageItem: React.FC<any> = ({
  currentUser,
  msg,
  chatUIMsg,
  onSend,
}) => {
  const context = React.useContext(AppContext);

  const [isInLocal, setIsInLocal] = React.useState(false);
  const {theme} =useTheme();
  const [msgToStarred, setMsgToStarred] = React.useState<{
    botUuid?: string;
    messageId?: string;
  }>({});
  //@ts-ignore
  const [starredFromLocal] = useLocalStorage("starredChats", null, true);

  React.useEffect(() => {
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

  const isStarred = React.useMemo(
    () =>
      Object.keys(msgToStarred)?.length > 0
        ? !!chatUIMsg?.find(
          (item: any) =>
            item?.content?.data?.botUuid === msgToStarred?.botUuid
        ) && isInLocal
        : false,
    [msgToStarred, chatUIMsg, isInLocal]
  );

  const onLongPress = React.useCallback(
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
        } else {
          context?.setStarredMsgs(newStarredMsgs);
          localStorage.setItem("starredChats", JSON.stringify(newStarredMsgs));
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
          return valueToReturn;
        });
      }
    },
    [context, msgToStarred]
  );

  const handleSend = React.useCallback(
    (type: string, val: any) => {
      if (type === "text" && val.trim()) {
        // @ts-ignore
        onSend(val, null, true, currentUser);
      }
    },
    [onSend, currentUser]
  );

  const getLists = React.useCallback(
    ({ choices, isDisabled }: { choices: any; isDisabled: boolean }) => (
      <List className={`${styles.list}`}>
        {map(choices ?? [], (choice, index) => (
          <ListItem
            key={`${index}_${choice?.key}`}
            className={`${styles.onHover} ${styles.listItem}`}
            style={{ background: choice?.active ? theme.list : theme.innerBackground }}
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
                <span style={{color:`${theme.color}`}}>
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
  const { content, type } = msg;

  switch (type) {
    case "text":
      return (
        <>
          {content?.data?.position === config.message.userInput.position && (
            <div className={styles.botImageDiv}>
              <Image
                src={botImage}
                className={styles.botImage}
                alt="botImage"
              />
            </div>
          )}
          <Box background={config.message.userInput.background} padding={config.message.userInput.padding} borderRadius={config.message.userInput.borderRadius} margin={config.message.botMsg.margin}>
          {/* <Bubble type="text"> */}
            <Box>
            <Span className="onHover">
              {content.text}
            </Span>
            <BubbleDiv>
              <BubbleSpan>
                {moment
                  .utc(
                    content?.data?.sentTimestamp ||
                    content?.data?.repliedTimestamp
                  )
                  .local()
                  .format("DD/MM/YYYY : hh:mm")}
              </BubbleSpan>
              <span>
                {content?.data?.position === "left" && (
                  <FontAwesomeIcon
                    icon={faStar}
                    onClick={(): void => onLongPress(content)}
                    color={isStarred ? config.message.botMsg.starredColor : "var(--grey)"}
                  />
                )}
              </span>
            </BubbleDiv>
            </Box>    
          {/* </Bubble>         */}
          </Box>          
        </>
      );

    case "image": {
      console.log("alibaba:", { msg });
      const url = content?.data?.payload?.media?.url || content?.data?.imageUrl;
      return (
        <>
          {content?.data?.position === "left" && (
            <ContentDiv>
              <Image
                src={config.message.icon}
                alt="botImage"
                height={config.message.iconSize}
                width={config.message.iconSize}
              />
            </ContentDiv>
          )}
          <Box background={theme.background} padding={config.message.botMsg.padding} borderRadius={config.message.botMsg.borderRadius} margin={config.message.botMsg.margin}>
          {/* <Bubble type="image"> */}
            <Div>
              <Image
                src={url}
                width={theme_styles.case_image.width}
                height={theme_styles.case_image.height}
                alt="botImage"
                className={styles.botImage}
              />
              <BubbleDiv>
                <BubbleSpan >
                  {moment
                    .utc(
                      content?.data?.sentTimestamp ||
                      content?.data?.repliedTimestamp
                    )
                    .local()
                    .format("DD/MM/YYYY : hh:mm")}
                </BubbleSpan>
                <span>
                  {content?.data?.position === "left" && (
                    <FontAwesomeIcon
                      icon={faStar}
                      onClick={(): void => onLongPress(content)}
                      color={isStarred ?config.message.botMsg.starredColor : "var(--grey)"}
                    />
                  )}
                  <FontAwesomeIcon
                    icon={faDownload}
                    onClick={(): void => download(url)}
                    style={{ marginLeft: theme_styles.margin.medium }}
                    color={"var(--grey)"}
                  />
                </span>
              </BubbleDiv>
            </Div>
          {/* </Bubble> */}
          </Box>
        </>
      );
    }

    case "file": {
      const url = content?.data?.payload?.media?.url || content?.data?.fileUrl;
      return (
        <>
          {content?.data?.position === "left" && (
            <ContentDiv>
              <Image
                src={botImage}
                alt="botImage"
                className={styles.botImage}
              />
            </ContentDiv>
          )}
           <Box background={theme.background} padding={config.message.botMsg.padding} borderRadius={config.message.botMsg.borderRadius} margin={config.message.botMsg.margin}>
            <Div>
              <FileCard file={url} extension="pdf" />
              <BubbleDiv>
                <BubbleSpan>
                  {moment
                    .utc(
                      content?.data?.sentTimestamp ||
                      content?.data?.repliedTimestamp
                    )
                    .local()
                    .format("DD/MM/YYYY : hh:mm")}
                </BubbleSpan>
                <span>
                  {content?.data?.position === "left" && (
                    <FontAwesomeIcon
                      icon={faStar}
                      onClick={(): void => onLongPress(content)}
                      color={isStarred ? config.message.botMsg.starredColor : "var(--grey)"}
                    />
                  )}
                  <FontAwesomeIcon
                    icon={faDownload}
                    onClick={(): void => download(url)}
                    style={{ marginLeft: "10px" }}
                    color={"var(--grey)"}
                  />
                </span>
              </BubbleDiv>
            </Div>
          </Box>
        </>
      );
    }

    case "video": {
      const url = content?.data?.payload?.media?.url || content?.data?.videoUrl;
      return (
        <>
          {content?.data?.position === "left" && (
            <ContentDiv>
              <Image src={botImage} alt="botImage" className={styles.botImage} />
            </ContentDiv>
          )}
          <Box background={theme.background} padding={config.message.botMsg.padding} borderRadius={config.message.botMsg.borderRadius} margin={config.message.botMsg.margin}>
            <Div>
              <Video
                cover="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAeFBMVEUyMjL///8vLy/Q0NBJSUlAQEA8Oz85OD0tLS0qKio1Nzs5OTz6+vo5OTnZ2dkzMzPw8PBkZGRGRkaAgIDo6OioqKgkJCR6enqurq5SUlLMzMyFhYXh4eHW1ta7u7tHR0dcXFybm5twcHC/v7+UlJRXWFeVlZVsbGwZSzceAAAD0UlEQVR4nO3ca3OiMBiGYYOoPUQNihVBrQfc/v9/uEntslRBwmFk3jfPNbOf2tlyT0oCgTp4m0wm75Mb46tRkfH40Vf/f7nczQ97L/aW0d8xLfxJ1+N+n4wnFcejvzH//+l/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgOfw+j6AfswXcxfLvcUqnb70fRTP5/lDebx8ODfkuluI3Xrg2pB/dwu137y4NeTXbjPkI6eG/F+3CKPPj74P5omybiGGiefO73quW6jo8Nr38TxLvlvI3dJz5Cz/1a2H/Oi7sZbfdAsxWzpx+XbXrSd2F9by+24h4yX/ib2g20zs01fm5YXdQsQJ87O8pFuo1YH15VtZt17LT6+Mh7y02ww544n9Qbdey08jruEPu8U2+mK6pD3uFnK2HLC8V6no1uX7A8et5spuIXapz2/ILbr15duG3Vlu0y3kMJkzG3KrbnOWB7zOcstuPbEnrNZy225zXx4w2oqx79aXb4z22Ot0C7UPuDw8rdWtJ/Z0xGNir9fN5yatbrc+y9Mpg/D63fryjcFZ3qBbyF1CfmJv0m3WcuqPVZp165u0ZEF6yJt267Wc9H15425zkzalu5Y37zZr+YXsWt6mW4htQnUtb9ctwlVAcyumZbdey9dzihN7225z+XYhOOTtu82LUAtyE3sX3WbDldpa3km3eUWC2GOVbrq/330jdZZ31W2epC3mfdfY66xbX8Ss3ezebwj9onfWHdPaZO6oOzwHtN786qY7PC36Dqmpi24VnWgN9qCLbrlNPFrXLEbrbhldKN6Dt+0eHmm+BNKuW54X5M7sq1bdwyXNwR606g7PJ7Lbii26VTLt++BbaNqtjgHdwR407ZbbP4SfGRjNuvcHimt2XpPuYeqT/h036nereEP8GbBRu3u2pLS9UKpmtzqfSG0flqrXHSb032y5qtMtjwH1aTxj3y1nK+Jrdp5995n8mp1n222e/THKtuxWMad3sA2r7nDp932cXbPoVvs1+cvSO9V/PxamBLdLK1V1y4jPmp1X0b1b+aym8czj7pjfH8z9eNS9S8hul1Yq71aUt0srlXarZETo9YXaSrpVxOQ+u0xhtwyPjG69ChV273mu2XkF3bPjhueanXfXLYfU/2TGym33LNlQei2psd/dKl478oF7v7pVSvkRZy25brn6Yj+NZ7JuuY24r9l5Wfc5YPX5DVV+umepA2t23ne3ir9cWLPzTHeYbPo+jKfz/HPszIfk5nifJ24fQWRn6s6aDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbPwFoto0lZUp3cEAAAAASUVORK5CYII="
                src={url}
              />
              <div>
                <span style={{ color: "var(--grey)", fontSize: theme.textStyles.small.fontSize }}>
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
                      color={isStarred ? config.message.botMsg.starredColor : "var(--grey)"}
                    />
                  )}
                </span>
              </div>
            </Div>
          </Box>
        </>
      );
    }
    case "options": {
      console.log("qwe12:", { content });
      return (
        <>
          <ContentDiv>
            <ContentImage src={botImage} alt='bot-image'/>
          </ContentDiv>
          <Box background={theme.background} borderRadius={config.message.botMsg.borderRadius} padding={config.message.botMsg.padding} margin={config?.message?.botMsg?.margin} color={theme.color}>
            <Box marginBottom="1vw">
              <Span>
                {content.text}
              </Span>
            </Box>
            {getLists({
              choices:
                content?.data?.payload?.buttonChoices ?? content?.data?.choices,
              isDisabled: content?.data?.disabled,
            })}
            <BubbleDiv>
              <BubbleSpan>
                {moment
                  .utc(
                    content?.data?.sentTimestamp ||
                    content?.data?.repliedTimestamp
                  )
                  .local()
                  .format("DD/MM/YYYY : hh:mm")}
              </BubbleSpan>
              <span>
                {content?.data?.position === "left" && (
                  <FontAwesomeIcon
                    icon={faStar}
                    onClick={(): void => onLongPress(content)}
                    color={isStarred ? config?.message?.botMsg?.starredColor : "var(--grey)"}
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
          renderItem={(item: any): ReactElement => <Button label={item.text} />}
        />
      );
  }
};