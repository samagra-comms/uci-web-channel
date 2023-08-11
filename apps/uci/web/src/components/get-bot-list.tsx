import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { reverse, sortBy, without } from "lodash";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/index.jsx";
import { fetchUsers, setCurrentUser, setLoading, setUsers } from "@/store/slices/userListSlice";
import { getBotDetailsList } from "@/utils/api-handler";
import { normalizeUsers } from "@/utils/normalize-user";

const GetBotList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const usersData = useSelector((state: any) => state.userList.users);


  // useEffect(() => {
  //   console.log("Users data: ", usersData);
  // }, [usersData]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);


  useEffect(() => {
    try {
      const checkOnline = async (): Promise<void> => {
        if (window.navigator.onLine) {
          const botIds = JSON.parse(localStorage.getItem("botList") || '{}');
          getBotDetailsList()
            .then((response): any => {
              console.log({ response });
              const botDetailsList = without(
                reverse(
                  sortBy(
                    response?.data?.result?.map((bot: any, index: number) => {
                      if (true) { // Retaining this for now since the conditions seem to be commented out
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

              dispatch(setUsers(botDetailsList));
              dispatch(setLoading(false));

              if (localStorage.getItem("currentUser")) {
                dispatch(setCurrentUser(JSON.parse(localStorage.getItem("currentUser")??'')));
              } else {
                dispatch(setCurrentUser(botDetailsList?.[0]));
              }
            })
            .catch((err: any) => console.log("qwerty:", { err }));
        } else {
          dispatch(setLoading(false));
          if (localStorage.getItem("botDetails")) {
            dispatch(setUsers(JSON.parse(localStorage.getItem("botDetails") || '[]')));
            dispatch(setCurrentUser(JSON.parse(localStorage.getItem("botDetails") || '[]')?.[0]));
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
