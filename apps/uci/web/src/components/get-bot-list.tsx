import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { reverse, sortBy, without } from 'lodash';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/index.jsx';
import {
    fetchUsers,
    setCurrentUser,
    setLoading,
    setUsers,
} from '@/store/slices/userListSlice';
import { getBotDetailsList } from '@/utils/api-handler';
import { normalizeUsers } from '@/utils/normalize-user';
import { setError } from '@/store/slices/userMessageSlice';

const GetBotList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    useEffect(() => {
        try {
            const checkOnline = async (): Promise<void> => {
                if (window.navigator.onLine) {
                    const botIds = JSON.parse(
                        localStorage.getItem('botList') || '{}',
                    );
                    getBotDetailsList()
                        .then((response): any => {
                            console.log({ response });
                            const botDetailsList = without(
                                reverse(
                                    sortBy(
                                        response?.data?.result?.map(
                                            (bot: any, index: number) => {
                                                if (true) {
                                                    // Retaining this for now since the conditions seem to be commented out
                                                    if (index === 0)
                                                        localStorage.setItem(
                                                            'userID',
                                                            bot?.id,
                                                        );
                                                    return normalizeUsers({
                                                        ...bot,
                                                        active: index === 0,
                                                        botUuid: bot?.id,
                                                        createTime: moment(
                                                            bot?.createdAt,
                                                        ).valueOf(),
                                                    });
                                                }
                                                return null;
                                            },
                                        ),
                                        ['createTime'],
                                    ),
                                ),
                                null,
                            );

                            dispatch(setUsers(botDetailsList));
                            dispatch(setLoading(false));

                            if (localStorage.getItem('currentUser')) {
                                dispatch(
                                    setCurrentUser(
                                        JSON.parse(
                                            localStorage.getItem(
                                                'currentUser',
                                            ) ?? '',
                                        ),
                                    ),
                                );
                            } else {
                                dispatch(setCurrentUser(botDetailsList?.[0]));
                            }
                        })
                        .catch((err: any) => {
                            console.log('qwerty:', { err });
                            dispatch(setError(err?.message));
                        });
                } else {
                    dispatch(setLoading(false));
                    if (localStorage.getItem('botDetails')) {
                        dispatch(
                            setUsers(
                                JSON.parse(
                                    localStorage.getItem('botDetails') || '[]',
                                ),
                            ),
                        );
                        dispatch(
                            setCurrentUser(
                                JSON.parse(
                                    localStorage.getItem('botDetails') || '[]',
                                )?.[0],
                            ),
                        );
                    }
                }
            };
            checkOnline();
        } catch (err: any) {
            toast.error(err?.message);
            dispatch(setError(err?.message));
        }
    }, []);

    return null;
};

export default GetBotList;
