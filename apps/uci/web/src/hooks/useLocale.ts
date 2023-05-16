"use client";
import { flattenMessages, INestedMessages } from "@/lang/flattenMessages";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import en from "@/lang/en.json";



// Union type
export type Locale = "en";

// a Record is an object wich we can pass union types to it as key.
const messages: Record<Locale, INestedMessages> = {
  en,
};

export const useLocale = () => {
//   const router = useRouter();
  const router ={ locale:'en',asPath:()=>null ,push:(arg1:any,arg2:any,arg3:any)=>null}
  const flattenedMessages = useMemo(
    () => flattenMessages(messages[router.locale as keyof typeof messages]),
    [router]
  );

  const switchLocale = useCallback(
    (locale: Locale) => {
      // if we already have /en and we choose english for example we just return!
      if (locale === router.locale) {
        return;
      }

      // This is how we change locale in NextJS.
      const path = router.asPath;
      return router.push(path, path, { locale });
    },
    [router]
  );
  return { locale: router.locale, switchLocale, messages: flattenedMessages };
};