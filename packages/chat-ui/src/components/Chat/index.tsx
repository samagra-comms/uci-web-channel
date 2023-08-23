import React, { useEffect } from 'react';
import { LocaleProvider } from '../LocaleProvider';
import { Navbar } from '../Navbar';
import {
  MessageContainer,
  MessageContainerProps,
  MessageContainerHandle,
} from '../MessageContainer';
import { QuickReplies, QuickReplyItemProps } from '../QuickReplies';
import { Composer as DComposer, ComposerProps, ComposerHandle } from '../Composer';
import { isSafari, getIOSMajorVersion } from '../../utils/ua';

export type ChatProps = Omit<ComposerProps, 'onFocus' | 'onChange' | 'onBlur'> &
  MessageContainerProps & {
    locale?: string;
    locales?: any;

    renderNavbar?: () => React.ReactNode;

    messagesRef?: React.RefObject<MessageContainerHandle>;

    quickReplies?: QuickReplyItemProps[];

    quickRepliesVisible?: boolean;

    onQuickReplyClick?: (item: QuickReplyItemProps, index: number) => void;

    onQuickReplyScroll?: () => void;

    renderQuickReplies?: () => void;

    composerRef?: React.RefObject<ComposerHandle>;

    onInputFocus?: ComposerProps['onFocus'];

    onInputChange?: ComposerProps['onChange'];

    onInputBlur?: ComposerProps['onBlur'];

    Composer?: React.ElementType;
    disableSend?: boolean;
  };

export const Chat = React.forwardRef<HTMLDivElement, ChatProps>((props, ref) => {
  // const {theme} = useTheme();
  const {
    wideBreakpoint,
    locale = 'zh-CN',
    locales,
    navbar,
    renderNavbar,
    loadMoreText,
    renderBeforeMessageList,
    messagesRef,
    onRefresh,
    onScroll,
    messages = [],
    renderMessageContent,
    onBackBottomShow,
    onBackBottomClick,
    quickReplies = [],
    quickRepliesVisible,
    onQuickReplyClick = () => {},
    onQuickReplyScroll,
    renderQuickReplies,
    text,
    textOnce,
    placeholder,
    onInputFocus,
    onInputChange,
    onInputBlur,
    onSend,
    disableSend = false,
    onImageSend,
    inputOptions,
    composerRef,
    inputType,
    onInputTypeChange,
    recorder,
    toolbar,
    onToolbarClick,
    onAccessoryToggle,
    rightAction,
    Composer = DComposer,
  } = props;

  function handleInputFocus(e: React.FocusEvent<HTMLTextAreaElement>) {
    if (messagesRef && messagesRef.current) {
      messagesRef.current.scrollToEnd({ animated: false, force: true });
    }
    if (onInputFocus) {
      onInputFocus(e);
    }
  }

  useEffect(() => {
    const rootEl = document.documentElement;
    if (isSafari()) {
      rootEl.dataset.safari = '';
    }

    const v = getIOSMajorVersion();
    if (v && v < 11) {
      rootEl.dataset.oldIos = '';
    }
  }, []);

  return (
    <LocaleProvider locale={locale} locales={locales}>
      <div className="ChatApp" ref={ref}>
        {renderNavbar ? renderNavbar() : navbar && <Navbar {...navbar} />}
        <MessageContainer
          ref={messagesRef}
          loadMoreText={loadMoreText}
          messages={messages}
          renderBeforeMessageList={renderBeforeMessageList}
          renderMessageContent={renderMessageContent}
          onRefresh={onRefresh}
          onScroll={onScroll}
          onBackBottomShow={onBackBottomShow}
          onBackBottomClick={onBackBottomClick}
        />
        <div className="ChatFooter">
          {renderQuickReplies ? (
            renderQuickReplies()
          ) : (
            <QuickReplies
              items={quickReplies}
              visible={quickRepliesVisible}
              onClick={onQuickReplyClick}
              onScroll={onQuickReplyScroll}
            />
          )}
          {true && (
            <Composer
              wideBreakpoint={wideBreakpoint}
              ref={composerRef}
              inputType={inputType}
              text={text}
              textOnce={textOnce}
              inputOptions={inputOptions}
              placeholder={placeholder}
              onAccessoryToggle={onAccessoryToggle}
              recorder={recorder}
              toolbar={toolbar}
              onToolbarClick={onToolbarClick}
              onInputTypeChange={onInputTypeChange}
              onFocus={handleInputFocus}
              onChange={onInputChange}
              onBlur={onInputBlur}
              onSend={onSend}
              disableSend={disableSend}
              onImageSend={onImageSend}
              rightAction={rightAction}
            />
          )}
        </div>
      </div>
    </LocaleProvider>
  );
});
