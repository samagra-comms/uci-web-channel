import { getBotDetailsList } from "@/utils/api-handler";
import { normalizeUsers } from "@/utils/normalize-user";
import { reverse, sortBy, without } from "lodash";
import moment from "moment";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { setUsers, setCurrentUser, setLoading } from "@/types/react-dispatch";
import { config } from "@/config";

interface GetBotItemProp{
   setUsers: setUsers,
   setCurrentUser: setCurrentUser,
   setLoading: setLoading
}

const GetBotList: React.FC<GetBotItemProp> = ({ setUsers, setCurrentUser, setLoading }) => {

    useEffect(() => {
        try {
          const checkOnline = async (): Promise<void> => {
            if (window.navigator.onLine) {
    
              const botIds = JSON.parse(config.list[0].botList);
              getBotDetailsList()
                .then((response): any => {
                  console.log({ response })
                  const botDetailsList = without(
                    reverse(
                      sortBy(
                        response?.data?.result?.map((bot: any, index: number) => {
                          if (
                            // bot?.logicIDs?.[0]?.transformers?.[0]?.meta?.type !==
                            // "broadcast" &&
                            // includes(botIds, bot?.id)
                            true
                          ) {
                            if (index === 0) localStorage.setItem('userID', bot?.id);
                            return normalizeUsers({
                              ...bot,
                              active: index === 0,
                              botUuid: bot?.id,
                              createTime: moment(bot?.createdAt).valueOf(),
                            });
                          }
                          return null;
                        }),
                        ["createTime"]
                      )
                    ),
                    null
                  );
    
                  // @ts-ignore
                  setUsers(botDetailsList);
                  setLoading(false);
    
                  if (localStorage.getItem("currentUser")) {
    
                    // @ts-ignore
                    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));

    
                    
                  } 
                  // else setCurrentUser(botDetailsList?.[0]
                    // );
                })
                .catch((err: any) => console.log("qwerty:", { err }));
            } else {
              setLoading(false);
              if (localStorage.getItem("botDetails")) {
                setUsers(JSON.parse(localStorage.getItem("botDetails") || '[]'));
                setCurrentUser(JSON.parse(localStorage.getItem("botDetails") || '[]')?.[0]);
              }
            }
          };
          checkOnline();
        } catch (err: any) {
          toast.error(err?.message);
        }
      }, []);

    return null;
}

export default GetBotList;