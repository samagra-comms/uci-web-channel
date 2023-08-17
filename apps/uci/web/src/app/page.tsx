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

//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//      <Flex flexDirection="column" height="100vh" width="100vw">
//       {/* Top Section */}
//       <Box className={`${styles.top_section}`}>
//         {/* For the back button */}
//         <Box flex="1.5">
//           <Button
//             style={{
//               border: "none",
//               padding: "0.75rem 1rem",
//               borderRadius: "50%",
//               fontSize: "14px",
//             }}
//             size="sm"
//             variant="ghost"
//           >
//             <FontAwesomeIcon icon={faChevronLeft} />
//           </Button>
//         </Box>
//         <Flex flex="9" justifyContent="space-between" alignItems="center" >
//           <Flex justifyContent="center" alignItems="center" >
//             <Box>{<Box>Chats</Box>}</Box>
//           </Flex>
//         </Flex>
//       </Box>

//       <Box className={styles.mainContainer}>
//         <Box className={`${styles.backBox}`}>
//           <button className={`${styles.starred}`} onClick={onStarredChatsClick}>
//             Starred Messages
//           </button>
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
//             ) : (
//               <ChatItem
//                 key={0}
//                 active={false}
//                 name={"No Chats Available"}
//                 phoneNumber={""}
//                 isBlank
//               />
//             )}
//           </Box>
//         </Box>
//       </Box>
//     </Flex>
//   );
// };

// export default ParentComponent;
