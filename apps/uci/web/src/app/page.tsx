'use client';

import { Flex } from '@chakra-ui/react';
import Chats from './chats/[chatid]/page';
import Home from './home/page';

// const usersData = useSelector((state: any) => state.userList.users);

// useEffect(() => {
//   if(usersData.length > 0)
//   {
//     console.log("Users data: ", usersData);
//   }
// }, [usersData]);

const ParentComponent = () => {
    return (
        <Flex>
            <Home />
            <Chats />
        </Flex>
    );
};

export default ParentComponent;

//           <Box className={styles.chatList}>
//             {usersData?.length > 0 ? (
//               <>
//                 {(usersData ?? [])?.map((user:any, index:string) => (
//                   <div key={user?.id}
//                   >
//                     <ChatItem
//                       key={index}
//                       active={user.active}
//                       name={user.name}
//                       phoneNumber={user.number}
//                       user={user}
//                     />
//                   </div>
//                 ))}
//               </>
//             )
//  : (
//               <ChatItem
//                 key={0}
//                 active={false}
//                 name={"No Chats Available"}
//                 phoneNumber={""}
//                 isBlank
//               />
//             )}
//           </Box>
